'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Users, Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/userSlice';
import { useSelector } from 'react-redux';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch();


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      // Mock authentication - accept any email/password for demo
      if (email && password) {
        localStorage.setItem('admin_token', 'mock_token_' + Date.now());
        localStorage.setItem('admin_user', JSON.stringify({
          email,
          name: 'Sheane Mario',
          organization: 'University of Colombo Alumni Association',
          role: 'Organization Admin'
        }));


        dispatch(setUser({
          admin: {
            id: 1,
            name: 'sudda sudda',
            email: email,
            nic: '123456789V',
            phone: '0712345678',
            emailVerified: true,
            createdAt: new Date().toISOString()
          },
          organization: {
            id: 1,
            organizationName: 'Stanford University Alumni Association',
            subscriptionPlan: 'Premium',
            createdAt: new Date().toISOString(),
            nextRenewalDate: null,
            subdomain: 'stanford',
            portalUrl: 'https://stanford.alumniportal.com',
            maxMemberCount: 1000,
            currentMemberCount: 250,
            status: 'ACTIVE',
            isDeleted: false
          }

        }))


        // Dispatch custom event to notify other components of auth state change
        window.dispatchEvent(new Event('authStateChanged'));

        toast.success('Login successful! Redirecting to dashboard...');
        setTimeout(() => {
          router.push('/admin');
        }, 1000);
      } else {
        toast.error('Please enter both email and password');
      }
      setIsLoading(false);
    }, 2000);
  };

  const handleDemoLogin = () => {
    setEmail('admin@uoc.edu');
    setPassword('demo123');
  };

  const handleHomeNavigation = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h1
            className="text-2xl font-bold text-foreground cursor-pointer hover:text-accent transition-colors"
            onClick={handleHomeNavigation}
            title="Click to go back to home page"
          >
            Alumni Portal Admin
          </h1>
          <p className="text-muted-foreground">Sign in to your organization dashboard</p>
        </div>

        {/* Demo Notice */}
        <Alert>
          <AlertDescription>
            <strong>Demo Mode:</strong> Use any email/password combination or click "Use Demo Credentials\" below.
          </AlertDescription>
        </Alert>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Access your organization's alumni portal management dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@organization.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleDemoLogin}
                  disabled={isLoading}
                >
                  Use Demo Credentials
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Forgot your password?
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Back to main site */}
        <div className="text-center">
          <Button variant="ghost" onClick={handleHomeNavigation}>
            ← Back to Alumni Portal
          </Button>
        </div>
      </div>
    </div>
  );
}