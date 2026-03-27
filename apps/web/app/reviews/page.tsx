import { Star, Quote, ChevronRight, CheckCircle2 } from "lucide-react";
import { GlassCard, BadgePill } from "@/components/PremiumUI";

const REVIEWS = [
  {
    name: "Michael Chen",
    role: "Solution Architect at AWS",
    content: "The Advanced AI Systems course completely changed how I approach RAG architectures. The hands-on labs were exceptionally well-designed.",
    rating: 5,
    course: "Advanced AI Systems Engineering"
  },
  {
    name: "Sarah Jenkins",
    role: "Digital Marketing Lead",
    content: "Finally a marketing course that focuses on data and ROI rather than just surface-level social media. Worth every penny.",
    rating: 5,
    course: "Digital Marketing Specialist"
  },
  {
    name: "Dr. Robert Fox",
    role: "Senior Researcher",
    content: "The Genomics program is world-class. The algorithms section were deep and challenging. Highly recommended for professionals.",
    rating: 4,
    course: "Next-Gen Genomics & Bioinformatics"
  }
];

export default function ReviewsPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto">
        <div className="max-w-3xl mb-24">
          <BadgePill className="mb-6">Student Success</BadgePill>
          <h1 className="text-6xl md:text-7xl font-heading font-black mb-8 leading-[1] tracking-tighter">
            Real Stories. <br />
            <span className="text-gradient">Real Impact.</span>
          </h1>
          <p className="text-xl text-muted-foreground font-medium">Join 8 million+ learners who have transformed their careers with Genie Learning.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REVIEWS.map((review, i) => (
            <GlassCard key={i} className="p-10 border-white/5 relative flex flex-col h-full bg-white/[0.02]">
              <div className="flex gap-1 mb-6 text-primary">
                {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary" />)}
              </div>
              <Quote className="w-10 h-10 text-primary/20 absolute top-10 right-10" />
              <p className="text-lg font-medium leading-relaxed mb-8 flex-grow italic">"{review.content}"</p>
              <div className="pt-8 border-t border-white/5">
                <div className="font-heading font-black text-xl mb-1">{review.name}</div>
                <div className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-4">{review.role}</div>
                <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 w-fit px-3 py-1 rounded-full border border-primary/10">
                   {review.course}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
