'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosAdmin from '@/components/axiosInstances/axiosAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/userSlice';
import axiosGlobal from './axiosInstances/axiosGlobal';
import {useAuthChecking} from '../context/AuthContext';

interface Props {
  children: React.ReactNode;
}

export default function ClientAuthGuard({ children }: Props) {
  
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const { checking, setChecking } = useAuthChecking();

  const handleLogout = async () => {
    try {
      
      const res = await axiosGlobal.post('/auth/logout');
      if (res.status === 200) {
       
        router.push('/admin/login');
      }

    } catch (error) {
      console.error('Logout failed:', error);
      
    }

  };

  useEffect(() => {
    
    const checkAuth = async () => {
      if (user?.isAuthenticated) {
        setChecking(false);
        
        return;
      }

      try {
        const res = await axiosAdmin.get('/info/getUser', {
          withCredentials: true,
        });

        if (res.status === 200 && res.data.success) {
          dispatch(setUser({
            admin: res.data.data.admin,
            organization: res.data.data.organization,
          }));
          
        } else {
          console.log('User not authenticated, redirecting to login');
          handleLogout();
        }
      } catch (err) {
        console.log('User not authenticated, redirecting to login');
        handleLogout();
      } finally {
        setChecking(false);
        console.log('Auth check completed');
      }
    };

    checkAuth();
  }, []);

  if (checking) {
    // You can return a spinner here if you want
    return null;
  }

  return <>{children}</>;
}
