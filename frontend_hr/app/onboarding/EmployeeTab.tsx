"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
// --- NEW: Accordion component for the list view ---
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, Settings, List, LayoutGrid, Building, Briefcase, Mail as MailIcon } from 'lucide-react';
import { cn } from "@/lib/utils";

type Employee = {
  id: number;
  name: string;
  email: string;
  position: string;
  department: string;
  manager: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  tasksCompleted: number;
  totalTasks: number;
};

interface EmployeesTabProps {
  recentOnboardings: Employee[];
  sendAutomatedEmail: (type: string, employee: Employee) => void;
}

export default function EmployeesTab({ recentOnboardings, sendAutomatedEmail }: EmployeesTabProps) {
  // --- ALL YOUR ORIGINAL STATE AND LOGIC IS PRESERVED ---
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredEmployees = recentOnboardings.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const statusString = employee.status as string;
    const matchesStatus = statusFilter === 'all' || statusString === statusFilter;
    return matchesSearch && matchesStatus;
  });
  // --- END OF PRESERVED LOGIC ---

  return (
    <TooltipProvider>
      <Card className="border-none shadow-none bg-transparent">
        <CardHeader>
          <CardTitle>Employee Management</CardTitle>
          <CardDescription>View and manage all employees in onboarding</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="flex-1 w-full md:w-auto"><Input placeholder="Search employees..." className="w-full" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
              <div className="flex gap-4 w-full md:w-auto">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48"><SelectValue placeholder="Filter by status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <ToggleGroup type="single" variant="outline" value={viewMode} onValueChange={(value: 'list' | 'grid') => value && setViewMode(value)}>
                  <ToggleGroupItem value="list" aria-label="List view"><List className="h-4 w-4" /></ToggleGroupItem>
                  <ToggleGroupItem value="grid" aria-label="Grid view"><LayoutGrid className="h-4 w-4" /></ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
            <div className="mt-6">
              {viewMode === 'list' ? (<EmployeeListView employees={filteredEmployees} sendAutomatedEmail={sendAutomatedEmail} />) : (<EmployeeGridView employees={filteredEmployees} sendAutomatedEmail={sendAutomatedEmail} />)}
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}

// --- REDESIGNED (Point 1): Grid View with vibrant background colors ---
function EmployeeGridView({ employees, sendAutomatedEmail }) {
  if (employees.length === 0) { return <p className="text-center text-muted-foreground py-8">No employees match your search.</p>; }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {employees.map((employee) => {
        const statusInfo = getStatusInfo(employee.status);
        return (
          <Card key={employee.id} className={cn("flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 border-l-4", statusInfo.borderColor, statusInfo.backgroundColor)}>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-14 w-14 border-2 border-white shadow-sm"><AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
              <div className="flex-1"><CardTitle className="text-xl">{employee.name}</CardTitle><CardDescription>{employee.position}</CardDescription></div>
              <Badge variant={statusInfo.variant}>{employee.status}</Badge>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1 text-sm font-medium"><span className="text-muted-foreground">Onboarding Progress</span><span className={cn("font-bold", statusInfo.textColor)}>{employee.tasksCompleted}/{employee.totalTasks} tasks</span></div>
                <Progress value={(employee.tasksCompleted / employee.totalTasks) * 100} className={cn("h-2 [&>*]:bg-gradient-to-r", statusInfo.progressGradient)} />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm pt-2">
                <div className="flex items-center gap-2 text-muted-foreground"><Briefcase className="h-4 w-4" /> <span>{employee.department}</span></div>
                <div className="flex items-center gap-2 text-muted-foreground"><Building className="h-4 w-4" /> <span>Manager: {employee.manager}</span></div>
              </div>
            </CardContent>
            <CardFooter className="bg-background/20 pt-4"><div className="flex w-full justify-end space-x-2"><Tooltip><TooltipTrigger asChild><Button size="icon" variant="outline" onClick={() => sendAutomatedEmail('reminder', employee)}><Mail className="h-4 w-4" /></Button></TooltipTrigger><TooltipContent>Send Reminder</TooltipContent></Tooltip><Tooltip><TooltipTrigger asChild><Button size="icon" variant="outline"><Settings className="h-4 w-4" /></Button></TooltipTrigger><TooltipContent>Manage Settings</TooltipContent></Tooltip></div></CardFooter>
          </Card>
        )
      })}
    </div>
  );
}

// --- RESTRUCTURED (Point 2): List view is now an Accordion ---
function EmployeeListView({ employees, sendAutomatedEmail }) {
  if (employees.length === 0) { return <p className="text-center text-muted-foreground py-8">No employees match your search.</p>; }
  return (
    <Accordion type="single" collapsible className="w-full space-y-3">
      {employees.map((employee) => {
        const statusInfo = getStatusInfo(employee.status);
        return (
          <AccordionItem key={employee.id} value={`item-${employee.id}`} className={cn("border-l-4 rounded-lg transition-colors", statusInfo.borderColor, statusInfo.backgroundColor)}>
            <AccordionTrigger className="p-4 hover:no-underline rounded-lg">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10"><AvatarFallback className="bg-primary/10 text-primary font-bold">{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
                  <div><p className="font-semibold text-left">{employee.name}</p><p className="text-sm text-muted-foreground text-left">{employee.position}</p></div>
                </div>
                <div className="hidden md:flex items-center gap-6">
                  <div className="w-40">
                    <div className="flex justify-between items-center mb-1"><span className="text-xs font-medium text-muted-foreground">Progress</span><span className="text-xs font-bold">{employee.tasksCompleted}/{employee.totalTasks}</span></div>
                    <Progress value={(employee.tasksCompleted / employee.totalTasks) * 100} className="h-1.5" />
                  </div>
                  <Badge variant={statusInfo.variant} className="w-28 justify-center">{employee.status}</Badge>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 pt-0">
              <div className="border-t pt-4 pl-14"> {/* Aligns content with name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                  <div className="flex items-center gap-2 text-muted-foreground"><Briefcase className="h-4 w-4" /> <span><strong>Dept:</strong> {employee.department}</span></div>
                  <div className="flex items-center gap-2 text-muted-foreground"><Building className="h-4 w-4" /> <span><strong>Manager:</strong> {employee.manager}</span></div>
                  <div className="flex items-center gap-2 text-muted-foreground col-span-2"><MailIcon className="h-4 w-4" /> <span><strong>Email:</strong> {employee.email}</span></div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button size="sm" variant="outline" onClick={() => sendAutomatedEmail('reminder', employee)}><Mail className="h-4 w-4 mr-2" /> Send Reminder</Button>
                  <Button size="sm" variant="outline"><Settings className="h-4 w-4 mr-2" /> Manage Settings</Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

// --- UPDATED HELPER (Point 1): Added background colors ---
const getStatusInfo = (status: Employee['status']) => {
  switch (status) {
    case 'Completed':
      return {
        variant: 'default',
        borderColor: 'border-green-500',
        textColor: 'text-green-600 dark:text-green-400',
        progressGradient: 'from-green-400 to-green-600',
        backgroundColor: 'bg-green-50 dark:bg-green-950/50', // Added
      };
    case 'In Progress':
      return {
        variant: 'secondary',
        borderColor: 'border-blue-500',
        textColor: 'text-blue-600 dark:text-blue-400',
        progressGradient: 'from-blue-400 to-blue-600',
        backgroundColor: 'bg-blue-50 dark:bg-blue-950/50', // Added
      };
    case 'Pending':
      return {
        variant: 'outline',
        borderColor: 'border-yellow-500',
        textColor: 'text-yellow-600 dark:text-yellow-400',
        progressGradient: 'from-yellow-400 to-yellow-600',
        backgroundColor: 'bg-yellow-50 dark:bg-yellow-950/50', // Added
      };
    default:
      return {
        variant: 'outline',
        borderColor: 'border-slate-500',
        textColor: 'text-slate-600 dark:text-slate-400',
        progressGradient: 'from-slate-400 to-slate-600',
        backgroundColor: 'bg-slate-50 dark:bg-slate-900/50', // Added
      };
  }
};