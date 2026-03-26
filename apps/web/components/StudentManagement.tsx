"use client";

import { useState, useEffect } from "react";
import { API_BASE_URL } from "../utils/api";
import { Mail, Calendar, CheckCircle2, MoreHorizontal, Filter, Search } from "lucide-react";

export default function StudentManagement() {
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/instructor/students`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("Failed to fetch students:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="h-96 flex items-center justify-center">Loading Student List...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-outfit font-black">Student Management</h1>
          <p className="text-muted-foreground text-sm">Manage enrollments and track individual performance.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-all">
              <Filter className="w-4 h-4" />
              Filters
           </button>
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                 type="text" 
                 placeholder="Search student..."
                 className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
           </div>
        </div>
      </div>

      <div className="glass rounded-[40px] border border-white/5 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Student</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Courses</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Join Date</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Last Action</th>
              <th className="p-6"></th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-xs font-black border border-primary/20">
                      {student.name?.substring(0, 2).toUpperCase() || "ST"}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{student.name}</div>
                      <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                         <Mail className="w-3 h-3" />
                         {student.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                   <div className="flex flex-wrap gap-1">
                      {student.enrollments.slice(0, 2).map((e: any) => (
                        <span key={e.id} className="text-[9px] font-bold py-1 px-2 rounded-md bg-white/5 border border-white/10 whitespace-nowrap">
                           {e.course.title}
                        </span>
                      ))}
                      {student.enrollments.length > 2 && (
                        <span className="text-[9px] font-bold py-1 px-2 rounded-md bg-white/5">+{student.enrollments.length - 2}</span>
                      )}
                   </div>
                </td>
                <td className="p-6">
                   <div className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      {new Date(student.createdAt).toLocaleDateString()}
                   </div>
                </td>
                <td className="p-6">
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                      <span className="text-xs font-bold text-white">Active Now</span>
                   </div>
                </td>
                <td className="p-6 text-right">
                  <button className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center transition-all">
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {students.length === 0 && (
           <div className="p-20 text-center space-y-4">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                 <CheckCircle2 className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-medium">No students enrolled yet.</p>
           </div>
        )}
      </div>
    </div>
  );
}
