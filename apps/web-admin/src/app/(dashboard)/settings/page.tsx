"use client";

import { useState } from "react";
import { Button } from "@merchant/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@merchant/ui/components/card";
import { Input } from "@merchant/ui/components/input";
import { Label } from "@merchant/ui/components/label";
import { Switch } from "@merchant/ui/components/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@merchant/ui/components/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@merchant/ui/components/select";
import { Textarea } from "@merchant/ui/components/textarea";
import { Badge } from "@merchant/ui/components/badge";
import { Separator } from "@merchant/ui/components/separator";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@merchant/ui/components/avatar";
import {
  SettingsIcon,
  User,
  Shield,
  Bell,
  Palette,
  Globe,
  Key,
  Trash2,
  Upload,
  Eye,
  EyeOff,
} from "lucide-react";
import { useTheme } from "@merchant/ui/lib/theme";

export default function Settings() {
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    marketing: false,
  });

  const { setTheme } = useTheme();

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b bg-background px-6 py-4">
        <div className="flex items-center gap-3">
          <SettingsIcon className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
            <p className="text-sm text-muted-foreground">
              Manage your account and application preferences
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2"
            >
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Advanced
            </TabsTrigger>
          </TabsList>

          {/* Account Settings */}
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account details and profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/professional-profile.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Change Avatar
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      JPG, PNG or GIF. Max size 2MB.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="john.doe@acme.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" placeholder="Tell us about yourself..." />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Organization</CardTitle>
                <CardDescription>
                  Your role and department information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select defaultValue="engineering">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue="Senior Developer" />
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Admin</Badge>
                  <Badge variant="outline">Developer</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Password & Authentication</CardTitle>
                <CardDescription>
                  Manage your password and two-factor authentication
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter current password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                  />
                </div>

                <Button>Update Password</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">SMS Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Receive codes via SMS
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Authenticator App</p>
                    <p className="text-sm text-muted-foreground">
                      Use Google Authenticator or similar
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-medium">Recovery Codes</h4>
                  <p className="text-sm text-muted-foreground">
                    Generate backup codes for account recovery
                  </p>
                  <Button variant="outline">
                    <Key className="h-4 w-4 mr-2" />
                    Generate Recovery Codes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how you want to be notified about updates and
                  activities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          email: checked,
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications in browser
                      </p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({ ...prev, push: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive important alerts via SMS
                      </p>
                    </div>
                    <Switch
                      checked={notifications.sms}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({ ...prev, sms: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Marketing Communications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive product updates and promotions
                      </p>
                    </div>
                    <Switch
                      checked={notifications.marketing}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          marketing: checked,
                        }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Types</CardTitle>
                <CardDescription>
                  Configure which activities trigger notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="security-alerts" defaultChecked />
                    <Label htmlFor="security-alerts">Security Alerts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="system-updates" defaultChecked />
                    <Label htmlFor="system-updates">System Updates</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="team-mentions" defaultChecked />
                    <Label htmlFor="team-mentions">Team Mentions</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="task-assignments" />
                    <Label htmlFor="task-assignments">Task Assignments</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance */}
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Theme & Display</CardTitle>
                <CardDescription>
                  Customize the appearance of your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select
                    defaultValue="system"
                    onValueChange={(value) => {
                      setTheme(value);
                    }}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select defaultValue="utc-5">
                    <SelectTrigger className="w-64">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc-8">
                        Pacific Time (UTC-8)
                      </SelectItem>
                      <SelectItem value="utc-7">
                        Mountain Time (UTC-7)
                      </SelectItem>
                      <SelectItem value="utc-6">
                        Central Time (UTC-6)
                      </SelectItem>
                      <SelectItem value="utc-5">
                        Eastern Time (UTC-5)
                      </SelectItem>
                      <SelectItem value="utc+0">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Compact Mode</p>
                    <p className="text-sm text-muted-foreground">
                      Reduce spacing and padding
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced */}
          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Data & Privacy</CardTitle>
                <CardDescription>
                  Manage your data and privacy settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Button variant="outline">Export Account Data</Button>
                  <p className="text-sm text-muted-foreground">
                    Download a copy of your account data
                  </p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium text-destructive">Danger Zone</h4>
                  <div className="space-y-2">
                    <Button variant="destructive" className="w-fit">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all associated data.
                      This action cannot be undone.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API & Integrations</CardTitle>
                <CardDescription>
                  Manage API keys and third-party integrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      value="sk-1234567890abcdef..."
                      readOnly
                      className="font-mono"
                    />
                    <Button variant="outline">Regenerate</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Webhook URL</Label>
                  <Input placeholder="https://your-app.com/webhook" />
                </div>

                <Button>Save Integration Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
