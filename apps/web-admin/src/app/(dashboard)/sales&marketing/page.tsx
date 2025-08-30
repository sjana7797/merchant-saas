"use client";

import { useState } from "react";
import { Sidebar } from "@merchant/ui/components/sidebar";
import { Button } from "@merchant/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@merchant/ui/components/card";
import { Input } from "@merchant/ui/components/input";
import { Badge } from "@merchant/ui/components/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@merchant/ui/components/tabs";
import {
  TrendingUp,
  Users,
  DollarSign,
  Target,
  BarChart3,
  PieChart,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

const salesData = [
  {
    id: 1,
    name: "John Smith",
    company: "Tech Corp",
    value: "$45,000",
    status: "qualified",
    stage: "proposal",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    company: "Design Studio",
    value: "$32,000",
    status: "contacted",
    stage: "discovery",
  },
  {
    id: 3,
    name: "Mike Wilson",
    company: "StartupXYZ",
    value: "$78,000",
    status: "qualified",
    stage: "negotiation",
  },
  {
    id: 4,
    name: "Emily Davis",
    company: "Enterprise Inc",
    value: "$120,000",
    status: "proposal",
    stage: "closing",
  },
];

const campaigns = [
  {
    id: 1,
    name: "Q4 Product Launch",
    type: "Email",
    status: "active",
    opens: "2,340",
    clicks: "456",
    conversions: "23",
  },
  {
    id: 2,
    name: "Holiday Promotion",
    type: "Social",
    status: "scheduled",
    opens: "1,890",
    clicks: "234",
    conversions: "12",
  },
  {
    id: 3,
    name: "Webinar Series",
    type: "Event",
    status: "completed",
    opens: "3,450",
    clicks: "678",
    conversions: "45",
  },
];

export default function SalesMarketingInterface() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <>
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b border-border bg-background px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                Sales & Marketing
              </h1>
              <p className="text-sm text-muted-foreground">
                Manage your sales pipeline and marketing campaigns
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Campaign
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="leads">Leads</TabsTrigger>
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Revenue
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$275,000</div>
                    <p className="text-xs text-muted-foreground">
                      +12% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Leads
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,234</div>
                    <p className="text-xs text-muted-foreground">
                      +8% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Conversion Rate
                    </CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24.5%</div>
                    <p className="text-xs text-muted-foreground">
                      +2.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Campaign ROI
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">340%</div>
                    <p className="text-xs text-muted-foreground">
                      +15% from last month
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Leads</CardTitle>
                    <CardDescription>
                      Latest prospects in your pipeline
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {salesData.slice(0, 3).map((lead) => (
                      <div
                        key={lead.id}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium">{lead.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {lead.company}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{lead.value}</p>
                          <Badge
                            variant={
                              lead.status === "qualified"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {lead.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Active Campaigns</CardTitle>
                    <CardDescription>
                      Currently running marketing campaigns
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {campaigns
                      .filter((c) => c.status === "active")
                      .map((campaign) => (
                        <div
                          key={campaign.id}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <p className="font-medium">{campaign.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {campaign.type}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm">{campaign.opens} opens</p>
                            <Badge variant="default">{campaign.status}</Badge>
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="leads" className="space-y-6">
              {/* Search and Filters */}
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search leads..." className="pl-10" />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Lead
                </Button>
              </div>

              {/* Leads Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Sales Pipeline</CardTitle>
                  <CardDescription>
                    Manage your sales opportunities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {salesData.map((lead) => (
                      <div
                        key={lead.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                            <span className="font-medium">
                              {lead.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{lead.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {lead.company}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-medium">{lead.value}</p>
                            <p className="text-sm text-muted-foreground capitalize">
                              {lead.stage}
                            </p>
                          </div>
                          <Badge
                            variant={
                              lead.status === "qualified"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {lead.status}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="campaigns" className="space-y-6">
              {/* Campaign Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search campaigns..."
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Campaign
                </Button>
              </div>

              {/* Campaigns Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map((campaign) => (
                  <Card key={campaign.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          {campaign.name}
                        </CardTitle>
                        <Badge
                          variant={
                            campaign.status === "active"
                              ? "default"
                              : campaign.status === "scheduled"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {campaign.status}
                        </Badge>
                      </div>
                      <CardDescription>
                        {campaign.type} Campaign
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold">{campaign.opens}</p>
                          <p className="text-xs text-muted-foreground">Opens</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold">
                            {campaign.clicks}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Clicks
                          </p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold">
                            {campaign.conversions}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Conversions
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-transparent"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-transparent"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Revenue Trends
                    </CardTitle>
                    <CardDescription>
                      Monthly revenue performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-muted-foreground">
                      Revenue chart would be rendered here
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5" />
                      Lead Sources
                    </CardTitle>
                    <CardDescription>
                      Where your leads are coming from
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-muted-foreground">
                      Lead sources chart would be rendered here
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
