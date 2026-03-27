export const dynamic = 'force-dynamic';
import { CourseList } from "@/components/CourseList";
import { Zap } from "lucide-react";
import { getApiUrl } from "@/utils/api";

async function getCourses() {
  try {
    const res = await fetch(`${getApiUrl()}/courses`, { 
      cache: 'no-store'
    });
    if (!res.ok) return [];
    
    const text = await res.text();
    if (!text) return [];
    
    return JSON.parse(text);
  } catch (error) {
    console.warn("Failed to fetch courses:", error);
    return [];
  }
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto">
        <div className="mb-16 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6">
            <Zap className="w-3 h-3" />
            <span>Master Your Future</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-outfit font-black mb-6">
            Explore <span className="text-gradient">Professional</span> Courses
          </h1>
          <p className="text-muted-foreground text-lg italic opacity-80">
            Choose from our curated selection of high-impact courses designed for the modern digital economy. Powered by adaptive AI pathways.
          </p>
        </div>

        <CourseList initialCourses={courses} />
      </div>
    </div>
  );
}
