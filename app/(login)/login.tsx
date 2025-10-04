'use client';

import { AuthDebug } from '@/components/auth-debug';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ActionState } from '@/lib/auth/middleware';
import { CircleIcon, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useActionState, useEffect, useRef } from 'react';
import { signIn, signUp } from './actions';

export function Login({ mode = 'signin' }: { mode?: 'signin' | 'signup' }) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const priceId = searchParams.get('priceId');
  const inviteId = searchParams.get('inviteId');
  const isSubmitting = useRef(false);
  const isInitialMount = useRef(true);

  console.log('🔐 Login Component Mounted:', {
    mode,
    redirect,
    priceId,
    inviteId,
    timestamp: new Date().toISOString(),
  });

  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    mode === 'signin' ? signIn : signUp,
    { error: '' }
  );

  // Prevent auto-submission on component mount
  useEffect(() => {
    console.log('🔐 Login Component Effect - Preventing auto-submission');
    isInitialMount.current = false;
    // Reset any pending state that might have been triggered by React Strict Mode
    if (pending && !state.error) {
      console.log('🔐 Resetting unexpected pending state');
    }
  }, []);

  // Log state changes
  useEffect(() => {
    console.log('🔐 Login State Changed:', {
      state,
      pending,
      timestamp: new Date().toISOString(),
    });
  }, [state, pending]);

  return (
    <>
      <AuthDebug />
      <div className='min-h-[100dvh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='flex justify-center'>
            <CircleIcon className='h-12 w-12 text-orange-500' />
          </div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            {mode === 'signin'
              ? 'Sign in to your account'
              : 'Create your account'}
          </h2>
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <form
            className='space-y-6'
            action={formAction}
            noValidate
            onSubmit={e => {
              // Prevent any submission during initial mount (React Strict Mode)
              if (isInitialMount.current) {
                console.log(
                  '🔐 Form submission prevented - still in initial mount phase'
                );
                e.preventDefault();
                return;
              }

              if (isSubmitting.current) {
                console.log(
                  '🔐 Form submission already in progress, preventing duplicate submission'
                );
                e.preventDefault();
                return;
              }

              const formData = new FormData(e.currentTarget);
              const formDataObj = Object.fromEntries(formData);

              // Check if required fields are empty
              const email = formDataObj['email'] as string;
              const password = formDataObj['password'] as string;

              console.log('🔐 Form Submission Started:', {
                mode,
                formData: formDataObj,
                email: email || 'EMPTY',
                password: password ? '***' : 'EMPTY',
                timestamp: new Date().toISOString(),
              });

              if (!email || !password) {
                console.log(
                  '🔐 Form submission prevented - empty required fields'
                );
                e.preventDefault();
                return;
              }

              isSubmitting.current = true;

              // Reset the flag after a delay to allow for proper form processing
              setTimeout(() => {
                isSubmitting.current = false;
              }, 1000);
            }}
          >
            <input type='hidden' name='redirect' value={redirect || ''} />
            <input type='hidden' name='priceId' value={priceId || ''} />
            <input type='hidden' name='organizationId' value={inviteId || ''} />

            {mode === 'signup' && (
              <>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <Label
                      htmlFor='firstName'
                      className='block text-sm font-medium text-gray-700'
                    >
                      First Name
                    </Label>
                    <div className='mt-1'>
                      <Input
                        id='firstName'
                        name='firstName'
                        type='text'
                        autoComplete='given-name'
                        defaultValue={String(state['firstName'] || '')}
                        required
                        maxLength={50}
                        className='appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm'
                        placeholder='First name'
                      />
                    </div>
                  </div>
                  <div>
                    <Label
                      htmlFor='lastName'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Last Name
                    </Label>
                    <div className='mt-1'>
                      <Input
                        id='lastName'
                        name='lastName'
                        type='text'
                        autoComplete='family-name'
                        defaultValue={String(state['lastName'] || '')}
                        required
                        maxLength={50}
                        className='appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm'
                        placeholder='Last name'
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            <div>
              <Label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email
              </Label>
              <div className='mt-1'>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  defaultValue={String(state['email'] || '')}
                  required
                  maxLength={50}
                  className='appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm'
                  placeholder='Enter your email'
                />
              </div>
            </div>

            <div>
              <Label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'
              >
                Password
              </Label>
              <div className='mt-1'>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete={
                    mode === 'signin' ? 'current-password' : 'new-password'
                  }
                  defaultValue={String(state['password'] || '')}
                  required
                  minLength={8}
                  maxLength={100}
                  className='appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm'
                  placeholder='Enter your password'
                />
              </div>
            </div>

            {mode === 'signup' && (
              <>
                <div>
                  <Label
                    htmlFor='ministryRole'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Ministry Role
                  </Label>
                  <div className='mt-1'>
                    <select
                      id='ministryRole'
                      name='ministryRole'
                      defaultValue={String(state['ministryRole'] || '')}
                      required
                      className='appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm'
                    >
                      <option value=''>Select your ministry role</option>
                      <option value='senior_pastor'>Senior Pastor</option>
                      <option value='associate_pastor'>Associate Pastor</option>
                      <option value='church_planter'>Church Planter</option>
                      <option value='denominational_leader'>
                        Denominational Leader
                      </option>
                      <option value='seminary_professor'>
                        Seminary Professor
                      </option>
                      <option value='seminary_student'>Seminary Student</option>
                      <option value='ministry_staff'>Ministry Staff</option>
                      <option value='missionary'>Missionary</option>
                      <option value='marketplace_minister'>
                        Marketplace Minister
                      </option>
                      <option value='nonprofit_leader'>Nonprofit Leader</option>
                      <option value='consultant'>Consultant</option>
                      <option value='academic_researcher'>
                        Academic Researcher
                      </option>
                      <option value='emerging_leader'>Emerging Leader</option>
                      <option value='other'>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor='organizationName'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Organization Name (Optional)
                  </Label>
                  <div className='mt-1'>
                    <Input
                      id='organizationName'
                      name='organizationName'
                      type='text'
                      defaultValue={String(state['organizationName'] || '')}
                      maxLength={100}
                      className='appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm'
                      placeholder='Your church, ministry, or organization'
                    />
                  </div>
                </div>
              </>
            )}

            {state?.error && (
              <div className='text-red-500 text-sm'>{state.error}</div>
            )}

            <div>
              <Button
                type='submit'
                className='w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
                disabled={pending}
              >
                {pending ? (
                  <>
                    <Loader2 className='animate-spin mr-2 h-4 w-4' />
                    Loading...
                  </>
                ) : mode === 'signin' ? (
                  'Sign in'
                ) : (
                  'Sign up'
                )}
              </Button>
            </div>
          </form>

          <div className='mt-6'>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-300' />
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-2 bg-gray-50 text-gray-500'>
                  {mode === 'signin'
                    ? 'New to our platform?'
                    : 'Already have an account?'}
                </span>
              </div>
            </div>

            <div className='mt-6'>
              <Link
                href={`${mode === 'signin' ? '/sign-up' : '/sign-in'}${
                  redirect ? `?redirect=${redirect}` : ''
                }${priceId ? `&priceId=${priceId}` : ''}`}
                className='w-full flex justify-center py-2 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
              >
                {mode === 'signin'
                  ? 'Create an account'
                  : 'Sign in to existing account'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
