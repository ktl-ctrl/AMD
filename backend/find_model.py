import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv(override=True)
api_key = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=api_key)

print("Finding a working model...")
working_model = None

models_to_try = [
    "gemini-2.0-flash-lite-preview-02-05",
    "gemini-2.0-flash-lite",
    "gemini-flash-latest",
    "gemini-pro-latest",
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-pro"
]

for m in models_to_try:
    print(f"Testing {m}...")
    try:
        model = genai.GenerativeModel(m)
        response = model.generate_content("Say exactly 'HELLO'")
        print(f"SUCCESS with {m}! Response: {response.text}")
        working_model = m
        break
    except Exception as e:
        print(f"FAILED {m}: {str(e)[:100]}...")

if working_model:
    print(f"\nWINNER: {working_model}")
else:
    print("\nALL MODELS FAILED QUOTA/ACCESS.")
