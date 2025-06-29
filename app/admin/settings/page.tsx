"use client";

import { useState } from 'react';
import { AdminHeader } from '@/components/admin/admin-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Palette, 
  Bell, 
  Shield, 
  Globe,
  Mail,
  Users,
  CreditCard,
  Database,
  Save
} from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // General Settings
    portalName: 'Stanford University Alumni Association',
    portalDescription: 'Connecting Stanford alumni worldwide through shared experiences and opportunities.',
    portalUrl: 'stanford-alumni.alumniportal.com',
    customDomain: 'alumni.stanford.edu',
    
    // Branding
    primaryColor: '#3B82F6',
    logoUrl: '',
    faviconUrl: '',
    
    // Notifications
    emailNotifications: true,
    whatsappNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    
    // Privacy & Security
    publicDirectory: true,
    memberVisibility: 'members-only',
    dataRetention: '7-years',
    
    // Features
    mentorshipEnabled: true,
    fundraisingEnabled: true,
    eventsEnabled: true,
    discussionsEnabled: true,
    
    // Email Settings
    senderName: 'Stanford Alumni Team',
    senderEmail: 'noreply@alumni.stanford.edu',
    replyToEmail: 'support@alumni.stanford.edu'
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    // TODO: Save settings to API
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Portal Settings</h1>
              <p className="text-muted-foreground">
                Configure your alumni portal preferences and features
              </p>
            </div>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save All Changes
            </Button>
          </div>

          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="branding">Branding</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
            </TabsList>

            {/* General Settings */}
            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5" />
                    <span>General Settings</span>
                  </CardTitle>
                  <CardDescription>
                    Basic configuration for your alumni portal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="portalName">Portal Name</Label>
                      <Input
                        id="portalName"
                        value={settings.portalName}
                        onChange={(e) => handleSettingChange('portalName', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="portalUrl">Portal URL</Label>
                      <Input
                        id="portalUrl"
                        value={settings.portalUrl}
                        disabled
                      />
                      <p className="text-xs text-muted-foreground">
                        Contact support to change your portal URL
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="portalDescription">Portal Description</Label>
                    <Textarea
                      id="portalDescription"
                      value={settings.portalDescription}
                      onChange={(e) => handleSettingChange('portalDescription', e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customDomain">Custom Domain</Label>
                    <Input
                      id="customDomain"
                      value={settings.customDomain}
                      onChange={(e) => handleSettingChange('customDomain', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Configure DNS settings to point your domain to our servers
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Branding Settings */}
            <TabsContent value="branding" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="w-5 h-5" />
                    <span>Branding & Appearance</span>
                  </CardTitle>
                  <CardDescription>
                    Customize the look and feel of your portal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="primaryColor">Primary Color</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id="primaryColor"
                            type="color"
                            value={settings.primaryColor}
                            onChange={(e) => handleSettingChange('primaryColor', e.target.value)}
                            className="w-16 h-10"
                          />
                          <Input
                            value={settings.primaryColor}
                            onChange={(e) => handleSettingChange('primaryColor', e.target.value)}
                            className="font-mono"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="logoUrl">Logo URL</Label>
                        <Input
                          id="logoUrl"
                          value={settings.logoUrl}
                          onChange={(e) => handleSettingChange('logoUrl', e.target.value)}
                          placeholder="https://example.com/logo.png"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="faviconUrl">Favicon URL</Label>
                        <Input
                          id="faviconUrl"
                          value={settings.faviconUrl}
                          onChange={(e) => handleSettingChange('faviconUrl', e.target.value)}
                          placeholder="https://example.com/favicon.ico"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 border border-border rounded-lg">
                        <h4 className="font-medium text-foreground mb-2">Preview</h4>
                        <div 
                          className="w-full h-32 rounded-lg flex items-center justify-center text-white font-semibold"
                          style={{ backgroundColor: settings.primaryColor }}
                        >
                          {settings.portalName}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Settings */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="w-5 h-5" />
                    <span>Notification Preferences</span>
                  </CardTitle>
                  <CardDescription>
                    Configure how and when to notify your alumni
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">Email Notifications</h4>
                        <p className="text-sm text-muted-foreground">
                          Send email notifications for important updates
                        </p>
                      </div>
                      <Switch
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">WhatsApp Notifications</h4>
                        <p className="text-sm text-muted-foreground">
                          Send WhatsApp messages for urgent alerts
                        </p>
                      </div>
                      <Switch
                        checked={settings.whatsappNotifications}
                        onCheckedChange={(checked) => handleSettingChange('whatsappNotifications', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">Push Notifications</h4>
                        <p className="text-sm text-muted-foreground">
                          Browser push notifications for real-time updates
                        </p>
                      </div>
                      <Switch
                        checked={settings.pushNotifications}
                        onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">Weekly Digest</h4>
                        <p className="text-sm text-muted-foreground">
                          Send weekly summary emails to alumni
                        </p>
                      </div>
                      <Switch
                        checked={settings.weeklyDigest}
                        onCheckedChange={(checked) => handleSettingChange('weeklyDigest', checked)}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <h4 className="font-medium text-foreground mb-4">Email Configuration</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="senderName">Sender Name</Label>
                        <Input
                          id="senderName"
                          value={settings.senderName}
                          onChange={(e) => handleSettingChange('senderName', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="senderEmail">Sender Email</Label>
                        <Input
                          id="senderEmail"
                          value={settings.senderEmail}
                          onChange={(e) => handleSettingChange('senderEmail', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy Settings */}
            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Privacy & Security</span>
                  </CardTitle>
                  <CardDescription>
                    Control privacy settings and data access
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">Public Directory</h4>
                        <p className="text-sm text-muted-foreground">
                          Allow search engines to index your alumni directory
                        </p>
                      </div>
                      <Switch
                        checked={settings.publicDirectory}
                        onCheckedChange={(checked) => handleSettingChange('publicDirectory', checked)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Member Visibility</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="public"
                          name="memberVisibility"
                          value="public"
                          checked={settings.memberVisibility === 'public'}
                          onChange={(e) => handleSettingChange('memberVisibility', e.target.value)}
                        />
                        <Label htmlFor="public">Public - Anyone can view member profiles</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="members-only"
                          name="memberVisibility"
                          value="members-only"
                          checked={settings.memberVisibility === 'members-only'}
                          onChange={(e) => handleSettingChange('memberVisibility', e.target.value)}
                        />
                        <Label htmlFor="members-only">Members Only - Only logged-in members can view profiles</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="private"
                          name="memberVisibility"
                          value="private"
                          checked={settings.memberVisibility === 'private'}
                          onChange={(e) => handleSettingChange('memberVisibility', e.target.value)}
                        />
                        <Label htmlFor="private">Private - Profiles are hidden by default</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Features Settings */}
            <TabsContent value="features" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Feature Management</span>
                  </CardTitle>
                  <CardDescription>
                    Enable or disable portal features
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-foreground">Mentorship Program</h4>
                          <p className="text-sm text-muted-foreground">
                            Connect alumni for mentoring relationships
                          </p>
                        </div>
                        <Switch
                          checked={settings.mentorshipEnabled}
                          onCheckedChange={(checked) => handleSettingChange('mentorshipEnabled', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-foreground">Fundraising</h4>
                          <p className="text-sm text-muted-foreground">
                            Enable donation campaigns and tracking
                          </p>
                        </div>
                        <Switch
                          checked={settings.fundraisingEnabled}
                          onCheckedChange={(checked) => handleSettingChange('fundraisingEnabled', checked)}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-foreground">Events Management</h4>
                          <p className="text-sm text-muted-foreground">
                            Create and manage alumni events
                          </p>
                        </div>
                        <Switch
                          checked={settings.eventsEnabled}
                          onCheckedChange={(checked) => handleSettingChange('eventsEnabled', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-foreground">Discussion Forums</h4>
                          <p className="text-sm text-muted-foreground">
                            Enable group discussions and messaging
                          </p>
                        </div>
                        <Switch
                          checked={settings.discussionsEnabled}
                          onCheckedChange={(checked) => handleSettingChange('discussionsEnabled', checked)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Integrations Settings */}
            <TabsContent value="integrations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="w-5 h-5" />
                    <span>Integrations</span>
                  </CardTitle>
                  <CardDescription>
                    Connect with external services and APIs
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-8 h-8 text-blue-600" />
                        <div>
                          <h4 className="font-medium text-foreground">Email Service</h4>
                          <p className="text-sm text-muted-foreground">SendGrid integration for email delivery</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Connected
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-8 h-8 text-green-600" />
                        <div>
                          <h4 className="font-medium text-foreground">Payment Gateway</h4>
                          <p className="text-sm text-muted-foreground">Stripe integration for donations and payments</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Connected
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Database className="w-8 h-8 text-purple-600" />
                        <div>
                          <h4 className="font-medium text-foreground">Analytics</h4>
                          <p className="text-sm text-muted-foreground">Google Analytics for portal insights</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}