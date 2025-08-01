'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosAdmin from '@/components/axiosInstances/axiosAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/userSlice';

interface Props {
  children: React.ReactNode;
}

export default function ClientAuthGuard({ children }: Props) {
  const [checking, setChecking] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  useEffect(() => {
    const checkAuth = async () => {
        //check if user is saved in redux store
        
        if (user.isAuthenticated) {
          setChecking(false);
          return;
        }

      try {
        const res = await axiosAdmin.get('/getUser');

        if (res.status === 200 && res.data.success) {
          dispatch(setUser({
            admin: res.data.admin,
            organization: res.data.organization,
          }));
        } else {
          router.replace('/admin/login');
        }
      } catch (err) {
        router.replace('/admin/login');
      } finally {
        setChecking(false);
      }
    };

    checkAuth();
  }, []);

  

  return <>{children}</>;
}
