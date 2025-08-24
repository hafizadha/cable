// src/components/chat-interface.tsx

"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // --- NEW IMPORT ---

// --- ICONS ---
// --- NEW: Added ArrowDown icon ---
import { Bot, User, Copy, Sparkles, Settings, MoreVertical, ThumbsUp, ThumbsDown, ArrowDown } from 'lucide-react';

// --- SHADCN/UI COMPONENTS ---
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// --- CUSTOM ANIMATED COMPONENTS ---
import { AnimatedInput } from '@/components/animated-input';
import { ScrollingPills } from '@/components/scrolling-pills';


interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', content: "Hello! I'm your AI assistant. How can I help you today?", role: 'assistant', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // --- NEW: State and Ref for the scroll button ---
  const [showScrollButton, setShowScrollButton] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Scroll to bottom when a new message is added, but only if we are already near the bottom.
    const container = scrollContainerRef.current;
    if (container) {
        const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 300;
        if(isNearBottom) {
             scrollToBottom();
        }
    }
  }, [messages, isTyping]);


  // --- NEW: Scroll handler to show/hide the button ---
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      // Show button if the user has scrolled up more than 300px from the bottom
      const isScrolledUp = scrollHeight - scrollTop - clientHeight > 300;
      setShowScrollButton(isScrolledUp);
    }
  };


  const handleSubmit = async () => {
    if (!inputValue.trim() || isTyping) return;
    const userMessage: Message = { id: Date.now().toString(), content: inputValue.trim(), role: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setTimeout(() => {
      const assistantMessage: Message = { id: (Date.now() + 1).toString(), content: generateResponse(userMessage.content), role: 'assistant', timestamp: new Date() };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateResponse = (input: string): string => {
    const responses = ["That's an interesting question! Let me think...", "I understand. Here's my perspective...", "Great question! From what I know...", "Thanks for sharing. I'd be happy to help...", "That's a thoughtful inquiry. Let me provide some info...", "I appreciate you bringing this up. Here's what I can tell you...",];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    return `${randomResponse} Based on your message about "${input.substring(0, 30)}${input.length > 30 ? '...' : ''}", this is a topic worth discussing.`;
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const suggestionPills = [
    "What are the key features?", "Explain this concept simply.", "Give me a code example.", "How does this compare to X?", "Summarize the main points.", "What are the pricing plans?",
  ];

  return (
    <div className="w-full h-screen bg-slate-100 dark:bg-slate-950 flex justify-center items-center">
      <TooltipProvider>
        <Card className="w-full max-w-[85rem] h-full flex flex-col shadow-2xl rounded-none border-none">
          <CardHeader className="flex flex-row items-center justify-between p-4 border-b bg-white dark:bg-slate-900">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12 border-2 border-transparent bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500">
                <AvatarFallback className="bg-transparent text-white"><Sparkles className="h-6 w-6" /></AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-bold text-slate-800 dark:text-white">AI Assistant</p>
                <p className="text-sm text-green-500 flex items-center">
                  <span className="relative flex h-2 w-2 mr-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span>
                  Active now
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon"><Settings className="w-5 h-5 text-slate-500" /></Button></TooltipTrigger><TooltipContent>Settings</TooltipContent></Tooltip>
              <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon"><MoreVertical className="w-5 h-5 text-slate-500" /></Button></TooltipTrigger><TooltipContent>More Options</TooltipContent></Tooltip>
            </div>
          </CardHeader>
          
          {/* --- NEW: Wrapper for positioning the scroll button --- */}
          <div className="relative flex-1 overflow-hidden">
            <CardContent
              ref={scrollContainerRef}
              onScroll={handleScroll}
              // --- NEW: Positioned absolutely to fill wrapper & added no-scrollbar class ---
              className="absolute inset-0 overflow-y-auto p-6 space-y-6 no-scrollbar"
            >
              {messages.map((message) => (
                <div key={message.id} className={`flex items-start gap-4 ${message.role === 'user' ? 'flex-row-reverse justify-end' : 'justify-start'}`}>
                  <Avatar className="shadow-lg">
                    <AvatarFallback className={message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-slate-700 text-white'}>
                      {message.role === 'user' ? <User /> : <Bot />}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`flex flex-col gap-1 max-w-lg ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`rounded-3xl p-4 ${message.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted dark:bg-slate-800 rounded-bl-none'}`}>
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                     <div className="flex items-center gap-2">
                       <span className="text-xs text-slate-400">{formatTime(message.timestamp)}</span>
                       {message.role === 'assistant' && (
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-6 w-6"><Copy className="w-3 h-3 text-slate-500"/></Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6"><ThumbsUp className="w-3 h-3 text-slate-500"/></Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6"><ThumbsDown className="w-3 h-3 text-slate-500"/></Button>
                          </div>
                       )}
                     </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start gap-4 justify-start">
                  <Avatar className="shadow-lg"><AvatarFallback className="bg-slate-700 text-white"><Bot /></AvatarFallback></Avatar>
                  <div className="bg-muted dark:bg-slate-800 rounded-3xl rounded-bl-none p-4">
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-pulse [animation-delay:-0.3s]"></span>
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-pulse [animation-delay:-0.15s]"></span>
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-pulse"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </CardContent>

            {/* --- NEW: Floating Scroll-to-Bottom Button --- */}
            <AnimatePresence>
              {showScrollButton && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-6 right-6 z-10"
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button onClick={scrollToBottom} size="icon" className="rounded-full shadow-lg h-12 w-12">
                        <ArrowDown className="h-6 w-6" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Scroll to bottom</TooltipContent>
                  </Tooltip>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <CardFooter className="p-4 border-t bg-white dark:bg-slate-900 flex flex-col items-start gap-2">
            <ScrollingPills
              suggestions={suggestionPills}
              onPillClick={(suggestion) => setInputValue(suggestion)}
            />
            <AnimatedInput
              inputValue={inputValue}
              setInputValue={setInputValue}
              handleKeyPress={handleKeyPress}
              handleSubmit={handleSubmit}
              isTyping={isTyping}
            />
          </CardFooter>
        </Card>
      </TooltipProvider>
    </div>
  );
};

export default ChatInterface;