import { BookOpen, Clock, Globe, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { GlassCard, BadgePill } from "./PremiumUI";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    regions?: string[];
    metadata?: any;
    category?: string;
    duration?: string;
    level?: string;
  };
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <GlassCard variant="dark" className="group p-0 border-white/5 overflow-hidden flex flex-col h-full shadow-[0_16px_48px_-16px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-2">
      <div className="relative h-56 bg-[#0a0a0b] overflow-hidden grayscale-[0.2] transition-all duration-700 group-hover:grayscale-0">
        {/* Course image: Dynamic Texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/10 to-transparent mix-blend-overlay opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-3xl bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
            <BookOpen className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
          </div>
        </div>
        
        {/* Region Badges */}
        <div className="absolute top-5 left-5 flex flex-wrap gap-2">
          {(course.regions || ["Global"]).map((region) => (
            <BadgePill key={region} className="bg-black/40 backdrop-blur-md border border-white/10 text-[9px]">
              {region}
            </BadgePill>
          ))}
        </div>
        
        {/* Premium Overlay Tag */}
        {course.metadata?.featured && (
          <div className="absolute top-5 right-5">
             <div className="w-8 h-8 rounded-full bg-accent/20 backdrop-blur-md border border-accent/30 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-accent" />
             </div>
          </div>
        )}
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <div className="mb-4">
           <BadgePill className="bg-primary/10 text-primary border-primary/20 px-2 py-0 text-[10px] mb-3">
             {course.category || course.metadata?.category || "Professional Path"}
           </BadgePill>
           <h3 className="text-2xl font-outfit font-black tracking-tight leading-tight group-hover:text-gradient transition-all duration-500">
             {course.title}
           </h3>
        </div>
        
        <p className="text-muted-foreground text-sm font-medium line-clamp-3 mb-8 flex-grow leading-relaxed opacity-80">
          {course.description || "Master these professional skills with our AI-powered learning path. Engineered for global impact and enterprise-grade results."}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/5">
          <div className="flex items-center gap-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {course.duration || course.metadata?.duration || "Self-Paced"}
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" /> {course.level || course.metadata?.level || "Beginner"}
            </span>
          </div>
          
          <Link 
            href={`/courses/${course.slug}`}
            className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary hover:scale-110 transition-all duration-500 shadow-xl"
          >
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </GlassCard>
  );
}
