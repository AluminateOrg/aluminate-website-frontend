"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CreditCard,
  Lock,
  ArrowLeft,
  Check,
  Crown,
  Star,
  Zap,
  Loader2,
  Shield,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";

const plans = {
  Basic: {
    price: 299,
    memberLimit: "500 Members",
    icon: Zap,
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
  Standard: {
    price: 599,
    memberLimit: "2,000 Members",
    icon: Star,
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
  Premium: {
    price: 999,
    memberLimit: "Unlimited Members",
    icon: Crown,
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
};

interface AdminUser {
  email: string;
  name: string;
  organization: string;
  role: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedPlan = searchParams.get("plan") || "Standard";

  const [user, setUser] = useState<AdminUser | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  

  useEffect(() => {
    // Check if user is logged in
    const authToken = localStorage.getItem("admin_token");
    const userData = localStorage.getItem("admin_user");

    if (!authToken || !userData) {
      router.push("/admin/login");
      return;
    }


    setUser(JSON.parse(userData));
  }, [router]);

  const plan = plans[selectedPlan as keyof typeof plans];

  if (!plan) {
    router.push("/");
    return null;
  }



  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsProcessing(true);

  try {
    // 1. Call backend to get payment hash and transaction ID (order_id)
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/generate-hash`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: plans[selectedPlan as keyof typeof plans].price,
        currency: "LKR",
        
      }),
    });

    if (!response.ok) throw new Error("Failed to get payment hash");

    const { hash, transaction_id } = await response.json();

    console.log("Payment hash and transactionId received:", hash, transaction_id);

    // 2. Prepare the PayHere payment object
    const payment = {
      sandbox: true, // set false in production
      merchant_id: "YOUR_MERCHANT_ID", // Replace with your merchant ID or inject from env
      return_url: `${window.location.origin}/payment-success`,
      cancel_url: `${window.location.origin}/payment-cancel`,
      notify_url: "https://yourdomain.com/api/v1/payment/notify", // your publicly accessible notify URL
      order_id: transaction_id.toString(), // use transaction ID as order_id
      items: `${selectedPlan} Plan Subscription`,
      amount: plans[selectedPlan as keyof typeof plans].price.toFixed(2),
      currency: "LKR",
      hash: hash, // hash from backend
      first_name: user.name.split(" ")[0] || user.name,
      last_name: user.name.split(" ")[1] || "",
      email: user.email,
      phone: user.phone || "",
      address: "",  // optional
      city: "",     // optional
      country: "Sri Lanka", // or dynamically from user profile
      // add any other optional fields if needed
    };

    // 3. Load PayHere script and start payment
    if (typeof window !== "undefined" && (window as any).payhere) {
      (window as any).payhere.startPayment(payment);
    } else {
      // If payhere script not loaded yet, dynamically load it then start payment
      const script = document.createElement("script");
      script.src = "https://www.payhere.lk/lib/payhere.js";
      script.onload = () => {
        (window as any).payhere.startPayment(payment);
      };
      document.body.appendChild(script);
    }

    // Set up event handlers (optional)
    (window as any).payhere.onCompleted = function (orderId: string) {
      console.log("Payment completed. Order ID:", orderId);
      toast.success("Payment completed successfully!");
      // Optionally redirect or refresh status
    };

    (window as any).payhere.onDismissed = function () {
      console.log("Payment dismissed");
      toast.error("Payment was cancelled.");
    };

    (window as any).payhere.onError = function (error: any) {
      console.error("PayHere Error:", error);
      toast.error("Payment error occurred. Please try again.");
    };
  } catch (error) {
    console.error("Payment error:", error);
    toast.error("Failed to initiate payment");
  } finally {
    setIsProcessing(false);
  }
};


  const handleBackToPricing = () => {
    router.push("/#pricing");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={handleBackToPricing}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Pricing
          </Button>
          <h1 className="text-3xl font-bold text-foreground">
            Complete Your Subscription
          </h1>
          <p className="text-muted-foreground">
            Secure checkout for {user.organization}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <plan.icon className="w-5 h-5 text-accent" />
                  <span>{selectedPlan} Plan</span>
                </CardTitle>
                <CardDescription>
                  Perfect for your organization's needs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-foreground">
                    LKR {plan.price}/month
                  </span>
                  <Badge variant="secondary">{plan.memberLimit}</Badge>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">
                    Included Features:
                  </h4>
                  <ul className="space-y-1">
                    {plan.features.slice(0, 6).map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center space-x-2 text-sm"
                      >
                        <Check className="w-3 h-3 text-accent flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                    {plan.features.length > 6 && (
                      <li className="text-sm text-muted-foreground">
                        +{plan.features.length - 6} more features
                      </li>
                    )}
                  </ul>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>LKR {plan.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Setup Fee</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total (Monthly)</span>
                    <span>LKR {plan.price}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Organization Info */}
            <Card>
              <CardHeader>
                <CardTitle>Organization Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Organization:</span>
                  <span className="font-medium">{user.organization}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Admin:</span>
                  <span className="font-medium">{user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium">{user.email}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Payment</span>
                </CardTitle>

              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Opening Payhere gateway...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Pay by Payhere - LKR {plan.price}/month
                      </>
                    )}
                  </Button>

                  {/* Terms */}
                  <p className="text-xs text-muted-foreground text-center">
                    By completing this purchase, you agree to our{" "}
                    <a href="#" className="text-accent hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-accent hover:underline">
                      Privacy Policy
                    </a>
                    . You can cancel anytime.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
