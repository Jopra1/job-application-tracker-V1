# Job Application Tracker V1

A simple job application tracker with an AI-powered advisor.

## Project Structure

- `backend/`: FastAPI backend with LangGraph agent.
- `frontend/`: HTML/JS frontend.

## Setup & Running

### Backend

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2.  Create a virtual environment (optional but recommended):
    ```bash
    python -m venv venv
    # Windows
    venv\Scripts\activate
    # Mac/Linux
    source venv/bin/activate
    ```

3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4.  Set up environment variables:
    - Ensure you have a `.env` file in the `backend` directory with your `OPENAI_API_KEY`.

5.  Run the server:
    ```bash
    uvicorn main:app --reload
    ```
    The API will be available at `http://127.0.0.1:8000`.

### Frontend

1.  Open `frontend/index.html` in your web browser.
    - You can simply double-click the file or use a lightweight server like "Live Server" in VS Code.

## Usage

1.  Add a job with Company Name and Role.
2.  Change the status (Applied, Interview, Rejected).
3.  The AI Advisor will automatically suggest the next best action!
