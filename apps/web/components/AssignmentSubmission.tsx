"use client";

import { useState } from "react";
import { Send, Loader2, Trophy, AlertCircle, CheckCircle, Sparkles, BrainCircuit } from "lucide-react";
import { API_BASE_URL } from "../utils/api";
import { GlassCard, PremiumButton, BadgePill } from "./PremiumUI";

interface AssignmentSubmissionProps {
  lessonId: string;
}

export default function AssignmentSubmission({ lessonId }: AssignmentSubmissionProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/submissions/${lessonId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      setFeedback(data.data.feedback);
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 animate-reveal">
      <GlassCard variant="dark" className="p-10 border-white/5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30">
                 <BrainCircuit className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-black font-outfit text-white uppercase tracking-tight">Intelligence Milestone</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-60">Strategic Performance Review</p>
              </div>
           </div>
           <BadgePill className="bg-accent/10 text-accent border-accent/20">Critical Output</BadgePill>
        </div>
        
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed font-medium">
          Submit your technical or strategic work for this module. Our AI Specialist will conduct a deep-tissue evaluation of your understanding and architectural alignment.
        </p>
        
        <div className="relative group mb-8">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Structure your intelligence output here..."
            className="w-full min-h-[250px] bg-white/[0.03] border border-white/5 rounded-3xl p-8 text-white placeholder:text-muted-foreground/30 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all resize-none font-medium leading-relaxed custom-scrollbar"
          />
          <div className="absolute bottom-6 right-8 text-[10px] font-black text-white/20 uppercase tracking-widest group-focus-within:text-primary/40">
             Draft State
          </div>
        </div>
        
        <PremiumButton
          onClick={handleSubmit}
          disabled={isSubmitting || !content.trim()}
          size="lg"
          className="w-full h-16 group"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Conducting Intelligence Sync...
            </>
          ) : (
            <>Transmit for AI Evaluation <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" /></>
          )}
        </PremiumButton>
      </GlassCard>

      {feedback && (
        <div className="space-y-6 animate-reveal" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-4 px-2">
             <Trophy className="w-6 h-6 text-accent" />
             <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white">Evaluation Matrix</h4>
             <div className="h-[1px] flex-grow bg-white/5" />
          </div>

          <GlassCard className="p-10 border-primary/30 bg-primary/[0.02] shadow-[0_32px_128px_-32px_rgba(var(--primary),0.2)]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
              <div className="space-y-2 text-center md:text-left">
                <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Mastery Score</div>
                <div className="text-7xl font-black font-outfit tracking-tighter text-white">
                  {feedback.score}<span className="text-xl text-primary/40 font-bold ml-1">/100</span>
                </div>
              </div>

              <div className="max-w-md p-6 rounded-2xl bg-white/[0.03] border border-white/5 italic text-[13px] font-medium text-muted-foreground leading-relaxed relative">
                <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-accent opacity-40" />
                "{feedback.summary}"
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10 pt-10 border-t border-white/5">
              <div className="space-y-5">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
                  Intellectual Strengths
                </div>
                <div className="space-y-3">
                  {feedback.strengths.map((s: string, i: number) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 group hover:border-emerald-500/30 transition-colors">
                       <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                       <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-5">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.5)]" />
                   Optimization Vectors
                </div>
                <div className="space-y-3">
                  {feedback.improvements.map((imp: string, i: number) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 group hover:border-amber-500/30 transition-colors">
                       <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                       <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">{imp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 pt-10 border-t border-white/5 flex flex-col items-center">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-40 mb-3">AI Verdict</div>
              <div className="px-10 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-white shadow-xl">
                 Status: <span className="text-primary">{feedback.verdict}</span>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
