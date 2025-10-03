import { Suspense } from 'react';
import { Login } from '../login';
import { AuthErrorBoundary } from '@/components/auth-error-boundary';

export default function SignUpPage() {
  return (
    <AuthErrorBoundary>
      <Suspense>
        <Login mode='signup' />
      </Suspense>
    </AuthErrorBoundary>
  );
}
