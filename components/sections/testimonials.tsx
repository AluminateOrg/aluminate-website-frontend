import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Dr. Sarah Mitchell',
    role: 'Alumni Relations Director',
    organization: 'Stanford University',
    content: 'The Alumni Portal System transformed how we engage with our 50,000+ alumni network. The dedicated cloud environment gives us complete control while the automation features save us countless hours.',
    rating: 5,
    avatar: 'SM',
    metrics: '50,000+ Alumni'
  },
  {
    name: 'James Rodriguez',
    role: 'Executive Director',
    organization: 'Global Business Alumni Network',
    content: 'Outstanding platform! The mentorship matching and event management features have increased our alumni engagement by 300%. The security and data isolation are exactly what we needed.',
    rating: 5,
    avatar: 'JR',
    metrics: '300% Engagement Increase'
  },
  {
    name: 'Prof. Emily Chen',
    role: 'Alumni Coordinator',
    organization: 'MIT Alumni Association',
    content: 'From setup to daily operations, everything is seamless. The bulk onboarding saved us weeks of work, and the fundraising integration has helped us exceed our donation goals by 150%.',
    rating: 5,
    avatar: 'EC',
    metrics: '150% Goal Exceeded'
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="text-accent border-accent/20">
            Success Stories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Trusted by Leading Organizations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how organizations worldwide are transforming their alumni engagement with our platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 relative overflow-hidden"
            >
              {/* Quote decoration */}
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="w-8 h-8 text-accent" />
              </div>

              <CardContent className="p-6 space-y-4">
                {/* Rating */}
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial content */}
                <blockquote className="text-muted-foreground italic leading-relaxed">
                  "{testimonial.content}"
                </blockquote>

                {/* Author info */}
                <div className="flex items-center space-x-3 pt-4 border-t border-border">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-accent text-white text-sm font-semibold">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-accent font-medium">
                      {testimonial.organization}
                    </p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="pt-2">
                  <Badge variant="secondary" className="text-xs">
                    {testimonial.metrics}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-accent">500+</div>
            <div className="text-sm text-muted-foreground">Organizations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-accent">2M+</div>
            <div className="text-sm text-muted-foreground">Alumni Members</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-accent">99.9%</div>
            <div className="text-sm text-muted-foreground">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-accent">24/7</div>
            <div className="text-sm text-muted-foreground">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
}