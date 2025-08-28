// src/components/extensions-page.tsx

"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Webhook, GanttChartSquare, BookUser, Calculator, Settings, Plus, BrainCircuit } from "lucide-react";
import React from "react";
import Link from "next/link"; // --- Add Link import ---


// Define the structure for an extension
interface Extension {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

// Mock data for the extensions
const extensions: Extension[] = [
  {
    title: "Talent Synthesis Hub",
    description: "Automate interview analysis, profile enrichment, and generate data-driven candidate reports to reduce bias.",
    icon: <BrainCircuit className="h-6 w-6 text-primary" />,
    href: "/extensions/talent-synthesis", // Add a link destination
  },
  {
    title: "Payroll Connector",
    description: "Sync payroll data automatically with third-party accounting software.",
    icon: <Calculator className="h-6 w-6 text-primary" />,
      href: "#", // Add a link destination

  },
  {
    title: "Applicant Tracking",
    description: "Enhance the hiring portal with advanced candidate tracking features.",
    icon: <BookUser className="h-6 w-6 text-primary" />,    href: "#", // Add a link destination

  },
  {
    title: "Project Management",
    description: "Integrate with popular project management tools to track time.",
    icon: <GanttChartSquare className="h-6 w-6 text-primary" />,    href: "#", // Add a link destination

  },
  {
    title: "API Webhooks",
    description: "Configure custom webhooks to send HR data to other systems.",
    icon: <Webhook className="h-6 w-6 text-primary" />,    href: "#", // Add a link destination

  },
   {
    title: "Custom Integrations",
    description: "Build your own custom extensions using our developer API.",
    icon: <Settings className="h-6 w-6 text-primary" />,    href: "#", // Add a link destination

  },
];

// Reusable component for each extension card, matching your design
const ExtensionCard = ({ title, description, icon , href}: Extension) => (
  <Link href={href} className="flex">
  <Card className="flex flex-col justify-between transition-all hover:shadow-md hover:-translate-y-1">
    <div>
      <CardHeader className="flex flex-row items-center gap-4 pb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          {icon}
        </div>
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </div>
  </Card>
</Link>
);

const ExtensionsPage: React.FC = () => {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Extension Library
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Enhance your HR portal by connecting with other tools and services.
            </p>
          </div>
           <Button size="lg">
            <Plus className="mr-2 h-5 w-5" />
            Add Custom Extension
          </Button>
        </header>

        <main>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {extensions.map((ext) => (
              <ExtensionCard
                key={ext.title}
                title={ext.title}
                description={ext.description}
                icon={ext.icon}
                href = {ext.href}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ExtensionsPage;