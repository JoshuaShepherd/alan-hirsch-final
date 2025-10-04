'use client';

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
import { useContentCategories } from '@/hooks/useContent';
import type { CreateContentItemRequest } from '@/lib/contracts/content.request';
import { createContentItemRequestSchema } from '@/lib/contracts/content.request';
import { createClient } from '@platform/database/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Save, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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
];

export default function CreateContentPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [theologicalThemes, setTheologicalThemes] = useState<string[]>([]);
  const [newTheme, setNewTheme] = useState('');

  const { data: categories, isLoading: categoriesLoading } =
    useContentCategories();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createContentItemRequestSchema),
    defaultValues: {
      contentType: 'article',
      format: 'text',
      visibility: 'public',
      status: 'draft',
      tags: [],
      theologicalThemes: [],
      secondaryCategories: [],
      attachments: [],
      licenseType: 'all_rights_reserved',
      attributionRequired: false,
    },
  });

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

  const onSubmit = async (data: CreateContentItemRequest) => {
    setIsSubmitting(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        toast.error('You must be logged in to create content');
        return;
      }

      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create content');
      }

      const result = await response.json();
      toast.success('Content created successfully!');
      router.push(`/dashboard/content/${result.data.slug}`);
    } catch (error) {
      console.error('Error creating content:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to create content'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='max-w-4xl mx-auto p-6 space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>
            Create New Content
          </h1>
          <p className='text-lg text-gray-600 mt-2'>
            Create articles, videos, and resources for the Alan Hirsch Digital
            Platform.
          </p>
        </div>
        <div className='flex gap-2'>
          <Button
            variant='outline'
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type='submit' form='content-form' disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                Creating...
              </>
            ) : (
              <>
                <Save className='w-4 h-4 mr-2' />
                Create Content
              </>
            )}
          </Button>
        </div>
      </div>

      <form
        id='content-form'
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-6'
      >
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle>Content Details</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div>
                  <Label htmlFor='title'>Title *</Label>
                  <Input
                    id='title'
                    {...register('title')}
                    placeholder='Enter content title'
                    className={errors.title ? 'border-red-500' : ''}
                  />
                  {errors.title && (
                    <p className='text-sm text-red-500 mt-1'>
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor='slug'>Slug *</Label>
                  <Input
                    id='slug'
                    {...register('slug')}
                    placeholder='content-slug'
                    className={errors.slug ? 'border-red-500' : ''}
                  />
                  {errors.slug && (
                    <p className='text-sm text-red-500 mt-1'>
                      {errors.slug.message}
                    </p>
                  )}
                  <p className='text-sm text-gray-500 mt-1'>
                    URL-friendly version of the title (lowercase, hyphens only)
                  </p>
                </div>

                <div>
                  <Label htmlFor='excerpt'>Excerpt</Label>
                  <Textarea
                    id='excerpt'
                    {...register('excerpt')}
                    placeholder='Brief description of the content'
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Content *</Label>
                  <RichTextEditor
                    content={watchedContent}
                    onChange={content => setValue('content', content)}
                    placeholder='Write your content here...'
                  />
                  {errors.content && (
                    <p className='text-sm text-red-500 mt-1'>
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
              <CardContent className='space-y-4'>
                <div>
                  <Label htmlFor='new-tag'>Tags</Label>
                  <div className='flex gap-2 mt-1'>
                    <Input
                      id='new-tag'
                      value={newTag}
                      onChange={e => setNewTag(e.target.value)}
                      placeholder='Add a tag'
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                    />
                    <Button type='button' variant='outline' onClick={addTag}>
                      Add
                    </Button>
                  </div>
                  <div className='flex flex-wrap gap-2 mt-2'>
                    {tags.map(tag => (
                      <Badge
                        key={tag}
                        variant='secondary'
                        className='flex items-center gap-1'
                      >
                        {tag}
                        <button
                          type='button'
                          onClick={() => removeTag(tag)}
                          className='ml-1 hover:text-red-500'
                        >
                          <X className='w-3 h-3' />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor='new-theme'>Theological Themes</Label>
                  <div className='flex gap-2 mt-1'>
                    <Input
                      id='new-theme'
                      value={newTheme}
                      onChange={e => setNewTheme(e.target.value)}
                      placeholder='Add a theological theme'
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTheme();
                        }
                      }}
                    />
                    <Button type='button' variant='outline' onClick={addTheme}>
                      Add
                    </Button>
                  </div>
                  <div className='flex flex-wrap gap-2 mt-2'>
                    {theologicalThemes.map(theme => (
                      <Badge
                        key={theme}
                        variant='outline'
                        className='flex items-center gap-1'
                      >
                        {theme}
                        <button
                          type='button'
                          onClick={() => removeTheme(theme)}
                          className='ml-1 hover:text-red-500'
                        >
                          <X className='w-3 h-3' />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div>
                  <Label htmlFor='contentType'>Content Type *</Label>
                  <Select
                    value={watch('contentType')}
                    onValueChange={value =>
                      setValue('contentType', value as any)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select content type' />
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
                  <Label htmlFor='format'>Format</Label>
                  <Select
                    value={watch('format')}
                    onValueChange={value => setValue('format', value as any)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select format' />
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
                  <Label htmlFor='status'>Status</Label>
                  <Select
                    value={watch('status')}
                    onValueChange={value => setValue('status', value as any)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select status' />
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
                  <Label htmlFor='visibility'>Visibility</Label>
                  <Select
                    value={watch('visibility')}
                    onValueChange={value =>
                      setValue('visibility', value as any)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select visibility' />
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
                  <Label htmlFor='primaryCategoryId'>Primary Category</Label>
                  <Select
                    value={watch('primaryCategoryId')}
                    onValueChange={value =>
                      setValue('primaryCategoryId', value)
                    }
                    disabled={categoriesLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select category' />
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
                  <Label htmlFor='featuredImageUrl'>Featured Image URL</Label>
                  <Input
                    id='featuredImageUrl'
                    {...register('featuredImageUrl')}
                    placeholder='https://example.com/image.jpg'
                  />
                </div>

                <div>
                  <Label htmlFor='videoUrl'>Video URL</Label>
                  <Input
                    id='videoUrl'
                    {...register('videoUrl')}
                    placeholder='https://example.com/video.mp4'
                  />
                </div>

                <div>
                  <Label htmlFor='audioUrl'>Audio URL</Label>
                  <Input
                    id='audioUrl'
                    {...register('audioUrl')}
                    placeholder='https://example.com/audio.mp3'
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO & Metadata</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div>
                  <Label htmlFor='metaTitle'>Meta Title</Label>
                  <Input
                    id='metaTitle'
                    {...register('metaTitle')}
                    placeholder='SEO title'
                  />
                </div>

                <div>
                  <Label htmlFor='metaDescription'>Meta Description</Label>
                  <Textarea
                    id='metaDescription'
                    {...register('metaDescription')}
                    placeholder='SEO description'
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor='canonicalUrl'>Canonical URL</Label>
                  <Input
                    id='canonicalUrl'
                    {...register('canonicalUrl')}
                    placeholder='https://example.com/original'
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
