// app/layout.tsx

import { ClientLayout } from "@/components/layout/ClientLayout"; // <-- Import the new boundary component
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HR Portal",
  description: "Manage your HR processes seamlessly.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        {/*
          The Server Layout now renders the ClientLayout, which in turn
          safely renders the Sidebar and the page content (children).
        */}
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}