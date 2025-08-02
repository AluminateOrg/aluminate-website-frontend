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
import { useSelector } from "react-redux";
import { useAuthChecking } from "@/context/AuthContext";
import axiosAdmin from "@/components/axiosInstances/axiosAdmin";

const plans = {
  Basic: {
    price: 18000,
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
    price: 30000,
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
    price: 98000,
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
  const searchSelectedPlan = searchParams.get("plan") || "Standard";
  const [selectedPlan, setSelectedPlan] = useState<string>(searchSelectedPlan);


  const [user, setUser] = useState<AdminUser | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);


  const userGlobal = useSelector((state: any) => state.user);
  const userData = userGlobal?.admin;
  const organizationData = userGlobal?.organization;

  const { updateUser,apiUrl } = useAuthChecking(); 
  const merchantId = process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID ;




  useEffect(() => {
    const setLocalUser = () => {
      if (userGlobal.isAuthenticated && !userData) {
        router.push("/admin/login");
        return;
      }
      if (userData && organizationData) {
        setUser({
          email: userData.email,
          name: userData.name,
          organization: organizationData.organizationName,
          role: "Organization Admin",
        });
        if (organizationData.status === "ACTIVE") {

          updateUser();
          router.replace("/admin/");
          return;
        }
      } else {
        setUser(null);
      }
    }
    setLocalUser();

  }, [userGlobal])

  const plan = plans[selectedPlan as keyof typeof plans];;

  if (!plan) {
    router.push("/");
    return null;
  }



  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsProcessing(true);

  try {
    if (!merchantId) {
      toast.error("Merchant ID is not configured. Please contact support.");
      setIsProcessing(false);
      return;
    }

    // 1. Get hash and transaction ID from backend
    const amount = Number(plans[selectedPlan as keyof typeof plans].price);
    const response = await axiosAdmin.post('/payment/generate-hash', {
      amount,
      currency: "LKR",
    });

    if (response.status !== 200 || !response.data.success) {
      toast.error("Failed to initiate payment. Please try again.");
      setIsProcessing(false);
      return;
    }

    const { hash, transaction_id } = response.data.data || {};

    if (!hash || !transaction_id) {
      toast.error("Invalid payment response. Please try again.");
      setIsProcessing(false);
      return;
    }

    // 2. Construct payment object
    const payment = {
      sandbox: true, // Use false in production
      merchant_id: merchantId.toString(),
      return_url: `${window.location.origin}/payment-success`,
      cancel_url: `${window.location.origin}/payment-cancel`,
      notify_url: `${apiUrl}/public/payment/notify`, // publicly accessible server endpoint
      order_id: transaction_id.toString(),
      items: `${selectedPlan} Plan Subscription`,
      amount: amount.toFixed(2).toString(),
      currency: "LKR",
      hash: hash.toString(),
      first_name: userData.name?.split(" ")[0] || userData.name || "User",
      last_name: userData.name?.split(" ")[1] || "",
      email: userData.email || "email@domain.com",
      phone: "07718844428",       // optional
      address: "",     // optional
      city: "",        // optional
      country: "Sri Lanka",
    };

    // 3. Attach event listeners before calling `startPayment`
    const payhere = (window as any).payhere || {};

    // Avoid duplicated event listeners
    payhere.onCompleted = function (orderId: string) {
      console.log("Payment completed. Order ID:", orderId);
      toast.success("Payment completed successfully!");
      // Redirect or refresh status
    };

    payhere.onDismissed = function () {
      console.log("Payment dismissed");
      toast.error("Payment was cancelled.");
    };

    payhere.onError = function (error: any) {
      console.error("PayHere Error:", error);
      toast.error("Payment error occurred. Please try again.");
    };

    // 4. Start PayHere Payment
    const isLoaded = (window as any).payhereScriptLoaded;

    if (!isLoaded) {
      const script = document.createElement("script");
      script.src = "https://www.payhere.lk/lib/payhere.js";
      script.onload = () => {
        (window as any).payhereScriptLoaded = true;
        (window as any).payhere.startPayment(payment);
      };
      document.body.appendChild(script);
    } else {
      payhere.startPayment(payment);
    }

  } catch (error) {
    console.error("Payment error:", error);
    toast.error("Failed to initiate payment. Please try again.");
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

        
          {/* Show packages */}
          <div className="space-y-6 mb-12">
            <h2 className="text-xl font-semibold">Choose Your Plan</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(plans).map(([planKey, planDetails]) => {
                const Icon = planDetails.icon;
                const isSelected = selectedPlan === planKey;

                return (
                  <Card
                    key={planKey}
                    onClick={() => setSelectedPlan(planKey)}
                    className={`cursor-pointer transition-all ${isSelected
                      ? "ring-2 ring-accent shadow-lg scale-[1.02]"
                      : "hover:scale-[1.01]"
                      }`}
                  >
                    <CardHeader className="text-center space-y-2">
                      <div className="flex justify-center">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-accent/10 text-accent">
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>
                      <CardTitle>{planKey} Plan</CardTitle>
                      <CardDescription>{planDetails.memberLimit}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="text-xl font-bold text-foreground mb-2">
                        LKR {planDetails.price.toLocaleString("en-LK")}/month
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {planDetails.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-center justify-center space-x-2">
                            <Check className="w-3 h-3 text-accent" />
                            <span>{feature}</span>
                          </li>
                        ))}
                        {planDetails.features.length > 3 && (
                          <li>+{planDetails.features.length - 3} more</li>
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
          
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
                    <span>LKR {plan.price.toLocaleString("en-LK")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Setup Fee</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total (Monthly)</span>
                    <span>LKR {plan.price.toLocaleString("en-LK")}</span>
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
                        Pay by Payhere - LKR {plan.price.toLocaleString("en-LK")}
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
  );
}
