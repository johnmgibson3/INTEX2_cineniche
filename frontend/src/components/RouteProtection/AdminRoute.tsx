// src/components/AdminRoute.tsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { fetchUser } from '../../api/AuthApi';
import type { ReactNode } from 'react';

export default function AdminRoute({ children }: { children: ReactNode }) {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  
    useEffect(() => {
      fetchUser()
        .then((user) => setIsAdmin(user?.isAdmin ?? false))
        .catch(() => setIsAdmin(false));
    }, []);
  
    if (isAdmin === null) return null; // loading
    return isAdmin ? children : <Navigate to="/login" />;
  }