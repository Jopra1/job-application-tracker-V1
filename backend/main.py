from dotenv import load_dotenv
from typing import TypedDict, Optional
from fastapi import FastAPI
from pydantic import BaseModel

from langgraph.graph import StateGraph
from langchain_openai import ChatOpenAI

load_dotenv()

# --------------------
# DATA MODELS
# --------------------

class Advice(BaseModel):
    action: str
    reason: str

class AppState(TypedDict):
    job_status: str
    advice: Optional[dict]

class JobStatusRequest(BaseModel):
    job_status: str

# --------------------
# LLM SETUP
# --------------------

llm = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0
)

structured_llm = llm.with_structured_output(Advice)

# --------------------
# AGENT
# --------------------

def status_advisor_agent(job_status: str) -> Advice:
    prompt = f"""
    A job application has the status: {job_status}.
    Suggest one next action and a short reason.
    """
    return structured_llm.invoke(prompt)

# --------------------
# LANGGRAPH NODE
# --------------------

def status_advisor_node(state: AppState) -> AppState:
    result = status_advisor_agent(state["job_status"])
    state["advice"] = result.model_dump()
    return state

graph = StateGraph(AppState)
graph.add_node("status_advisor", status_advisor_node)
graph.set_entry_point("status_advisor")
app_graph = graph.compile()

# --------------------
# FASTAPI APP
# --------------------

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Job Application Tracker API is running. Go to /docs for the API."}

@app.post("/advice")
def get_advice(request: JobStatusRequest):
    initial_state = {
        "job_status": request.job_status,
        "advice": None
    }

    final_state = app_graph.invoke(initial_state)
    return final_state["advice"]
