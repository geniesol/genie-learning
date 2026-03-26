"use client";

import { useState, useEffect } from "react";
import { API_BASE_URL } from "../utils/api";
import { Users, BookOpen, DollarSign, FileText, ArrowRight, UserCheck, TrendingUp } from "lucide-react";

export default function InstructorDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/instructor/stats`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch instructor stats:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="h-96 flex items-center justify-center">Loading Instructor Insights...</div>;

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-outfit font-black mb-2">Instructor Hub</h1>
        <p className="text-muted-foreground">Monitor platform performance and student success metrics.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Students", value: stats?.totalStudents, icon: Users, color: "text-blue-400", bg: "bg-blue-400/10" },
          { label: "Active Enrollments", value: stats?.activeEnrollments, icon: BookOpen, color: "text-purple-400", bg: "bg-purple-400/10" },
          { label: "Total Revenue", value: `$${stats?.revenue}`, icon: DollarSign, color: "text-green-400", bg: "bg-green-400/10" },
          { label: "Pending Submissions", value: stats?.submissionsPending, icon: FileText, color: "text-amber-400", bg: "bg-amber-400/10" },
        ].map((item, idx) => (
          <div key={idx} className="glass p-6 rounded-3xl border border-white/5 space-y-4">
            <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center`}>
              <item.icon className={`w-6 h-6 ${item.color}`} />
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{item.label}</p>
              <h3 className="text-3xl font-black mt-1 font-outfit">{item.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          <h2 className="text-xl font-bold">Quick Management</h2>
          <div className="space-y-3">
             <button className="w-full flex items-center justify-between p-4 rounded-2xl border border-white/5 hover:bg-white/5 transition-all group">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <UserCheck className="w-5 h-5 text-primary" />
                   </div>
                   <span className="text-sm font-semibold">Review Submissions</span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-all" />
             </button>
             <button className="w-full flex items-center justify-between p-4 rounded-2xl border border-white/5 hover:bg-white/5 transition-all group">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-primary" />
                   </div>
                   <span className="text-sm font-semibold">Export Analytics</span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-all" />
             </button>
          </div>
        </div>

        {/* Growth Chart Placeholder */}
        <div className="lg:col-span-2 glass p-8 rounded-[40px] border border-white/5 relative overflow-hidden flex flex-col justify-center min-h-[300px]">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold">Enrollment Velocity</h3>
              <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">+24% this month</span>
           </div>
           {/* Mock Chart */}
           <div className="flex items-end justify-between gap-2 h-32 px-4">
              {[40, 60, 45, 70, 50, 85, 95].map((h, i) => (
                <div key={i} className="flex-grow bg-primary/20 rounded-t-lg transition-all hover:bg-primary group relative" style={{ height: `${h}%` }}>
                   <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black text-[10px] font-bold px-2 py-1 rounded">
                      {h}
                   </div>
                </div>
              ))}
           </div>
           <p className="text-center text-[10px] text-muted-foreground font-medium uppercase tracking-widest mt-6">Active learning sessions across 7 days</p>
        </div>
      </div>
    </div>
  );
}
