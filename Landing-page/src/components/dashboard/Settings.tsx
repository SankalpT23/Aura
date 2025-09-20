"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Bell,
  Shield,
  Palette,
  TrendingUp,
  AlertTriangle,
  Save,
  Download,
  Trash2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    // Profile
    name: "John Investor",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    smsAlerts: false,
    marketHours: true,
    weekendUpdates: false,
    
    // Risk & Alerts
    riskTolerance: [7],
    maxLossThreshold: [5],
    rebalanceThreshold: [10],
    concentrationLimit: [25],
    
    // Trading
    currency: "USD",
    timezone: "America/New_York",
    tradingStyle: "moderate",
    
    // Privacy
    dataSharing: false,
    analyticsTracking: true,
    marketingEmails: false,
  });

  // BACKEND: persist changes to user settings on save; keep local state for UX
  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // BACKEND: send settings to server; validate and handle errors
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleExportData = () => {
    // BACKEND: request data export and track job status
    toast({
      title: "Data Export Initiated",
      description: "Your data export will be emailed to you within 24 hours.",
    });
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Customize your AURA experience and manage your preferences
          </p>
        </div>
        <Button onClick={handleSave} className="bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="risk" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Risk & Alerts
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Privacy
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={settings.name}
                  onChange={(e) => handleSettingChange("name", e.target.value)}
                  className="bg-muted/50 border-border focus:border-[var(--primary)]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleSettingChange("email", e.target.value)}
                  className="bg-muted/50 border-border focus:border-[var(--primary)]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={settings.phone}
                  onChange={(e) => handleSettingChange("phone", e.target.value)}
                  className="bg-muted/50 border-border focus:border-[var(--primary)]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={settings.timezone} onValueChange={(value) => handleSettingChange("timezone", value)}>
                  <SelectTrigger className="bg-muted/50 border-border focus:border-[var(--primary)]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                    <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Trading Preferences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="currency">Base Currency</Label>
                <Select value={settings.currency} onValueChange={(value) => handleSettingChange("currency", value)}>
                  <SelectTrigger className="bg-muted/50 border-border focus:border-[var(--primary)]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="trading-style">Trading Style</Label>
                <Select value={settings.tradingStyle} onValueChange={(value) => handleSettingChange("tradingStyle", value)}>
                  <SelectTrigger className="bg-muted/50 border-border focus:border-[var(--primary)]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conservative">Conservative</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="aggressive">Aggressive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Notification Preferences</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive alerts and updates via email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Real-time alerts in your browser</p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">SMS Alerts</Label>
                  <p className="text-sm text-muted-foreground">Critical alerts via text message</p>
                </div>
                <Switch
                  checked={settings.smsAlerts}
                  onCheckedChange={(checked) => handleSettingChange("smsAlerts", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Market Hours Only</Label>
                  <p className="text-sm text-muted-foreground">Only receive alerts during market hours</p>
                </div>
                <Switch
                  checked={settings.marketHours}
                  onCheckedChange={(checked) => handleSettingChange("marketHours", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Weekend Updates</Label>
                  <p className="text-sm text-muted-foreground">Portfolio summaries on weekends</p>
                </div>
                <Switch
                  checked={settings.weekendUpdates}
                  onCheckedChange={(checked) => handleSettingChange("weekendUpdates", checked)}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Risk & Alerts Settings */}
        <TabsContent value="risk" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Risk Management</h2>
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="font-medium">Risk Tolerance</Label>
                  <Badge variant="outline">{settings.riskTolerance[0]}/10</Badge>
                </div>
                <Slider
                  value={settings.riskTolerance}
                  onValueChange={(value) => handleSettingChange("riskTolerance", value)}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Higher values indicate greater risk tolerance
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="font-medium">Daily Loss Threshold</Label>
                  <Badge variant="outline">{settings.maxLossThreshold[0]}%</Badge>
                </div>
                <Slider
                  value={settings.maxLossThreshold}
                  onValueChange={(value) => handleSettingChange("maxLossThreshold", value)}
                  max={20}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Alert when daily losses exceed this percentage
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="font-medium">Rebalancing Threshold</Label>
                  <Badge variant="outline">{settings.rebalanceThreshold[0]}%</Badge>
                </div>
                <Slider
                  value={settings.rebalanceThreshold}
                  onValueChange={(value) => handleSettingChange("rebalanceThreshold", value)}
                  max={25}
                  min={5}
                  step={1}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Suggest rebalancing when allocation drift exceeds this percentage
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="font-medium">Position Concentration Limit</Label>
                  <Badge variant="outline">{settings.concentrationLimit[0]}%</Badge>
                </div>
                <Slider
                  value={settings.concentrationLimit}
                  onValueChange={(value) => handleSettingChange("concentrationLimit", value)}
                  max={50}
                  min={10}
                  step={5}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Alert when a single position exceeds this percentage of portfolio
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Privacy & Data</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Data Sharing</Label>
                  <p className="text-sm text-muted-foreground">Allow anonymized data sharing for research</p>
                </div>
                <Switch
                  checked={settings.dataSharing}
                  onCheckedChange={(checked) => handleSettingChange("dataSharing", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Analytics Tracking</Label>
                  <p className="text-sm text-muted-foreground">Help improve AURA with usage analytics</p>
                </div>
                <Switch
                  checked={settings.analyticsTracking}
                  onCheckedChange={(checked) => handleSettingChange("analyticsTracking", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Marketing Communications</Label>
                  <p className="text-sm text-muted-foreground">Receive product updates and news</p>
                </div>
                <Switch
                  checked={settings.marketingEmails}
                  onCheckedChange={(checked) => handleSettingChange("marketingEmails", checked)}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Data Management</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <Label className="font-medium">Export Your Data</Label>
                  <p className="text-sm text-muted-foreground">Download a copy of all your data</p>
                </div>
                <Button variant="outline" onClick={handleExportData}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border border-destructive/20 bg-destructive/5 rounded-lg">
                <div>
                  <Label className="font-medium text-destructive">Delete Account</Label>
                  <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                </div>
                <Button variant="destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
