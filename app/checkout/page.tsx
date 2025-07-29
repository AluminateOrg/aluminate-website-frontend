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
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: "",
    city: "",
    zipCode: "",
    country: "United States",
  });

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

  const handleInputChange = (field: string, value: string) => {
    setPaymentData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) {
      handleInputChange("cardNumber", formatted);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    if (formatted.length <= 5) {
      handleInputChange("expiryDate", formatted);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // TODO: Integrate with actual payment processor (Stripe, etc.)
      console.log("Processing payment:", {
        plan: selectedPlan,
        amount: plan.price,
        user: user,
        paymentData: paymentData,
      });

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Update user's subscription in localStorage (in real app, this would be handled by backend)
      const updatedUser = {
        ...user,
        subscription: {
          plan: selectedPlan,
          status: "active",
          nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
          amount: plan.price,
        },
      };
      localStorage.setItem("admin_user", JSON.stringify(updatedUser));

      toast.success(
        "Payment successful! Your subscription has been activated."
      );

      // Redirect to dashboard
      setTimeout(() => {
        router.push("/admin");
      }, 2000);
    } catch (error) {
      toast.error("Payment failed. Please try again.");
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
                    ${plan.price}/month
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
                    <span>${plan.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Setup Fee</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total (Monthly)</span>
                    <span>${plan.price}</span>
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
                  <span>Payment Information</span>
                </CardTitle>
                <CardDescription>
                  Your payment information is secure and encrypted
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Card Information */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={paymentData.cardNumber}
                        onChange={handleCardNumberChange}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={paymentData.expiryDate}
                          onChange={handleExpiryChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          maxLength={4}
                          value={paymentData.cvv}
                          onChange={(e) =>
                            handleInputChange(
                              "cvv",
                              e.target.value.replace(/\D/g, "")
                            )
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardholderName">Cardholder Name</Label>
                      <Input
                        id="cardholderName"
                        placeholder="John Smith"
                        value={paymentData.cardholderName}
                        onChange={(e) =>
                          handleInputChange("cardholderName", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Billing Address */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">
                      Billing Address
                    </h4>

                    <div className="space-y-2">
                      <Label htmlFor="billingAddress">Address</Label>
                      <Input
                        id="billingAddress"
                        placeholder="123 Main Street"
                        value={paymentData.billingAddress}
                        onChange={(e) =>
                          handleInputChange("billingAddress", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          placeholder="San Francisco"
                          value={paymentData.city}
                          onChange={(e) =>
                            handleInputChange("city", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          placeholder="94105"
                          value={paymentData.zipCode}
                          onChange={(e) =>
                            handleInputChange("zipCode", e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Security Notice */}
                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      Your payment information is encrypted and secure. We use
                      industry-standard SSL encryption.
                    </AlertDescription>
                  </Alert>

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
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Complete Payment - ${plan.price}/month
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
