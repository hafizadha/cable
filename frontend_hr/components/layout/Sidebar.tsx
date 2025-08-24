// components/layout/Sidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Home, UserPlus, Bot, Menu, Sparkles, Briefcase, HandCoins, Clock8, Ship, Hand, Clock   } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

// --- CRITICAL CHANGE 1: Create a separate component for the links ---
// This component will be conditionally wrapped with SheetClose
const NavLink = ({ href, isActive, children }: { href: string; isActive: boolean; children: React.ReactNode }) => (
  <Link
    href={href}
    className={cn(
      "flex items-center gap-4 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:bg-accent hover:text-primary",
      "md:h-12 md:w-12 md:justify-center md:p-0", // Desktop specific styles
      isActive && "bg-primary/10 text-primary"
    )}
  >
    {children}
  </Link>
);

// --- CRITICAL CHANGE 2: The NavContent now accepts a prop to know its context ---
const NavContent = ({ isMobile = false }: { isMobile?: boolean }) => {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { href: "/", label: "Hiring Portal", icon: <Briefcase className="h-5 w-5" /> },
    { href: "/onboarding", label: "Onboarding Portal", icon: <Ship className="h-5 w-5" /> },
    { href: "/payroll", label: "Payroll", icon: <HandCoins className="h-5 w-5" /> },
    { href: "/timeoff", label: "Time Off", icon: <Clock className="h-5 w-5" /> },
    { href: "/chatbot", label: "Chatbot", icon: <Bot className="h-5 w-5" /> },


  ];

  return (
    <>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const linkContent = (
          <>
            {item.icon}
            <span className="md:hidden">{item.label}</span>
            <span className="sr-only">{item.label}</span>
          </>
        );

        return (
          <Tooltip key={item.href}>
            <TooltipTrigger asChild>
              {/* --- CRITICAL CHANGE 3: Conditionally render SheetClose --- */}
              {/* Only wrap the link with SheetClose when it's for mobile */}
              {isMobile ? (
                <SheetClose asChild>
                  <NavLink href={item.href} isActive={isActive}>
                    {linkContent}
                  </NavLink>
                </SheetClose>
              ) : (
                <NavLink href={item.href} isActive={isActive}>
                  {linkContent}
                </NavLink>
              )}
            </TooltipTrigger>
            <TooltipContent side="right" className="hidden md:block">
              {item.label}
            </TooltipContent>
          </Tooltip>
        );
      })}
    </>
  );
};


export function Sidebar() {
  return (
    <TooltipProvider>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:border-r md:bg-background md:w-20 md:items-center md:py-4">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link href="#" className="group flex h-12 w-12 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-12 md:w-12 md:text-base mb-4">
            <Sparkles className="h-6 w-6 transition-all group-hover:scale-110" />
            <span className="sr-only">HR Portal</span>
          </Link>
          {/* We render NavContent for desktop WITHOUT the isMobile prop */}
          <NavContent />
        </nav>
      </aside>

      {/* Mobile Header with Sheet */}
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline"><Menu className="h-5 w-5" /><span className="sr-only">Toggle Menu</span></Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <Link href="#" className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
                <Sparkles className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">HR Portal</span>
              </Link>
              {/* --- CRITICAL CHANGE 4: We render NavContent for mobile WITH the isMobile prop --- */}
              <NavContent isMobile={true} />
            </nav>
          </SheetContent>
        </Sheet>
        <h1 className="text-lg font-semibold">HR Portal</h1>
      </header>
    </TooltipProvider>
  );
}