import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv(override=True)
api_key = os.getenv("GEMINI_API_KEY")

try:
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-2.0-flash")
    print("Testing gemini-2.0-flash generation...")
    response = model.generate_content("Say exactly 'HELLO WORLD'")
    print("SUCCESS!")
    print("Response:", response.text)
except Exception as e:
    print("FAILED!")
    import traceback
    traceback.print_exc()
