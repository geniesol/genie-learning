"use client";

import { useState, useEffect } from "react";
import { API_BASE_URL } from "../utils/api";
import { Sparkles, Plus, Search, Filter, User, Clock, ArrowRight, Info, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function ForumList() {
  const [threads, setThreads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [newThread, setNewThread] = useState({ title: "", content: "", courseId: "" });
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    fetchThreads();
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/courses`);
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    }
  };

  const handleCreateThread = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/forum/threads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newThread),
      });

      const data = await res.json();
      if (res.ok) {
        setIsCreating(false);
        setNewThread({ title: "", content: "", courseId: "" });
        fetchThreads();
      } else {
        alert(data.message || "Failed to create thread");
      }
    } catch (err) {
      console.error("Error creating thread:", err);
    }
  };

  const fetchThreads = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/forum/threads`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setThreads(data);
    } catch (err) {
      console.error("Failed to fetch threads:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredThreads = threads.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <div className="h-96 flex items-center justify-center">Loading Community Discussions...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black font-outfit flex items-center gap-3">
            <Sparkles className="w-10 h-10 text-primary" />
            Research & Academic Forum
          </h1>
          <p className="text-muted-foreground">Expert discussions limited to course material, projects, and research.</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
        >
          <Plus className="w-5 h-5" />
          New Academic Thread
        </button>
      </div>

      {isCreating && (
        <div className="glass p-8 rounded-[40px] border border-primary/20 bg-primary/5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Initiate Discussion</h2>
            <button onClick={() => setIsCreating(false)} className="text-muted-foreground hover:text-white">Cancel</button>
          </div>
          <form onSubmit={handleCreateThread} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-muted-foreground ml-1">Academic Context (Mandatory)</label>
                <select 
                  required
                  value={newThread.courseId}
                  onChange={(e) => setNewThread({ ...newThread, courseId: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="" className="bg-slate-900">Select a Course or Project...</option>
                  {courses.map(c => (
                    <option key={c.id} value={c.id} className="bg-slate-900">{c.title}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-muted-foreground ml-1">Research Title</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g., Deep Dive into Neural Architecture..." 
                  value={newThread.title}
                  onChange={(e) => setNewThread({ ...newThread, title: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-muted-foreground ml-1">Inquiry or Analysis</label>
              <textarea 
                required
                rows={4}
                placeholder="Share your technical analysis or ask a specific academic question..." 
                value={newThread.content}
                onChange={(e) => setNewThread({ ...newThread, content: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-[10px] text-muted-foreground flex items-center gap-2">
                 <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                 All posts are pre-moderated by AI to ensure academic decorum.
              </div>
              <button type="submit" className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-primary/20">
                Submit for Review
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-3 space-y-4">
          {/* Support Redirection Banner */}
          <div className="p-4 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center gap-4 text-xs text-amber-500 font-medium">
             <Info className="w-4 h-4 flex-shrink-0" />
             Important: This forum is strictly for academic and project-related discussions. For institute complaints or administrative support, please email support@genielearning.com.
          </div>

          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search academic papers or project discussions..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
            />
          </div>

          <div className="space-y-4">
            {filteredThreads.map((thread) => (
              <Link 
                key={thread.id} 
                href={`/dashboard/forum/${thread.id}`}
                className="block glass p-6 rounded-[32px] border border-white/5 hover:border-primary/30 hover:bg-primary/5 transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-3">
                    <h2 className="text-xl font-bold group-hover:text-primary transition-colors">{thread.title}</h2>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5 font-medium">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary">
                          {thread.author?.name?.substring(0, 1)}
                        </div>
                        {thread.author?.name}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(thread.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                        <Sparkles className="w-3 h-3" />
                        {thread._count?.replies || 0} replies
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass p-6 rounded-[32px] border border-white/5 space-y-4">
            <h3 className="font-bold flex items-center gap-2">
              <Filter className="w-4 h-4 text-primary" />
              Categories
            </h3>
            <div className="space-y-2">
              {["General Discussion", "Course Help", "Project Showcase", "Career Advice", "Announcements"].map((cat) => (
                <button key={cat} className="w-full text-left px-4 py-2 rounded-xl text-sm hover:bg-white/5 text-muted-foreground hover:text-white transition-colors">
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="glass p-6 rounded-[32px] border border-white/5 bg-gradient-to-br from-primary/10 to-transparent">
            <h3 className="font-bold text-white mb-2">Community Rules</h3>
            <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-4">
              <li>Be respectful and inclusive.</li>
              <li>No spam or self-promotion.</li>
              <li>Stay on topic in course threads.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
