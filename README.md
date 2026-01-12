# Job Application Tracker 🚀

An AI-powered job application tracker that provides smart LLM based advice using LangGraph and FastAPI.

---

## ✨ Features
- Track job applications (Applied / Interview / Rejected)
- AI-generated advice
- LangGraph-based decision workflows
- FastAPI backend + vanilla JS frontend
- Persistent storage using localStorage

---

## 🧠 How It Works
1. User updates job status
2. Frontend sends status to backend
3. LangGraph processes the state
4. LLM returns structured advice
5. Advice is shown in the UI

---

## 🛠 Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** FastAPI (Python)
- **AI Orchestration:** LangGraph
- **LLM:** OpenAI
- **State Management:** localStorage

---

## ▶️ Running the Project

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
