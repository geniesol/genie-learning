"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Play, FileText, HelpCircle, FileCheck } from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  type: string;
  durationMinutes: number;
}

interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface CurriculumProps {
  sections: Section[];
}

export function Curriculum({ sections }: CurriculumProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    sections.reduce((acc, section, index) => ({ ...acc, [section.id]: index === 0 }), {})
  );

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "video": return <Play className="w-4 h-4" />;
      case "text": return <FileText className="w-4 h-4" />;
      case "quiz": return <HelpCircle className="w-4 h-4" />;
      case "assignment": return <FileCheck className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-4">
      {sections.map((section, index) => (
        <div key={section.id} className="glass rounded-2xl border border-white/5 overflow-hidden">
          <button
            onClick={() => toggleSection(section.id)}
            className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-4 text-left">
              <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-xs font-black text-primary">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h4 className="font-outfit font-black text-lg">{section.title}</h4>
            </div>
            {expandedSections[section.id] ? <ChevronDown className="w-5 h-5 text-muted-foreground" /> : <ChevronRight className="w-5 h-5 text-muted-foreground" />}
          </button>
          
          {expandedSections[section.id] && (
            <div className="px-6 pb-6 space-y-3">
              {section.lessons.map((lesson) => (
                <div key={lesson.id} className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="text-muted-foreground">
                      {getIcon(lesson.type)}
                    </div>
                    <span className="text-sm font-medium">{lesson.title}</span>
                  </div>
                  <span className="text-[10px] font-black tracking-widest text-muted-foreground opacity-60">
                    {lesson.durationMinutes} MIN
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
