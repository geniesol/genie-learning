"use client";

import { useState } from "react";
import { Zap, Mail, Lock, Github, Globe, Sparkles } from "lucide-react";
import Link from "next/link";
import { GlassCard, PremiumButton, BadgePill } from "@/components/PremiumUI";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement login logic
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] -z-10 animate-float" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[150px] -z-10 animate-float" style={{ animationDelay: '1.5s' }} />

      <div className="w-full max-w-md">
        <div className="text-center mb-10 animate-reveal">
          <Link href="/" className="inline-flex items-center gap-3 mb-8 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl shadow-primary/20">
              <Zap className="text-white w-7 h-7" />
            </div>
            <span className="font-outfit font-black text-3xl tracking-tighter text-gradient">Genie</span>
          </Link>
          <BadgePill className="mb-4">Secure Gateway</BadgePill>
          <h1 className="text-4xl font-outfit font-black mb-3 tracking-tight">Sync Your Mind.</h1>
          <p className="text-muted-foreground font-medium">Resume your journey toward mastery.</p>
        </div>

        <GlassCard className="p-10 border-white/5 shadow-[0_32px_128px_-32px_rgba(0,0,0,0.5)] animate-reveal" style={{ animationDelay: '0.1s' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Identity Sync</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-muted-foreground/50"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Access Vault</label>
                <Link href="/forgot-password" className="text-[10px] text-primary font-black uppercase tracking-widest hover:underline">
                  Reset Key?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-muted-foreground/50"
                  required
                />
              </div>
            </div>

            <PremiumButton 
              type="submit"
              disabled={isLoading}
              className="w-full h-14 text-base"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Authorize Session <Sparkles className="w-5 h-5" /></>
              )}
            </PremiumButton>
          </form>

          <div className="relative my-10 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <span className="relative px-6 bg-[#0a0a0b] text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none">
              Alternate Mesh
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="glass py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-white/[0.05] transition-all border border-white/5 group">
              <Github className="w-5 h-5 group-hover:text-white transition-colors" />
              <span className="font-black text-xs uppercase tracking-widest">Github</span>
            </button>
            <button className="glass py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-white/[0.05] transition-all border border-white/5 group">
              <Globe className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
              <span className="font-black text-xs uppercase tracking-widest">Google</span>
            </button>
          </div>
        </GlassCard>

        <p className="text-center mt-10 text-sm font-medium text-muted-foreground animate-reveal" style={{ animationDelay: '0.2s' }}>
          New to the collective?{" "}
          <Link href="/register" className="text-primary font-black hover:tracking-wide transition-all uppercase tracking-tighter">
            Initialize Here
          </Link>
        </p>
      </div>
    </div>
  );
}
