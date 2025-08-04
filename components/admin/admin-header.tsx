"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/theme-toggle';
import { NotificationsPanel } from '@/components/admin/notifications-panel';
import { Users, Bell, Settings, LogOut, User, HelpCircle, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import axiosGlobal from '../axiosInstances/axiosGlobal';
import { logoutUser } from '@/redux/userSlice';

interface AdminUser {
  email: string;
  name: string;
  organization: string;
  role: string;
}

export function AdminHeader() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const router = useRouter();
  const userGlobal = useSelector((state: any) => state.user);
  const organizationData = userGlobal?.organization;
  const userData = userGlobal?.admin;
  const dispatch = useDispatch();

 useEffect(() => {
  if (userData && organizationData) {
    setUser({
      email: userData.email,
      name: userData.name,
      organization: organizationData.organizationName,
      role: 'Organization Admin',
    });
  }
}, [userData, organizationData]);


  const handleLogout = async () => {
    try {
      
      const res = await axiosGlobal.post('/auth/logout');
      if (res.status === 200) {
        setUser(null);
        toast.success('Logged out successfully');
        router.push('/admin/login');
      }else{
        toast.error('Failed to log out. Please try again.');
      }

    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Failed to log out. Please try again.');
    }

  };

  const handleProfileClick = () => {
    router.push('/admin/profile');
  };

  const handleSettingsClick = () => {
    router.push('/admin/settings');
  };

  const handleHelpClick = () => {
    router.push('/admin/help');
  };

  const handleDashboardClick = () => {
    router.push('/admin');
  };

  const handleHomeClick = () => {
    router.push('/');
  };

  if (!user) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Organization */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={handleDashboardClick}>
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground hover:text-accent transition-colors">
                  Admin Dashboard
                </h1>
                <p className="text-xs text-muted-foreground">{user.organization}</p>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Back to Home Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleHomeClick}
              className="text-sm font-medium hidden sm:flex items-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Button>

            {/* Mobile Home Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleHomeClick}
              className="sm:hidden p-2"
              title="Back to Home"
            >
              <Home className="w-4 h-4" />
            </Button>

            {/* Status Badge */}
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Active Portal
            </Badge>

            {/* Notifications */}
            <NotificationsPanel>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-4 h-4" />
              </Button>
            </NotificationsPanel>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-accent text-white text-sm">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.role}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleProfileClick}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSettingsClick}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleHelpClick}>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help & Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleHomeClick}>
                  <Home className="mr-2 h-4 w-4" />
                  <span>Back to Home</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}