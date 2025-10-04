import { AuthErrorBoundary } from '@/components/auth-error-boundary';
import { Suspense } from 'react';
import { Login } from '../login';

export default function SignUpPage() {
  return (
    <AuthErrorBoundary>
      <Suspense>
        <Login mode='signup' />
      </Suspense>
    </AuthErrorBoundary>
  );
}
