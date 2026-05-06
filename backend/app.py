import os
import json
import re
import traceback
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

from ai_service import generate_analysis

# Load environment variables
load_dotenv(override=True)
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY not set")

app = Flask(
    __name__,
    static_folder='static',
    static_url_path='/'
)
# Allow all origins
CORS(app)

FALLBACK_RESPONSE = {
    "protein": 0, "carbs": 0, "fats": 0,
    "energy": 0, "hydration": 0,
    "recovery_score": "C",
    "summary": "Unable to analyze. Please try again.",
    "recommendations": ["Drink water", "Eat a balanced meal", "Rest well"],
    "meal_suggestion": "Dal chawal with salad",
    "optimal_window": 60
}

def clean_json_response(raw_text):
    text = raw_text.strip()
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?\s*", "", text)
        text = re.sub(r"\s*```$", "", text)
    return text.strip()

@app.route('/', methods=['GET'])
def index():
    return jsonify({"status": "RECOVER_LOGIC backend running", "message": "Welcome to RECOVER_LOGIC AI"})

@app.route('/api/analyze', methods=['POST'])
def analyze():
    print("DEBUG: Request received at /api/analyze")
    try:
        data = request.get_json(silent=True) or {}
        meals = data.get('meals', '')
        mood = data.get('mood', '')
        availability = data.get('availability', '')

        print(f"DEBUG: Request payload: {data}")

        system_prompt = (
            "You are a nutrition expert AI. Analyze this person's day:\n"
            f"Meals eaten: {meals}\n"
            f"Mood: {mood}\n"
            f"Food availability: {availability}\n\n"
            "Return ONLY a raw JSON object. No markdown. No code fences. No explanation.\n"
            "Exact format:\n"
            "{\n"
            "  'protein': <0-100 integer, percentage of daily goal>,\n"
            "  'carbs': <0-100 integer>,\n"
            "  'fats': <0-100 integer>,\n"
            "  'energy': <0-100 integer>,\n"
            "  'hydration': <0-100 integer>,\n"
            "  'recovery_score': <one of: 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C'>,\n"
            "  'summary': <2 sentence analysis>,\n"
            "  'recommendations': [<3 specific actionable strings>],\n"
            "  'meal_suggestion': <one specific affordable meal suggestion>,\n"
            "  'optimal_window': <integer minutes until next meal>\n"
            "}"
        )
        
        raw = generate_analysis(api_key, system_prompt)
        print(f"DEBUG: Gemini raw response: {raw}")
        
        cleaned_text = clean_json_response(raw)
        parsed_json = json.loads(cleaned_text)
        print("DEBUG: Parsed successfully")
        
        # Merge with fallback to ensure all keys exist
        final_response = FALLBACK_RESPONSE.copy()
        final_response.update(parsed_json)
        
        return jsonify(final_response)
        
    except Exception as e:
        print("DEBUG: Error occurred during execution")
        traceback.print_exc()
        # Never return 500 - always return JSON
        return jsonify(FALLBACK_RESPONSE)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    """Serve the React frontend for all non-API routes."""
    import os
    static_folder = app.static_folder
    if path and os.path.exists(os.path.join(static_folder, path)):
        return app.send_static_file(path)
    return app.send_static_file('index.html')

if __name__ == '__main__':
    print("DEBUG: API Key loaded: YES")
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
