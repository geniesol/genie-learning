import { Rocket, PlayCircle, BarChart, ChevronRight, BookOpen, Clock, Trophy, Sparkles, Bot, Zap } from "lucide-react";
import Link from "next/link";
import { API_BASE_URL } from "@/utils/api";
import { GlassCard, PremiumButton, BadgePill } from "@/components/PremiumUI";

async function getMyEnrollments() {
  try {
    const res = await fetch(`${API_BASE_URL}/enrollments/my`, {
      headers: { Authorization: 'Bearer mock-token' },
      cache: 'no-store'
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.warn("Fetch failed:", error);
    return [];
  }
}

export default async function DashboardPage() {
  const enrollments = await getMyEnrollments();

  return (
    <div className="space-y-12 pb-20">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="animate-reveal">
          <BadgePill className="mb-4">Student Hub</BadgePill>
          <h1 className="text-4xl md:text-5xl font-outfit font-black tracking-tight mb-2">
            Welcome back, <span className="text-gradient">Alex!</span>
          </h1>
          <p className="text-muted-foreground font-medium">You've completed 2 sessions this week. You're in the top 5%!</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 animate-reveal" style={{ animationDelay: '0.1s' }}>
          <GlassCard className="p-4 flex items-center gap-4 bg-white/[0.03]">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-black font-outfit">12.5h</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">Study Time</div>
            </div>
          </GlassCard>
          <GlassCard className="p-4 flex items-center gap-4 bg-white/[0.03]">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-black font-outfit">2,450</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">XP Earned</div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-10">
        {/* Left: Active Courses */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black font-outfit tracking-tight">Active Learning</h2>
            <Link href="/dashboard/courses" className="text-sm text-primary font-bold flex items-center gap-1 hover:tracking-wide transition-all">
              All Courses <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-6">
            {enrollments.length > 0 ? (
              enrollments.slice(0, 3).map((enrollment: any, idx: number) => (
                <GlassCard 
                  key={enrollment.id} 
                  className="group p-0 overflow-hidden border-white/5 animate-reveal"
                  style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="w-full md:w-48 h-48 md:h-auto bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0 relative overflow-hidden">
                      <PlayCircle className="w-12 h-12 text-primary group-hover:scale-125 transition-transform duration-500 z-10" />
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    <div className="p-8 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-black font-outfit line-clamp-1">{enrollment.course.title}</h3>
                          <BadgePill className="bg-primary/5 text-primary border-primary/10">In Progress</BadgePill>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground font-bold uppercase tracking-widest mb-6">
                          <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> 8/12 Lessons</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 4h Rem.</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-xs font-black uppercase tracking-tighter">
                          <span>Progress</span>
                          <span className="text-primary text-sm">65%</span>
                        </div>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-primary to-accent w-[65%] rounded-full shadow-[0_0_12px_rgba(129,140,248,0.5)]" />
                        </div>
                      </div>
                      
                      <div className="mt-8 flex justify-end">
                        <Link href={`/learn/${enrollment.course.slug}`}>
                          <PremiumButton variant="primary" size="sm" className="px-8">
                            Resume Session
                          </PremiumButton>
                        </Link>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))
            ) : (
              <GlassCard className="p-20 text-center border-dashed border-white/10 opacity-50">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 text-muted-foreground">
                  <Sparkles className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black font-outfit mb-2">Your journey is waiting</h3>
                <p className="text-muted-foreground max-w-sm mx-auto mb-10">Start your first high-performance AI course and unlock your potential.</p>
                <Link href="/courses">
                  <PremiumButton size="lg" className="px-10">Initialize Growth</PremiumButton>
                </Link>
              </GlassCard>
            )}
          </div>
        </div>

        {/* Right: AI Insights / Career Architect */}
        <div className="space-y-8 animate-reveal" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-2xl font-black font-outfit tracking-tight">AI Insights</h2>
          
          <GlassCard variant="dark" className="p-8 border-primary/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] -z-10 group-hover:scale-150 transition-transform duration-700" />
            <div className="flex items-center gap-3 mb-6">
              <Bot className="text-primary w-6 h-6" />
              <h3 className="text-lg font-black font-outfit tracking-tight">Career Architect</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
              Based on your current activity in <span className="text-foreground font-bold">AI Systems Engineering</span>, you are 3 weeks away from qualifying for <span className="text-foreground font-bold">Solutions Architect</span> roles.
            </p>
            <PremiumButton variant="outline" className="w-full glass text-xs py-3">
              View Learning Path
            </PremiumButton>
          </GlassCard>

          <GlassCard className="p-8 border-accent/10 overflow-hidden relative">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="text-accent w-6 h-6" />
              <h3 className="text-lg font-black font-outfit tracking-tight">Daily Challenge</h3>
            </div>
            <div className="p-4 rounded-xl bg-accent/5 border border-accent/10 mb-6">
              <p className="text-xs font-bold leading-relaxed italic">
                "Explain the difference between Vector Embeddings and Scalar weights in 2 sentences."
              </p>
            </div>
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              <span>Reward</span>
              <span className="text-accent underline cursor-pointer">+50 XP</span>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
