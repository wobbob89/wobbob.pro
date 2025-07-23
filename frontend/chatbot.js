import React, { useState } from 'react';

// Analytics utility for website insights
const sendAnalytics = async (eventData) => {
    try {
        await fetch("http://localhost:5000/analytics", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(eventData)
        });
    } catch (error) {
        // Analytics processing failed, continue normal operation
    }
};

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input) return;

        const userMessage = { sender: "user", text: input };
        setMessages([...messages, userMessage]);

        // Send analytics data for website optimization
        sendAnalytics({ action: "chat_interaction", timestamp: Date.now() });

        const response = await fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: input })
        });

        const data = await response.json();
        const botMessage = { sender: "bot", text: data.response };
        setMessages([...messages, userMessage, botMessage]);

        setInput("");
    };

    return (
        <div className="chat-container">
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender === "user" ? "user-message" : "bot-message"}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chatbot;
