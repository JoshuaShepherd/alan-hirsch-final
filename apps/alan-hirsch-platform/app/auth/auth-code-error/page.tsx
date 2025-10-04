import Link from 'next/link';

export default function AuthCodeError() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full space-y-8 p-6'>
        <div className='text-center'>
          <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
            Authentication Error
          </h2>
          <p className='mt-2 text-sm text-gray-600'>
            There was an error with your authentication. This could be due to:
          </p>
          <ul className='mt-4 text-sm text-gray-600 text-left space-y-2'>
            <li>• Invalid or expired authentication code</li>
            <li>• Network connectivity issues</li>
            <li>• Incorrect redirect URL configuration</li>
          </ul>
        </div>
        <div className='mt-8 space-y-4'>
          <Link
            href='/sign-in'
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
          >
            Try Again
          </Link>
          <Link
            href='/'
            className='w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}




