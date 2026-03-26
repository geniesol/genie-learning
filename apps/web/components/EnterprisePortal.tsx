"use client";

import { useState, useEffect } from "react";
import { 
  Building2, 
  Users, 
  CreditCard, 
  TrendingUp, 
  Plus, 
  Search, 
  ArrowUpRight,
  MoreVertical,
  Activity,
  CheckCircle2,
  PieChart,
  Layout
} from "lucide-react";
import { API_BASE_URL } from "../utils/api";

export default function EnterprisePortal() {
  const [activeTab, setActiveTab] = useState("overview");
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/b2b/dashboard`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to fetch B2B data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="h-96 flex items-center justify-center animate-pulse text-muted-foreground font-bold">Loading Corporate Portal...</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
             <Building2 className="w-3 h-3" />
             Corporate Partner Portal
           </div>
           <h1 className="text-4xl font-black font-outfit">{data?.company?.name || 'Your Company'}</h1>
           <p className="text-muted-foreground max-w-xl">Monitor your organization's skill growth, manage team licenses, and optimize your global L&D strategy.</p>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="glass px-6 py-4 rounded-3xl border border-white/5 flex items-center gap-6">
              <div className="space-y-1">
                 <div className="text-[10px] font-bold text-muted-foreground uppercase">License Usage</div>
                 <div className="text-xl font-black">{data?.metrics?.seatsRemaining} <span className="text-xs text-muted-foreground font-normal">seats left</span></div>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <button className="bg-primary text-white p-3 rounded-2xl hover:scale-105 transition-all shadow-lg shadow-primary/20">
                <Plus className="w-5 h-5" />
              </button>
           </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Employees", value: data?.metrics?.totalEmployees || 0, icon: Users, trend: "+12%", color: "text-blue-500" },
          { label: "Active Learners", value: "85%", icon: Activity, trend: "Target: 90%", color: "text-emerald-500" },
          { label: "Skills Acquired", value: "1,240", icon: CheckCircle2, trend: "+340 this month", color: "text-amber-500" },
          { label: "ROI Index", value: "4.8x", icon: TrendingUp, trend: "Industry High", color: "text-primary" },
        ].map((stat, i) => (
          <div key={i} className="glass p-8 rounded-[40px] border border-white/5 space-y-4 relative overflow-hidden group hover:border-primary/20 transition-all">
             <div className={`p-3 rounded-2xl bg-white/5 w-fit ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
             </div>
             <div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</div>
                <div className="text-3xl font-black mt-1">{stat.value}</div>
             </div>
             <div className="text-[10px] font-bold text-muted-foreground">{stat.trend}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-white/5 pb-4">
        {["overview", "teams", "licenses", "analytics"].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-xl text-sm font-bold capitalize transition-all ${activeTab === tab ? 'bg-primary text-white' : 'text-muted-foreground hover:text-white'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      {activeTab === 'teams' && (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
             {data?.company?.teams?.map((team: any, i: number) => (
               <div key={i} className="glass p-8 rounded-[40px] border border-white/5 flex items-center justify-between group hover:bg-white/5 transition-all">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-[24px] bg-white/5 flex items-center justify-center text-2xl font-black group-hover:bg-primary/20 transition-all">
                       {team.name[0]}
                    </div>
                    <div>
                       <h3 className="text-xl font-bold">{team.name}</h3>
                       <p className="text-sm text-muted-foreground">{team.members.length} members • {team.manager?.email || 'N/A manager'}</p>
                    </div>
                  </div>
                  <button className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all">
                     <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
                  </button>
               </div>
             ))}
             
             <button className="w-full py-8 rounded-[40px] border-2 border-dashed border-white/5 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all flex flex-col items-center justify-center gap-2 font-bold bg-white/2 cursor-pointer">
                <Plus className="w-8 h-8" />
                Add New Department Team
             </button>
          </div>

          <div className="space-y-6">
             <div className="glass p-8 rounded-[40px] border border-white/5 space-y-6">
                <h3 className="font-bold flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-primary" />
                  Skill Composition
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "AI Engineering", value: 75 },
                    { label: "Data Science", value: 45 },
                    { label: "Cloud Arch", value: 30 },
                  ].map((skill, i) => (
                    <div key={i} className="space-y-2">
                       <div className="flex justify-between text-[10px] font-bold">
                          <span>{skill.label}</span>
                          <span>{skill.value}%</span>
                       </div>
                       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${skill.value}%` }} />
                       </div>
                    </div>
                  ))}
                </div>
             </div>

             <div className="glass p-8 rounded-[40px] border border-white/5 space-y-4">
                <h3 className="font-bold">Quarterly Report</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Your team has increased productivity by 22% since deploying the Advanced AI Systems curriculum.</p>
                <button className="w-full py-4 rounded-2xl bg-white/5 font-bold text-sm">Download PDF</button>
             </div>
          </div>
        </div>
      )}

      {activeTab === 'overview' && (
        <div className="glass p-12 rounded-[48px] border border-white/5 flex flex-col items-center justify-center space-y-6 text-center">
            <Layout className="w-16 h-16 text-primary/40" />
            <h2 className="text-2xl font-black">Ready to scale your workforce?</h2>
            <p className="text-muted-foreground max-w-lg">Genie Learning Enterprise provides dedicated learning paths, private cohort forums, and AI-driven skill mapping at scale.</p>
            <button className="bg-primary text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-primary/30 hover:scale-105 transition-all">
               Upgrade Enterprise Licenses
            </button>
        </div>
      )}
    </div>
  );
}
