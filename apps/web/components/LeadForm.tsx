"use client";

import { GlassCard, PremiumButton } from "./PremiumUI";
import { Send, Phone } from "lucide-react";

export function LeadForm() {
  return (
    <GlassCard variant="dark" className="p-8 border-white/10 shadow-2xl space-y-6 bg-gradient-to-br from-white/[0.05] to-transparent">
      <div className="space-y-2">
        <h3 className="text-xl font-heading font-black">Request Call Back</h3>
        <p className="text-xs text-muted-foreground font-medium">Get a personalized consultation with our career advisor.</p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Full Name</label>
          <input 
            type="text" 
            placeholder="John Doe"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Email Address</label>
          <input 
            type="email" 
            placeholder="john@example.com"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Phone Number</label>
          <input 
            type="tel" 
            placeholder="+1 (555) 000-0000"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all"
          />
        </div>

        <PremiumButton className="w-full h-12 text-xs uppercase tracking-widest">
          Request Now <Send className="w-3.5 h-3.5 ml-2" />
        </PremiumButton>
      </form>

      <div className="pt-4 border-t border-white/5 flex items-center justify-center gap-2 text-[10px] font-black uppercase text-muted-foreground">
        <Phone className="w-3 h-3 text-primary" /> Or call us: +1-800-GENIE-AI
      </div>
    </GlassCard>
  );
}
