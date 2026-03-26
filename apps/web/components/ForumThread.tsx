"use client";

import { useState, useEffect } from "react";
import { API_BASE_URL } from "../utils/api";
import { ArrowLeft, Send, User, Clock, Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function ForumThread() {
  const { id } = useParams();
  const router = useRouter();
  const [thread, setThread] = useState<any>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchThread();
  }, [id]);

  const fetchThread = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/forum/threads/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setThread(data);
    } catch (err) {
      console.error("Failed to fetch thread:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/forum/threads/${id}/replies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ content: replyContent }),
      });

      if (res.ok) {
        setReplyContent("");
        fetchThread();
      }
    } catch (err) {
      console.error("Failed to post reply:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="h-96 flex items-center justify-center">Loading Discussion...</div>;
  if (!thread) return <div>Thread not found.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-32">
      <Link href="/dashboard/forum" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group">
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </div>
        Back to Academy
      </Link>

      <div className="space-y-6">
        {/* Original Post */}
        <div className="glass p-8 md:p-12 rounded-[40px] border border-white/5 space-y-6 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="flex items-center gap-4 text-xs text-muted-foreground uppercase tracking-widest font-black">
            <span className="text-primary">Research Discussion</span>
            <ChevronRight className="w-3 h-3" />
            <span>{new Date(thread.createdAt).toLocaleDateString()}</span>
          </div>
          <h1 className="text-4xl font-black font-outfit">{thread.title}</h1>
          <div className="flex items-center gap-4 py-4 border-y border-white/5">
             <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary font-black text-xl">
                {thread.author?.name?.substring(0, 1)}
             </div>
             <div>
                <div className="font-bold text-white">{thread.author?.name}</div>
                <div className="text-xs text-muted-foreground">Original Poster</div>
             </div>
          </div>
          <div className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {thread.content}
          </div>
        </div>

        {/* Replies */}
        <div className="space-y-6 pt-12">
          <h2 className="text-2xl font-bold flex items-center gap-3 px-4">
             <Sparkles className="w-6 h-6 text-primary" />
             {thread.replies?.length || 0} Peer Reflections
          </h2>
          
          <div className="space-y-4">
            {thread.replies?.map((reply: any) => (
              <div key={reply.id} className="glass p-8 rounded-[32px] border border-white/5 flex gap-6 hover:bg-white/[0.02] transition-colors group">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold border border-white/10 group-hover:border-primary/30 transition-colors">
                    {reply.author?.name?.substring(0, 2).toUpperCase()}
                  </div>
                </div>
                <div className="space-y-3 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{reply.author?.name}</span>
                    <span className="text-[10px] text-muted-foreground uppercase font-black">{new Date(reply.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{reply.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reply Form */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 z-50">
          <form onSubmit={handleReply} className="glass p-4 rounded-3xl border border-primary/20 bg-black/80 backdrop-blur-xl shadow-2xl flex gap-4">
            <input 
              type="text" 
              placeholder="Contribute to the discussion..." 
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            <button 
              type="submit" 
              disabled={isSubmitting || !replyContent.trim()}
              className="bg-primary text-white p-4 rounded-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center shadow-lg shadow-primary/20"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
