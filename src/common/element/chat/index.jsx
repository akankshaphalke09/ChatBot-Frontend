// src/common/element/chat/index.jsx
import React, { useState } from "react";
import ChatInput from "./chatInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
function Chat() {
  const [messages, setMessages] = useState([]); // [{role: "user"|"assistant", content: string}]
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Please log in or sign up to use the chat.", {
      position: "top-right",
    });
    return;
  }
  const handleSend = async ({ message }) => {
    // 1. show user message in UI immediately
    const userMsg = { role: "user", content: message };
    setMessages((prev) => [...prev, userMsg]);

    setLoading(true);

    try {
      // 2. call your backend, which calls OpenRouter
      const res = await fetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`mb-2 flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`inline-block rounded-2xl px-3 py-2 text-sm ${
                m.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-xs text-gray-500 mt-2">Thinking...</div>
        )}
      </div>

      {/* Input at the bottom */}
      <ChatInput onSend={handleSend} disabled={loading} />
    </div>
  );
}

export default Chat;
