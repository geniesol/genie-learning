import { Zap } from "lucide-react";
import Link from "next/link";
import SearchBar from "./SearchBar";

export function Header() {
  return (
    <header className="fixed top-0 w-full z-50 glass border-b border-white/5">
      <div className="container mx-auto px-6 h-18 flex items-center justify-between">
        <div className="flex items-center gap-10 flex-grow">
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
              <Zap className="text-white w-6 h-6" />
            </div>
            <span className="font-outfit font-bold text-2xl tracking-tighter text-gradient">Genie</span>
          </Link>
          <SearchBar />
        </div>
        
        <nav className="hidden lg:flex gap-10 font-medium text-sm mx-10">
          <Link href="/courses" className="hover:text-primary transition-all duration-300 hover:tracking-wide">Courses</Link>
          <Link href="/dashboard" className="hover:text-primary transition-all duration-300 hover:tracking-wide">Dashboard</Link>
        </nav>
        
        <div className="flex gap-6 shrink-0 items-center">
          <Link href="/login" className="px-4 py-2 text-sm font-semibold hover:text-primary transition-colors">Sign In</Link>
          <Link href="/register" className="bg-primary text-white px-7 py-2.5 rounded-full text-sm font-bold shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all active:scale-95">
            Join Platform
          </Link>
        </div>
      </div>
    </header>
  );
}
