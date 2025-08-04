'use client';
import axiosAdmin from '@/components/axiosInstances/axiosAdmin';
import axiosGlobal from '@/components/axiosInstances/axiosGlobal';
import { logoutUser, setUser } from '@/redux/userSlice';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

interface AuthContextType {
    checking: boolean;
    setChecking: (value: boolean) => void;
    updateUser: () => Promise<void>;
    handleLogout: () => Promise<void>;
    apiUrl: string;

}

const AuthContext = createContext<AuthContextType>({
    checking: true,
    setChecking: () => { },
    updateUser: async () => { },
    handleLogout: async () => { },
    apiUrl: ''
});
export const useAuthChecking = () => useContext(AuthContext);


export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [checking, setChecking] = useState(true);

    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const apiPrefix = process.env.NEXT_PUBLIC_API_PREFIX;
    const apiUrl = `${backendUrl}${apiPrefix}`;

    const handleLogout = async () => {
        console.log("calling logout");
        try {

            const res = await axiosGlobal.post('/auth/logout');
            if (res.status === 200) {
                dispatch(logoutUser());
                router.push('/admin/login');
            }

        } catch (error) {
            console.error('Logout failed:', error);

        }

    };

    const updateUser = async () => {
        if (user?.isAuthenticated) {
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

            console.log('Auth check completed');
        }
    };


    return (
        <AuthContext.Provider value={{
            checking,
            setChecking,
            updateUser,
            handleLogout,
            apiUrl

        }}>
            {children}
        </AuthContext.Provider>
    );
}

