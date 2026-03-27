import { Zap, ChevronDown, Sparkles } from "lucide-react";
import Link from "next/link";
import SearchBar from "./SearchBar";

export function Header() {
  return (
    <>
      {/* Promo Banner */}
      <div className="fixed top-0 w-full z-[60] py-2 bg-gradient-to-r from-accent to-primary text-white text-[10px] font-black uppercase tracking-[0.2em] text-center">
        <div className="container mx-auto px-6 flex items-center justify-center gap-4">
          <Sparkles className="w-3 h-3" />
          Special Offer: Get 20% Off all AI Masterclasses. Use Code: GENIE20
          <Sparkles className="w-3 h-3" />
        </div>
      </div>

      <header className="fixed top-8 w-full z-50 glass border-b border-white/5 h-20">
        <div className="container mx-auto px-6 h-full flex items-center justify-between gap-8">
          <div className="flex items-center gap-8 flex-grow">
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
                <Zap className="text-white w-6 h-6" />
              </div>
              <span className="font-heading font-black text-2xl tracking-tighter text-gradient leading-none">Genie</span>
            </Link>
            
            <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/5 transition-colors font-semibold text-sm">
              All Courses <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </button>

            <SearchBar />
          </div>
          
          <nav className="hidden lg:flex gap-8 font-semibold text-[13px] uppercase tracking-wider mx-4">
            <Link href="/courses" className="hover:text-primary transition-colors">Explorer</Link>
            <Link href="/corporate" className="hover:text-primary transition-colors">Corporate</Link>
            <Link href="/reviews" className="hover:text-primary transition-colors">Reviews</Link>
          </nav>
          
          <div className="flex gap-4 shrink-0 items-center">
            <Link href="/login" className="px-4 py-2 text-sm font-bold hover:text-primary transition-colors">Sign In</Link>
            <Link href="/register" className="bg-primary text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all">
              Join Now
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
