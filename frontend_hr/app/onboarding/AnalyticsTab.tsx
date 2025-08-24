"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Gauge, Users, Clock, Filter, AlertTriangle } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Area, AreaChart } from 'recharts';

// Mock data for the charts. In a real app, this would come from your API.
const hiresOverTimeData = [
  { month: "Jan", hires: 12 },
  { month: "Feb", hires: 19 },
  { month: "Mar", hires: 15 },
  { month: "Apr", hires: 25 },
  { month: "May", hires: 22 },
  { month: "Jun", hires: 31 },
];

const funnelData = [
  { stage: "Applied", count: 150, fill: "var(--color-stage-1)" },
  { stage: "Screening", count: 95, fill: "var(--color-stage-2)" },
  { stage: "Interview", count: 45, fill: "var(--color-stage-3)" },
  { stage: "Offer", count: 32, fill: "var(--color-stage-4)" },
  { stage: "Onboarding", count: 31, fill: "var(--color-stage-5)" },
];

const departmentActivityData = [
    { name: "Engineering", count: 12, total: 31 },
    { name: "Product", count: 7, total: 31 },
    { name: "Design", count: 5, total: 31 },
    { name: "Marketing", count: 4, total: 31 },
    { name: "Sales", count: 3, total: 31 },
]

export default function AnalyticsTab({ recentOnboardings }) {
  return (
    <div className="space-y-6">
      <style jsx global>{`
        :root {
          --color-stage-1: #3b82f6; --color-stage-2: #60a5fa;
          --color-stage-3: #93c5fd; --color-stage-4: #bfdbfe;
          --color-stage-5: #dbeafe;
        }
        .dark {
          --color-stage-1: #60a5fa; --color-stage-2: #3b82f6;
          --color-stage-3: #2563eb; --color-stage-4: #1d4ed8;
          --color-stage-5: #1e40af;
        }
      `}</style>
      
      {/* --- Header with Date Filter --- */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Onboarding Analytics</h2>
        <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select defaultValue="30">
                <SelectTrigger className="w-40">
                    <SelectValue placeholder="Date range" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="7">Last 7 Days</SelectItem>
                    <SelectItem value="30">Last 30 Days</SelectItem>
                    <SelectItem value="90">Last 90 Days</SelectItem>
                    <SelectItem value="365">Last Year</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </div>

      {/* --- Enhanced KPI Cards --- */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hires (30d)</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">31</div><p className="text-xs text-muted-foreground">+20.1% from last month</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Time to Onboard</CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">12.5 Days</div><p className="text-xs text-muted-foreground">-1.2 days from last month</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Onboardings</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">13</div><p className="text-xs text-muted-foreground">5 in progress, 8 pending</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Process Bottleneck</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">Background Check</div><p className="text-xs text-muted-foreground">Avg. 4.2 days to complete</p></CardContent>
        </Card>
      </div>

      {/* --- Charts and Data Visualizations --- */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>New Hires Over Time</CardTitle><CardDescription>Showing new employees starting the onboarding process.</CardDescription></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={hiresOverTimeData}>
                <defs><linearGradient id="colorHires" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--color-stage-1)" stopOpacity={0.8}/><stop offset="95%" stopColor="var(--color-stage-1)" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/>
                <Area type="monotone" dataKey="hires" stroke="var(--color-stage-1)" fillOpacity={1} fill="url(#colorHires)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Department Activity</CardTitle><CardDescription>Onboardings started in the last 30 days.</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            {departmentActivityData.map(dept => (
                <div key={dept.name}>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{dept.name}</span>
                        <span className="text-muted-foreground">{dept.count} hires</span>
                    </div>
                    <Progress value={(dept.count / dept.total) * 100} />
                </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Onboarding Funnel</CardTitle><CardDescription>Progression of candidates from application to active onboarding.</CardDescription></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={funnelData} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="stage" type="category" width={100} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/>
              <Legend />
              <Bar dataKey="count" name="Candidates" background={{ fill: 'hsl(var(--muted))' }} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}