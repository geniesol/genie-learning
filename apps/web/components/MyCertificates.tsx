"use client";

import { useState, useEffect } from "react";
import { API_BASE_URL } from "../utils/api";
import { 
  Award, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  Calendar,
  Search,
  LayoutGrid,
  List as ListIcon,
  ShieldCheck
} from "lucide-react";

export default function MyCertificates() {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/certificates`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setCertificates(data);
    } catch (err) {
      console.error("Failed to fetch certificates:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (courseId: string, courseTitle: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/certificates/${courseId}/download`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Certificate-${courseTitle}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  if (isLoading) return <div className="h-96 flex items-center justify-center animate-pulse text-muted-foreground font-bold font-outfit">Retrieving your achievements...</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
             <Award className="w-3 h-3" />
             Verified Credentials
           </div>
           <h1 className="text-4xl font-black font-outfit">My Certificates</h1>
           <p className="text-muted-foreground max-w-xl">Share your success with the world. All certificates are globally verifiable and blockchain-ready.</p>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="bg-white/5 p-1 rounded-xl border border-white/5 flex">
              <button 
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-white/5'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-white/5'}`}
              >
                <ListIcon className="w-4 h-4" />
              </button>
           </div>
           <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search certificates..."
                className="bg-white/5 border border-white/5 rounded-2xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all w-64"
              />
           </div>
        </div>
      </div>

      {certificates.length === 0 ? (
        <div className="glass p-20 rounded-[48px] border border-white/5 flex flex-col items-center justify-center text-center space-y-6">
           <div className="w-24 h-24 rounded-[32px] bg-white/5 flex items-center justify-center text-primary/20">
              <Award className="w-12 h-12" />
           </div>
           <div className="space-y-2">
              <h2 className="text-2xl font-black">No certificates yet</h2>
              <p className="text-muted-foreground max-w-sm">Complete any course with a passing grade on your assignments to earn your first certified credential.</p>
           </div>
           <button className="bg-primary text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-primary/30 hover:scale-105 transition-all">
              Browse Courses
           </button>
        </div>
      ) : (
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-8`}>
          {certificates.map((cert) => (
            <div key={cert.id} className="group glass rounded-[40px] border border-white/5 overflow-hidden hover:border-primary/30 transition-all flex flex-col">
               {/* Preview Area */}
               <div className="h-48 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent relative p-8 flex items-center justify-center border-b border-white/5 overflow-hidden">
                  <Award className="w-20 h-20 text-primary/20 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-emerald-500/20 text-emerald-500 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </div>
               </div>

               {/* Info Area */}
               <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                     <div className="flex items-center gap-2 text-primary">
                        <ShieldCheck className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Global Accreditation</span>
                     </div>
                     <h3 className="text-xl font-black font-outfit group-hover:text-primary transition-colors">{cert.course.title}</h3>
                     
                     <div className="flex items-center gap-4 text-xs text-muted-foreground font-bold">
                        <div className="flex items-center gap-1.5">
                           <Calendar className="w-3.5 h-3.5" />
                           {new Date(cert.issuedAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1.5">
                           <Award className="w-3.5 h-3.5" />
                           ID: {cert.certificateNumber.split('-').pop()}
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-8">
                     <button 
                       onClick={() => handleDownload(cert.courseId, cert.course.title)}
                       className="bg-white text-black p-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all shadow-lg"
                     >
                       <Download className="w-4 h-4" />
                       Download
                     </button>
                     <button className="bg-white/5 text-white p-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                       <ExternalLink className="w-4 h-4" />
                       Verify Online
                     </button>
                  </div>
               </div>
            </div>
          ))}
        </div>
      )}

      {/* Trust Banner */}
      <div className="glass p-8 rounded-[40px] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default group">
         <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] group-hover:text-primary transition-colors">Trusted By Global Industry Leaders</p>
         <div className="flex flex-wrap justify-center gap-12 font-black text-2xl tracking-tighter opacity-30 group-hover:opacity-100 transition-all">
            <span>Microsoft</span>
            <span>Google</span>
            <span>Meta</span>
            <span>Amazon</span>
         </div>
      </div>
    </div>
  );
}
