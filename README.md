# RECOVER_LOGIC

An AI-powered nutrition recovery dashboard.

## Prerequisites
- Node.js (v18+)
- Python 3.11+
- Google Gemini API Key

## Setup & Running Locally

### 1. Environment Variables
Copy `.env.example` to `.env` in the root folder, or set them in your environment.
```bash
cp .env.example .env
```
Edit `.env` and add your `GEMINI_API_KEY`.

### 2. Backend (Flask)
The backend runs on port 5000 by default.

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### 3. Frontend (React + Vite)
The frontend uses Vite and TailwindCSS.

```bash
cd frontend
npm install
npm run dev
```
Open the local Vite URL (usually `http://localhost:5173`) in your browser.

## Deployment to Google Cloud Run

### Build and Deploy Backend
Ensure you have `gcloud` CLI installed and authenticated.

```bash
cd backend
gcloud run deploy recover-logic-backend \
  --source . \
  --port 8080 \
  --set-env-vars="GEMINI_API_KEY=your_key_here" \
  --allow-unauthenticated
```
Update `VITE_API_URL` in the frontend `.env` (or during frontend build) to point to your new Cloud Run URL.

### Frontend Deployment
You can deploy the frontend static files to any static hosting provider (Vercel, Netlify, Firebase Hosting, Cloud Storage, etc.).
```bash
cd frontend
npm run build
```
Deploy the `dist/` folder.
