"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  DollarSign, 
  BookOpen, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Target,
  BarChart3
} from "lucide-react";
import { API_BASE_URL } from "../utils/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/stats`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch admin stats:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="h-96 flex items-center justify-center">Loading Platform Intelligence...</div>;

  return (
    <div className="space-y-8 pb-20">
      <div className="space-y-2">
        <h1 className="text-4xl font-black font-outfit">Platform Intelligence</h1>
        <p className="text-muted-foreground">Master overview of Genie Learning's global performance.</p>
      </div>

      {/* Metric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Revenue", value: `$${stats.overview.totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-emerald-500", trend: "+12.5%" },
          { label: "Active Students", value: stats.overview.activeStudents.toLocaleString(), icon: Users, color: "text-blue-500", trend: "+8.2%" },
          { label: "Total Enrollments", value: stats.overview.totalEnrollments.toLocaleString(), icon: BookOpen, color: "text-purple-500", trend: "+15.1%" },
          { label: "Total Users", value: stats.overview.totalUsers.toLocaleString(), icon: BarChart3, color: "text-orange-500", trend: "+5.4%" },
        ].map((item, i) => (
          <div key={i} className="glass p-6 rounded-[32px] border border-white/5 space-y-4 hover:border-primary/30 transition-all group">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-2xl bg-white/5 ${item.color}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-emerald-500">
                {item.trend}
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-black font-outfit">{item.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest font-bold mt-1">{item.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Popular Courses */}
        <div className="lg:col-span-2 glass p-8 rounded-[40px] border border-white/5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Course Popularity Leaderboard
            </h2>
          </div>
          <div className="space-y-4">
            {stats.popularCourses.map((course: any, i: number) => (
              <div key={course.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                    #{i + 1}
                  </div>
                  <div className="font-bold group-hover:text-primary transition-colors">{course.title}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xl font-black">{course.enrollments}</div>
                  <div className="text-[10px] text-muted-foreground uppercase font-bold">Students</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="glass p-8 rounded-[40px] border border-white/5 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Platform Health
          </h2>
          <div className="space-y-6">
            <HealthItem label="API Response Time" value="42ms" status="healthy" />
            <HealthItem label="AI Service Load" value="18%" status="healthy" />
            <HealthItem label="DB Connectivity" value="Online" status="healthy" />
            <HealthItem label="Storage Usage" value="12.4 GB" status="healthy" />
          </div>
        </div>
      </div>
    </div>
  );
}

function HealthItem({ label, value, status }: { label: string, value: string, status: 'healthy' | 'warning' | 'error' }) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <div className="text-sm font-bold text-white">{label}</div>
        <div className="text-[10px] text-muted-foreground uppercase font-medium">{value}</div>
      </div>
      <div className={`w-2 h-2 rounded-full animate-pulse ${status === 'healthy' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-red-500'}`} />
    </div>
  );
}
