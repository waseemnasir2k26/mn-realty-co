"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  generateResponse,
  getInitialMessage,
  type ChatMessage,
} from "@/lib/chatbot";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleOpen = () => {
    if (!isOpen) {
      if (messages.length === 0) {
        setMessages([getInitialMessage()]);
      }
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleSend = useCallback(
    (text?: string) => {
      const messageText = text || inputValue.trim();
      if (!messageText || isTyping) return;

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: messageText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");
      setIsTyping(true);

      const delay = Math.floor(Math.random() * 700) + 800;

      setTimeout(() => {
        const response = generateResponse(messageText);
        const assistantMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: response.content,
          timestamp: new Date(),
          quickReplies: response.quickReplies,
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsTyping(false);
      }, delay);
    },
    [inputValue, isTyping]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickReply = (reply: string) => {
    handleSend(reply);
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gold shadow-lg hover:bg-gold-dark transition flex items-center justify-center cursor-pointer"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-8rem)] rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col bg-white"
          >
            {/* Header */}
            <div className="bg-navy p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center">
                  <span className="text-white font-semibold text-xs">MN</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    MN Realty Assistant
                  </p>
                  <p className="text-green-400 text-xs">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition cursor-pointer"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg) => (
                <div key={msg.id}>
                  {msg.role === "assistant" ? (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center shrink-0">
                        <span className="text-white text-xs">MN</span>
                      </div>
                      <div>
                        <div className="bg-white rounded-2xl rounded-tl-none p-3 shadow-sm border border-gray-100 text-sm text-charcoal max-w-[85%] whitespace-pre-line">
                          {msg.content}
                        </div>
                        {msg.quickReplies && msg.quickReplies.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {msg.quickReplies.map((reply) => (
                              <button
                                key={reply}
                                onClick={() => handleQuickReply(reply)}
                                disabled={isTyping}
                                className="bg-white border border-gold text-gold text-xs px-3 py-1.5 rounded-full hover:bg-gold hover:text-white transition cursor-pointer disabled:opacity-50"
                              >
                                {reply}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end">
                      <div className="bg-gold text-white rounded-2xl rounded-tr-none p-3 text-sm max-w-[85%] whitespace-pre-line">
                        {msg.content}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center shrink-0">
                    <span className="text-white text-xs">MN</span>
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none p-3 shadow-sm border border-gray-100 flex items-center gap-1">
                    <span className="w-2 h-2 bg-charcoal-light rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 bg-charcoal-light rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 bg-charcoal-light rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="border-t border-gray-100 p-3 flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                disabled={isTyping}
                className="flex-1 bg-gray-50 rounded-lg px-4 py-2.5 text-sm outline-none focus:bg-white focus:ring-1 focus:ring-gold/30 border border-gray-200 disabled:opacity-50"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || isTyping}
                className="w-10 h-10 rounded-lg bg-gold text-white flex items-center justify-center hover:bg-gold-dark transition disabled:opacity-50 cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
