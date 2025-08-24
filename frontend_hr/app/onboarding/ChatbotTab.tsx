"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Clock, Users, Mail, Bot, Zap, Send } from 'lucide-react';

export default function ChatbotTab({
  chatMessages,
  currentMessage,
  setCurrentMessage,
  handleSendMessage
}) {
  const quickQuestions = [
    "What are the vacation policies?",
    "How do I request remote work?",
    "What benefits are available?",
    "Who is my manager?",
    "What equipment will I receive?"
  ];

  const handleQuickQuestionClick = (question) => {
    setCurrentMessage(question);
    // Use a tiny timeout to ensure the state update is processed before sending
    setTimeout(() => handleSendMessage(), 50);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bot className="h-5 w-5 mr-2 text-blue-600" />
            HR Assistant Chatbot
          </CardTitle>
          <CardDescription>Ask questions about company procedures, policies, and onboarding</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-64 border rounded-lg p-4 overflow-y-auto bg-gray-50">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`mb-3 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    msg.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white border flex items-start space-x-2'
                  }`}>
                    {msg.type === 'bot' && <Bot className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />}
                    <span>{msg.message}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex space-x-2">
              <Input
                placeholder="Ask about policies, benefits, procedures..."
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions & FAQ</CardTitle>
          <CardDescription>Common questions and quick shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Quick Questions</h4>
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start font-normal"
                  onClick={() => handleQuickQuestionClick(question)}
                >
                  {question}
                </Button>
              ))}
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-2">Email Automation</h4>
              <div className="space-y-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => console.log('Sending welcome emails')}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Welcome Emails
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => console.log('Sending reminder emails')}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Send Task Reminders
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => console.log('Sending check-in emails')}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Schedule Check-ins
                </Button>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-2">Recent Activity</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <span>Jane Smith completed IT setup</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-3 w-3 text-blue-600" />
                  <span>Welcome email sent to Mike Johnson</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-3 w-3 text-orange-600" />
                  <span>5 tasks auto-generated for new hire</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}