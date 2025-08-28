// src/components/talent-synthesis-page.tsx

"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrainCircuit, Mic, Search, FileText, GitCompareArrows, UploadCloud } from "lucide-react";
import React from "react";

// A reusable component for each feature highlight
const FeatureHighlight = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
        </div>
        <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-1 text-muted-foreground">{description}</p>
        </div>
    </div>
);


const TalentSynthesisPage: React.FC = () => {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
            <div className="inline-block rounded-lg bg-primary/10 p-4 mb-4">
                <BrainCircuit className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
                Talent Synthesis Hub
            </h1>
            <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                Transform your hiring process with AI-driven insights. Eliminate bias and identify top candidates faster than ever before.
            </p>
        </header>

        <main className="grid gap-12 lg:grid-cols-5">
            {/* Left Column: Feature List */}
            <div className="lg:col-span-3 space-y-8">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Key Features</h2>
                <FeatureHighlight 
                    icon={<Mic className="h-6 w-6"/>}
                    title="AI-Powered Transcription"
                    description="Upload interview audio to get accurate, speaker-diarized transcripts. Key topics and sentiment are automatically identified."
                />
                <FeatureHighlight 
                    icon={<Search className="h-6 w-6"/>}
                    title="Automated Profile Enrichment"
                    description="Provide a LinkedIn or GitHub URL to automatically scrape key skills, repository activity, and professional experience."
                />
                <FeatureHighlight 
                    icon={<FileText className="h-6 w-6"/>}
                    title="Unified Candidate Reports"
                    description="Consolidate all data points into a single, easy-to-read PDF report, complete with an objective performance score."
                />
                <FeatureHighlight 
                    icon={<GitCompareArrows className="h-6 w-6"/>}
                    title="Objective Candidate Comparison"
                    description="Compare multiple candidate reports side-by-side on standardized metrics, removing interviewer bias from the equation."
                />
            </div>

            {/* Right Column: Action Card */}
            <div className="lg:col-span-2">
                <Card className="sticky top-24">
                    <CardHeader>
                        <CardTitle>Generate a New Report</CardTitle>
                        <CardDescription>Upload candidate information to get started.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                           <Label htmlFor="audio-file">Interview Audio (.mp3, .wav)</Label>
                           <Button variant="outline" className="w-full justify-start text-muted-foreground">
                                <UploadCloud className="mr-2 h-4 w-4"/>
                                Click to upload file
                           </Button>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="linkedin-url">LinkedIn Profile URL</Label>
                            <Input id="linkedin-url" placeholder="https://linkedin.com/in/..." />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="github-url">GitHub Profile URL</Label>
                            <Input id="github-url" placeholder="https://github.com/..." />
                        </div>
                        <Button size="lg" className="w-full">
                            <BrainCircuit className="mr-2 h-5 w-5"/>
                            Synthesize Report
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </main>
      </div>
    </div>
  );
};

export default TalentSynthesisPage;