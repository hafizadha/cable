"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from 'lucide-react';

export default function OverviewTab({ onboardingSteps, recentOnboardings }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Onboarding Steps</CardTitle>
          <CardDescription>Current onboarding workflow</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {onboardingSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    step.status === 'completed' ? 'bg-green-100' :
                    step.status === 'in-progress' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <Icon className={`h-5 w-5 ${
                      step.status === 'completed' ? 'text-green-600' :
                      step.status === 'in-progress' ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{step.title}</p>
                    <p className="text-sm text-gray-500 capitalize">{step.status}</p>
                  </div>
                  {step.status === 'completed' && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Onboardings</CardTitle>
          <CardDescription>Latest employee onboarding activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOnboardings.map((employee, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{employee.name}</p>
                  <p className="text-sm text-gray-500">{employee.position}</p>
                  <p className="text-xs text-gray-400">Start: {employee.startDate}</p>
                  <div className="flex items-center mt-1">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(employee.tasksCompleted / employee.totalTasks) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 ml-2">
                      {employee.tasksCompleted}/{employee.totalTasks}
                    </span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  employee.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  employee.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {employee.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}