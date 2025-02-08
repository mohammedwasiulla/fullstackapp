const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// CORS configuration to allow requests from any origin (for local development)
app.use(cors({
  origin: "*",  // Allow requests from any origin during local development
  methods: "GET,POST",  // Allow only GET and POST methods
}));

app.use(express.json());

// Predefined chatbot responses
const chatbotScript = {
  "hi": "Hello! How can I assist you?",
  "hello": "Hi! How can I help today?",
  "how are you": "I'm good, thanks for asking! 😊",
  "what is your name": "I’m ChatBot, here to assist you!",
  
  // Home Details
  "home": "Welcome! How can I help you today with our services?",
  
  // About Details
  "about": "Quick Dev Web, based in Frazer Town, Bangalore. We offer web solutions.",
  
  // Services
  "services": "We provide web dev, UI/UX design, and mobile apps. Want more info?",
  
  // Contact Location
  "contact location": "We’re located in Frazer Town, Bangalore.",
  
  "bye": "Goodbye! Have a great day! 👋",
  
  // Default response when the user asks something outside predefined questions
  "default": "I'm currently scripted to answer only a few questions. You can ask me about:\n1. Home\n2. About\n3. Services\n4. Contact Location.\nFeel free to ask any of these!"
};

// Chatbot API endpoint
app.post("/chat", (req, res) => {
  const userMessage = req.body.message.toLowerCase();
  console.log("Received message:", userMessage);  // Log the incoming message
  const response = chatbotScript[userMessage] || chatbotScript["default"];
  console.log("Sending response:", response);  // Log the response being sent
  res.json({ reply: response });
});

// Start server
app.listen(PORT, () => {
  console.log(`Chatbot API is running on http://localhost:${PORT}`);
});
