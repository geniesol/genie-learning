import { BadgePill, GlassCard, PremiumButton } from "@/components/PremiumUI";
import { 
  Users, 
  Search, 
  ChevronRight, 
  Star, 
  Award, 
  Zap, 
  PlayCircle,
  BarChart,
  Briefcase
} from "lucide-react";
import { MOCK_COURSES } from "@/utils/mock-data";
import { CategoryExplorer } from "@/components/CategoryExplorer";

export default function HomePage() {
  return (
    <main className="min-h-screen pb-32 font-sans">
      {/* Hero Section - Simplilearn Style */}
      <section className="relative pt-32 pb-48 overflow-hidden bg-background">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full -z-10 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full -z-10" />

        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 shadow-lg shadow-primary/5">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">World's #1 Online AI Bootcamp</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-heading font-black tracking-tighter leading-[0.9] text-foreground">
              Get Certified. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent italic">Get Ahead.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed opacity-80">
              Master the most in-demand skills in AI, Data Science, and Digital Marketing with real-world projects and live expert-led classes.
            </p>

            {/* Search Bar - Simplilearn Standard */}
            <div className="relative max-w-2xl mx-auto group mt-4">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent blur opacity-20 group-focus-within:opacity-40 transition-opacity" />
              <div className="relative flex items-center bg-background/50 backdrop-blur-md border border-white/10 rounded-2xl p-2 shadow-2xl">
                <Search className="ml-5 w-6 h-6 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="What do you want to learn today?" 
                  className="flex-1 bg-transparent border-none focus:ring-0 py-5 px-5 text-lg font-medium outline-none text-foreground placeholder-muted-foreground w-full"
                />
                <PremiumButton className="rounded-xl px-12 h-14 uppercase tracking-widest font-black text-xs">Search</PremiumButton>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-10 pt-8 opacity-60">
              {[
                { label: "8M+ Careers Advanced", icon: Users },
                { label: "1500+ Live Classes/Month", icon: PlayCircle },
                { label: "85% report career success", icon: BarChart }
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-2.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  <stat.icon className="w-4 h-4 text-primary" />
                  {stat.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* University & Hiring Partners */}
      <section className="py-24 border-y border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-6">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground mb-16 opacity-50">
            Strategic partnerships with world-class institutions
          </p>
          <div className="flex flex-wrap justify-center items-center gap-20 md:gap-32 opacity-20 grayscale transition-all duration-700 hover:grayscale-0 hover:opacity-100 pb-4">
             {["OXFORD", "PURDUE", "IBM", "MICROSOFT", "GOOGLE", "AWS"].map((p) => (
               <span key={p} className="text-4xl font-heading font-black tracking-tighter text-foreground cursor-default hover:text-primary transition-colors">{p}</span>
             ))}
          </div>
        </div>
      </section>

      {/* Tabbed Course Explorer - Simplilearn Pattern */}
      <section className="py-40 container mx-auto px-6">
        <CategoryExplorer courses={MOCK_COURSES} />
      </section>

      {/* Why Genie Section - 4 Pillar Grid */}
      <section className="py-40 bg-white/[0.01] border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] -z-10" />
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-24">
            <h2 className="text-5xl md:text-6xl font-heading font-black text-foreground mb-8 tracking-tight">Why Our Programs <br /><span className="text-primary italic">Stand Out</span></h2>
            <div className="w-20 h-1.5 bg-primary mb-8" />
            <p className="text-xl text-muted-foreground font-medium leading-relaxed opacity-80">We've pioneered a learning methodology that blends AI-guided personalization with live industry expertise to ensure you don't just learn, but master.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "AI-Adaptive Path", desc: "Our proprietary algorithm adjusts curriculum difficulty in real-time based on your progress.", icon: Zap },
              { title: "Working Experts", desc: "Every instructor is a senior practitioner currently working at a top-tier tech firm.", icon: Users },
              { title: "Sandbox Practice", desc: "Gain hands-on experience in cloud environments designed to simulate production traffic.", icon: Briefcase },
              { title: "Global Hire-Ready", desc: "Direct access to dedicated career coaches and our network of 2000+ hiring partners.", icon: Award }
            ].map((pillar, i) => (
              <GlassCard key={i} className="p-10 border-white/5 space-y-8 flex flex-col items-start hover:bg-white/[0.04] transition-all group hover:border-primary/20">
                 <div className="w-16 h-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:rotate-6 transition-all duration-500">
                    <pillar.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                 </div>
                 <div className="space-y-4">
                    <h4 className="text-xl font-heading font-black text-foreground">{pillar.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium opacity-70">{pillar.desc}</p>
                 </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Ratings Section */}
      <section className="py-40 container mx-auto px-6">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-16 md:gap-24 max-w-6xl mx-auto">
            {[
              { site: "Trustpilot", score: "4.8/5" },
              { site: "Switchup", score: "4.9/5" },
              { site: "CourseReport", score: "4.7/5" },
              { site: "Career Karma", score: "4.9/5" }
            ].map((rating, i) => (
              <div key={i} className="space-y-6 text-center group">
                 <div className="text-5xl font-heading font-black text-foreground group-hover:text-primary transition-colors tracking-tighter">{rating.score}</div>
                 <div className="space-y-2">
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">{rating.site}</div>
                    <div className="flex justify-center gap-1.5 text-primary">
                       {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-primary" />)}
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-6">
        <div className="container mx-auto">
           <GlassCard className="rounded-[4rem] p-16 md:p-32 text-center space-y-12 border-white/5 relative overflow-hidden bg-white/[0.01]">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 blur-[100px] rounded-full" />
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/5 blur-[100px] rounded-full" />
              
              <div className="relative space-y-10">
                 <h2 className="text-6xl md:text-8xl font-heading font-black text-foreground tracking-tighter leading-none">
                   Initiate Your <br /> Mastery Loop.
                 </h2>
                 <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium opacity-80 leading-relaxed">
                   Join 8 Million+ learners who have already fast-tracked their careers with Genie Learning.
                 </p>
                 <div className="flex flex-col sm:flex-row justify-center gap-8 pt-4">
                    <PremiumButton size="lg" className="px-20 h-20 text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/40">Start For Free</PremiumButton>
                    <PremiumButton size="lg" variant="outline" className="px-20 h-20 text-xs font-black uppercase tracking-[0.2em] glass border-white/20 hover:bg-white/5">Corporate Training</PremiumButton>
                 </div>
              </div>
           </GlassCard>
        </div>
      </section>
    </main>
  );
}
