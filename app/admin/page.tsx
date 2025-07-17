"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminHeader } from "@/components/admin/admin-header";
import { DashboardOverview } from "@/components/admin/dashboard-overview";
import { ContainerStatus } from "@/components/admin/container-status";
import { SubscriptionDetails } from "@/components/admin/subscription-details";
import { PortalAccess } from "@/components/admin/portal-access";
import { QuickActions } from "@/components/admin/quick-actions";
import { RecentActivity } from "@/components/admin/recent-activity";

// Mock authentication check
function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check
    const authToken = localStorage.getItem("admin_token");
    setTimeout(() => {
      setIsAuthenticated(!!authToken);
      setIsLoading(false);
    }, 1000);
  }, []);

  return { isAuthenticated, isLoading };
}

export default function AdminDashboard() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // testing backend connectivity
  const [pingResult, setPingResult] = useState<string | null>(null);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    fetch(`${backendUrl}/ping`)
      .then((res) => res.json())
      .then((data) => {
        setPingResult(data.status);
      })
      .catch(() => setPingResult("error"));
  }, [backendUrl]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Prevent flash of content while redirecting
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <h1>{pingResult}</h1>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Dashboard Overview */}
          <DashboardOverview />

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              <ContainerStatus />
              <PortalAccess />
              <RecentActivity />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <SubscriptionDetails />
              <QuickActions />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
