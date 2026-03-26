"use client";

import { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import { 
  Play, 
  RotateCcw, 
  Sparkles, 
  Terminal as TerminalIcon, 
  CheckCircle2, 
  AlertTriangle,
  Zap,
  Code2,
  Cpu,
  ShieldCheck,
  Maximize2,
  Target
} from "lucide-react";
import { API_BASE_URL } from "../utils/api";

export default function CodingLab({ 
  initialCode = "// Start coding here...", 
  language = "javascript",
  task = "Implement a function that reverse a string."
}: { 
  initialCode?: string, 
  language?: string,
  task?: string 
}) {
  const [code, setCode] = useState(initialCode);
  const [isReviewing, setIsReviewing] = useState(false);
  const [review, setReview] = useState<any>(null);
  const [output, setOutput] = useState<string[]>([]);
  
  const handleReview = async () => {
    setIsReviewing(true);
    setReview(null);
    try {
      const res = await fetch(`${API_BASE_URL}/lab/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ code, language, task }),
      });
      const data = await res.json();
      setReview(data);
    } catch (err) {
      console.error("Failed to get AI review:", err);
    } finally {
      setIsReviewing(false);
    }
  };

  const runCode = () => {
    setOutput(["[System] Initializing Environment...", "[Info] Running Code..."]);
    // Simple mock execution for now
    setTimeout(() => {
      setOutput(prev => [...prev, "[Success] Execution completed.", "> Result: Output streamed successfully."]);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-6">
      {/* Lab Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest">
            <Cpu className="w-3 h-3" />
            AI Sandbox Environment
          </div>
          <h1 className="text-2xl font-black font-outfit flex items-center gap-3">
             <Code2 className="w-8 h-8" />
             Interactive Coding Lab
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCode(initialCode)}
            className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-muted-foreground transition-all"
            title="Reset Code"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <button 
            onClick={runCode}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-2xl font-bold transition-all border border-white/10"
          >
            <Play className="w-4 h-4 fill-current" />
            Run
          </button>
          <button 
            onClick={handleReview}
            disabled={isReviewing}
            className="flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            {isReviewing ? <Zap className="w-5 h-5 animate-pulse" /> : <Sparkles className="w-5 h-5" />}
            {isReviewing ? "Analyzing..." : "AI Review"}
          </button>
        </div>
      </div>

      <div className="flex-1 grid lg:grid-cols-5 gap-8 overflow-hidden pb-8">
        {/* Editor Pane */}
        <div className="lg:col-span-3 flex flex-col glass rounded-[40px] border border-white/5 overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-8 py-4 bg-white/5 border-b border-white/5">
             <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                {language === 'javascript' ? 'main.js' : 'source_file'}
             </div>
             <Maximize2 className="w-4 h-4 text-muted-foreground hover:text-white cursor-pointer transition-colors" />
          </div>
          <div className="flex-1 p-2 bg-[#1e1e1e]">
            <Editor
              height="100%"
              theme="vs-dark"
              language={language}
              value={code}
              onChange={(v) => setCode(v || "")}
              options={{
                fontSize: 14,
                fontFamily: 'JetBrains Mono, Fira Code, monospace',
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                cursorBlinking: 'smooth',
                padding: { top: 20 },
              }}
            />
          </div>
        </div>

        {/* Intelligence Pane */}
        <div className="lg:col-span-2 flex flex-col gap-6 overflow-hidden">
          {/* Task Description */}
          <div className="glass p-8 rounded-[40px] border border-white/5 space-y-4">
             <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                <Target className="w-3 h-3 text-primary" />
                Active Objective
             </div>
             <p className="text-white font-bold leading-relaxed">{task}</p>
          </div>

          {/* AI Review Output */}
          <div className="flex-1 glass rounded-[40px] border border-white/5 overflow-hidden flex flex-col">
            <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
               <h3 className="font-bold flex items-center gap-2">
                 <ShieldCheck className="w-5 h-5 text-primary" />
                 AI Mentor Feedback
               </h3>
               {review && (
                 <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${review.status === 'pass' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                   {review.status}
                 </div>
               )}
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
              {!review && !isReviewing && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  <Sparkles className="w-12 h-12 text-primary" />
                  <p className="text-xs font-bold max-w-[200px]">Click "AI Review" for deep code analysis and performance tips.</p>
                </div>
              )}

              {isReviewing && (
                 <div className="space-y-4">
                    <div className="h-4 w-full bg-white/5 rounded-full animate-pulse" />
                    <div className="h-4 w-3/4 bg-white/5 rounded-full animate-pulse" />
                    <div className="h-4 w-5/6 bg-white/5 rounded-full animate-pulse" />
                 </div>
              )}

              {review && (
                <>
                  <p className="text-sm text-muted-foreground leading-relaxed">{review.review}</p>
                  
                  <div className="space-y-4">
                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Suggestions</div>
                    {review.suggestions?.map((s: string, i: number) => (
                      <div key={i} className="flex gap-3 text-xs leading-relaxed text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        {s}
                      </div>
                    ))}
                  </div>

                  {review.securityAlerts && review.securityAlerts.length > 0 && (
                    <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-red-500">
                        <AlertTriangle className="w-4 h-4" />
                        Security Vulnerabilities
                      </div>
                      <p className="text-[10px] text-red-400">{review.securityAlerts}</p>
                    </div>
                  )}

                  {review.optimizedSnippet && (
                    <div className="space-y-3">
                       <div className="text-[10px] font-black uppercase tracking-widest text-primary">Pro Optimization</div>
                       <div className="bg-black/40 p-4 rounded-2xl border border-primary/20 font-mono text-[10px] text-emerald-400">
                          {review.optimizedSnippet}
                       </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Console / Output */}
          <div className="h-40 glass rounded-[40px] border border-white/5 overflow-hidden flex flex-col bg-black/40">
             <div className="px-6 py-2 border-b border-white/5 flex items-center justify-between text-[10px] font-bold text-muted-foreground">
                <div className="flex items-center gap-2">
                  <TerminalIcon className="w-3 h-3" />
                  Console Output
                </div>
             </div>
             <div className="flex-1 p-4 font-mono text-[10px] overflow-y-auto space-y-1">
                {output.map((line, i) => (
                  <div key={i} className={line.startsWith('[Error]') ? 'text-red-500' : line.startsWith('[Success]') ? 'text-emerald-500' : 'text-muted-foreground'}>
                    {line}
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
