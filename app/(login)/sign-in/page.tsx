import { AuthErrorBoundary } from '@/components/auth-error-boundary';
import { Suspense } from 'react';
import { Login } from '../login';

export default function SignInPage() {
  return (
    <AuthErrorBoundary>
      <Suspense>
        <Login mode='signin' />
      </Suspense>
    </AuthErrorBoundary>
  );
}
