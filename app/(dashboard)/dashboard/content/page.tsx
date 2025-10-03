import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Eye, Heart, MessageCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

// Use DTO types from contracts instead of custom interface
import type { ContentRowDTO } from '@/lib/contracts';

export default async function ContentListPage() {
  const supabase = await createClient();
  
  // Get the current user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center">
          <p className="text-gray-600">Please sign in to view content.</p>
        </div>
      </div>
    );
  }

  // Fetch content items
  const response = await fetch(`${process.env['NEXT_PUBLIC_APP_URL'] || 'http://localhost:3000'}/api/content?limit=10&status=published`, {
    headers: {
      'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
    }
  });

  let contentItems: ContentRowDTO[] = [];
  
  if (response.ok) {
    const data = await response.json();
    contentItems = data.items || [];
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Content Library</h1>
        <p className="text-lg text-gray-600">
          Explore articles, videos, and resources from Alan Hirsch and the movement.
        </p>
      </div>

      {contentItems.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-gray-600">No content available at the moment.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contentItems.map((item) => (
            <Link key={item.id} href={`/dashboard/content/${item.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{item.contentType}</Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {item.estimatedReadingTime ?? 0} min
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.excerpt ?? ''}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div>
                      {item.author?.displayName ?? `${item.author?.firstName ?? '(unknown)'} ${item.author?.lastName ?? '(unknown)'}`}
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {item.viewCount}
                      </div>
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {item.likeCount}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {item.commentCount}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-3">
                    {(item.tags ?? []).slice(0, 3).map((tag: string) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
