from dotenv import load_dotenv
from typing import TypedDict, Optional
from langgraph.graph import StateGraph

load_dotenv()

from langchain_openai import ChatOpenAI
from pydantic import BaseModel

class Advice(BaseModel):
    action: str
    reason: str
    
class AppState(TypedDict):
    job_status: str
    advice: Optional[dict]


llm = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0
)
structured_llm = llm.with_structured_output(Advice)

def status_advisor_agent(job_status: str) -> Advice:
    prompt = f"""
    A job application has the status: {job_status}.
    Suggest one next action and a short reason.
    """
    return structured_llm.invoke(prompt)

def status_advisor_node(state: AppState) -> AppState:
    result = status_advisor_agent(state["job_status"])
    state["advice"] = result.dict()
    return state
graph = StateGraph(AppState)

graph.add_node("status_advisor", status_advisor_node)

graph.set_entry_point("status_advisor")

app = graph.compile()

initial_state = {
    "job_status": "Rejected",
    "advice": None
}

final_state = app.invoke(initial_state)

print(final_state)


