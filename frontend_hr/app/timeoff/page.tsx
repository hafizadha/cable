// src/components/time-off-page.tsx

"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Bell, UserCheck, CalendarClock, Check, X } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data representing requests from multiple employees
const allRequests = [
  { id: 1, employeeName: 'Alice Johnson', department: 'Engineering', type: 'Vacation', startDate: '2024-12-23', endDate: '2025-01-02', days: 8, status: 'Pending' },
  { id: 2, employeeName: 'Bob Williams', department: 'Marketing', type: 'Sick Leave', startDate: '2024-07-29', endDate: '2024-07-29', days: 1, status: 'Pending' },
  { id: 3, employeeName: 'Charlie Brown', department: 'Engineering', type: 'Vacation', startDate: '2024-08-12', endDate: '2024-08-16', days: 5, status: 'Approved' },
  { id: 4, employeeName: 'Diana Prince', department: 'Sales', type: 'Personal', startDate: '2024-06-10', endDate: '2024-06-10', days: 1, status: 'Rejected' },
  { id: 5, employeeName: 'Ethan Hunt', department: 'Sales', type: 'Vacation', startDate: '2024-09-02', endDate: '2024-09-06', days: 5, status: 'Approved' },
];

// Helper to get initials from a name
const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
        return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return name[0];
};

// Helper to get badge color based on status
const getStatusVariant = (status: string) => {
  switch (status) {
    case 'Approved':
      return 'success';
    case 'Pending':
      return 'secondary';
    case 'Rejected':
      return 'destructive';
    default:
      return 'default';
  }
};

const TimeOffPage: React.FC = () => {
  const pendingRequests = allRequests.filter(req => req.status === 'Pending');

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Time Off Management
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Review and manage all employee time off requests and schedules.
          </p>
        </header>

        <main>
          {/* HR Dashboard Summary Cards */}
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingRequests.length}</div>
                <p className="text-xs text-muted-foreground">requests requiring your attention</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Employees Out Today</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">based on approved leave</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Absences</CardTitle>
                <CalendarClock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">employees out this week</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for Pending, History, and Policy */}
          <Tabs defaultValue="pending-requests">
            <TabsList className="grid w-full grid-cols-3 sm:w-[480px]">
              <TabsTrigger value="pending-requests">Pending Requests</TabsTrigger>
              <TabsTrigger value="all-requests">All Requests</TabsTrigger>
              <TabsTrigger value="policy">Company Policy</TabsTrigger>
            </TabsList>

            {/* Pending Requests Tab */}
            <TabsContent value="pending-requests">
              <Card>
                <CardHeader>
                  <CardTitle>Action Required</CardTitle>
                  <CardDescription>
                    Review the following time off requests and approve or reject them.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead className="hidden sm:table-cell">Department</TableHead>
                        <TableHead>Dates Requested</TableHead>
                        <TableHead className="text-right">Days</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingRequests.map((req) => (
                        <TableRow key={req.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                    <AvatarFallback>{getInitials(req.employeeName)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-medium">{req.employeeName}</div>
                                    <div className="text-sm text-muted-foreground sm:hidden">{req.department}</div>
                                </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">{req.department}</TableCell>
                          <TableCell>{req.startDate} to {req.endDate}</TableCell>
                          <TableCell className="text-right">{req.days}</TableCell>
                          <TableCell className="text-right">
                             <div className="flex gap-2 justify-end">
                                <Button variant="outline" size="icon"><X className="h-4 w-4" /></Button>
                                <Button size="icon"><Check className="h-4 w-4" /></Button>
                             </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* All Requests History Tab */}
            <TabsContent value="all-requests">
              <Card>
                <CardHeader>
                  <CardTitle>Request History</CardTitle>
                  <CardDescription>
                    A log of all time off requests across the company.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Dates</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allRequests.map((req) => (
                        <TableRow key={req.id}>
                          <TableCell className="font-medium">{req.employeeName}</TableCell>
                          <TableCell>{req.type}</TableCell>
                          <TableCell>{req.startDate} to {req.endDate}</TableCell>
                          <TableCell className="text-right">
                            <Badge variant={getStatusVariant(req.status) as any}>{req.status}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Company Policy Tab */}
            <TabsContent value="policy">
               <Card>
                <CardHeader>
                  <CardTitle>Time Off Policy</CardTitle>
                  <CardDescription>
                    Summary of the company's official time off policies for reference.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    <strong>Vacation:</strong> Full-time employees accrue 20 days of vacation per year. Unused days can be rolled over up to a maximum of 5 days.
                  </p>
                  <p>
                    <strong>Sick Leave:</strong> Employees are entitled to 10 paid sick days per year. A doctor's note is required for absences longer than 3 consecutive days.
                  </p>
                   <p>
                    <strong>Approval Process:</strong> All requests must be approved by the direct manager and reviewed by HR. Please advise employees to submit vacation requests at least two weeks in advance.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default TimeOffPage;