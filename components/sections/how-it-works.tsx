import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  UserPlus, 
  CreditCard, 
  Server, 
  Rocket,
  Crown,
  ArrowRight
} from 'lucide-react';

const steps = [
  {
    step: 1,
    icon: UserPlus,
    title: 'Create Organization Account',
    description: 'Register your organization and admin details to get started with our platform.',
    details: 'Organization name, admin credentials, contact information, and identity verification'
  },
  {
    step: 2,
    icon: Crown,
    title: 'Choose Subscription Tier',
    description: 'Select the perfect plan based on your alumni community size and feature requirements.',
    details: 'Basic, Standard, or Premium plans with scalable member limits and advanced features'
  },
  {
    step: 3,
    icon: CreditCard,
    title: 'Secure Payment Processing',
    description: 'Complete your subscription with our secure payment gateway integration.',
    details: 'Multiple payment methods, automated billing, and enterprise invoicing options'
  },
  {
    step: 4,
    icon: Server,
    title: 'Cloud Container Provisioning',
    description: 'Our system automatically deploys your dedicated, isolated alumni portal environment.',
    details: 'Dedicated resources, data isolation, custom branding, and security configuration'
  },
  {
    step: 5,
    icon: Rocket,
    title: 'Launch Your Alumni Portal',
    description: 'Start managing your alumni community with full admin control and member engagement tools.',
    details: 'Admin dashboard, member onboarding, event management, and community features activation'
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="text-accent border-accent/20">
            Simple Onboarding Process
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get your alumni portal up and running in just five simple steps
          </p>
        </div>

        <div className="relative">
          {/* Connection lines for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border transform -translate-y-1/2 z-0" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={step.step} className="relative">
                <Card className="group hover:shadow-lg transition-all duration-300 bg-background border-2 hover:border-accent/20">
                  <CardContent className="p-6 text-center space-y-4">
                    {/* Step number badge */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {step.step}
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-accent/20 transition-colors">
                      <step.icon className="w-8 h-8 text-accent" />
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                      <p className="text-xs text-muted-foreground/80 italic">
                        {step.details}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-4">
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <div className="text-center mt-16 p-6 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Average setup time:</span> 15-30 minutes • 
            <span className="font-semibold text-foreground ml-2">Portal activation:</span> Instant after payment confirmation
          </p>
        </div>
      </div>
    </section>
  );
}