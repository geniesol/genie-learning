import { ChevronLeft, Info, MessageSquare, List, CheckCircle2, PlayCircle, Bot, Sparkles, Award } from "lucide-react";
import Link from "next/link";
import { API_BASE_URL } from "@/utils/api";
import { notFound } from "next/navigation";
import AssignmentSubmission from "@/components/AssignmentSubmission";
import { GlassCard, PremiumButton, BadgePill } from "@/components/PremiumUI";

async function getEnrollment(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/courses/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.warn("Fetch failed:", error);
    return null;
  }
}

export default async function LearnPage({ params }: { params: { slug: string } }) {
  const course = await getEnrollment(params.slug);

  if (!course) {
    notFound();
  }

  // Find current lesson - for demo, we'll pick the first lesson of the first section
  const currentSection = course.sections?.[0];
  const currentLesson = currentSection?.lessons?.[0];

  return (
    <div className="flex flex-col h-screen bg-[#020617] text-white">
      {/* Top Navbar: Advanced Glass */}
      <header className="h-18 border-b border-white/5 flex items-center justify-between px-8 glass-dark sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all group">
            <ChevronLeft className="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div className="animate-reveal">
            <h1 className="text-base font-black font-outfit text-white line-clamp-1">{course.title}</h1>
            <div className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="text-primary/60">Module 01</span>
              <span className="opacity-20">•</span>
              <span>{currentSection?.title || 'Main Curriculum'}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <PremiumButton variant="outline" size="sm" className="glass py-2 h-10 border-white/10 hover:border-primary/50 group">
            <Bot className="w-4 h-4 text-primary group-hover:animate-bounce" />
            <span className="hidden sm:inline">AI Tutor Specialist</span>
          </PremiumButton>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent p-[1px] shadow-lg shadow-primary/20">
            <div className="w-full h-full rounded-[11px] bg-[#020617] flex items-center justify-center text-[10px] font-black tracking-tight">
              JS
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-grow overflow-hidden">
        {/* Main Lesson Content Area */}
        <main className="flex-grow overflow-y-auto bg-[#020617] custom-scrollbar selection:bg-primary/30">
          <div className="max-w-4xl mx-auto px-10 py-16 animate-reveal">
            {currentLesson?.type === 'video' ? (
              <GlassCard variant="dark" className="aspect-video w-full p-0 border-white/5 relative overflow-hidden mb-16 shadow-2xl group cursor-pointer">
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                 <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-20 h-20 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-white/20">
                      <PlayCircle className="w-10 h-10 text-white fill-white" />
                    </div>
                 </div>
                 <div className="absolute bottom-8 left-8 z-20">
                    <BadgePill className="bg-primary/20 text-primary border-primary/20 mb-3">Cinema View</BadgePill>
                    <h3 className="text-lg font-bold">Session 01: Core Architecture Deep Dive</h3>
                 </div>
              </GlassCard>
            ) : null}

            <div className="space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <BadgePill className="bg-accent/10 text-accent border-accent/20">Active Lesson</BadgePill>
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50">15 min study</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-outfit font-black tracking-tight">{currentLesson?.title || 'Advanced Methodology'}</h2>
                </div>
                <button className="flex items-center gap-2 text-xs font-black text-muted-foreground hover:text-primary transition-all uppercase tracking-[0.2em] group">
                  <Info className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  Technical Manifest
                </button>
              </div>
              
              <div className="prose prose-invert max-w-none text-muted-foreground text-lg leading-relaxed font-medium">
                <p className="first-letter:text-5xl first-letter:font-black first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                  {currentLesson?.content?.description || "In this lesson, we will explore core concepts and their practical applications in modern architectures. Understanding the underlying data structures is critical for any enterprise-grade deployment."}
                </p>
              </div>

              {/* AI Assignment Submission Section */}
              {currentLesson?.type === 'assignment' && (
                <div className="pt-8">
                  <AssignmentSubmission lessonId={currentLesson.id} />
                </div>
              )}

              <div className="pt-16 border-t border-white/5 flex items-center justify-between">
                <PremiumButton variant="ghost" className="px-10 border border-white/5 hover:border-white/10 text-muted-foreground">
                  Rewind
                </PremiumButton>
                <PremiumButton size="lg" className="px-12 group">
                  Complete Milestone <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </PremiumButton>
              </div>
            </div>
          </div>
        </main>

        {/* Course Navigation Sidebar: Extreme Luxury */}
        <aside className="w-96 border-l border-white/5 bg-[#010409] overflow-y-auto hidden xl:block custom-scrollbar">
          <div className="p-8">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xs font-black flex items-center gap-3 text-white uppercase tracking-[0.2em]">
                <List className="w-4 h-4 text-primary" />
                Intelligence Path
              </h3>
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            </div>
            
            <div className="space-y-10">
              {course.sections?.map((section: any, idx: number) => (
                <div key={section.id} className="space-y-6">
                  <div className="flex items-center justify-between px-2">
                    <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-40">
                      Module {idx + 1}
                    </div>
                    {idx === 0 && <Award className="w-4 h-4 text-accent/40" />}
                  </div>
                  
                  <div className="space-y-2">
                    {section.lessons?.map((lesson: any, lIdx: number) => {
                      const isActive = lesson.id === currentLesson?.id;
                      return (
                        <div 
                          key={lesson.id} 
                          className={`group cursor-pointer relative ${isActive ? 'p-[1px] rounded-2xl bg-gradient-to-r from-primary/50 to-accent/50' : ''}`}
                        >
                          <div className={`p-4 rounded-[15px] transition-all flex items-center gap-5 ${isActive ? 'bg-[#0a0a0a]' : 'hover:bg-white/[0.03] text-muted-foreground'}`}>
                             <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-[10px] font-black shrink-0 transition-all ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white/5 group-hover:bg-white/10'}`}>
                                {lIdx + 1}
                             </div>
                             <div className="flex-grow min-w-0">
                               <div className={`text-sm font-bold truncate ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>{lesson.title}</div>
                               <div className="text-[9px] font-black uppercase tracking-widest opacity-40">{lesson.type}</div>
                             </div>
                             {isActive ? (
                               <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                             ) : (
                               <CheckCircle2 className="w-5 h-5 text-white/[0.05] group-hover:text-primary transition-colors" />
                             )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// Sub-component for icons used above
function ChevronRight({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
