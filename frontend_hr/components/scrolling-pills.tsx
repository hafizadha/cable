// src/components/scrolling-pills.tsx

"use client";
import React from 'react';
import { Button } from "@/components/ui/button";

interface ScrollingPillsProps {
  suggestions: string[];
  onPillClick: (suggestion: string) => void;
}

export const ScrollingPills: React.FC<ScrollingPillsProps> = ({ suggestions, onPillClick }) => {
  return (
    <div
      className="group w-full inline-flex flex-nowrap overflow-hidden py-2 [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]"
    >
      <div className="flex items-center justify-center md:justify-start animate-infinite-scroll group-hover:pause-on-hover">
        {suggestions.map((text, i) => (
          <Button
            key={`pill-a-${i}`}
            variant="outline"
            size="sm"
            onClick={() => onPillClick(text)}
            className="transition-all duration-300 border-slate-200 dark:border-slate-700 hover:border-primary/40 hover:bg-primary/5 shrink-0 mx-2"
          >
            {text}
          </Button>
        ))}
      </div>
      {/* Duplicate the content for a seamless loop */}
      <div className="flex items-center justify-center md:justify-start animate-infinite-scroll group-hover:pause-on-hover" aria-hidden="true">
        {suggestions.map((text, i) => (
          <Button
            key={`pill-b-${i}`}
            variant="outline"
            size="sm"
            onClick={() => onPillClick(text)}
            className="transition-all duration-300 border-slate-200 dark:border-slate-700 hover:border-primary/40 hover:bg-primary/5 shrink-0 mx-2"
          >
            {text}
          </Button>
        ))}
      </div>
    </div>
  );
};