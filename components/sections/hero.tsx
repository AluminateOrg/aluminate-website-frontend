"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Users, Shield, Zap, Globe } from 'lucide-react';
import { AccountRegistrationModal } from '@/components/modals/account-registration-modal';

export function Hero() {
  const [showRegistration, setShowRegistration] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center hero-gradient">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium">
              <Zap className="w-4 h-4 mr-2" />
              World-Class Alumni Engagement Platform
            </div>

            {/* Main headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                Reimagine Alumni
                <span className="text-accent block">Engagement</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Transform your alumni network with dedicated cloud portal environments. 
                Build active communities through mentorship, events, fundraising, and engagement 
                tools—all with complete data isolation and organizational control.
              </p>
            </div>

            {/* Key benefits */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-accent" />
                <span>Dedicated Cloud Isolation</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-accent" />
                <span>Complete Alumni Management</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-accent" />
                <span>Global Accessibility</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button 
                size="lg" 
                className="text-base font-semibold group"
                onClick={() => setShowRegistration(true)}
              >
                Create Organization Account
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-base font-semibold group"
              >
                <Play className="mr-2 w-4 h-4" />
                Request a Demo
              </Button>
            </div>

            {/* Social proof */}
            <div className="pt-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Trusted by leading organizations worldwide
              </p>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                {/* Placeholder logos - replace with actual organization logos */}
                <div className="h-8 bg-muted rounded px-4 py-2 text-xs font-medium">
                  University of Excellence
                </div>
                <div className="h-8 bg-muted rounded px-4 py-2 text-xs font-medium">
                  Global Alumni Network
                </div>
                <div className="h-8 bg-muted rounded px-4 py-2 text-xs font-medium">
                  Professional Association
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
            <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2"></div>
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