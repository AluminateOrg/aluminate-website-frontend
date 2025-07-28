import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Crown,
  Calendar,
  Users,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
} from "lucide-react";

export function SubscriptionDetails() {
  const subscriptionData = {
    plan: "Standard",
    status: "Active",
    nextBilling: "2024-02-15",
    amount: "LKR 599",
    memberLimit: 2000,
    currentMembers: 1847,
    daysUntilRenewal: 23,
  };

  const isOverLimit =
    subscriptionData.currentMembers > subscriptionData.memberLimit;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Crown className="w-5 h-5 text-accent" />
          <span>Subscription Details</span>
        </CardTitle>
        <CardDescription>
          Manage your plan and billing information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Plan Info */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground">
                {subscriptionData.plan} Plan
              </h4>
              <p className="text-sm text-muted-foreground">
                {subscriptionData.amount}/month
              </p>
            </div>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              <CheckCircle className="w-3 h-3 mr-1" />
              {subscriptionData.status}
            </Badge>
          </div>

          {/* Member Usage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                Member Usage
              </span>
              <span
                className={`text-sm ${
                  isOverLimit ? "text-red-600" : "text-muted-foreground"
                }`}
              >
                {subscriptionData.currentMembers.toLocaleString()} /{" "}
                {subscriptionData.memberLimit.toLocaleString()}
              </span>
            </div>
            <Progress
              value={
                (subscriptionData.currentMembers /
                  subscriptionData.memberLimit) *
                100
              }
              className={`h-2 LKR{isOverLimit ? "bg-red-100" : ""}`}
            />
            {isOverLimit && (
              <div className="flex items-center space-x-2 text-sm text-red-600">
                <AlertTriangle className="w-4 h-4" />
                <span>
                  You've exceeded your member limit. Consider upgrading.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Billing Info */}
        <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                Next Billing
              </span>
            </div>
            <span className="text-sm text-foreground">
              {subscriptionData.nextBilling}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                Amount
              </span>
            </div>
            <span className="text-sm font-semibold text-foreground">
              {subscriptionData.amount}
            </span>
          </div>

          <div className="text-center pt-2">
            <Badge variant="secondary" className="text-xs">
              {subscriptionData.daysUntilRenewal} days until renewal
            </Badge>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          {isOverLimit && (
            <Button className="w-full">
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Upgrade Plan
            </Button>
          )}
          <Button variant="outline" className="w-full">
            <CreditCard className="w-4 h-4 mr-2" />
            Manage Billing
          </Button>
          <Button variant="outline" className="w-full">
            View Usage History
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
