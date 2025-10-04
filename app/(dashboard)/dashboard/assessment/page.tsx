'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, BookOpen, Play } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AssessmentPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to assessment selection page
    router.replace('/dashboard/assessment/select');
  }, [router]);

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>
          Assessment Center
        </h1>
        <p className='text-gray-600'>
          Discover your ministry gifts and leadership strengths through our
          comprehensive assessments.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <Card
          className='hover:shadow-lg transition-shadow cursor-pointer'
          onClick={() => router.push('/dashboard/assessment/select')}
        >
          <CardHeader>
            <CardTitle className='flex items-center'>
              <BookOpen className='mr-2 h-5 w-5' />
              Take Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-gray-600 mb-4'>
              Choose from our collection of ministry and leadership assessments.
            </p>
            <Button className='w-full'>
              <Play className='mr-2 h-4 w-4' />
              Browse Assessments
            </Button>
          </CardContent>
        </Card>

        <Card
          className='hover:shadow-lg transition-shadow cursor-pointer'
          onClick={() => router.push('/dashboard/assessment/results')}
        >
          <CardHeader>
            <CardTitle className='flex items-center'>
              <BarChart3 className='mr-2 h-5 w-5' />
              View Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-gray-600 mb-4'>
              Review your completed assessments and track your progress.
            </p>
            <Button variant='outline' className='w-full'>
              View Results
            </Button>
          </CardContent>
        </Card>

        <Card
          className='hover:shadow-lg transition-shadow cursor-pointer'
          onClick={() => router.push('/dashboard/assessment/new')}
        >
          <CardHeader>
            <CardTitle className='flex items-center'>
              <BookOpen className='mr-2 h-5 w-5' />
              Create Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-gray-600 mb-4'>
              Create custom assessments for your organization or ministry.
            </p>
            <Button variant='outline' className='w-full'>
              Create New
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
