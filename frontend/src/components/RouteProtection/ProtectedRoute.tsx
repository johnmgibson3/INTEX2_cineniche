import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { fetchUser } from '../../api/AuthApi';
import type { ReactNode } from 'react';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const [authorized, setAuthorized] = useState<boolean | null>(null);
  
    useEffect(() => {
      fetchUser()
        .then((user) => setAuthorized(user !== null))
        .catch(() => setAuthorized(false));
    }, []);
  
    if (authorized === null) return null; // loading
    return authorized ? children : <Navigate to="/login" />;
  }
