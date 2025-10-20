"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Building,
  User,
  Mail,
  Phone,
  CreditCard,
  Shield,
} from "lucide-react";
import { toast } from "sonner";
import axiosGlobal from "../axiosInstances/axiosGlobal";
import { useRouter } from "next/navigation";
import { encryptObject, importPublicKey } from "@/util/rsa";

// Form validation schema
const registrationSchema = z
  .object({
    organizationName: z
      .string()
      .min(2, "Organization name must be at least 2 characters"),
    adminFullName: z
      .string()
      .min(2, "Admin name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phoneNumber: z.string().optional(),
    nationalId: z.string().min(5, "National ID must be at least 5 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegistrationFormData = z.infer<typeof registrationSchema>;

interface AccountRegistrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPlan?: string | null;
}

export function AccountRegistrationModal({
  open,
  onOpenChange,
  selectedPlan,
}: AccountRegistrationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpInputValue, setOtpInputValue] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);

  const router = useRouter();

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      organizationName: "",
      adminFullName: "",
      email: "",
      phoneNumber: "",
      nationalId: "",
      password: "",
      confirmPassword: "",
    },
  });

<<<<<<< HEAD
=======
  const sendOtp = async () => {
    const email = form.getValues('email');
    if (!email) {
      toast.error('Please enter an email first');
      return;
    }

    setIsSendingOtp(true);
    try {
      const res = await axiosGlobal.get('/auth/send-otp', { params: { email } });
      if (res.status === 200 && res.data?.success) {
        setOtpSent(true);
        toast.success('OTP sent to ' + email);
      } else {
        toast.error(res.data?.message || 'Failed to send OTP');
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Error sending OTP');
    } finally {
      setIsSendingOtp(false);
    }
  };

  const verifyOtp = async () => {
    const email = form.getValues('email');
    if (!email) {
      toast.error('Email missing');
      return;
    }
    if (!otpInputValue) {
      toast.error('Please enter the OTP');
      return;
    }

    setIsVerifyingOtp(true);
    try {
      const res = await axiosGlobal.post('/auth/verify-otp', {
        email: email,
        otp: otpInputValue,
      });
      if (res.status === 200 && res.data?.success) {
        setEmailVerified(true);
        toast.success('Email verified');
      } else {
        toast.error(res.data?.message || 'OTP verification failed');
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Error verifying OTP');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

>>>>>>> 929c393df258083d564fd7de1893669aa856a5d7
  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);

    try {
      //encrypt
      const pem = process.env.NEXT_PUBLIC_GLOBAL_PUBLIC_KEY!;
      const publicKey = importPublicKey(pem);
      const encryptObj = {
        email: data.email,
        password: data.password,
      };
      const obj = {
        organizationName: data.organizationName,
        adminFullName: data.adminFullName,
        phoneNumber: data.phoneNumber,
        nationalId: data.nationalId,
<<<<<<< HEAD
      };
      const payload = await encryptObject(encryptObj, publicKey);

      const response = await axiosGlobal.post("/auth/register", {
        payload,
        obj,
=======

      }

      console.log("obj", obj);

      const payload = await encryptObject(encryptObj, publicKey);

      console.log("successfully encrypted", payload);


      const response = await axiosGlobal.post('/auth/register', {
        payload,obj
>>>>>>> 929c393df258083d564fd7de1893669aa856a5d7
      });

      const responseData = response.data;

      if (response.status === 200 && responseData.success) {
        toast.success("Account created successfully!");
        router.push("/admin/");
      } else {
        toast.error(
          responseData.message || "Registration failed. Please try again."
        );
        console.error("Registration error:", responseData);
      }
    } catch (error: any) {
      //toast.error(error.response.data.message); // Shows specific message
      toast.error(
        "Registration failed. Please check your input and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onOpenChange(false);
      form.reset();
      setStep(1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl font-semibold flex items-center space-x-2">
            <Building className="w-5 h-5 text-accent" />
            <span>Create Organization Account</span>
          </DialogTitle>
          <DialogDescription>
            Register your organization to get started with the Alumni Portal
            System. This account will serve as your Organization Admin identity.
          </DialogDescription>

          {selectedPlan && (
            <Badge className="w-fit">Selected Plan: {selectedPlan}</Badge>
          )}
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Organization Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
                <Building className="w-4 h-4" />
                <span>Organization Information</span>
              </div>

              <FormField
                control={form.control}
                name="organizationName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., University of Colombo Alumni Association"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Admin Information */}
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
                <User className="w-4 h-4" />
                <span>Organization Admin Details</span>
              </div>

              <FormField
                control={form.control}
                name="adminFullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="John Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <div className="flex space-x-2">
                        <Input
                          type="email"
                          placeholder="admin@organization.edu"
                          {...field}
                          disabled={emailVerified}
                        />
                        {!emailVerified && (
                          <Button
                            type="button"
                            onClick={sendOtp}
                            disabled={isSendingOtp || !field.value}
                            variant="outline"
                          >
                            {isSendingOtp ? 'Sending...' : 'Send OTP'}
                          </Button>
                        )}
                        {emailVerified && (
                          <Badge className="flex items-center">Verified</Badge>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      This email will be used for login and system notifications
                    </FormDescription>
                    {otpSent && !emailVerified && (
                      <div className="mt-2 flex items-center space-x-2">
                        <Input
                          placeholder="Enter OTP"
                          value={otpInputValue}
                          onChange={(e) => setOtpInputValue(e.target.value)}
                          className="w-32"
                        />
                        <Button
                          type="button"
                          onClick={verifyOtp}
                          disabled={isVerifyingOtp}
                        >
                          {isVerifyingOtp ? 'Verifying...' : 'Verify'}
                        </Button>
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+94 711877231"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      For WhatsApp notifications and account recovery
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nationalId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>National ID / NIC *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your national identification number"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      For identity verification and security purposes
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Security */}
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>Account Security</span>
              </div>

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password *</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Create a strong password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Minimum 8 characters with letters, numbers, and symbols
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password *</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Terms */}
            <div className="text-xs text-muted-foreground p-3 bg-muted/50 rounded-lg">
              By creating an account, you agree to our{" "}
              <a href="#" className="text-accent hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-accent hover:underline">
                Privacy Policy
              </a>
              . Your data will be processed securely and used only for account
              management and service delivery.
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Create Account & Continue
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>

        {/* Next steps preview */}
        <div className="mt-6 p-3 bg-accent/5 rounded-lg border border-accent/10">
          <p className="text-sm font-medium text-foreground mb-2">
            Next Steps:
          </p>
          <ol className="text-xs text-muted-foreground space-y-1">
            <li>1. Account verification via email</li>
            <li>
              2.{" "}
              {selectedPlan
                ? `Complete ${selectedPlan} plan payment`
                : "Choose subscription tier"}
            </li>
            <li>3. Automated portal provisioning</li>
            <li>4. Access your admin dashboard</li>
          </ol>
        </div>
      </DialogContent>
    </Dialog>
  );
}
