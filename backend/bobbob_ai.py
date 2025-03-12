from flask import Flask, request, jsonify
from google.cloud import texttospeech, speech
import openai  # Optional for more advanced responses

app = Flask(__name__)

# Set up Google Cloud Clients
tts_client = texttospeech.TextToSpeechClient()
stt_client = speech.SpeechClient()

# OpenAI API Key (Use GPT for smart responses)
OPENAI_API_KEY = "your_openai_api_key"
openai.api_key = OPENAI_API_KEY

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message', '')
    
    # Generate AI response (Using OpenAI GPT)
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "system", "content": "You are BoBBoT, a helpful AI assistant."},
                  {"role": "user", "content": user_input}]
    )
    
    bot_reply = response['choices'][0]['message']['content']
    
    return jsonify({"response": bot_reply})

@app.route('/speak', methods=['POST'])
def speak():
    """Convert text to speech"""
    text = request.json.get("text", "Hello, I am BoBBoT.")
    voice_params = texttospeech.VoiceSelectionParams(
        language_code="en-GB",
        ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL
    )
    audio_config = texttospeech.AudioConfig(audio_encoding=texttospeech.AudioEncoding.MP3)
    
    synthesis_input = texttospeech.SynthesisInput(text=text)
    response = tts_client.synthesize_speech(input=synthesis_input, voice=voice_params, audio_config=audio_config)

    return jsonify({"audio": response.audio_content.decode('latin1')})

@app.route('/listen', methods=['POST'])
def listen():
    """Convert speech to text"""
    audio_data = request.json.get("audio", None)
    if not audio_data:
        return jsonify({"error": "No audio provided"}), 400

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

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
