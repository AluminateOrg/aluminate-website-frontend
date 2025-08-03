'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useAuthChecking } from '@/context/AuthContext';
import { toast } from 'sonner';

export default function PackageStatusGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const userGlobal = useSelector((state: any) => state.user);
  const user = userGlobal?.admin;
  const organization = userGlobal?.organization;
  const { checking, setChecking,handleLogout } = useAuthChecking();
  
  

  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    
    if (user && !checking) {
      
      const isCheckout = pathname === '/admin/checkout' || pathname.startsWith('/admin/checkout');
      const isPackageActive = organization?.status === 'ACTIVE';
      const isSuspended = organization?.status === 'SUSPENDED';
      const isLogin = pathname === '/admin/login';

      

      if (!isPackageActive && !isCheckout && !checking) {
        router.replace('/admin/checkout');
      }
      if (isSuspended && !checking && !isLogin) {
        toast.error('Your package is suspended. Please contact support.');
        handleLogout();
      }
      setLoading(false);
    }
  }, [checking, userGlobal, pathname]);

  if (loading) return null;

  return children;
}
