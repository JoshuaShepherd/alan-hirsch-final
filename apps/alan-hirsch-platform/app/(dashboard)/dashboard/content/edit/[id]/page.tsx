'use client';

import { PublishingWorkflow } from '@/components/content/publishing-workflow';
import { useContentById, useContentCategories } from '@/hooks/useContent';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateContentItemRequestSchema } from '@platform/contracts';
import { createSupabaseClient } from '@platform/database';
import { Badge } from '@platform/ui/badge';
import { Button } from '@platform/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@platform/ui/card';
import { Input } from '@platform/ui/input';
import { Label } from '@platform/ui/label';
import { RichTextEditor } from '@platform/ui/rich-text-editor';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@platform/ui/select';
import { Textarea } from '@platform/ui/textarea';
import { Eye, Loader2, Save, Trash2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const contentTypeOptions = [
  { value: 'article', label: 'Article' },
  { value: 'video', label: 'Video' },
  { value: 'podcast', label: 'Podcast' },
  { value: 'framework', label: 'Framework' },
  { value: 'tool', label: 'Tool' },
  { value: 'case_study', label: 'Case Study' },
  { value: 'interview', label: 'Interview' },
  { value: 'course_lesson', label: 'Course Lesson' },
];

const formatOptions = [
  { value: 'text', label: 'Text' },
  { value: 'video', label: 'Video' },
  { value: 'audio', label: 'Audio' },
  { value: 'interactive', label: 'Interactive' },
  { value: 'pdf', label: 'PDF' },
  { value: 'presentation', label: 'Presentation' },
];

const visibilityOptions = [
  { value: 'public', label: 'Public' },
  { value: 'premium', label: 'Premium' },
  { value: 'vip', label: 'VIP' },
  { value: 'private', label: 'Private' },
  { value: 'organization', label: 'Organization' },
];

const statusOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'archived', label: 'Archived' },
];

interface EditContentPageProps {
  params: Promise<{ id: string }>;
}

export default function EditContentPage({ params }: EditContentPageProps) {
  const router = useRouter();
  const supabase = createSupabaseClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [theologicalThemes, setTheologicalThemes] = useState<string[]>([]);
  const [newTheme, setNewTheme] = useState('');

  // Get the content ID from params
  const [contentId, setContentId] = useState<string>('');

  useEffect(() => {
    void params.then(({ id }) => setContentId(id));
  }, [params]);

  const { data: content, isLoading: contentLoading } =
    useContentById(contentId);
  const { data: categories, isLoading: categoriesLoading } =
    useContentCategories();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<UpdateContentItemRequest>({
    resolver: zodResolver(updateContentItemRequestSchema),
  });

  // Reset form when content loads
  useEffect(() => {
    if (content) {
      reset({
        id: content.id,
        title: content.title,
        excerpt: content.excerpt || '',
        content: content.content || '',
        contentType: content.contentType,
        format: content.format,
        visibility: content.visibility as
          | 'public'
          | 'premium'
          | 'vip'
          | 'private'
          | 'organization',
        status: content.status,
        primaryCategoryId: content.primaryCategoryId || '',
        featuredImageUrl: content.featuredImageUrl || '',
        videoUrl: content.videoUrl || '',
        audioUrl: content.audioUrl || '',
        metaTitle: content.metaTitle || '',
        metaDescription: content.metaDescription || '',
        canonicalUrl: content.canonicalUrl || '',
        originalSource: content.originalSource || '',
        licenseType: content.licenseType,
        attributionRequired: content.attributionRequired,
      });

      setTags(content.tags || []);
      setTheologicalThemes(content.theologicalThemes || []);
    }
  }, [content, reset]);

  const watchedContent = watch('content');

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      const updatedTags = [...tags, newTag.trim()];
      setTags(updatedTags);
      setValue('tags', updatedTags);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    setTags(updatedTags);
    setValue('tags', updatedTags);
  };

  const addTheme = () => {
    if (newTheme.trim() && !theologicalThemes.includes(newTheme.trim())) {
      const updatedThemes = [...theologicalThemes, newTheme.trim()];
      setTheologicalThemes(updatedThemes);
      setValue('theologicalThemes', updatedThemes);
      setNewTheme('');
    }
  };

  const removeTheme = (themeToRemove: string) => {
    const updatedThemes = theologicalThemes.filter(
      theme => theme !== themeToRemove
    );
    setTheologicalThemes(updatedThemes);
    setValue('theologicalThemes', updatedThemes);
  };

  const onSubmit = async (data: UpdateContentItemRequest) => {
    setIsSubmitting(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        toast.error('You must be logged in to update content');
        return;
      }

      const response = await fetch(`/api/content/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update content');
      }

      toast.success('Content updated successfully!');
      router.push(`/dashboard/content/${content?.slug}`);
    } catch (error) {
      console.error('Error updating content:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to update content'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        'Are you sure you want to delete this content? This action cannot be undone.'
      )
    ) {
      return;
    }

    setIsDeleting(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        toast.error('You must be logged in to delete content');
        return;
      }

      const response = await fetch(`/api/content/${contentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete content');
      }

      toast.success('Content deleted successfully!');
      router.push('/dashboard/content');
    } catch (error) {
      console.error('Error deleting content:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to delete content'
      );
    } finally {
      setIsDeleting(false);
    }
  };

  if (contentLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading content...</span>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Content Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The content you&apos;re looking for doesn&apos;t exist or you
            don&apos;t have permission to edit it.
          </p>
          <Button onClick={() => router.push('/dashboard/content')}>
            Back to Content Library
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Content</h1>
          <p className="text-lg text-gray-600 mt-2">
            Update your content and manage its settings.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push(`/dashboard/content/${content.slug}`)}
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting || isSubmitting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" form="content-form" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <form
        id="content-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    {...register('title')}
                    placeholder="Enter content title"
                    className={errors.title ? 'border-red-500' : ''}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    {...register('excerpt')}
                    placeholder="Brief description of the content"
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Content *</Label>
                  <RichTextEditor
                    content={watchedContent}
                    onChange={content => setValue('content', content)}
                    placeholder="Write your content here..."
                  />
                  {errors.content && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.content.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tags & Themes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="new-tag">Tags</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="new-tag"
                      value={newTag}
                      onChange={e => setNewTag(e.target.value)}
                      placeholder="Add a tag"
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={addTag}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map(tag => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="new-theme">Theological Themes</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="new-theme"
                      value={newTheme}
                      onChange={e => setNewTheme(e.target.value)}
                      placeholder="Add a theological theme"
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTheme();
                        }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={addTheme}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {theologicalThemes.map(theme => (
                      <Badge
                        key={theme}
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        {theme}
                        <button
                          type="button"
                          onClick={() => removeTheme(theme)}
                          className="ml-1 hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publishing Workflow */}
            <PublishingWorkflow
              content={content as any}
              onStatusChange={newStatus => {
                // Update the content status in the form
                setValue('status', newStatus as any);
                // You could also refresh the content data here
              }}
              onScheduleChange={scheduledAt => {
                // Update the scheduled date if needed
                console.log('Scheduled at:', scheduledAt);
              }}
            />
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="contentType">Content Type *</Label>
                  <Select
                    value={watch('contentType')}
                    onValueChange={value =>
                      setValue('contentType', value as any)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      {contentTypeOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="format">Format</Label>
                  <Select
                    value={watch('format')}
                    onValueChange={value => setValue('format', value as any)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      {formatOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={watch('status')}
                    onValueChange={value => setValue('status', value as any)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="visibility">Visibility</Label>
                  <Select
                    value={watch('visibility')}
                    onValueChange={value =>
                      setValue('visibility', value as any)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      {visibilityOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="primaryCategoryId">Primary Category</Label>
                  <Select
                    value={watch('primaryCategoryId')}
                    onValueChange={value =>
                      setValue('primaryCategoryId', value)
                    }
                    disabled={categoriesLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category: any) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="featuredImageUrl">Featured Image URL</Label>
                  <Input
                    id="featuredImageUrl"
                    {...register('featuredImageUrl')}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <Label htmlFor="videoUrl">Video URL</Label>
                  <Input
                    id="videoUrl"
                    {...register('videoUrl')}
                    placeholder="https://example.com/video.mp4"
                  />
                </div>

                <div>
                  <Label htmlFor="audioUrl">Audio URL</Label>
                  <Input
                    id="audioUrl"
                    {...register('audioUrl')}
                    placeholder="https://example.com/audio.mp3"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO & Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    {...register('metaTitle')}
                    placeholder="SEO title"
                  />
                </div>

                <div>
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    {...register('metaDescription')}
                    placeholder="SEO description"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="canonicalUrl">Canonical URL</Label>
                  <Input
                    id="canonicalUrl"
                    {...register('canonicalUrl')}
                    placeholder="https://example.com/original"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
