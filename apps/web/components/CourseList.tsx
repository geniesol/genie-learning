"use client";

import { useState } from "react";
import { CourseCard } from "./CourseCard";
import { Search, Filter } from "lucide-react";

interface CourseListProps {
  initialCourses: any[];
}

export function CourseList({ initialCourses }: CourseListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "AI", "Design", "Genomics"];

  const filteredCourses = initialCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || course.metadata?.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="relative w-full md:max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
          />
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          <Filter className="w-4 h-4 text-muted-foreground mr-2" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all border ${
                activeCategory === category
                  ? "bg-primary text-white border-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]"
                  : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course: any) => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center glass rounded-3xl border border-border">
            <p className="text-muted-foreground">No courses match your criteria. Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
