"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MessageCircle, Calendar, ArrowRight } from "lucide-react";
import { AccountRegistrationModal } from "@/components/modals/account-registration-modal";

const contactOptions = [
  {
    icon: MessageCircle,
    title: "Live Chat Support",
    description: "Get instant answers to your questions",
    action: "Start Chat",
    availability: "Available 24/7",
  },
  {
    icon: Calendar,
    title: "Schedule a Demo",
    description: "See the platform in action with our experts",
    action: "Book Demo",
    availability: "Available Monday-Friday",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us detailed questions or requirements",
    action: "Send Email",
    availability: "Response within 24 hours",
  },
  {
    icon: Phone,
    title: "Phone Consultation",
    description: "Speak directly with our alumni portal specialists",
    action: "Call Now",
    availability: "+1 (555) 123-4567",
  },
];

export default function ContactSection() {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [showRegistration, setShowRegistration] = useState(false);

  const handlePlanSelect = (plan: string) => {
    // Check if user is logged in
    const authToken = localStorage.getItem("admin_token");

    if (authToken) {
      // User is logged in, redirect to checkout
      window.location.href = `/checkout?plan=Standard`;
    } else {
      // User not logged in, show registration modal
      setSelectedPlan("Standard");
      setShowRegistration(true);
    }
  };

  return (
    <>
      <section id="contact" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 mb-16">
            <Badge variant="outline" className="text-accent border-accent/20">
              Get Started Today
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Ready to Transform Your Alumni Network?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join hundreds of organizations already using our platform to build
              stronger alumni communities. Start your journey today or get in
              touch with our experts.
            </p>
          </div>

          {/* Main CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              className="text-base font-semibold group min-w-[200px]"
              onClick={() => handlePlanSelect("Standard")}
            >
              Create Account Now
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base font-semibold min-w-[200px]"
            >
              Schedule Free Demo
            </Button>
          </div>

          {/* Contact options */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactOptions.map((option, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <CardHeader className="text-center space-y-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto group-hover:bg-accent/20 transition-colors">
                    <option.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold group-hover:text-accent transition-colors">
                      {option.title}
                    </CardTitle>
                    <CardDescription className="text-sm mt-2">
                      {option.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="font-medium group-hover:bg-accent/10"
                  >
                    {option.action}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    {option.availability}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom section */}
          <div className="text-center mt-16 p-8 bg-muted/50 rounded-lg">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Enterprise Solutions Available
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Need custom features, advanced integrations, or dedicated support
              for your large-scale alumni network? Our enterprise team can
              create a tailored solution for your organization.
            </p>
            <Button variant="outline" className="font-medium">
              Contact Enterprise Sales
            </Button>
          </div>
        </div>
      </section>

      <AccountRegistrationModal
        open={showRegistration}
        onOpenChange={setShowRegistration}
      />
    </>
  );
}
