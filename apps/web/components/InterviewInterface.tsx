"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Mic, 
  Send, 
  User, 
  Bot, 
  Award, 
  ChevronRight, 
  Play, 
  StopCircle, 
  BarChart2,
  CheckCircle2,
  XCircle,
  Lightbulb
} from "lucide-react";
import { API_BASE_URL } from "../utils/api";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function InterviewInterface() {
  const searchParams = useSearchParams();
  const targetJob = searchParams.get("role") || "General Technical Role";
  
  const [messages, setMessages] = useState<any[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [report, setReport] = useState<any>(null);
  const [sessionStarted, setSessionStarted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const startInterview = async () => {
    setSessionStarted(true);
    setIsProcessing(true);
    try {
      const res = await fetch(`${API_BASE_URL}/interview/next-question`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ targetJob, previousQuestions: [] }),
      });
      const question = await res.text();
      setMessages([{ role: 'bot', content: question }]);
    } catch (err) {
      console.error("Failed to start interview:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim() || isProcessing) return;

    const userMessage = currentInput;
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setCurrentInput("");
    setIsProcessing(true);

    try {
      // 1. Evaluate current answer
      const lastBotQuestion = messages[messages.length - 1].content;
      const evalRes = await fetch(`${API_BASE_URL}/interview/evaluate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ targetJob, question: lastBotQuestion, answer: userMessage }),
      });
      const evaluation = await evalRes.json();
      
      // Store evaluation for the UI (optional: show inline or wait for end)
      
      // 2. Get next question
      const questionsAsked = messages.filter(m => m.role === 'bot').map(m => m.content);
      const nextRes = await fetch(`${API_BASE_URL}/interview/next-question`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ targetJob, previousQuestions: questionsAsked }),
      });
      const nextQuestion = await nextRes.text();
      
      setMessages(prev => [...prev, { role: 'bot', content: nextQuestion }]);
      
      if (questionsAsked.length >= 4) { // End session after 5 questions
        finishInterview(evaluation);
      }
    } catch (err) {
      console.error("Interview error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const finishInterview = (lastEval: any) => {
    setReport(lastEval);
  };

  if (!sessionStarted) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center space-y-8">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto border border-primary/20 animate-pulse">
          <Bot className="w-12 h-12 text-primary" />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-black font-outfit">Ready for your {targetJob} Interview?</h1>
          <p className="text-muted-foreground text-lg">Our AI recruiter will conduct a 5-question technical drill based on your profile and target role.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-left">
          <div className="glass p-6 rounded-3xl border border-white/5 space-y-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <div className="font-bold text-sm">Technical Accuracy</div>
            <p className="text-xs text-muted-foreground">AI evaluates your logic and depth.</p>
          </div>
          <div className="glass p-6 rounded-3xl border border-white/5 space-y-2">
            <BarChart2 className="w-5 h-5 text-blue-500" />
            <div className="font-bold text-sm">Growth Insights</div>
            <p className="text-xs text-muted-foreground">Receive a detailed performance score.</p>
          </div>
        </div>
        <button 
          onClick={startInterview}
          className="w-full py-5 bg-primary text-white rounded-[24px] font-black text-xl hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-primary/30 flex items-center justify-center gap-3"
        >
          <Play className="w-6 h-6" /> Start Simulation
        </button>
      </div>
    );
  }

  if (report) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 pb-32 animate-in zoom-in-95 duration-500">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black font-outfit">Recruiter Feedback</h1>
          <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold">Session Complete</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass p-8 rounded-[40px] border border-white/5 flex flex-col items-center justify-center space-y-4">
             <div className="text-xs font-black uppercase text-muted-foreground">Readiness Score</div>
             <div className="text-7xl font-black text-primary font-outfit">{report.score}/10</div>
             <div className="flex gap-1">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className={`w-2 h-6 rounded-full ${i < report.score ? 'bg-primary' : 'bg-white/10'}`} />
                ))}
             </div>
          </div>
          
          <div className="md:col-span-2 glass p-8 rounded-[40px] border border-white/5 space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Key Strengths
              </h2>
              <p className="text-muted-foreground italic leading-relaxed">{report.strengths}</p>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-500" /> Areas for Improvement
              </h2>
              <p className="text-muted-foreground italic leading-relaxed">{report.improvements}</p>
            </div>
          </div>
        </div>

        <div className="glass p-12 rounded-[48px] border border-primary/20 bg-primary/5 space-y-6">
           <h2 className="text-2xl font-black flex items-center gap-3">
             <Lightbulb className="w-8 h-8 text-amber-500" /> The Golden Standard
           </h2>
           <div className="bg-black/40 p-8 rounded-3xl border border-white/10 text-muted-foreground leading-relaxed">
             {report.idealAnswer}
           </div>
        </div>

        <div className="flex justify-center gap-4">
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl font-bold transition-all border border-white/10"
          >
            Try Again
          </button>
          <button 
            onClick={() => window.location.href = '/dashboard/career'}
            className="px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:scale-105 transition-all"
          >
            Back to Career Architect
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between py-6 px-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold text-white">AI Recruiter</div>
            <div className="text-[10px] text-emerald-500 uppercase font-black animate-pulse flex items-center gap-1">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active Session
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-muted-foreground">
           Context: {targetJob}
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-8 scrollbar-hide"
      >
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
            {msg.role === 'bot' && <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center mr-3 mt-1 flex-shrink-0"><Bot className="w-4 h-4 text-primary" /></div>}
            <div className={`max-w-[80%] p-6 rounded-[32px] ${msg.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'glass border-white/5 text-muted-foreground rounded-tl-none'} leading-relaxed shadow-xl`}>
               {msg.content}
            </div>
            {msg.role === 'user' && <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center ml-3 mt-1 flex-shrink-0"><User className="w-4 h-4 text-white" /></div>}
          </div>
        ))}
        {isProcessing && (
          <div className="flex justify-start">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center mr-3 mt-1 flex-shrink-0 animate-spin"><Bot className="w-4 h-4 text-primary" /></div>
            <div className="glass p-6 rounded-[32px] rounded-tl-none border-white/5 space-x-1 flex h-10 items-center">
              <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4 pt-8">
        <div className="relative glass p-4 rounded-[40px] border-primary/20 bg-black/40 backdrop-blur-2xl shadow-2xl flex items-center gap-4">
          <button type="button" className="p-4 rounded-3xl bg-white/5 hover:bg-white/10 text-muted-foreground transition-all">
            <Mic className="w-6 h-6" />
          </button>
          <input 
            type="text" 
            placeholder="Type your answer..."
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            disabled={isProcessing}
            className="flex-1 bg-transparent border-none outline-none text-lg text-white placeholder:text-muted-foreground/50"
          />
          <button 
            type="submit"
            disabled={!currentInput.trim() || isProcessing}
            className="p-5 bg-primary text-white rounded-3xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 shadow-lg shadow-primary/20"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </form>
    </div>
  );
}
