"use client";

import { useState } from 'react';
import { AdminHeader } from '@/components/admin/admin-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  FileText,
  Video,
  Search,
  Send,
  ExternalLink,
  Clock,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';

const faqs = [
  {
    question: "How do I add new alumni members to my portal?",
    answer: "You can add members individually through the 'Add Members' quick action, or bulk import using CSV files. Go to Members > Import Members and download our CSV template for bulk uploads."
  },
  {
    question: "Can I customize the appearance of my portal?",
    answer: "Yes! Go to Settings > Branding to customize your portal's colors, logo, and overall appearance. You can also configure custom domains and SSL certificates."
  },
  {
    question: "How do I set up fundraising campaigns?",
    answer: "Navigate to Fundraising > Create Campaign. You can set goals, create donation tiers, and track progress. Make sure your payment gateway is configured in Settings > Integrations."
  },
  {
    question: "What's the difference between subscription tiers?",
    answer: "Basic supports up to 500 members, Standard up to 2,000 members with advanced features, and Premium offers unlimited members with enterprise features. Check our pricing page for detailed comparisons."
  },
  {
    question: "How do I backup my portal data?",
    answer: "Automatic backups are performed daily. You can also create manual backups from the Container Status section. Premium plans include real-time backup monitoring."
  },
  {
    question: "Can I integrate with external services?",
    answer: "Yes, we support integrations with email services (SendGrid), payment gateways (Stripe), analytics (Google Analytics), and more. Configure these in Settings > Integrations."
  }
];

const supportTickets = [
  {
    id: 'TKT-001',
    subject: 'Unable to upload member photos',
    status: 'Open',
    priority: 'Medium',
    created: '2024-01-15',
    lastUpdate: '2024-01-15'
  },
  {
    id: 'TKT-002',
    subject: 'Custom domain SSL certificate issue',
    status: 'In Progress',
    priority: 'High',
    created: '2024-01-14',
    lastUpdate: '2024-01-15'
  },
  {
    id: 'TKT-003',
    subject: 'Bulk email delivery delays',
    status: 'Resolved',
    priority: 'Low',
    created: '2024-01-12',
    lastUpdate: '2024-01-13'
  }
];

export default function HelpSupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    priority: 'Medium',
    description: ''
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    toast.info(`Searching for: ${searchQuery}`);
  };

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit support ticket
    toast.success('Support ticket submitted successfully!');
    setTicketForm({ subject: '', priority: 'Medium', description: '' });
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-foreground">Help & Support</h1>
            <p className="text-muted-foreground">
              Get help with your alumni portal, find answers to common questions, or contact our support team
            </p>
          </div>

          {/* Search */}
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSearch} className="flex space-x-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search for help articles, FAQs, or guides..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button type="submit">Search</Button>
              </form>
            </CardContent>
          </Card>

          <Tabs defaultValue="faq" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="guides">Guides</TabsTrigger>
              <TabsTrigger value="contact">Contact Support</TabsTrigger>
              <TabsTrigger value="tickets">My Tickets</TabsTrigger>
            </TabsList>

            {/* FAQ Tab */}
            <TabsContent value="faq" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <HelpCircle className="w-5 h-5" />
                    <span>Frequently Asked Questions</span>
                  </CardTitle>
                  <CardDescription>
                    Find quick answers to common questions about your alumni portal
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {filteredFaqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Guides Tab */}
            <TabsContent value="guides" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                      <Video className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">Getting Started</CardTitle>
                    <CardDescription>
                      Complete setup guide for new portal administrators
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Watch Video Guide
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                      <FileText className="w-6 h-6 text-green-600" />
                    </div>
                    <CardTitle className="text-lg">Member Management</CardTitle>
                    <CardDescription>
                      Learn how to add, manage, and organize your alumni members
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      <FileText className="w-4 h-4 mr-2" />
                      Read Guide
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                      <MessageCircle className="w-6 h-6 text-purple-600" />
                    </div>
                    <CardTitle className="text-lg">Event Management</CardTitle>
                    <CardDescription>
                      Create and manage alumni events with RSVP tracking
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      <FileText className="w-4 h-4 mr-2" />
                      Read Guide
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-2">
                      <Mail className="w-6 h-6 text-orange-600" />
                    </div>
                    <CardTitle className="text-lg">Email Campaigns</CardTitle>
                    <CardDescription>
                      Design and send newsletters and announcements
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      <Video className="w-4 h-4 mr-2" />
                      Watch Tutorial
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-2">
                      <HelpCircle className="w-6 h-6 text-red-600" />
                    </div>
                    <CardTitle className="text-lg">Fundraising Setup</CardTitle>
                    <CardDescription>
                      Configure donation campaigns and payment processing
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      <FileText className="w-4 h-4 mr-2" />
                      Read Guide
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-2">
                      <Phone className="w-6 h-6 text-indigo-600" />
                    </div>
                    <CardTitle className="text-lg">API Documentation</CardTitle>
                    <CardDescription>
                      Technical documentation for developers and integrations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Docs
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Contact Support Tab */}
            <TabsContent value="contact" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Contact Methods */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Methods</CardTitle>
                      <CardDescription>
                        Choose the best way to reach our support team
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                        <MessageCircle className="w-8 h-8 text-blue-600" />
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Live Chat</h4>
                          <p className="text-sm text-muted-foreground">Available 24/7 for immediate assistance</p>
                        </div>
                        <Button size="sm">Start Chat</Button>
                      </div>

                      <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                        <Mail className="w-8 h-8 text-green-600" />
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Email Support</h4>
                          <p className="text-sm text-muted-foreground">support@alumninate.com</p>
                        </div>
                        <Button size="sm" variant="outline">Send Email</Button>
                      </div>

                      <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                        <Phone className="w-8 h-8 text-purple-600" />
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Phone Support</h4>
                          <p className="text-sm text-muted-foreground">+94 711877231</p>
                        </div>
                        <Button size="sm" variant="outline">Call Now</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Support Ticket Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>Submit Support Ticket</CardTitle>
                    <CardDescription>
                      Describe your issue and we'll get back to you within 24 hours
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmitTicket} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          value={ticketForm.subject}
                          onChange={(e) => setTicketForm(prev => ({ ...prev, subject: e.target.value }))}
                          placeholder="Brief description of your issue"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority</Label>
                        <select
                          id="priority"
                          value={ticketForm.priority}
                          onChange={(e) => setTicketForm(prev => ({ ...prev, priority: e.target.value }))}
                          className="w-full px-3 py-2 border border-border rounded-md bg-background"
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                          <option value="Critical">Critical</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={ticketForm.description}
                          onChange={(e) => setTicketForm(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Please provide detailed information about your issue..."
                          rows={6}
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full">
                        <Send className="w-4 h-4 mr-2" />
                        Submit Ticket
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* My Tickets Tab */}
            <TabsContent value="tickets" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Support Tickets</CardTitle>
                  <CardDescription>
                    Track the status of your support requests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {supportTickets.map((ticket) => (
                      <div key={ticket.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-foreground">{ticket.subject}</h4>
                            <Badge
                              variant={
                                ticket.status === 'Open' ? 'destructive' :
                                ticket.status === 'In Progress' ? 'default' :
                                'secondary'
                              }
                            >
                              {ticket.status}
                            </Badge>
                            <Badge variant="outline">
                              {ticket.priority}
                            </Badge>
                          </div>
                          <span className="text-sm text-muted-foreground">#{ticket.id}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>Created: {ticket.created}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <CheckCircle className="w-4 h-4" />
                              <span>Updated: {ticket.lastUpdate}</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
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