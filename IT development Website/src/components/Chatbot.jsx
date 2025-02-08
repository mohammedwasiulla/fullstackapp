import { useState, useEffect } from "react";
import axios from "axios";
import "../Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true); // State to control prompt visibility

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    setShowPrompt(false); // Hide prompt when chatbot is clicked
  };

  const handlePromptClick = () => {
    setIsOpen(true); // Open the chatbot when the user clicks the prompt
    setShowPrompt(false); // Hide prompt after clicking
  };

  // Close the chatbot when the user moves their mouse out
  const handleMouseOut = (e) => {
    const chatbotElement = document.querySelector('.chatbot-container');
    if (chatbotElement && !chatbotElement.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  };

  // Set up event listener for mouseout
  useEffect(() => {
    document.addEventListener('mouseout', handleMouseOut);

    // Cleanup event listener
    return () => {
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Try sending the message to the backend
      const response = await axios.post("http://localhost:5000/chat", { message: input });
      const botMessage = { sender: "bot", text: response.data.reply };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      // Handle the error
      console.error("Error fetching response:", error);
      alert("Failed to connect to the server. Please ensure the backend is running.");
    }

    setLoading(false);
  };

  return (
    <div className={`chatbot-container ${isOpen ? "open" : ""}`}>
      {/* Robot Face */}
      <div className="robot-head">
        <div className="robot-eyes">
          <div className="robot-eye"></div>
          <div className="robot-eye"></div>
        </div>
        <button className="toggle-btn" onClick={toggleChatbot}>
          🤖
        </button>
      </div>

      {/* Chatbot Prompt */}
      {showPrompt && (
        <div className="chatbot-prompt" onClick={handlePromptClick}>
          <p>Click here or the robot to ask any query about the website!</p>
        </div>
      )}

      {/* Chat Window (Mouth) */}
      {isOpen && (
        <div className="chatbot">
          <div className="chatbox">
            {messages.map((msg, index) => (
              <div key={index} className={msg.sender === "user" ? "user-msg" : "bot-msg"}>
                {msg.text}
              </div>
            ))}
            {loading && <div className="bot-msg">Typing...</div>}
          </div>

          {/* Input Panel (Control Panel) */}
          <div className="input-area">
            <input
              type="text"
              placeholder="Ask me something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
