"use client";

import { useState, useEffect } from "react";
import { API_BASE_URL } from "../utils/api";
import { Sparkles, Loader2, Calendar, Target, ChevronRight, BookOpen } from "lucide-react";

export default function StudyPlanDashboard() {
  const [goals, setGoals] = useState("");
  const [background, setBackground] = useState("");
  const [timeCommitment, setTimeCommitment] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [studyPlan, setStudyPlan] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPlan();
  }, []);

  const fetchPlan = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/study-plans/my-plan`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (data) setStudyPlan(data);
    } catch (err) {
      console.error("Failed to fetch plan:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const generatePlan = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch(`${API_BASE_URL}/study-plans/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ goals, background, timeCommitment }),
      });
      const data = await res.json();
      setStudyPlan(data);
    } catch (err) {
      console.error("Generation error:", err);
      alert("Failed to generate study plan.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-outfit font-black mb-2 flex items-center gap-3">
            <Sparkles className="text-primary w-8 h-8" />
            AI Study Plan
          </h1>
          <p className="text-muted-foreground">Tailor your learning journey to your specific career goals.</p>
        </div>
        
        {studyPlan && (
          <button 
            onClick={() => setStudyPlan(null)}
            className="px-6 py-2 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-sm font-bold"
          >
            Regenerate Plan
          </button>
        )}
      </div>

      {!studyPlan ? (
        <div className="glass p-12 rounded-[40px] border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32"></div>
          
          <div className="max-w-2xl space-y-8 relative">
            <div className="space-y-4">
              <label className="text-sm font-bold uppercase tracking-widest text-primary">What are your learning goals?</label>
              <textarea 
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                placeholder="e.g., I want to become a Senior AI Engineer specializing in RAG systems and LLM orchestration..."
                className="w-full h-32 bg-white/5 border border-white/10 rounded-3xl p-6 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-sm font-bold uppercase tracking-widest text-primary">Technical Background</label>
                <input 
                  type="text"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  placeholder="e.g., 3 years JS/TS, basic Python"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold uppercase tracking-widest text-primary">Time Commitment</label>
                <input 
                  type="text"
                  value={timeCommitment}
                  onChange={(e) => setTimeCommitment(e.target.value)}
                  placeholder="e.g., 10 hours per week"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            <button 
              onClick={generatePlan}
              disabled={isGenerating || !goals || !background || !timeCommitment}
              className="w-full bg-primary text-white py-5 rounded-2xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Analyzing & Optimizing Path...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate My Personalized Plan
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="lg:col-span-1 space-y-8">
            <div className="glass p-8 rounded-3xl border border-primary/20 bg-primary/5">
              <Target className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Core Objective</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{studyPlan.learningGoal}</p>
            </div>
            
            <div className="glass p-8 rounded-3xl border border-white/10">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Strategic Roadmap
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{studyPlan.roadmap}</p>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold mb-8">Your Curriculum Modules</h2>
            {studyPlan.modules.map((module: any, idx: number) => (
              <div key={idx} className="glass p-8 rounded-3xl border border-white/10 flex items-start gap-6 group hover:border-primary/30 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center font-black text-primary border border-white/10 group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-grow space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-bold">{module.title}</h4>
                    <span className="text-[10px] font-black uppercase tracking-widest py-1 px-3 rounded-full bg-white/5 border border-white/10">{module.duration}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{module.description}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {module.topics.map((topic: string, tIdx: number) => (
                      <span key={tIdx} className="text-[10px] font-bold bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-lg">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
