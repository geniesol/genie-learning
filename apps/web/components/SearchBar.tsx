"use client";

import { useState, useEffect, useRef } from "react";
import { API_BASE_URL } from "../utils/api";
import { Search, Loader2, Book, Play, Sparkles } from "lucide-react";
import Link from "next/link";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length > 2) {
        handleSearch();
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSearch = async () => {
    setIsLoading(true);
    setIsOpen(true);
    try {
      const res = await fetch(`${API_BASE_URL}/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex-grow max-w-xl mx-8" ref={dropdownRef}>
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 2 && setIsOpen(true)}
          placeholder="Search Intelligence Catalog..."
          className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-muted-foreground/50 hover:bg-white/[0.05]"
        />
        {isLoading && (
          <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary animate-spin" />
        )}
      </div>

      {isOpen && (results.length > 0 || isLoading) && (
        <div className="absolute top-full left-0 w-full mt-3 glass border border-white/5 rounded-3xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] animate-reveal z-50">
          <div className="p-3 space-y-2">
            <div className="px-4 py-2 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-40">Intelligence Sync</span>
              <Sparkles className="w-3 h-3 text-accent/40" />
            </div>
            
            {results.map((result, idx) => (
              <Link
                key={idx}
                href={result.type === 'course' ? `/courses/${result.slug}` : `/learn/${result.slug}`}
                onClick={() => setIsOpen(false)}
                className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/[0.03] transition-all group border border-transparent hover:border-white/5"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-all border border-white/5">
                  {result.type === 'course' ? (
                    <Book className="w-5 h-5 text-primary" />
                  ) : (
                    <Play className="w-5 h-5 text-primary" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-black font-outfit line-clamp-1 group-hover:text-primary transition-colors">{result.title}</div>
                  <div className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-1 opacity-50">{result.type}</div>
                </div>
              </Link>
            ))}
            
            {!isLoading && results.length === 0 && (
              <div className="p-12 text-center">
                <div className="text-sm font-medium text-muted-foreground mb-1">No matches found in knowledge base</div>
                <div className="text-[10px] uppercase font-black tracking-widest text-primary">Try a different focus</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
