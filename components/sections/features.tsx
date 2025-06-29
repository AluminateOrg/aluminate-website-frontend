import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Cloud, 
  MessageCircle, 
  DollarSign, 
  UserCheck, 
  Upload, 
  Smartphone,
  Shield,
  Zap,
  Users
} from 'lucide-react';

const features = [
  {
    icon: Cloud,
    title: 'Per-Organization Cloud Isolation',
    description: 'Dedicated container instances ensure complete data separation and security for each organization.',
    highlight: 'Enterprise Security'
  },
  {
    icon: MessageCircle,
    title: 'Group Chats & Event Management',
    description: 'Foster engagement with real-time messaging, event RSVPs, and community interaction tools.',
    highlight: 'Community Building'
  },
  {
    icon: DollarSign,
    title: 'Fundraising & Bank Integration',
    description: 'Seamless donation processing with integrated payment gateways and financial tracking.',
    highlight: 'Revenue Generation'
  },
  {
    icon: UserCheck,
    title: 'Mentorship Directory & Appointments',
    description: 'Connect alumni through structured mentorship programs with booking and scheduling systems.',
    highlight: 'Professional Growth'
  },
  {
    icon: Upload,
    title: 'Bulk CSV Onboarding & QR Check-ins',
    description: 'Efficiently manage large alumni databases with automated onboarding and event check-ins.',
    highlight: 'Operational Efficiency'
  },
  {
    icon: Smartphone,
    title: 'NIC-based Login & WhatsApp Notifications',
    description: 'Secure authentication with national ID verification and instant WhatsApp alerts.',
    highlight: 'Accessibility & Security'
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Why Choose Our Alumni Portal System?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive features designed to transform how organizations engage with their alumni communities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 border-0 bg-background/50 backdrop-blur-sm"
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded-full">
                    {feature.highlight}
                  </span>
                </div>
                <CardTitle className="text-xl font-semibold group-hover:text-accent transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>Enterprise-grade security</span>
            <span>•</span>
            <Zap className="w-4 h-4" />
            <span>Lightning-fast performance</span>
            <span>•</span>
            <Users className="w-4 h-4" />
            <span>Unlimited scalability</span>
          </div>
        </div>
      </div>
    </section>
  );
}