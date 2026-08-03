import { useRouter } from 'next/router';
import { useEffect, type ReactNode } from 'react';

import { pushToast } from '../ui/Toast';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const hasToken = Boolean(localStorage.getItem('auth_token'));
    const isGuest = localStorage.getItem('guest_mode') === 'true';

    if (!hasToken && !isGuest) {
      pushToast('Authentication required', 'Please sign in to continue.', 'error');
      void router.push('/login');
    }
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;
