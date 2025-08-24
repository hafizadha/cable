// src/components/payroll-page.tsx

"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, FileText, Users, ArrowRight } from "lucide-react";
import React from "react";

// A reusable component for each feature card
const FeatureCard = ({ icon, title, description, actionText }: { icon: React.ReactNode; title: string; description: string; actionText: string }) => (
  <Card className="flex flex-col transition-all hover:shadow-lg">
    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
      <div className="rounded-lg bg-primary/10 p-3 text-primary">
        {icon}
      </div>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-1">
      <p className="text-sm text-muted-foreground">{description}</p>
    </CardContent>
    <CardFooter>
      <Button variant="outline" className="w-full">
        {actionText}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </CardFooter>
  </Card>
);

const PayrollPage: React.FC = () => {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Payroll Management
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Manage your company's payroll, view reports, and handle employee compensation efficiently.
          </p>
        </header>

        <main>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<DollarSign className="h-6 w-6" />}
              title="Run Payroll"
              description="Process payroll for your employees in just a few clicks. Ensure timely and accurate payments every cycle."
              actionText="Start New Payroll"
            />
            <FeatureCard
              icon={<FileText className="h-6 w-6" />}
              title="View Reports"
              description="Access detailed payroll reports, tax filings, and historical data to stay compliant and informed."
              actionText="Go to Reports"
            />
            <FeatureCard
              icon={<Users className="h-6 w-6" />}
              title="Employee Compensation"
              description="View and manage employee salary details, benefits, and tax information all in one place."
              actionText="Manage Employees"
            />
          </div>
        </main>
        
        <section className="mt-12">
            <Card>
                <CardHeader>
                    <CardTitle>Next Payroll Run</CardTitle>
                    <CardDescription>Your next scheduled payroll is due soon. Review details before processing.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                   <div>
                     <p className="text-sm font-medium text-foreground">Pay Period</p>
                     <p className="text-muted-foreground">July 1, 2024 - July 15, 2024</p>
                   </div>
                   <div>
                     <p className="text-sm font-medium text-foreground">Pay Date</p>
                     <p className="text-muted-foreground">July 20, 2024</p>
                   </div>
                   <Button>Review & Approve</Button>
                </CardContent>
            </Card>
        </section>
      </div>
    </div>
  );
};

export default PayrollPage;