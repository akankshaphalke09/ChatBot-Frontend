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
      className="w-full border-t border-border bg-background/80 backdrop-blur px-3 py-2"
    >
      <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border bg-muted/40 px-3 py-2">
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
            className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground max-h-40 overflow-y-auto py-1"
          />
        </div>

        {/* SEND BUTTON */}
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition"
        >
          {/* simple text icon; change to anything you like */}
          <span className="text-xs font-semibold">
            <IoIosSend size={20} color="white" />
          </span>
        </button>
      </div>
    </form>
  );
}

export default ChatInput;
