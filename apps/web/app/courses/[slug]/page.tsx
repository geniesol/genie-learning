import { getCourse } from "@/utils/api";
import { MOCK_COURSES } from "@/utils/mock-data";
import { BadgePill, GlassCard, PremiumButton } from "@/components/PremiumUI";
import { Curriculum } from "@/components/Curriculum";
import { Clock, BookOpen, BarChart, Star, CheckCircle, GraduationCap, Users, ShieldCheck, Zap, Terminal, Globe, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";
import { StickySubNav } from "@/components/StickySubNav";
import { LeadForm } from "@/components/LeadForm";

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  let course = await getCourse(slug);

  if (!course) {
    // Fallback to mock data if API fails
    course = MOCK_COURSES.find(c => c.slug === slug) || null;
  }

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Course Hero */}
      <section className="relative py-20 bg-black/40 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full -z-10" />
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="flex flex-wrap gap-3">
                <BadgePill>{course.metadata?.category || "Technology"}</BadgePill>
                <BadgePill variant="outline">{course.metadata?.level || "All Levels"}</BadgePill>
                <div className="flex items-center gap-1 text-accent ml-2">
                  <Star className="w-4 h-4 fill-accent" />
                  <span className="text-sm font-bold">{course.rating} (4.5k reviews)</span>
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tighter leading-[1.1] text-foreground">
                {course.title}
              </h1>

              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed font-medium">
                {course.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 py-8 border-y border-white/5 font-sans">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-1">Duration</div>
                    <div className="text-sm font-bold text-foreground">{course.duration}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                    <BookOpen className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-1">Modules</div>
                    <div className="text-sm font-bold text-foreground">{course.lessonsCount} Tracks</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-1">Enrolled</div>
                    <div className="text-sm font-bold text-foreground">{course.enrolled?.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-32 h-fit">
                <LeadForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Secondary Navigation */}
      <StickySubNav />

      {/* Content */}
      <div className="container mx-auto px-6 mt-16 font-sans">
        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-32">
            
            {/* Outcomes */}
            <section id="outcomes" className="scroll-mt-40">
              <h2 className="text-4xl font-heading font-black mb-10 flex items-center gap-4 text-foreground tracking-tight">
                <Sparkles className="w-10 h-10 text-primary" />
                Build Real Proficiency
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {course.learningOutcomes?.map((outcome: string, i: number) => (
                  <div key={i} className="flex gap-4 p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-primary/20 hover:bg-white/[0.04] transition-all">
                    <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <span className="text-sm font-semibold leading-relaxed text-muted-foreground">{outcome}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Tools */}
            <section id="tools" className="scroll-mt-40">
              <h2 className="text-4xl font-heading font-black mb-10 flex items-center gap-4 text-foreground tracking-tight">
                <Terminal className="w-10 h-10 text-primary" />
                Industry Tools
              </h2>
              <div className="flex flex-wrap gap-6">
                {course.metadata?.tags?.map((tag: string, i: number) => (
                  <div key={i} className="px-8 py-6 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col items-center gap-4 group hover:bg-primary/5 hover:border-primary/20 transition-all cursor-default">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Zap className="w-7 h-7 text-primary" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary">{tag}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum */}
            <section id="curriculum" className="scroll-mt-40">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-4xl font-heading font-black flex items-center gap-4 text-foreground tracking-tight">
                  <BarChart className="w-10 h-10 text-primary" />
                  The Mastery Loop
                </h2>
                <BadgePill variant="outline" className="text-xs uppercase px-4 py-1.5">{course.sections?.length || 0} Modules</BadgePill>
              </div>
              <Curriculum sections={course.sections || []} />
            </section>

            {/* Instructor */}
            <section id="instructor" className="scroll-mt-40">
              <h2 className="text-4xl font-heading font-black mb-12 flex items-center gap-4 text-foreground tracking-tight">
                <GraduationCap className="w-10 h-10 text-primary" />
                Guided by Experts
              </h2>
              <GlassCard className="p-12 border-white/5 flex flex-col md:flex-row gap-12 items-center md:items-start group hover:border-primary/20 transition-all">
                <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-primary to-accent shrink-0 flex items-center justify-center text-5xl font-black text-white shadow-2xl group-hover:rotate-6 transition-transform">
                  {course.instructor?.charAt(0)}
                </div>
                <div className="space-y-6 flex-grow">
                  <div>
                    <h3 className="text-4xl font-black font-heading mb-2 text-foreground">{course.instructor}</h3>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Senior Program Director @ Genie</div>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                    {course.instructorBio || "Expert practitioner with over a decade of industry experience in specialized digital systems and global corporate strategy."}
                  </p>
                  <div className="flex flex-wrap gap-8 pt-4">
                    <div className="flex items-center gap-3">
                       <Users className="w-5 h-5 text-primary" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">12k+ Students</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <BarChart className="w-5 h-5 text-accent" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">24 Advanced Tracks</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </section>

          </div>

          <div className="hidden lg:block lg:col-span-1">
             <div className="space-y-8 sticky top-32">
                <GlassCard className="p-10 border-white/5 space-y-8 bg-black/40">
                  <h4 className="font-heading font-black text-2xl text-foreground tracking-tight">Program DNA</h4>
                  <ul className="space-y-6">
                    {[
                      { text: "25+ Applied Sandbox Projects", icon: Terminal },
                      { text: "Globally Recognized Certification", icon: Award },
                      { text: "Unlimited AI Tutor Access", icon: Zap },
                      { text: "1:1 Industry Mentorship", icon: Users },
                      { text: "Direct Hiring Partnerships", icon: ShieldCheck }
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 text-[13px] font-bold text-muted-foreground">
                        <item.icon className="w-5 h-5 text-primary shrink-0" />
                        {item.text}
                      </li>
                    ))}
                  </ul>
                  <PremiumButton variant="outline" className="w-full justify-center glass border-white/10 group h-14 uppercase tracking-widest font-black text-xs" type="button">
                    Download Full Syllabus <Zap className="ml-2 w-4 h-4 group-hover:text-primary transition-colors" />
                  </PremiumButton>
                </GlassCard>

                <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 space-y-6">
                   <ShieldCheck className="w-12 h-12 text-primary" />
                   <h4 className="font-heading font-black text-2xl text-foreground tracking-tight">Genie Guarantee</h4>
                   <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                     Every Genie Learning course comes with a 100% satisfaction guarantee. Full refund available within 7 days of initialization.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <section id="faq" className="container mx-auto px-6 py-32 scroll-mt-40">
        <h2 className="text-4xl font-heading font-black mb-12 text-foreground tracking-tight">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8">
           {[
             { q: "Is there a refund policy?", a: "Yes, we offer a 7-day full refund guarantee if you are not satisfied with the course content." },
             { q: "Do I get a certificate?", a: "Upon successful completion of all modules and projects, you will receive an industry-recognized certification." },
             { q: "Are the labs included?", a: "Absolutely. All hands-on sandboxes and project infrastructure are included in the course fee." },
             { q: "Is the AI Tutor available 24/7?", a: "Yes, our proprietary Genie AI Tutor is available around the clock to answer your technical queries." }
           ].map((faq, i) => (
             <GlassCard key={i} className="p-8 border-white/5 space-y-4">
               <h4 className="font-bold text-lg text-foreground">{faq.q}</h4>
               <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
             </GlassCard>
           ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="container mx-auto px-6 py-32 scroll-mt-40 border-t border-white/5">
        <h2 className="text-4xl font-heading font-black mb-12 text-foreground tracking-tight">What Professionals Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
           {[1, 2, 3].map((r) => (
             <GlassCard key={r} className="p-8 border-white/5 space-y-6">
                <div className="flex text-primary gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary" />)}
                </div>
                <p className="text-sm font-medium italic text-muted-foreground leading-relaxed">
                  "This course was a game-changer for my career transition into high-growth tech roles. The curriculum is incredibly practical."
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full bg-primary/10" />
                  <div>
                    <div className="text-xs font-black uppercase">Professional Student</div>
                    <div className="text-[10px] text-muted-foreground uppercase font-black">Verified Learner</div>
                  </div>
                </div>
             </GlassCard>
           ))}
        </div>
      </section>
    </div>
  );
}

// Dummy Award icon for the sidebar
function Award({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
  );
}
