export const dynamic = 'force-dynamic';
import { notFound } from "next/navigation";
import { Clock, Globe, BookOpen, Star, Shield, Zap, Sparkles, ArrowRight } from "lucide-react";
import { getApiUrl } from "@/utils/api";
import { BadgePill, GlassCard } from "@/components/PremiumUI";
import { Curriculum } from "@/components/Curriculum";
import { AITutor } from "@/components/AITutor";
import { MOCK_COURSES } from "@/utils/mock-data";

async function getCourse(slug: string) {
  try {
    const res = await fetch(`${getApiUrl()}/courses/${slug}`, { 
      cache: 'no-store'
    });
    if (!res.ok) return null;
    
    const text = await res.text();
    if (!text) return null;
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Failed to fetch course:", error);
    return null;
  }
}

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  let course = await getCourse(params.slug);

  if (!course) {
    // Fallback to mock data if API fails
    course = MOCK_COURSES.find(c => c.slug === params.slug) || null;
  }

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <BadgePill className="bg-primary/20 text-primary border-primary/30">
                  {course.metadata?.category || "Professional"}
                </BadgePill>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest">
                  <Star className="w-3 h-3 fill-accent" />
                  Top Rated
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-outfit font-black leading-tight tracking-tighter">
                {course.title}
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                {course.description || "Master these professional skills with our AI-powered learning path. Engineered for global impact and enterprise-grade results."}
              </p>

              <div className="flex flex-wrap items-center gap-8 py-6 border-y border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Duration</p>
                    <p className="text-sm font-bold">{course.metadata?.duration || "Self-Paced"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                    <BookOpen className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Lessons</p>
                    <p className="text-sm font-bold">128 Modules</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                    <Globe className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Level</p>
                    <p className="text-sm font-bold">{course.metadata?.level || "Beginner"}</p>
                  </div>
                </div>
              </div>
            </div>

            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-outfit font-black tracking-tight">Curriculum</h2>
                <span className="text-sm font-medium text-muted-foreground">
                  {course.sections?.length || 0} Sections • 248 Lessons
                </span>
              </div>
              {course.sections && <Curriculum sections={course.sections} />}
            </section>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              <GlassCard variant="dark" className="p-8 border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[80px] -translate-y-1/2 translate-x-1/2" />
                
                <div className="relative space-y-8">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary">Limited Enrollment</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-outfit font-black tracking-tighter">$199</span>
                      <span className="text-muted-foreground line-through text-sm">$499</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button className="w-full h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_8px_32px_-8px_rgba(var(--primary-rgb),0.5)]">
                      Enroll Today
                    </button>
                    <button className="w-full h-14 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                      <Shield className="w-4 h-4" /> 30-Day Money Back
                    </button>
                  </div>

                  <div className="space-y-4 pt-8 border-t border-white/5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-center text-muted-foreground mb-4">What's Included</p>
                    <ul className="space-y-4">
                      {[
                        "Complete course recordings",
                        "AI-Powered Learning Coach",
                        "Verified Certificate of Completion",
                        "Lifetime Community Access",
                        "1-on-1 Portfolio Reviews"
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-xs font-medium opacity-80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlassCard>

              {/* Related AI Course Banner */}
              <div className="rounded-3xl p-6 bg-gradient-to-br from-indigo-600 to-purple-700 border border-white/10 shadow-xl group cursor-pointer overflow-hidden relative">
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                 <div className="relative">
                    <div className="flex items-center gap-2 mb-4">
                       <Sparkles className="w-4 h-4 text-white" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-white/80">AI Enhanced Recommendation</span>
                    </div>
                    <h4 className="text-lg font-outfit font-black text-white mb-2 leading-tight">Mastering Generative AI for Designers</h4>
                    <p className="text-xs text-white/60 mb-6">Upgrade your path with our latest AI masterclass.</p>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white group-hover:gap-4 transition-all">
                       Learn More <ArrowRight className="w-4 h-4" />
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AITutor courseTitle={course.title} context={course.description} />
    </div>
  );
}
