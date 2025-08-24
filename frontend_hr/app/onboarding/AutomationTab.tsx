"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap, CheckCheck, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export default function AutomationTab({
  recentOnboardings,
  selectedEmployee,
  setSelectedEmployee,
  generateAutomatedTasks,
  automatedTasks
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Automated Task Generation</CardTitle>
          <CardDescription>AI-generated tasks for new employees</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Select onValueChange={(value) => setSelectedEmployee(recentOnboardings.find(e => e.id.toString() === value))}>
              <SelectTrigger>
                <SelectValue placeholder="Select employee to generate tasks" />
              </SelectTrigger>
              <SelectContent>
                {recentOnboardings.map((employee) => (
                  <SelectItem key={employee.id} value={employee.id.toString()}>
                    {employee.name} - {employee.position}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedEmployee && (
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Generated Tasks for {selectedEmployee.name}:</h4>
                {generateAutomatedTasks(selectedEmployee).map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-orange-500" />
                      <span className="text-sm">{task}</span>
                    </div>
                    <Button size="sm" variant="outline">
                      Assign
                    </Button>
                  </div>
                ))}
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <CheckCheck className="h-4 w-4 mr-2" />
                  Execute All Tasks
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Task Status Tracking</CardTitle>
          <CardDescription>Monitor automated and manual tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {automatedTasks.map((category, index) => (
              <div key={index}>
                <h4 className="font-medium text-gray-900 mb-3">{category.category}</h4>
                <div className="space-y-2">
                  {category.tasks.map((task, taskIndex) => (
                    <div key={taskIndex} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center space-x-2">
                        {task.automated && <Zap className="h-3 w-3 text-orange-500" />}
                        <span className="text-sm">{task.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {task.status === 'completed' && <CheckCircle className="h-4 w-4 text-green-600" />}
                        {task.status === 'in-progress' && <Clock className="h-4 w-4 text-blue-600" />}
                        {task.status === 'pending' && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                        <span className={`text-xs px-2 py-1 rounded ${
                          task.status === 'completed' ? 'bg-green-100 text-green-800' :
                          task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {task.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}