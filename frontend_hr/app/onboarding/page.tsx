// pages/onboarding/page.tsx (or your file path)

"use client";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, Bot } from 'lucide-react';

// Import all your tab components
import OverviewTab from './OverviewTab';
import EmployeesTab from './EmployeeTab';
import AutomationTab from './AutomationTab';
import SoftwareTab from './SoftwareTab';
import ChatbotTab from './ChatbotTab';
import AnalyticsTab from './AnalyticsTab'; // <-- 1. IMPORT THE NEW TAB

// All the code from your original file is preserved below.
// I have just removed the "Stats Cards" section and added the new tab.
// NO OTHER LOGIC OR DATA HAS BEEN CHANGED.

export default function OnboardingPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [chatMessages, setChatMessages] = useState([ { type: 'bot', message: 'Hi! I\'m your HR assistant. Ask me about company procedures, policies, or onboarding questions.' } ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const onboardingSteps = [ { id: 1, title: "Document Collection", status: "completed", icon: require('lucide-react').FileText }, { id: 2, title: "Background Check", status: "in-progress", icon: require('lucide-react').Clock }, { id: 3, title: "IT Setup", status: "pending", icon: require('lucide-react').Building }, { id: 4, title: "Orientation", status: "pending", icon: require('lucide-react').Calendar }, { id: 5, title: "Training", status: "pending", icon: require('lucide-react').UserPlus }, ];
  const recentOnboardings = [ { id: 1, name: "John Doe", position: "Software Engineer", startDate: "2024-01-15", status: "Completed", tasksCompleted: 12, totalTasks: 12, email: "john.doe@company.com", department: "Engineering", manager: "Sarah Chen" }, { id: 2, name: "Jane Smith", position: "Product Manager", startDate: "2024-01-20", status: "In Progress", tasksCompleted: 7, totalTasks: 12, email: "jane.smith@company.com", department: "Product", manager: "Michael Johnson" }, { id: 3, name: "Mike Johnson", position: "UX Designer", startDate: "2024-01-25", status: "Pending", tasksCompleted: 2, totalTasks: 12, email: "mike.johnson@company.com", department: "Design", manager: "Lisa Wang" }, ];
  const automatedTasks = [ { category: "Access Requests", tasks: [{ name: "Email Account Setup", status: "completed", automated: true }, { name: "Slack Workspace Access", status: "completed", automated: true }, { name: "VPN Access", status: "in-progress", automated: true }, { name: "GitHub Repository Access", status: "pending", automated: false }] }, { category: "Tool Access", tasks: [{ name: "Figma License", status: "completed", automated: true }, { name: "Jira Access", status: "in-progress", automated: true }, { name: "Confluence Access", status: "pending", automated: false }, { name: "AWS Console Access", status: "pending", automated: false }] }, { category: "Documentation", tasks: [{ name: "Employee Handbook", status: "completed", automated: true }, { name: "Security Training", status: "in-progress", automated: true }, { name: "Department Onboarding", status: "pending", automated: false }] } ];
  const allCompanySoftware = [ { id: 'slack', name: "Slack", category: "Communication" }, { id: 'figma', name: "Figma", category: "Design" }, { id: 'jira', name: "Jira", category: "Project Management" }, { id: 'confluence', name: "Confluence", category: "Documentation" }, { id: 'github', name: "GitHub", category: "Development" }, { id: 'aws', name: "AWS", category: "Cloud" }, { id: 'g-workspace', name: "Google Workspace", category: "Productivity" }, { id: 'zoom', name: "Zoom", category: "Communication" }, { id: 'photoshop', name: "Adobe Photoshop", category: "Design" }, { id: 'docker', name: "Docker", category: "Development" }, { id: 'python', name: "Python", category: "Development" }, { id: 'vscode', name: "VS Code", category: "Development" }, ];
  const initialPackages = { 'Designer': [{ id: 'slack', required: true }, { id: 'figma', required: true }, { id: 'g-workspace', required: true }, { id: 'zoom', required: true }, { id: 'photoshop', required: true }, { id: 'jira', required: false }], 'Backend Developer': [{ id: 'slack', required: true }, { id: 'jira', required: true }, { id: 'github', required: true }, { id: 'g-workspace', required: true }, { id: 'docker', required: true }, { id: 'python', required: true }, { id: 'vscode', required: true }, { id: 'aws', required: false }], 'Product Manager': [{ id: 'slack', required: true }, { id: 'jira', required: true }, { id: 'confluence', required: true }, { id: 'g-workspace', required: true }, { id: 'zoom', required: true }, { id: 'figma', required: false }] };
  const [softwarePackages, setSoftwarePackages] = useState(initialPackages);
  const [selectedPackage, setSelectedPackage] = useState(Object.keys(initialPackages)[0]);
  const handleAddSoftwareToPackage = (softwareId) => { setSoftwarePackages(prev => ({ ...prev, [selectedPackage]: [...prev[selectedPackage], { id: softwareId, required: false }] })); };
  const handleRemoveSoftwareFromPackage = (softwareId) => { setSoftwarePackages(prev => ({ ...prev, [selectedPackage]: prev[selectedPackage].filter(s => s.id !== softwareId) })); };
  const handleToggleRequired = (softwareId) => { setSoftwarePackages(prev => ({ ...prev, [selectedPackage]: prev[selectedPackage].map(s => s.id === softwareId ? { ...s, required: !s.required } : s) })); };
  const handleSendMessage = () => { if (!currentMessage.trim()) return; const newMessages = [...chatMessages, { type: 'user', message: currentMessage }, { type: 'bot', message: getBotResponse(currentMessage) }]; setChatMessages(newMessages); setCurrentMessage(''); };
  const getBotResponse = (message) => { const lowerMessage = message.toLowerCase(); if (lowerMessage.includes('vacation') || lowerMessage.includes('pto')) { return 'Our vacation policy allows 15 days PTO in your first year, increasing to 20 days after 2 years. You can find the full policy in section 4.2 of the employee handbook.'; } else if (lowerMessage.includes('benefits') || lowerMessage.includes('health')) { return 'We offer comprehensive health insurance (medical, dental, vision), 401k with 4% company match, and flexible work arrangements. HR will schedule a benefits orientation within your first week.'; } else if (lowerMessage.includes('remote') || lowerMessage.includes('work from home')) { return 'We have a hybrid work policy allowing 3 days remote per week after your first month. Remote work guidelines are in the employee handbook section 3.1.'; } else if (lowerMessage.includes('manager') || lowerMessage.includes('supervisor')) { return 'Your direct manager will be assigned based on your department. They\'ll reach out within 24 hours of your start date to schedule your first 1:1 meeting.'; } else if (lowerMessage.includes('equipment') || lowerMessage.includes('laptop')) { return 'IT will provision your laptop and necessary equipment before your start date. You can request additional peripherals through the IT portal.'; } else { return 'I can help with questions about company policies, benefits, remote work, equipment, and general onboarding procedures. What specific area would you like to know more about?'; } };
  const generateAutomatedTasks = (employee) => { return [`Create email account for ${employee.name}`, `Add ${employee.name} to ${employee.department} Slack channels`, `Request laptop setup for ${employee.position}`, `Schedule IT orientation for ${employee.name}`, `Send welcome email with first-day information`, `Add to company directory and org chart`, `Schedule benefits enrollment meeting`, `Assign security training modules`]; };
  const sendAutomatedEmail = (type, employee) => { console.log(`Sending ${type} email to ${employee.email}`); };

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Employee Onboarding</h1>
          <p className="text-muted-foreground mt-2">Manage and analyze your new employee onboarding process.</p>
        </div>
        <div className="flex space-x-3">
          <Button><UserPlus className="h-4 w-4 mr-2" />Add New Employee</Button>
        </div>
      </div>

      {/* --- 2. THE STATS CARDS SECTION HAS BEEN REMOVED FROM HERE --- */}

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="w-full overflow-x-auto">
          <TabsList className="w-full">
            <TabsTrigger value="overview" className="whitespace-nowrap">Overview</TabsTrigger>
            <TabsTrigger value="employees" className="whitespace-nowrap">Employees</TabsTrigger>
            <TabsTrigger value="analytics" className="whitespace-nowrap">Analytics</TabsTrigger> {/* <-- 3. ADDED TAB TRIGGER */}
            <TabsTrigger value="automation" className="whitespace-nowrap">Automation</TabsTrigger>
            <TabsTrigger value="software" className="whitespace-nowrap">Software</TabsTrigger>
            <TabsTrigger value="chatbot" className="whitespace-nowrap">HR Assistant</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="mt-6"><OverviewTab onboardingSteps={onboardingSteps} recentOnboardings={recentOnboardings} /></TabsContent>
        <TabsContent value="employees" className="mt-6"><EmployeesTab recentOnboardings={recentOnboardings} sendAutomatedEmail={sendAutomatedEmail} /></TabsContent>
        
        {/* --- 4. ADDED TAB CONTENT FOR ANALYTICS --- */}
        <TabsContent value="analytics" className="mt-6">
          <AnalyticsTab />
        </TabsContent>

        <TabsContent value="automation" className="mt-6"><AutomationTab recentOnboardings={recentOnboardings} selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} generateAutomatedTasks={generateAutomatedTasks} automatedTasks={automatedTasks} /></TabsContent>
        <TabsContent value="software" className="mt-6"><SoftwareTab allCompanySoftware={allCompanySoftware} softwarePackages={softwarePackages} selectedPackage={selectedPackage} setSelectedPackage={setSelectedPackage} handleAddSoftwareToPackage={handleAddSoftwareToPackage} handleRemoveSoftwareFromPackage={handleRemoveSoftwareFromPackage} handleToggleRequired={handleToggleRequired} /></TabsContent>
        <TabsContent value="chatbot" className="mt-6"><ChatbotTab chatMessages={chatMessages} currentMessage={currentMessage} setCurrentMessage={setCurrentMessage} handleSendMessage={handleSendMessage} /></TabsContent>
      </Tabs>
    </div>
  );
}