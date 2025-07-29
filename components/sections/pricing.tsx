"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Star, Zap } from "lucide-react";
import { AccountRegistrationModal } from "@/components/modals/account-registration-modal";

const plans = [
  {
    name: "Basic",
    price: 299,
    description: "Perfect for small alumni groups and organizations",
    icon: Zap,
    popular: false,
    memberLimit: "500 Members",
    features: [
      "Dedicated cloud instance",
      "Member directory & profiles",
      "Basic event management",
      "Group messaging",
      "Email notifications",
      "Standard support",
      "Mobile responsive design",
      "5GB storage included",
    ],
  },
  {
    name: "Standard",
    price: 599,
    description: "Ideal for growing alumni communities",
    icon: Star,
    popular: true,
    memberLimit: "2,000 Members",
    features: [
      "Everything in Basic",
      "Advanced event management",
      "Mentorship directory",
      "Fundraising integration",
      "WhatsApp notifications",
      "Bulk CSV onboarding",
      "QR code check-ins",
      "Priority support",
      "25GB storage included",
      "Custom branding options",
    ],
  },
  {
    name: "Premium",
    price: 999,
    description: "Complete solution for large alumni networks",
    icon: Crown,
    popular: false,
    memberLimit: "Unlimited Members",
    features: [
      "Everything in Standard",
      "Advanced analytics dashboard",
      "Multi-admin management",
      "API access & integrations",
      "Advanced security features",
      "White-label solutions",
      "Dedicated account manager",
      "24/7 premium support",
      "Unlimited storage",
      "Custom feature development",
    ],
  },
];

export function Pricing() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handlePlanSelect = (planName: string) => {
    // Check if user is logged in
    const authToken = localStorage.getItem("admin_token");

    if (authToken) {
      // User is logged in, redirect to checkout
      window.location.href = `/checkout?plan=${encodeURIComponent(planName)}`;
    } else {
      // User not logged in, show registration modal
      setSelectedPlan(planName);
      setShowRegistration(true);
    }
  };

  return (
    <>
      <section id="pricing" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-accent border-accent/20">
              Subscription Tiers
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Choose Your Perfect Plan
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Scalable pricing designed to grow with your alumni community. All
              plans include dedicated cloud isolation and core features.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative group hover:shadow-xl transition-all duration-300 ${
                  plan.popular
                    ? "border-accent shadow-lg scale-105"
                    : "hover:scale-105"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-accent text-white font-semibold px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center space-y-4">
                  <div
                    className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                      plan.popular
                        ? "bg-accent text-white"
                        : "bg-accent/10 text-accent"
                    }`}
                  >
                    <plan.icon className="w-8 h-8" />
                  </div>

                  <div>
                    <CardTitle className="text-2xl font-bold">
                      {plan.name}
                    </CardTitle>
                    <CardDescription className="text-sm mt-2">
                      {plan.description}
                    </CardDescription>
                  </div>

                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-foreground">
                      ${plan.price}
                      <span className="text-lg font-normal text-muted-foreground">
                        /month
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {plan.memberLimit}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center space-x-3"
                      >
                        <Check className="w-4 h-4 text-accent flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full font-semibold ${
                      plan.popular ? "bg-accent hover:bg-accent/90" : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handlePlanSelect(plan.name)}
                  >
                    Choose {plan.name} Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional info */}
          <div className="text-center mt-16 space-y-4">
            <p className="text-sm text-muted-foreground">
              All plans include: SSL security, automated backups, 99.9% uptime
              SLA, and mobile optimization
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
              <span>✓ 30-day money-back guarantee</span>
              <span>✓ No setup fees</span>
              <span>✓ Cancel anytime</span>
              <span>✓ Free migration assistance</span>
            </div>
          </div>
        </div>
      </section>

      <AccountRegistrationModal
        open={showRegistration}
        onOpenChange={setShowRegistration}
        selectedPlan={selectedPlan}
      />
    </>
  );
}
