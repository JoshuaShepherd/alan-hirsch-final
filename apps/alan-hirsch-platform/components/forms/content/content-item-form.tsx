'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  contentItemFormSchema,
  type ContentItemForm,
  type ContentItemResponse,
} from '@platform/contracts';
import { BaseForm } from '@platform/shared/forms/base-form';
import { FormFieldGroup, FormSection } from '@platform/shared/forms/form-field';
import { Button } from '@platform/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@platform/ui/card';
import { Input } from '@platform/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@platform/ui/select';
import { Textarea } from '@platform/ui/textarea';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormField } from '../form-field';

export interface ContentItemFormProps {
  onSuccess?: (content: ContentItemResponse) => void;
  onError?: (error: Error) => void;
  defaultValues?: Partial<ContentItemForm>;
  className?: string;
  isLoading?: boolean;
  mode?: 'create' | 'update';
}

/**
 * Content item form for creating and updating content items
 * Uses contract schemas for validation and type safety
 */
export function ContentItemForm({
  onSuccess,
  onError,
  defaultValues,
  className,
  isLoading = false,
  mode = 'create',
}: ContentItemFormProps) {
  const [tags, setTags] = useState<string[]>(defaultValues?.tags || []);
  const [theologicalThemes, setTheologicalThemes] = useState<string[]>(
    defaultValues?.theologicalThemes || []
  );

  const form = useForm<ContentItemForm>({
    resolver: zodResolver(
      mode === 'update'
        ? contentItemFormSchema.partial()
        : contentItemFormSchema
    ),
    defaultValues: {
      contentType: 'article',
      format: 'text',
      visibility: 'public',
      status: 'draft',
      licenseType: 'all_rights_reserved',
      attributionRequired: true,
      tags: [],
      theologicalThemes: [],
      ...defaultValues,
    },
  });

  const onSubmit = async (data: ContentItemForm) => {
    try {
      const endpoint =
        mode === 'create' ? '/api/content' : `/api/content/${data.id}`;
      const method = mode === 'create' ? 'POST' : 'PATCH';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, tags, theologicalThemes }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save content');
      }

      const result = await response.json();
      onSuccess?.(result.data);
    } catch (error) {
      console.error('Content save error:', error);
      onError?.(
        error instanceof Error ? error : new Error('Failed to save content')
      );
    }
  };

  const addTag = () => {
    setTags([...tags, '']);
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const updateTag = (index: number, value: string) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  const addTheologicalTheme = () => {
    setTheologicalThemes([...theologicalThemes, '']);
  };

  const removeTheologicalTheme = (index: number) => {
    setTheologicalThemes(theologicalThemes.filter((_, i) => i !== index));
  };

  const updateTheologicalTheme = (index: number, value: string) => {
    const newThemes = [...theologicalThemes];
    newThemes[index] = value;
    setTheologicalThemes(newThemes);
  };

  const getTitle = () => {
    return mode === 'create' ? 'Create Content' : 'Update Content';
  };

  const getDescription = () => {
    return mode === 'create'
      ? 'Create a new piece of content'
      : 'Update your content';
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{getTitle()}</CardTitle>
        <CardDescription>{getDescription()}</CardDescription>
      </CardHeader>
      <CardContent>
        <BaseForm
          form={form}
          onSubmit={onSubmit}
          submitText={mode === 'create' ? 'Create Content' : 'Update Content'}
          isLoading={isLoading}
          className="space-y-6"
        >
          {/* Basic Information */}
          <FormSection
            title="Basic Information"
            description="Essential content details"
          >
            <FormField
              name="title"
              label="Title"
              required
              description="The title of your content"
            >
              <Input
                {...form.register('title')}
                placeholder="Enter content title"
              />
            </FormField>

            <FormField
              name="excerpt"
              label="Excerpt"
              description="Brief description of your content"
            >
              <Textarea
                {...form.register('excerpt')}
                placeholder="Enter a brief excerpt..."
                rows={3}
              />
            </FormField>

            <FormField
              name="content"
              label="Content"
              description="The main content"
            >
              <Textarea
                {...form.register('content')}
                placeholder="Write your content here..."
                rows={10}
              />
            </FormField>
          </FormSection>

          {/* Content Classification */}
          <FormSection
            title="Content Classification"
            description="Categorize and classify your content"
          >
            <FormFieldGroup columns={2}>
              <FormField
                name="contentType"
                label="Content Type"
                required
                description="Type of content"
              >
                <Select
                  onValueChange={value =>
                    form.setValue('contentType', value as any)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="podcast">Podcast</SelectItem>
                    <SelectItem value="framework">Framework</SelectItem>
                    <SelectItem value="tool">Tool</SelectItem>
                    <SelectItem value="case_study">Case Study</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="course_lesson">Course Lesson</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField
                name="format"
                label="Format"
                description="Content format"
              >
                <Select
                  onValueChange={value => form.setValue('format', value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                    <SelectItem value="interactive">Interactive</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="presentation">Presentation</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </FormFieldGroup>

            <FormField
              name="primaryCategoryId"
              label="Primary Category"
              description="Main category for this content"
            >
              <Input
                {...form.register('primaryCategoryId')}
                placeholder="Category ID (UUID)"
              />
            </FormField>
          </FormSection>

          {/* Tags and Themes */}
          <FormSection
            title="Tags and Themes"
            description="Add tags and theological themes"
          >
            <div className="space-y-4">
              {/* Tags */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Tags</label>
                <div className="space-y-2">
                  {tags.map((tag, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={tag}
                        onChange={e => updateTag(index, e.target.value)}
                        placeholder="Enter tag"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeTag(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addTag}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Tag
                  </Button>
                </div>
              </div>

              {/* Theological Themes */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Theological Themes
                </label>
                <div className="space-y-2">
                  {theologicalThemes.map((theme, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={theme}
                        onChange={e =>
                          updateTheologicalTheme(index, e.target.value)
                        }
                        placeholder="Enter theological theme"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeTheologicalTheme(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addTheologicalTheme}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Theological Theme
                  </Button>
                </div>
              </div>
            </div>
          </FormSection>

          {/* Visibility and Status */}
          <FormSection
            title="Visibility and Status"
            description="Control who can see your content"
          >
            <FormFieldGroup columns={2}>
              <FormField
                name="visibility"
                label="Visibility"
                description="Who can view this content"
              >
                <Select
                  onValueChange={value =>
                    form.setValue('visibility', value as any)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="organization">Organization</SelectItem>
                    <SelectItem value="invite_only">Invite Only</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField
                name="status"
                label="Status"
                description="Publication status"
              >
                <Select
                  onValueChange={value => form.setValue('status', value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </FormFieldGroup>
          </FormSection>

          {/* Media */}
          <FormSection title="Media" description="Add media to your content">
            <FormFieldGroup columns={2}>
              <FormField
                name="featuredImageUrl"
                label="Featured Image URL"
                description="URL for featured image"
              >
                <Input
                  {...form.register('featuredImageUrl')}
                  placeholder="https://example.com/image.jpg"
                />
              </FormField>

              <FormField
                name="videoUrl"
                label="Video URL"
                description="URL for video content"
              >
                <Input
                  {...form.register('videoUrl')}
                  placeholder="https://example.com/video.mp4"
                />
              </FormField>
            </FormFieldGroup>

            <FormField
              name="audioUrl"
              label="Audio URL"
              description="URL for audio content"
            >
              <Input
                {...form.register('audioUrl')}
                placeholder="https://example.com/audio.mp3"
              />
            </FormField>
          </FormSection>

          {/* SEO */}
          <FormSection title="SEO" description="Search engine optimization">
            <FormFieldGroup columns={2}>
              <FormField
                name="metaTitle"
                label="Meta Title"
                description="SEO title (max 100 characters)"
              >
                <Input
                  {...form.register('metaTitle')}
                  placeholder="SEO title"
                  maxLength={100}
                />
              </FormField>

              <FormField
                name="metaDescription"
                label="Meta Description"
                description="SEO description (max 200 characters)"
              >
                <Input
                  {...form.register('metaDescription')}
                  placeholder="SEO description"
                  maxLength={200}
                />
              </FormField>
            </FormFieldGroup>
          </FormSection>

          {/* Publication */}
          <FormSection title="Publication" description="Publication settings">
            <FormFieldGroup columns={2}>
              <FormField
                name="publishedAt"
                label="Published At"
                description="Publication date"
              >
                <Input
                  type="datetime-local"
                  {...form.register('publishedAt')}
                />
              </FormField>

              <FormField
                name="scheduledAt"
                label="Scheduled At"
                description="Schedule publication"
              >
                <Input
                  type="datetime-local"
                  {...form.register('scheduledAt')}
                />
              </FormField>
            </FormFieldGroup>
          </FormSection>

          {/* Licensing */}
          <FormSection
            title="Licensing"
            description="Content licensing and attribution"
          >
            <FormField
              name="licenseType"
              label="License Type"
              description="Content license"
            >
              <Select
                onValueChange={value =>
                  form.setValue('licenseType', value as any)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select license" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_rights_reserved">
                    All Rights Reserved
                  </SelectItem>
                  <SelectItem value="creative_commons">
                    Creative Commons
                  </SelectItem>
                  <SelectItem value="public_domain">Public Domain</SelectItem>
                  <SelectItem value="fair_use">Fair Use</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </FormSection>
        </BaseForm>
      </CardContent>
    </Card>
  );
}
