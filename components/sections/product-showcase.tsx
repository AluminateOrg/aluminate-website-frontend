import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  Calendar,
  Settings,
  UserCheck
} from 'lucide-react';

const screenshots = [
  {
    title: 'Admin Dashboard',
    description: 'Comprehensive overview of your alumni community with real-time analytics and management tools.',
    icon: BarChart3,
    category: 'Management',
    features: ['Member Analytics', 'Engagement Metrics', 'Event Tracking', 'Revenue Reports']
  },
  {
    title: 'Member Directory',
    description: 'Searchable alumni database with detailed profiles, networking capabilities, and privacy controls.',
    icon: Users,
    category: 'Community',
    features: ['Advanced Search', 'Profile Management', 'Privacy Settings', 'Networking Tools']
  },
  {
    title: 'Group Discussions',
    description: 'Real-time messaging and forum discussions to keep your alumni community engaged.',
    icon: MessageSquare,
    category: 'Engagement',
    features: ['Real-time Chat', 'Group Forums', 'File Sharing', 'Moderation Tools']
  },
  {
    title: 'Event Management',
    description: 'Create, manage, and track alumni events with RSVP functionality and check-in systems.',
    icon: Calendar,
    category: 'Events',
    features: ['Event Creation', 'RSVP Tracking', 'QR Check-ins', 'Feedback Collection']
  },
  {
    title: 'Mentorship Portal',
    description: 'Connect experienced alumni with mentees through structured mentorship programs.',
    icon: UserCheck,
    category: 'Growth',
    features: ['Mentor Matching', 'Session Booking', 'Progress Tracking', 'Feedback System']
  },
  {
    title: 'System Configuration',
    description: 'Customize your portal settings, branding, and organizational preferences.',
    icon: Settings,
    category: 'Customization',
    features: ['Brand Settings', 'User Permissions', 'Email Templates', 'API Configuration']
  }
];

export function ProductShowcase() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="text-accent border-accent/20">
            Product Screenshots
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            See Our Platform in Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the comprehensive features that make our alumni portal system the perfect choice for your organization
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {screenshots.map((screenshot, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              {/* Mock screenshot area */}
              <div className="aspect-video bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                <div className="relative w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
                  <screenshot.icon className="w-8 h-8 text-accent" />
                </div>
                {/* Mock UI elements */}
                <div className="absolute top-4 left-4 right-4 h-2 bg-muted rounded-full" />
                <div className="absolute bottom-4 left-4 right-4 space-y-2">
                  <div className="h-2 bg-muted rounded w-3/4" />
                  <div className="h-2 bg-muted rounded w-1/2" />
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                    {screenshot.title}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {screenshot.category}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  {screenshot.description}
                </p>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-foreground">Key Features:</p>
                  <div className="flex flex-wrap gap-1">
                    {screenshot.features.map((feature, featureIndex) => (
                      <Badge 
                        key={featureIndex} 
                        variant="outline" 
                        className="text-xs text-muted-foreground"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            Want to see the actual platform in action?
          </p>
          <Badge className="cursor-pointer hover:bg-accent/90 transition-colors">
            Schedule a Live Demo →
          </Badge>
        </div>
      </div>
    </section>
  );
}