'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Menu, X, Users, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AccountRegistrationModal } from '@/components/modals/account-registration-modal';
import axiosAdmin from '@/components/axiosInstances/axiosAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/userSlice';
import { useRouter } from 'next/navigation';

const navigation = [
  { name: 'Features', href: '#features' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Contact', href: '#contact' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const { admin, isAuthenticated } = useSelector((state: any) => state.user);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (isAuthenticated) return;

      try {
        const res = await axiosAdmin.get('/info/getUser');
        if (res.status === 200 && res.data.success) {
          dispatch(setUser({
            admin: res.data.data.admin,
            organization: res.data.data.organization,
          }));
        }
      } catch (error) {
        // Don't redirect or do anything — just leave logged out state
      }
    };

    fetchUser();
  }, [dispatch, isAuthenticated]);

  const handleDashboardClick = () => router.push('/admin');

  return (
    <>
      <header className={cn(
        "fixed top-0 w-full z-50 transition-all duration-200",
        isScrolled 
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" 
          : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Alumni Portal
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <a key={item.name} href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <div className="text-sm text-muted-foreground">
                    Welcome, <span className="font-medium text-foreground">{admin?.name}</span>
                  </div>
                  <Button size="sm" onClick={handleDashboardClick} className="text-sm font-medium">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Go to Dashboard
                  </Button>
                </div>
              ) : (
                <>
                  <Button variant="ghost" size="sm" className="text-sm font-medium">
                    Request Demo
                  </Button>
                  <Button size="sm" onClick={() => setShowRegistration(true)} className="text-sm font-medium">
                    Create Account
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="p-2">
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <a key={item.name} href={item.href}
                    className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsOpen(false)}>
                    {item.name}
                  </a>
                ))}
                <div className="px-3 py-2 space-y-2">
                  {isAuthenticated ? (
                    <>
                      <div className="text-sm text-muted-foreground">
                        Welcome, <span className="font-medium text-foreground">{admin?.name}</span>
                      </div>
                      <Button size="sm" className="w-full justify-start text-sm"
                        onClick={() => {
                          handleDashboardClick();
                          setIsOpen(false);
                        }}>
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Go to Dashboard
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
                        Request Demo
                      </Button>
                      <Button size="sm" className="w-full justify-start text-sm"
                        onClick={() => {
                          setShowRegistration(true);
                          setIsOpen(false);
                        }}>
                        Create Account
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <AccountRegistrationModal 
        open={showRegistration}
        onOpenChange={setShowRegistration}
      />
    </>
  );
}
