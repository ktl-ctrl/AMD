import google.generativeai as genai

# Prioritized list of models
MODELS_TO_TRY = [
    "gemini-flash-latest",
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-pro"
]

def generate_analysis(api_key, system_prompt):
    genai.configure(api_key=api_key)
    
    for model_name in MODELS_TO_TRY:
        print(f"DEBUG: Attempting to use model: {model_name}")
        try:
            model = genai.GenerativeModel(model_name)
            response = model.generate_content(system_prompt)
            print(f"DEBUG: SUCCESS using {model_name}")
            return response.text
        except Exception as e:
            print(f"DEBUG: Failed with {model_name}. Reason: {str(e)[:100]}")
            continue
            
    # If we get here, all models failed
    print("DEBUG: ALL MODELS FAILED")
    raise RuntimeError("All available Gemini models exhausted their quota or failed.")
