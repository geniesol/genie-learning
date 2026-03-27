"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X, Bot, User, Sparkles, Loader2, MessageCircle } from "lucide-react";
import { getAiServiceUrl } from "@/utils/api";

interface Message {
  role: "ai" | "user";
  content: string;
}

interface AITutorProps {
  courseTitle: string;
  context?: string;
}

export function AITutor({ courseTitle, context }: AITutorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: `Hi! I'm your Genie AI Tutor for **${courseTitle}**. How can I help you master this course today?` }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(`${getAiServiceUrl()}/tutor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: userMessage,
          context: context || `Course: ${courseTitle}`,
        }),
      });

      if (!response.ok) throw new Error("AI Service unavailable");
      
      const data = await response.json();
      setMessages(prev => [...prev, { role: "ai", content: data.answer || data.message || "I'm having trouble processing that. Can you rephrase?" }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "ai", content: "Sorry, I'm offline right now. Please check your connection." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 rounded-3xl bg-primary text-white shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center z-50 group border border-white/20"
        >
          <div className="absolute inset-0 rounded-3xl bg-primary animate-ping opacity-20 group-hover:opacity-40" />
          <MessageCircle className="w-8 h-8 relative z-10" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 w-[400px] h-[600px] bg-[#0a0a0b]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_32px_128px_-32px_rgba(0,0,0,0.8)] flex flex-col z-50 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-500">
          {/* Header */}
          <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary/20 border border-primary/20 flex items-center justify-center">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-outfit font-black text-sm tracking-tight">Genie AI Tutor</h4>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground opacity-60">Ready to Help</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-xl hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 no-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-3xl p-4 text-sm leading-relaxed ${
                  m.role === "user" 
                    ? "bg-primary text-white rounded-tr-none shadow-lg" 
                    : "bg-white/5 border border-white/10 text-white/90 rounded-tl-none"
                }`}>
                  {m.role === "ai" && <div className="flex items-center gap-2 mb-2 opacity-60 text-[10px] font-black uppercase tracking-widest">
                    <Sparkles className="w-3 h-3 text-primary" /> AI Insights
                  </div>}
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 rounded-3xl rounded-tl-none p-4 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span className="text-xs text-muted-foreground">Genie is thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-6 border-t border-white/5 bg-white/5">
            <div className="relative group">
              <input
                type="text"
                placeholder="Ask anything about the course..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="w-full bg-[#0a0a0b] border border-white/10 rounded-2xl py-4 pl-4 pr-12 text-sm focus:outline-none focus:border-primary/50 transition-all focus:ring-1 focus:ring-primary/20"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
