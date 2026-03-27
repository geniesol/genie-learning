"use client";

import { useState } from "react";
import { GlassCard, BadgePill, PremiumButton } from "./PremiumUI";
import { PlayCircle, Globe, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  lessonsCount: number;
  metadata?: {
    level?: string;
    category?: string;
  };
}

interface CategoryExplorerProps {
  courses: Course[];
}

const CATEGORIES = [
  "Generative AI",
  "AI & Machine Learning",
  "Data Science",
  "Digital Marketing",
  "Cloud Computing",
  "Cyber Security"
];

export function CategoryExplorer({ courses }: CategoryExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0] || "Generative AI");

  const filteredCourses = courses.filter((course: Course) => 
    course.metadata?.category?.toLowerCase() === activeCategory.toLowerCase() ||
    // Fallback for demo: show all if no category match
    (activeCategory === "Generative AI" && course.title.toLowerCase().includes("ai"))
  );

  return (
    <div className="flex flex-col lg:flex-row gap-16 items-start">
      {/* Left Sidebar - Categories */}
      <div className="lg:w-1/4 flex flex-col gap-2 sticky top-32">
        <h2 className="text-4xl font-heading font-black mb-10 tracking-tight text-foreground leading-[1.1]">
          Explore Our <br />
          <span className="text-primary">Programs</span>
        </h2>
        <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible no-scrollbar pb-4 lg:pb-0">
          {CATEGORIES.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap lg:whitespace-normal text-left px-6 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all border
                ${activeCategory === cat 
                  ? "bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-105 z-10" 
                  : "text-muted-foreground border-white/5 hover:bg-white/5 hover:text-foreground hover:border-white/10"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Right Grid - Programs Mapping */}
      <div className="lg:w-3/4">
        <div className="grid md:grid-cols-2 gap-8 min-h-[600px] content-start">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <GlassCard 
                key={course.id} 
                className="p-8 border-white/5 flex flex-col justify-between group hover:border-primary/20 transition-all cursor-pointer h-full animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                     <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black uppercase text-[10px] tracking-widest">
                        {course.metadata?.category?.charAt(0) || "G"}
                     </div>
                     <BadgePill variant="outline" className="opacity-60">{course.metadata?.level}</BadgePill>
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading font-black mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium line-clamp-2">{course.description}</p>
                  </div>
                  <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                     <span className="flex items-center gap-1.5"><PlayCircle className="w-3.5 h-3.5" /> {course.lessonsCount} Modules</span>
                     <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> Online Bootcamp</span>
                  </div>
                </div>
                <div className="pt-8 border-t border-white/5 mt-8 flex items-center justify-between">
                   <span className="text-xl font-black font-heading text-foreground">${course.price}</span>
                   <Link href={`/courses/${course.slug}`}>
                      <PremiumButton size="sm" variant="ghost" className="group/btn">
                        View Program <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </PremiumButton>
                   </Link>
                </div>
              </GlassCard>
            ))
          ) : (
             <div className="col-span-full py-20 text-center space-y-4">
                <div className="text-muted-foreground font-black uppercase tracking-[0.3em]">Upcoming Programs</div>
                <p className="text-sm text-muted-foreground">We are curating the best curriculum for {activeCategory || "this category"}. Stay tuned!</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
