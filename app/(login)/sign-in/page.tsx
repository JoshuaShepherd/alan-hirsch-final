import { Suspense } from 'react';
import { Login } from '../login';
import { AuthErrorBoundary } from '@/components/auth-error-boundary';

export default function SignInPage() {
  return (
    <AuthErrorBoundary>
      <Suspense>
        <Login mode='signin' />
      </Suspense>
    </AuthErrorBoundary>
  );
}
