import { useRouter } from 'next/router';
import { useAuth } from './authContext';

export function AuthGuard({ children }) {
  const router = useRouter();
  const { auth } = useAuth();

  if (auth) return <>{children}</>;
  router.replace('/login');
  return null;
}

export function LoginGuard({ children }) {
  const { auth } = useAuth();
  const router = useRouter();

  if (!auth) return <>{children}</>;
  router.replace('/dashboard');
  return null;
}
