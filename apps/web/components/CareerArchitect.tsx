"use client";

import { useState } from "react";
import { 
  Rocket, 
  Target, 
  TrendingUp, 
  Map, 
  FileText, 
  ChevronRight, 
  Sparkles,
  Search,
  DollarSign,
  AlertCircle
} from "lucide-react";
import { API_BASE_URL } from "../utils/api";

export default function CareerArchitect() {
  const [targetJob, setTargetJob] = useState("");
  const [report, setReport] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingResume, setIsGeneratingResume] = useState(false);
  const [resume, setResume] = useState<string | null>(null);

  const fetchCareerPath = async () => {
    if (!targetJob.trim()) return;
    setIsLoading(true);
    setResume(null);
    try {
      const res = await fetch(`${API_BASE_URL}/career/path`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ targetJob }),
      });
      const data = await res.json();
      setReport(data);
    } catch (err) {
      console.error("Failed to fetch career path:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const generateResume = async () => {
    setIsGeneratingResume(true);
    try {
      const res = await fetch(`${API_BASE_URL}/career/resume`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.text();
      setResume(data);
    } catch (err) {
      console.error("Failed to generate resume:", err);
    } finally {
      setIsGeneratingResume(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center space-y-6 text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <div className="space-y-2">
          <h2 className="text-2xl font-black font-outfit">Consulting AI Career Architect...</h2>
          <p className="text-muted-foreground animate-pulse">Mapping global market trends to your personal skill profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-32">
      {/* Search Header */}
      <div className="space-y-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest">
          <Sparkles className="w-3 h-3" />
          AI Opportunity Mapping
        </div>
        <h1 className="text-5xl font-black font-outfit leading-tight">Where do you want to be <span className="text-primary italic">next?</span></h1>
        
        <div className="max-w-2xl mx-auto relative group pt-4">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="e.g. Senior AI Engineer, Product Manager, Data Scientist..."
            className="w-full bg-white/5 border border-white/10 rounded-[32px] py-6 pl-16 pr-8 text-xl focus:ring-4 focus:ring-primary/20 outline-none transition-all shadow-2xl"
            value={targetJob}
            onChange={(e) => setTargetJob(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchCareerPath()}
          />
          <button 
            onClick={fetchCareerPath}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary text-white px-8 py-3 rounded-2xl font-bold hover:scale-105 transition-all shadow-lg active:scale-95"
          >
            Architect Path
          </button>
        </div>
      </div>

      {report && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Gap Analysis */}
            <div className="glass p-8 rounded-[40px] border border-white/5 space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-3">
                <Target className="w-6 h-6 text-primary" />
                Skill Gap Analysis
              </h2>
              <div className="space-y-4">
                {report.gapAnalysis?.map((skill: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
                    <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Market & Salary */}
            <div className="space-y-8">
              <div className="glass p-8 rounded-[40px] border border-white/5 space-y-4">
                <div className="flex items-center gap-3 text-emerald-500">
                  <DollarSign className="w-6 h-6" />
                  <span className="font-bold uppercase tracking-widest text-xs">Salary Insights</span>
                </div>
                <div className="text-3xl font-black">{report.salaryInsights}</div>
                <p className="text-xs text-muted-foreground leading-relaxed italic">{report.marketDemand}</p>
              </div>

              <div className="glass p-8 rounded-[40px] border border-white/5 space-y-6">
                 <h2 className="text-xl font-bold">Resume Boost</h2>
                 <p className="text-sm text-muted-foreground">Transform your platform achievements into a professional persona.</p>
                 <button 
                   onClick={generateResume}
                   disabled={isGeneratingResume}
                   className="w-full py-4 rounded-2xl border border-primary/30 text-primary font-bold hover:bg-primary/10 transition-all flex items-center justify-center gap-3"
                 >
                   {isGeneratingResume ? "Synthesizing..." : <><FileText className="w-5 h-5" /> Generate AI Resume Summary</>}
                 </button>
              </div>
            </div>
          </div>

          {resume && (
            <div className="glass p-8 rounded-[40px] border border-primary/20 bg-primary/5 animate-in zoom-in-95 duration-500">
               <h3 className="font-bold mb-4 flex items-center gap-2">
                 <Sparkles className="w-4 h-4 text-primary" />
                 Your Generated Career Persona
               </h3>
               <div className="prose prose-invert max-w-none text-muted-foreground whitespace-pre-wrap">
                 {resume}
               </div>
            </div>
          )}

          {/* Learning Road */}
          <div className="glass p-12 rounded-[48px] border border-white/5 space-y-12">
            <h2 className="text-3xl font-black font-outfit text-center flex items-center justify-center gap-4">
               <Map className="w-8 h-8 text-primary" />
               Your Personalized Roadmap
            </h2>
            <div className="relative space-y-12 before:absolute before:left-8 before:top-2 before:bottom-2 before:w-px before:bg-white/10">
              {report.recommendedPath?.map((step: string, i: number) => (
                <div key={i} className="relative pl-24 group">
                  <div className="absolute left-0 top-0 w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-xl font-black group-hover:bg-primary/20 group-hover:border-primary/50 transition-all">
                    {i + 1}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{step}</h3>
                    <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                      Module Status: Pending
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-12 text-center">
               <button className="bg-primary hover:bg-primary/80 text-white px-12 py-5 rounded-[24px] font-black text-xl shadow-2xl shadow-primary/30 hover:scale-105 transition-all flex items-center gap-4 mx-auto">
                 Deploy This Strategy
                 <Rocket className="w-6 h-6" />
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
