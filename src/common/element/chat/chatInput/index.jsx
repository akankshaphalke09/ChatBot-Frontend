// chatInput/index.js

import React, { useState, useRef } from "react";
import { IoIosSend } from "react-icons/io";
function ChatInput({ onSend, disabled = false }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim() || disabled) return;

    // just send the message text
    onSend?.({
      message: value.trim(),
    });

    setValue("");
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    // Enter to send, Shift+Enter for newline
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-gray-900 px-4 py-4"
    >
      <div className="mx-auto flex max-w-4xl items-end gap-3 rounded-2xl border border-gray-700 bg-gray-800/50 px-4 py-3 shadow-xl">
        {/* TEXT AREA */}
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            disabled={disabled}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="How can I help you today?"
            className="w-full resize-none bg-transparent text-sm text-white outline-none placeholder:text-gray-400 max-h-40 overflow-y-auto py-1"
          />
        </div>

        {/* SEND BUTTON */}
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-gray-600 to-gray-700 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:from-gray-500 hover:to-gray-600 transition-all duration-300 shadow-lg border border-gray-500"
        >
          <span className="text-xs font-semibold">
            <IoIosSend size={22} color="white" />
          </span>
        </button>
      </div>
    </form>
  );
}

export default ChatInput;
