import { Shield, Users, Building2, Globe, ArrowRight, Zap, CheckCircle } from "lucide-react";
import { GlassCard, PremiumButton, BadgePill } from "@/components/PremiumUI";
import Link from "next/link";

export default function CorporatePage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto">
        {/* Hero */}
        <div className="max-w-4xl mb-32">
          <BadgePill className="mb-6">Enterprise Solutions</BadgePill>
          <h1 className="text-6xl md:text-8xl font-heading font-black mb-8 leading-[1] tracking-tighter">
            Transform Your Workforce <br />
            <span className="text-gradient">With Genie for Business.</span>
          </h1>
          <p className="text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed mb-10">
            Empower your team with industry-leading digital skills training. Scalable, AI-driven, and architected for global enterprise performance.
          </p>
          <div className="flex gap-6">
            <PremiumButton size="lg">Request a Demo</PremiumButton>
            <PremiumButton variant="outline" size="lg" className="glass">Download Brochure</PremiumButton>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {[
            { title: "Team Management", desc: "Centralized dashboard to track progress, seats, and performance metrics across departments.", icon: Users },
            { title: "Custom Pathways", desc: "Tailored learning paths mapped to your specific corporate goals and tech stack.", icon: Zap },
            { title: "Global Compliance", desc: "Localized billing, tax compliance, and multi-region support for worldwide teams.", icon: Globe },
          ].map((feature, i) => (
            <GlassCard key={i} className="p-10 border-white/5 hover:border-primary/30 transition-all">
              <feature.icon className="w-10 h-10 text-primary mb-8" />
              <h3 className="text-2xl font-black font-heading mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
            </GlassCard>
          ))}
        </div>

        {/* Trusted By */}
        <div className="text-center mb-32">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground mb-12">Trusted by Global Leaders</p>
          <div className="flex flex-wrap justify-center gap-16 opacity-30 grayscale items-center">
            <div className="text-3xl font-black italic">SAMSUNG</div>
            <div className="text-3xl font-black italic">DELOITTE</div>
            <div className="text-3xl font-black italic">AMAZON</div>
            <div className="text-3xl font-black italic">ACCENTURE</div>
          </div>
        </div>

        {/* CTA */}
        <GlassCard variant="dark" className="p-20 text-center border-white/10 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] -z-10" />
           <h2 className="text-4xl md:text-6xl font-heading font-black mb-8">Ready to Upskill Your Team?</h2>
           <PremiumButton className="mx-auto h-16 px-12 text-md">Schedule Strategic Consult</PremiumButton>
        </GlassCard>
      </div>
    </div>
  );
}
