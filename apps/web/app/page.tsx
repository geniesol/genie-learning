import { ArrowRight, Bot, BookOpen, Code, GraduationCap, Globe, Zap, CheckCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import { GlassCard, PremiumButton, BadgePill } from "@/components/PremiumUI";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6">
        <div className="container mx-auto text-center relative">
          {/* Ambient Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 blur-[120px] rounded-full -z-10" />
          
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-black tracking-widest uppercase mb-8 animate-reveal">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>AI-Powered Global Education</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-outfit font-black mb-8 max-w-5xl mx-auto leading-[1.1] tracking-tighter">
            Elevate Your <span className="text-gradient">Potential</span> With AI Intelligence.
          </h1>
          
          <p className="text-muted-foreground text-xl md:text-2xl max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
            The world's first unified ecosystem for <span className="text-foreground font-bold">corporate excellence</span>, automated admissions, and AI-driven deep learning.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 animate-reveal" style={{ animationDelay: '0.2s' }}>
            <PremiumButton size="lg" className="h-16 text-lg">
              Start Learning Now <ArrowRight className="w-6 h-6" />
            </PremiumButton>
            <PremiumButton variant="outline" size="lg" className="h-16 text-lg glass">
              Professional Demo
            </PremiumButton>
          </div>
          
          {/* Professional Stats Podium */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl mx-auto py-12 border-y border-white/5 bg-white/[0.02] backdrop-blur-sm rounded-3xl animate-reveal" style={{ animationDelay: '0.4s' }}>
            <div className="space-y-2">
              <div className="text-4xl font-black font-outfit text-gradient">50K+</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black">Active Learners</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-black font-outfit text-gradient">120+</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black">Advanced Tracks</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-black font-outfit text-gradient">15+</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black">Global Regions</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-black font-outfit text-gradient">98%</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black">Career Success</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <BadgePill className="mb-4">The 6 Pillars</BadgePill>
              <h2 className="text-4xl md:text-6xl font-outfit font-black tracking-tight leading-tight">
                Architected for the <br /> <span className="text-primary">Corporate Frontier.</span>
              </h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-sm">
              We've combined tactical learning with autonomous AI to create the most efficient growth engine on the planet.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <GlassCard className="group p-10 border-white/5">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:rotate-6 transition-all duration-500">
                <Globe className="text-primary w-8 h-8 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-black mb-4 font-outfit">Global B2B Hub</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Enterprise-grade seat management with localized pricing and tax compliance for 150+ countries.
              </p>
            </GlassCard>

            <GlassCard className="group p-10 border-white/5">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-8 group-hover:bg-accent group-hover:-rotate-6 transition-all duration-500">
                <Bot className="text-accent w-8 h-8 group-hover:text-black transition-colors" />
              </div>
              <h3 className="text-2xl font-black mb-4 font-outfit">Career Architect</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                AI-driven learning paths mapped to high-demand roles, complete with resume synthesis and mock interviews.
              </p>
            </GlassCard>

            <GlassCard className="group p-10 border-white/5">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:rotate-6 transition-all duration-500">
                <Code className="text-primary w-8 h-8 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-black mb-4 font-outfit">Adaptive RAG Labs</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Hands-on coding sandboxes with real-time AI feedback tailored to your specific project context.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <GlassCard variant="dark" className="container mx-auto p-20 text-center relative overflow-hidden border-white/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -z-10" />
          <h2 className="text-4xl md:text-6xl font-outfit font-black mb-8 tracking-tighter">
            Ready to <span className="text-gradient">Scale</span> Your Knowledge?
          </h2>
          <PremiumButton size="lg" className="mx-auto h-16 text-lg px-12">
            Initialize Your Journey
          </PremiumButton>
        </GlassCard>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <Zap className="text-primary w-6 h-6 animate-float" />
            <span className="font-outfit font-black text-xl tracking-tighter uppercase">Genie Learning</span>
          </div>
          <div className="text-xs text-muted-foreground font-bold tracking-widest uppercase">
            © 2026 Genomic Knowledge Systems. Secured by AI.
          </div>
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.2em]">
            <Link href="#" className="hover:text-primary transition-colors">Intelligence</Link>
            <Link href="#" className="hover:text-primary transition-colors">Governance</Link>
            <Link href="#" className="hover:text-primary transition-colors">Connect</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
