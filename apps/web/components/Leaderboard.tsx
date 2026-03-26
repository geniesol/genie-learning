"use client";

import { useState, useEffect } from "react";
import { API_BASE_URL } from "../utils/api";
import { Trophy, Medal, Crown, TrendingUp, User, Star } from "lucide-react";

export default function Leaderboard() {
  const [rankings, setRankings] = useState<any[]>([]);
  const [myStats, setMyStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [rankRes, statsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/gamification/leaderboard`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }),
        fetch(`${API_BASE_URL}/gamification/my-stats`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }),
      ]);
      
      const rankData = await rankRes.json();
      const statsData = await statsRes.json();
      
      setRankings(rankData);
      setMyStats(statsData);
    } catch (err) {
      console.error("Failed to fetch leaderboard data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="h-96 flex items-center justify-center">Loading Global Rankings...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-outfit font-black flex items-center justify-center gap-4">
          <Trophy className="text-amber-400 w-12 h-12" />
          Global Leaderboard
        </h1>
        <p className="text-muted-foreground text-lg">Top learners reaching for the stars.</p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid md:grid-cols-3 gap-8 items-end pt-12">
        {(() => {
          const positions = [
            { pos: "2nd", bg: "bg-slate-300/20", border: "border-slate-300/30", text: "text-slate-300", height: "h-40" },
            { pos: "1st", bg: "bg-amber-400/20", border: "border-amber-400/30", text: "text-amber-400", height: "h-56", icon: Crown },
            { pos: "3rd", bg: "bg-orange-400/20", border: "border-orange-400/30", text: "text-orange-400", height: "h-32" }
          ];
          const displayOrder = [1, 0, 2];
          
          return displayOrder.map((rankIdx, i) => {
            const podiumUser = rankings[rankIdx];
            const position = positions[i];
            if (!position) return null;
            const Icon = position.icon;
            
            if (!podiumUser) {
              return (
                <div key={`empty-${i}`} className="flex flex-col items-center space-y-4 opacity-50">
                   <div className={"w-full " + position.height + " " + position.bg + " border-x border-t " + position.border + " rounded-t-[40px] flex flex-col items-center justify-center gap-2"}>
                      <span className={"text-4xl font-black " + position.text}>{position.pos}</span>
                   </div>
                </div>
              );
            }

          return (
            <div key={podiumUser.id} className="flex flex-col items-center space-y-4">
               <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xl font-black relative">
                  {podiumUser.name?.substring(0, 1)}
                  {Icon && <Icon className="absolute -top-6 w-8 h-8 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />}
               </div>
               <div className="text-center">
                  <div className="font-bold text-white">{podiumUser.name}</div>
                  <div className="text-xs font-black text-primary uppercase">{podiumUser.xp} XP</div>
               </div>
               <div className={"w-full " + position.height + " " + position.bg + " border-x border-t " + position.border + " rounded-t-[40px] flex flex-col items-center justify-center gap-2"}>
                  <span className={"text-4xl font-black " + position.text}>{position.pos}</span>
               </div>
            </div>
          );
        })
        })()}
      </div>

      {/* My Rank Stats */}
      {myStats && (
        <div className="glass p-8 rounded-[40px] border border-primary/20 bg-primary/5 flex items-center justify-between">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-3xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                 <Star className="text-white w-8 h-8 fill-white" />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-primary">Your Current Standing</p>
                 <h3 className="text-2xl font-black">Rank #{myStats.rank}</h3>
              </div>
           </div>
           <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total Experience</p>
              <h3 className="text-2xl font-black text-white">{myStats.xp} XP</h3>
           </div>
        </div>
      )}

      {/* Full List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold px-4 flex items-center gap-2">
           <TrendingUp className="w-5 h-5 text-primary" />
           Learning Velocity
        </h2>
        <div className="glass rounded-[40px] border border-white/5 overflow-hidden">
           {rankings.map((user, idx) => (
             <div key={user.id} className="flex items-center justify-between p-6 border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                <div className="flex items-center gap-6">
                   <span className="w-8 text-center text-sm font-black text-muted-foreground group-hover:text-primary transition-colors">
                      {idx + 1}
                   </span>
                   <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold border border-white/10">
                      {user.name?.substring(0, 2).toUpperCase()}
                   </div>
                   <span className="font-bold">{user.name}</span>
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-sm font-black text-primary">{user.xp}</span>
                   <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">XP</span>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
