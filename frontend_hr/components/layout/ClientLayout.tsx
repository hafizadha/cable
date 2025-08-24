// components/layout/ClientLayout.tsx

"use client"; // <-- The client boundary starts here!

import { Sidebar } from "./Sidebar"; // Import your Sidebar component

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row bg-muted/40">
      {/* 
        Now, the Sidebar (which uses client hooks) is being rendered inside
        a component that is explicitly marked as a client component.
        This resolves the error.
      */}
      <Sidebar />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  );
}