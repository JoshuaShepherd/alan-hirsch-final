import { ContentLibrary } from '@/components/content/content-library';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/server';
import { Plus } from 'lucide-react';
import Link from 'next/link';

// Use DTO types from contracts instead of custom interface
import type { ContentRowDTO } from '@/lib/contracts';

export default async function ContentListPage() {
  const supabase = await createClient();

  // Get the current user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return (
      <div className='max-w-6xl mx-auto p-6'>
        <div className='text-center'>
          <p className='text-gray-600'>Please sign in to view content.</p>
        </div>
      </div>
    );
  }

  // Fetch content items
  const response = await fetch(
    `${process.env['NEXT_PUBLIC_APP_URL'] || 'http://localhost:3000'}/api/content?limit=10&status=published`,
    {
      headers: {
        Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
      },
    }
  );

  let contentItems: ContentRowDTO[] = [];

  if (response.ok) {
    const data = await response.json();
    contentItems = data.items || [];
  }

  return (
    <div className='max-w-6xl mx-auto p-6'>
      <div className='mb-8'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900 mb-4'>
              Content Library
            </h1>
            <p className='text-lg text-gray-600'>
              Explore articles, videos, and resources from Alan Hirsch and the
              movement.
            </p>
          </div>
          <Link href='/dashboard/content/new'>
            <Button>
              <Plus className='w-4 h-4 mr-2' />
              Create Content
            </Button>
          </Link>
        </div>
      </div>

      {/* Content Library */}
      <ContentLibrary
        initialView='grid'
        showFilters={true}
        showCategories={true}
        limit={20}
      />
    </div>
  );
}
