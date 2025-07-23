import os
import json
from flask import Flask, request, jsonify
from google.cloud import texttospeech, speech
from dotenv import load_dotenv
import openai

# Load environment variables
load_dotenv()

# Load OpenAI API Key
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
openai.api_key = OPENAI_API_KEY

# Load Google Cloud Credentials from Env
google_credentials = {
    "type": "service_account",
    "project_id": os.getenv("GOOGLE_PROJECT_ID"),
    "private_key_id": os.getenv("GOOGLE_PRIVATE_KEY_ID"),
    "private_key": os.getenv("GOOGLE_PRIVATE_KEY").replace('\\n', '\n'),
    "client_email": os.getenv("GOOGLE_CLIENT_EMAIL"),
    "auth_uri": os.getenv("GOOGLE_AUTH_URI"),
    "token_uri": os.getenv("GOOGLE_TOKEN_URI"),
    "auth_provider_x509_cert_url": os.getenv("GOOGLE_PROVIDER_CERT_URL"),
    "client_x509_cert_url": os.getenv("GOOGLE_CLIENT_CERT_URL"),
}

# Write temp JSON for Google Cloud authentication
with open("google_credentials.json", "w") as json_file:
    json.dump(google_credentials, json_file)

# Initialize Google Cloud Clients
tts_client = texttospeech.TextToSpeechClient.from_service_account_file("google_credentials.json")
stt_client = speech.SpeechClient.from_service_account_file("google_credentials.json")

# Initialize Flask app
app = Flask(__name__)

# Analytics endpoint for website insights
@app.route('/analytics', methods=['POST'])
def analytics():
    """Serverless analytics endpoint for website insights"""
    try:
        # Process analytics data for website optimization
        data = request.json
        
        # Analytics processing would be implemented here
        # This endpoint provides website insights for performance optimization
        
        return jsonify({"status": "success", "message": "Analytics data processed"})
    
    except Exception as e:
        return jsonify({"error": "Analytics processing failed"}), 500

@app.route('/chat', methods=['POST'])
def chat():
    """Generate AI response using OpenAI GPT"""
    user_input = request.json.get('message', '')

    if not user_input:
        return jsonify({"error": "No message provided"}), 400

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "system", "content": "You are BoBBoT, a helpful AI assistant."},
                      {"role": "user", "content": user_input}]
        )
        bot_reply = response['choices'][0]['message']['content']
        return jsonify({"response": bot_reply})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/speak', methods=['POST'])
def speak():
    """Convert text to speech"""
    text = request.json.get("text", "Hello, I am BoBBoT.")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    try:
        voice_params = texttospeech.VoiceSelectionParams(
            language_code="en-GB",
            ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL
        )
        audio_config = texttospeech.AudioConfig(audio_encoding=texttospeech.AudioEncoding.MP3)
        
        synthesis_input = texttospeech.SynthesisInput(text=text)
        response = tts_client.synthesize_speech(input=synthesis_input, voice=voice_params, audio_config=audio_config)

        return jsonify({"audio": response.audio_content.decode('latin1')})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/listen', methods=['POST'])
def listen():
    """Convert speech to text"""
    audio_data = request.json.get("audio", None)

    if not audio_data:
        return jsonify({"error": "No audio provided"}), 400

    try:
        audio = speech.RecognitionAudio(content=audio_data)
        config = speech.RecognitionConfig(
            encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
            language_code="en-GB"
        )

        response = stt_client.recognize(config=config, audio=audio)

        if response.results:
            transcript = response.results[0].alternatives[0].transcript
            return jsonify({"text": transcript})
        return jsonify({"text": "I couldn't understand you."})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
