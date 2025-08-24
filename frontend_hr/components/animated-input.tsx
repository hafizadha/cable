// src/components/animated-input.tsx

"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Paperclip, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AnimatedInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleSubmit: () => void;
  isTyping: boolean;
}

export const AnimatedInput: React.FC<AnimatedInputProps> = ({
  inputValue,
  setInputValue,
  handleKeyPress,
  handleSubmit,
  isTyping,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || inputValue.length > 0;

  return (
    <TooltipProvider>
      <div
        className="relative w-full rounded-2xl p-0.5 bg-slate-200 dark:bg-slate-700 transition-colors duration-300 overflow-hidden"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        {/* Animated Gradient Border using a "wipe" effect */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-fuchsia-500 via-red-500 to-orange-400"
            />
          )}
        </AnimatePresence>
        
        {/* Inner Content Container - MUST be relative to sit on top */}
        <div className="h-16 relative z-10 flex items-center bg-white dark:bg-slate-900 rounded-[15px]">
          <Tooltip>
            <TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-10 w-10 ml-2"><Paperclip className="w-5 h-5 text-slate-500" /></Button></TooltipTrigger>
            <TooltipContent>Attach File</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-10 w-10"><Mic className="w-5 h-5 text-slate-500" /></Button></TooltipTrigger>
            <TooltipContent>Use Microphone</TooltipContent>
          </Tooltip>
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Message AI Assistant..."
            className="w-full h-6 max-h-24 resize-none bg-transparent border-none py-3 pl-1 pr-20 focus-visible:ring-0 focus-visible:ring-offset-0"
            disabled={isTyping}
            rows={1}
          />
          <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
            <AnimatePresence>
              {inputValue.trim() && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button onClick={handleSubmit} disabled={isTyping} size="icon" className="rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                    <Send className="w-5 h-5" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};