import { createSupabaseServerClient } from '@platform/database';
import { Badge } from '@platform/ui/badge';
import { Button } from '@platform/ui/button';
import { Card, CardContent } from '@platform/ui/card';
import {
  Bookmark,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  Share2,
} from 'lucide-react';
import { notFound } from 'next/navigation';

// Use DTO types from contracts instead of custom interface
import type { ContentRowDTO } from '@platform/contracts';

export default async function ContentViewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();

  // Get the current user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    notFound();
  }

  // Fetch content item
  const response = await fetch(
    `${process.env['NEXT_PUBLIC_APP_URL'] || 'http://localhost:3000'}/api/content?slug=${slug}`,
    {
      headers: {
        Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
      },
    }
  );

  if (!response.ok) {
    notFound();
  }

  const { items } = await response.json();
  const content = items[0] as ContentRowDTO;

  if (!content) {
    notFound();
  }

  // Increment view count
  try {
    await fetch(
      `${process.env['NEXT_PUBLIC_APP_URL'] || 'http://localhost:3000'}/api/content/${content.id}/view`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      }
    );
  } catch (error) {
    console.error('Failed to increment view count:', error);
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <article className="space-y-6">
        {/* Header */}
        <header className="space-y-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Badge variant="secondary">{content.contentType}</Badge>
            <span>•</span>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {content.estimatedReadingTime ?? 0} min read
            </div>
            <span>•</span>
            <span>{content.wordCount ?? 0} words</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900">{content.title}</h1>

          <p className="text-lg text-gray-600">{content.excerpt ?? ''}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {content.author?.avatarUrl ? (
                  <img
                    src={content.author.avatarUrl}
                    alt={
                      content.author.displayName ??
                      `${content.author.firstName ?? '(unknown)'} ${content.author.lastName ?? '(unknown)'}`
                    }
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {(content.author?.firstName ?? 'U')[0]}
                      {(content.author?.lastName ?? 'U')[0]}
                    </span>
                  </div>
                )}
                <div>
                  <div className="font-medium">
                    {content.author?.displayName ??
                      `${content.author?.firstName ?? '(unknown)'} ${content.author?.lastName ?? '(unknown)'}`}
                  </div>
                  <div className="text-sm text-gray-500">
                    {content.publishedAt
                      ? new Date(content.publishedAt).toLocaleDateString()
                      : 'Not published'}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-1" />
                {content.viewCount}
              </Button>
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-1" />
                {content.likeCount}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-1" />
                {content.shareCount}
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="w-4 h-4 mr-1" />
                {content.bookmarkCount}
              </Button>
              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4 mr-1" />
                {content.commentCount}
              </Button>
            </div>
          </div>
        </header>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {(content.tags ?? []).map((tag: string) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Content */}
        <Card>
          <CardContent className="pt-6">
            <div className="prose prose-lg max-w-none">
              {renderMarkdown(content.content ?? '')}
            </div>
          </CardContent>
        </Card>

        {/* Engagement Actions */}
        <div className="flex justify-center space-x-4 pt-6 border-t">
          <Button>
            <Heart className="w-4 h-4 mr-2" />
            Like this article
          </Button>
          <Button variant="outline">
            <Bookmark className="w-4 h-4 mr-2" />
            Save for later
          </Button>
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </article>
    </div>
  );
}

function renderMarkdown(content: string) {
  // Simple markdown rendering - in production, use a proper markdown library
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: content
          .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
          .replace(
            /^## (.*$)/gim,
            '<h2 class="text-2xl font-semibold mb-3 mt-6">$1</h2>'
          )
          .replace(
            /^### (.*$)/gim,
            '<h3 class="text-xl font-medium mb-2 mt-4">$1</h3>'
          )
          .replace(
            /\*\*(.*?)\*\*/gim,
            '<strong class="font-semibold">$1</strong>'
          )
          .replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>')
          .replace(/\n\n/gim, '</p><p class="mb-4">')
          .replace(/\n/gim, '<br>')
          .replace(/^/, '<p class="mb-4">')
          .replace(/$/, '</p>'),
      }}
    />
  );
}
