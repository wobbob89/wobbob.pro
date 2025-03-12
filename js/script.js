// WoBBoB Website Scripts

// Toggle Gallery Visibility
document.addEventListener("DOMContentLoaded", function() {
    const galleryButton = document.getElementById("openGallery");
    const galleryContainer = document.getElementById("galleryContainer");
    
    if (galleryButton && galleryContainer) {
        galleryButton.addEventListener("click", function() {
            galleryContainer.style.display = galleryContainer.style.display === "none" ? "block" : "none";
        });
    }
});

// Chatbot Integration
document.addEventListener("DOMContentLoaded", function() {
    const chatbotContainer = document.createElement("div");
    chatbotContainer.id = "chatbot-container";
    chatbotContainer.style.position = "fixed";
    chatbotContainer.style.bottom = "20px";
    chatbotContainer.style.right = "20px";
    chatbotContainer.style.width = "300px";
    chatbotContainer.style.height = "400px";
    chatbotContainer.style.background = "#1f1f1f";
    chatbotContainer.style.color = "white";
    chatbotContainer.style.padding = "10px";
    chatbotContainer.style.borderRadius = "10px";
    chatbotContainer.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
    chatbotContainer.innerHTML = "<h3>BoBBoT Chat</h3><p>Ask me anything!</p><input type='text' id='chat-input' placeholder='Type here...'><button onclick='sendMessage()'>Send</button><div id='chat-output'></div>";
    document.body.appendChild(chatbotContainer);
});

function sendMessage() {
    const inputField = document.getElementById("chat-input");
    const outputField = document.getElementById("chat-output");
    const userMessage = inputField.value;
    
    if (userMessage.trim() !== "") {
        const botResponse = "You said: " + userMessage; // Placeholder for real AI integration
        outputField.innerHTML += "<p><strong>You:</strong> " + userMessage + "</p>";
        outputField.innerHTML += "<p><strong>BoBBoT:</strong> " + botResponse + "</p>";
        inputField.value = "";
    }
}
