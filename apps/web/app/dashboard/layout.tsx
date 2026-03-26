"use client";

import { LayoutDashboard, BookOpen, Clock, Trophy, Settings, LogOut, Sparkles, Users, MessageSquare, Shield, BarChart3, TrendingUp, Code2, Target, Mic, Building2, Award } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen pt-16">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-border bg-white/5 backdrop-blur-xl hidden md:flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3 px-3 py-2 rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-8">
            <Trophy className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Student Pro</span>
          </div>
          
          <nav className="space-y-1">
            <Link 
              href="/dashboard" 
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${pathname === '/dashboard' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-white/5 text-muted-foreground hover:text-foreground'}`}
            >
              <LayoutDashboard className="w-5 h-5" />
              Overview
            </Link>
            <Link 
              href="/dashboard/courses" 
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${pathname === '/dashboard/courses' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-white/5 text-muted-foreground hover:text-foreground'}`}
            >
              <BookOpen className="w-5 h-5" />
              My Courses
            </Link>
            <Link 
              href="/dashboard/study-plan" 
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${pathname === '/dashboard/study-plan' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-white/5 text-muted-foreground hover:text-foreground'}`}
            >
              <Sparkles className="w-5 h-5" />
              Study Plan
            </Link>
            <Link 
              href="/dashboard/certificates" 
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${pathname === '/dashboard/certificates' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-white/5 text-muted-foreground hover:text-foreground'}`}
            >
              <Award className="w-5 h-5" />
              My Certificates
            </Link>
            <Link 
              href="/dashboard/career" 
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${pathname === '/dashboard/career' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-white/5 text-muted-foreground hover:text-foreground'}`}
            >
              <Target className="w-5 h-5" />
              Career Architect
            </Link>

            <Link 
              href="/dashboard/leaderboard" 
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${pathname === '/dashboard/leaderboard' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-white/5 text-muted-foreground hover:text-foreground'}`}
            >
              <Trophy className="w-5 h-5" />
              Leaderboard
            </Link>

            <div className="pt-8 pb-4 px-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">AI Playgrounds</div>
            <Link 
              href="/dashboard/interview" 
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${pathname === '/dashboard/interview' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-white/5 text-muted-foreground hover:text-foreground'}`}
            >
              <Mic className="w-5 h-5" />
              Mock Interview
            </Link>
            <Link 
              href="/dashboard/lab" 
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${pathname === '/dashboard/lab' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-white/5 text-muted-foreground hover:text-foreground'}`}
            >
              <Code2 className="w-5 h-5" />
              Coding Lab
            </Link>

            <Link 
              href="/dashboard/forum" 
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${pathname === '/dashboard/forum' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-white/5 text-muted-foreground hover:text-foreground'}`}
            >
              <MessageSquare className="w-5 h-5" />
              Community
            </Link>

            <div className="pt-8 pb-4 px-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Enterprise</div>
            <Link 
              href="/dashboard/enterprise" 
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${pathname === '/dashboard/enterprise' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-white/5 text-muted-foreground hover:text-foreground'}`}
            >
              <Building2 className="w-5 h-5" />
              Corporate Portal
            </Link>
            <Link 
              href="/dashboard/progress" 
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${pathname === '/dashboard/progress' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-white/5 text-muted-foreground hover:text-foreground'}`}
            >
              <Clock className="w-5 h-5" />
              Activity
            </Link>

            <div className="pt-8 pb-4 px-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Instructor</div>
            <Link 
              href="/dashboard/instructor" 
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${pathname === '/dashboard/instructor' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-white/5 text-muted-foreground hover:text-foreground'}`}
            >
              <LayoutDashboard className="w-5 h-5" />
              Insights
            </Link>
            <Link 
              href="/dashboard/instructor/students" 
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${pathname === '/dashboard/instructor/students' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-white/5 text-muted-foreground hover:text-foreground'}`}
            >
              <Users className="w-5 h-5" />
              Students
            </Link>

            <div className="pt-8 pb-4 px-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 flex items-center gap-2">
              <Shield className="w-3 h-3 text-primary" />
              Platform Admin
            </div>
            <Link 
              href="/dashboard/admin" 
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${pathname === '/dashboard/admin' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-white/5 text-muted-foreground hover:text-foreground'}`}
            >
              <BarChart3 className="w-5 h-5" />
              Analytics
            </Link>
            <Link 
              href="/dashboard/admin/users" 
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${pathname === '/dashboard/admin/users' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-white/5 text-muted-foreground hover:text-foreground'}`}
            >
              <Users className="w-5 h-5" />
              Directory
            </Link>
            <div className="pt-8 pb-4 px-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Account</div>
            <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 text-muted-foreground hover:text-foreground transition-all">
              <Settings className="w-5 h-5" />
              Settings
            </Link>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-all text-left">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t border-border/50">
          <div className="glass p-4 rounded-2xl border border-white/10 text-center">
            <p className="text-xs text-muted-foreground mb-3 font-medium">Need help with your courses?</p>
            <button className="w-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2 rounded-xl transition-all border border-white/10">
              Open AI Tutor
            </button>
          </div>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-grow p-8 bg-black/20">
        <div className="container max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
