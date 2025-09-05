"use client";

import { Button } from "@merchant/ui/components/button";
import { Input } from "@merchant/ui/components/input";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Filter,
  MoreVertical,
  Search,
  Send,
  User,
} from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@merchant/ui/components/scroll-area";
import { Avatar, AvatarFallback } from "@merchant/ui/components/avatar";
import { Badge } from "@merchant/ui/components/badge";
import { Card } from "@merchant/ui/components/card";

interface ChatMessage {
  id: string;
  sender: "user" | "agent";
  message: string;
  timestamp: string;
  avatar?: string;
}

interface SupportTicket {
  id: string;
  customer: string;
  subject: string;
  status: "open" | "pending" | "resolved";
  priority: "low" | "medium" | "high";
  lastMessage: string;
  timestamp: string;
  unread: number;
}

const mockTickets: SupportTicket[] = [
  {
    id: "1",
    customer: "John Doe",
    subject: "Login Issues",
    status: "open",
    priority: "high",
    lastMessage: "I cannot access my account after the recent update...",
    timestamp: "2 min ago",
    unread: 3,
  },
  {
    id: "2",
    customer: "Sarah Wilson",
    subject: "Billing Question",
    status: "pending",
    priority: "medium",
    lastMessage: "Could you help me understand my latest invoice?",
    timestamp: "15 min ago",
    unread: 1,
  },
  {
    id: "3",
    customer: "Mike Johnson",
    subject: "Feature Request",
    status: "resolved",
    priority: "low",
    lastMessage: "Thank you for implementing the dark mode!",
    timestamp: "1 hour ago",
    unread: 0,
  },
];

const mockMessages: ChatMessage[] = [
  {
    id: "1",
    sender: "user",
    message:
      "Hi, I'm having trouble logging into my account after the recent update.",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    sender: "agent",
    message:
      "Hello John! I'm sorry to hear you're experiencing login issues. Let me help you with that. Can you tell me what error message you're seeing?",
    timestamp: "10:32 AM",
  },
  {
    id: "3",
    sender: "user",
    message:
      'It says "Invalid credentials" even though I\'m using the correct password.',
    timestamp: "10:33 AM",
  },
  {
    id: "4",
    sender: "agent",
    message:
      "I see the issue. There was a recent security update that requires password reset for some accounts. I'll send you a secure reset link right now.",
    timestamp: "10:35 AM",
  },
];

function ChatSupport() {
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket>(
    mockTickets[0]
  );
  const [newMessage, setNewMessage] = useState("");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "resolved":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <main className="flex h-full w-full max-h-[calc(100vh-4rem)] flex-1">
      <div className="flex flex-1">
        {/* Tickets List */}
        <div className="w-80 border-r border-border bg-card">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-card-foreground">
                Support Tickets
              </h2>
              <Button variant="ghost" size="sm">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search tickets..." className="pl-10" />
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-204px)]">
            <div className="p-2">
              {mockTickets.map((ticket) => (
                <Card
                  key={ticket.id}
                  className={`p-3 mb-2 cursor-pointer transition-colors hover:bg-accent ${
                    selectedTicket.id === ticket.id ? "bg-accent" : ""
                  }`}
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm text-card-foreground">
                          {ticket.customer}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {ticket.timestamp}
                        </p>
                      </div>
                    </div>
                    {ticket.unread > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {ticket.unread}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon(ticket.status)}
                    <span className="text-sm font-medium text-card-foreground">
                      {ticket.subject}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {ticket.lastMessage}
                  </p>

                  <div className="flex items-center justify-between">
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {ticket.status}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Interface */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-border bg-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-card-foreground">
                    {selectedTicket.customer}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedTicket.subject}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getPriorityColor(selectedTicket.priority)}>
                  {selectedTicket.priority}
                </Badge>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {mockMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "agent" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === "agent"
                        ? "bg-muted text-muted-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === "agent"
                          ? "text-muted-foreground"
                          : "text-primary-foreground/70"
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ChatSupport;
