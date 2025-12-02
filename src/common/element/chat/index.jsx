// src/common/element/chat/index.jsx
import React, { useState } from "react";
import ChatInput from "./chatInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";

// src/common/element/chat/index.jsx
const API_BASE_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

function Chat() {
  const [messages, setMessages] = useState([]); // [{role: "user"|"assistant", content: string}]
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // Listen for clear chat event
  React.useEffect(() => {
    const handleClearChat = () => {
      setMessages([]);
    };

    window.addEventListener("clearChat", handleClearChat);

    return () => {
      window.removeEventListener("clearChat", handleClearChat);
    };
  }, []);

  const handleSend = async ({ message }) => {
    // Check token before sending
    if (!token) {
      toast.error("Please log in or sign up to use the chat.", {
        position: "top-right",
      });
      return;
    }

    // 1. show user message in UI immediately
    const userMsg = { role: "user", content: message };
    setMessages((prev) => [...prev, userMsg]);

    setLoading(true);

    try {
      // 2. call your backend, which calls OpenRouter
      const res = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      const botMsg = {
        role: "assistant",
        content: data.reply || "No reply",
      };

      // 3. show assistant reply in UI
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: err.message },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-400 mb-2">
                How can I help you today?
              </h2>
              <p className="text-gray-500 text-sm">
                Start a conversation by typing a message below
              </p>
            </div>
          </div>
        )}
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`mb-4 flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`inline-block rounded-2xl px-4 py-3 text-sm shadow-lg max-w-2xl ${
                m.role === "user"
                  ? "bg-gradient-to-r from-gray-700 to-gray-900 text-white"
                  : "bg-gray-800 text-gray-100 border border-gray-700"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
            <span>Thinking...</span>
          </div>
        )}
      </div>

      {/* Input at the bottom - ALWAYS visible */}
      <ChatInput onSend={handleSend} disabled={loading} />
    </div>
  );
}

export default Chat;
