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
import { Switch } from '@platform/ui/switch';
import { Textarea } from '@platform/ui/textarea';
import { NewContentItem, newContentItemSchema } from '@/validations/content';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Upload, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { BaseForm, FormFieldGroup, FormSection } from '../base-form';
import { FormField } from '../form-field';

export interface ContentItemFormProps {
  onSuccess?: (content: NewContentItem) => void;
  onError?: (error: Error) => void;
  defaultValues?: Partial<NewContentItem>;
  className?: string;
  isLoading?: boolean;
  mode?: 'create' | 'update';
}

/**
 * Form for creating and updating content items with rich media support
 */
export function ContentItemForm({
  onSuccess,
  onError,
  defaultValues,
  className,
  isLoading = false,
  mode = 'create',
}: ContentItemFormProps) {
  const form = useForm<NewContentItem>({
    resolver: zodResolver(
      mode === 'update' ? newContentItemSchema.partial() : newContentItemSchema
    ),
    defaultValues: {
      format: 'text',
      visibility: 'public',
      status: 'draft',
      viewCount: 0,
      likeCount: 0,
      shareCount: 0,
      commentCount: 0,
      bookmarkCount: 0,
      secondaryCategories: [],
      tags: [],
      theologicalThemes: [],
      networkAmplificationScore: 0,
      crossReferenceCount: 0,
      aiEnhanced: false,
      aiKeyPoints: [],
      attachments: [],
      licenseType: 'all_rights_reserved',
      attributionRequired: true,
      ...defaultValues,
    },
  });

  const onSubmit = async (data: NewContentItem) => {
    try {
      const endpoint =
        mode === 'create'
          ? '/api/content'
          : `/api/content/${defaultValues?.id}`;
      const method = mode === 'create' ? 'POST' : 'PATCH';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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
    const currentTags = form.getValues('tags') || [];
    form.setValue('tags', [...currentTags, '']);
  };

  const removeTag = (index: number) => {
    const currentTags = form.getValues('tags') || [];
    form.setValue(
      'tags',
      currentTags.filter((_, i) => i !== index)
    );
  };

  const updateTag = (index: number, value: string) => {
    const currentTags = form.getValues('tags') || [];
    const newTags = [...currentTags];
    newTags[index] = value;
    form.setValue('tags', newTags);
  };

  const addTheologicalTheme = () => {
    const currentThemes = form.getValues('theologicalThemes') || [];
    form.setValue('theologicalThemes', [...currentThemes, '']);
  };

  const removeTheologicalTheme = (index: number) => {
    const currentThemes = form.getValues('theologicalThemes') || [];
    form.setValue(
      'theologicalThemes',
      currentThemes.filter((_, i) => i !== index)
    );
  };

  const updateTheologicalTheme = (index: number, value: string) => {
    const currentThemes = form.getValues('theologicalThemes') || [];
    const newThemes = [...currentThemes];
    newThemes[index] = value;
    form.setValue('theologicalThemes', newThemes);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>
          {mode === 'create' ? 'Create Content' : 'Update Content'}
        </CardTitle>
        <CardDescription>
          {mode === 'create'
            ? 'Create new content with rich media and metadata'
            : 'Update content details and configuration'}
        </CardDescription>
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
              name="slug"
              label="URL Slug"
              required
              description="URL-friendly identifier (lowercase, hyphens only)"
            >
              <Input
                {...form.register('slug')}
                placeholder="content-url-slug"
              />
            </FormField>

            <FormField
              name="excerpt"
              label="Excerpt"
              description="Brief summary or teaser for your content"
            >
              <Textarea
                {...form.register('excerpt')}
                placeholder="A brief summary of your content..."
                rows={3}
              />
            </FormField>

            <FormField
              name="content"
              label="Content"
              description="The main content body"
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
                description="The type of content"
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
                placeholder="Category ID"
              />
            </FormField>
          </FormSection>

          {/* Tags and Themes */}
          <FormSection
            title="Tags and Themes"
            description="Add tags and theological themes for better discoverability"
          >
            {/* Tags */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Tags</label>
              <div className="space-y-2">
                {(form.watch('tags') || []).map((tag, index) => (
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
            <div className="space-y-3">
              <label className="text-sm font-medium">Theological Themes</label>
              <div className="space-y-2">
                {(form.watch('theologicalThemes') || []).map((theme, index) => (
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
          </FormSection>

          {/* Media and Assets */}
          <FormSection
            title="Media and Assets"
            description="Add images, videos, and other media"
          >
            <FormFieldGroup columns={2}>
              <FormField
                name="featuredImageUrl"
                label="Featured Image URL"
                description="URL for the featured image"
              >
                <div className="flex space-x-2">
                  <Input
                    {...form.register('featuredImageUrl')}
                    placeholder="https://..."
                  />
                  <Button type="button" variant="outline" size="sm">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </FormField>

              <FormField
                name="videoUrl"
                label="Video URL"
                description="URL for embedded video"
              >
                <Input
                  {...form.register('videoUrl')}
                  placeholder="https://..."
                />
              </FormField>
            </FormFieldGroup>

            <FormField
              name="audioUrl"
              label="Audio URL"
              description="URL for audio content"
            >
              <Input {...form.register('audioUrl')} placeholder="https://..." />
            </FormField>
          </FormSection>

          {/* SEO and Metadata */}
          <FormSection
            title="SEO and Metadata"
            description="Search engine optimization and metadata"
          >
            <FormField
              name="metaTitle"
              label="Meta Title"
              description="SEO title (if different from main title)"
            >
              <Input {...form.register('metaTitle')} placeholder="SEO title" />
            </FormField>

            <FormField
              name="metaDescription"
              label="Meta Description"
              description="SEO description for search engines"
            >
              <Textarea
                {...form.register('metaDescription')}
                placeholder="Brief description for search engines..."
                rows={3}
              />
            </FormField>

            <FormField
              name="canonicalUrl"
              label="Canonical URL"
              description="Canonical URL for SEO"
            >
              <Input
                {...form.register('canonicalUrl')}
                placeholder="https://..."
              />
            </FormField>
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
                description="Who can see this content"
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
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="unlisted">Unlisted</SelectItem>
                    <SelectItem value="organization">
                      Organization Only
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField
                name="status"
                label="Status"
                description="Content status"
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

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">AI Enhanced</label>
                  <p className="text-sm text-gray-600">
                    This content has been enhanced with AI
                  </p>
                </div>
                <Switch
                  checked={form.watch('aiEnhanced')}
                  onCheckedChange={checked =>
                    form.setValue('aiEnhanced', checked)
                  }
                />
              </div>
            </div>
          </FormSection>

          {/* Attribution and Licensing */}
          <FormSection
            title="Attribution and Licensing"
            description="Content attribution and licensing information"
          >
            <FormField
              name="originalSource"
              label="Original Source"
              description="Original source if this is republished content"
            >
              <Input
                {...form.register('originalSource')}
                placeholder="Original source URL or citation"
              />
            </FormField>

            <FormField
              name="licenseType"
              label="License Type"
              description="How this content can be used"
            >
              <Select
                onValueChange={value =>
                  form.setValue('licenseType', value as any)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select license type" />
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

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">
                  Attribution Required
                </label>
                <p className="text-sm text-gray-600">
                  Require attribution when sharing
                </p>
              </div>
              <Switch
                checked={form.watch('attributionRequired')}
                onCheckedChange={checked =>
                  form.setValue('attributionRequired', checked)
                }
              />
            </div>
          </FormSection>
        </BaseForm>
      </CardContent>
    </Card>
  );
}
