"use client";

import { useState, useEffect } from "react";
import { API_BASE_URL } from "../utils/api";
import { Users, Search, Filter, Shield, MoreVertical, Edit2, Trash2, Key } from "lucide-react";

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/users/${userId}/role`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ role: newRole }),
      });
      if (res.ok) fetchUsers();
    } catch (err) {
      console.error("Failed to update role:", err);
    }
  };

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <div className="h-96 flex items-center justify-center">Loading User Directory...</div>;

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black font-outfit flex items-center gap-3">
            <Shield className="w-10 h-10 text-primary" />
            User Management
          </h1>
          <p className="text-muted-foreground">Control platform access levels and security roles.</p>
        </div>
      </div>

      <div className="glass p-8 rounded-[40px] border border-white/5 space-y-6">
        <div className="relative group max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search by email..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="pb-4 text-xs font-black uppercase text-muted-foreground tracking-widest pl-4">User</th>
                <th className="pb-4 text-xs font-black uppercase text-muted-foreground tracking-widest">Role</th>
                <th className="pb-4 text-xs font-black uppercase text-muted-foreground tracking-widest">Global XP</th>
                <th className="pb-4 text-xs font-black uppercase text-muted-foreground tracking-widest">Joined</th>
                <th className="pb-4 text-xs font-black uppercase text-muted-foreground tracking-widest text-right pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="py-6 pl-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xs font-bold group-hover:border-primary/30 border border-white/10 transition-all">
                        {user.email.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="font-bold">{user.email}</div>
                    </div>
                  </td>
                  <td className="py-6">
                    <select 
                      value={user.role}
                      onChange={(e) => updateUserRole(user.id, e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-bold outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="student" className="bg-slate-900">Student</option>
                      <option value="instructor" className="bg-slate-900">Instructor</option>
                      <option value="admin" className="bg-slate-900">Admin</option>
                    </select>
                  </td>
                  <td className="py-6">
                    <div className="flex items-center gap-2">
                       <Key className="w-3 h-3 text-amber-500" />
                       <span className="font-mono text-sm">{user.xp}</span>
                    </div>
                  </td>
                  <td className="py-6 text-xs text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-6 text-right pr-4">
                    <button className="p-2 rounded-xl hover:bg-white/10 text-muted-foreground hover:text-white transition-colors">
                       <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
