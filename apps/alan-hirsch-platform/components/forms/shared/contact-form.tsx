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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { BaseForm, FormFieldGroup, FormSection } from '../base-form';
import { FormField } from '../form-field';

const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  category: z
    .enum(['general', 'support', 'feedback', 'partnership', 'media', 'other'])
    .optional(),
  organization: z.string().optional(),
  phone: z.string().optional(),
  preferredContactMethod: z.enum(['email', 'phone']).default('email'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export interface ContactFormProps {
  onSuccess?: (data: ContactFormData) => void;
  onError?: (error: Error) => void;
  className?: string;
  isLoading?: boolean;
  title?: string;
  description?: string;
  showOrganization?: boolean;
  showPhone?: boolean;
  showCategory?: boolean;
}

/**
 * Contact form component for general inquiries and support
 */
export function ContactForm({
  onSuccess,
  onError,
  className,
  isLoading = false,
  title = 'Contact Us',
  description = "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  showOrganization = true,
  showPhone = true,
  showCategory = true,
}: ContactFormProps) {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      preferredContactMethod: 'email',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
      }

      const result = await response.json();
      onSuccess?.(result.data);
    } catch (error) {
      console.error('Contact form error:', error);
      onError?.(
        error instanceof Error ? error : new Error('Failed to send message')
      );
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <BaseForm
          form={form}
          onSubmit={onSubmit}
          submitText="Send Message"
          isLoading={isLoading}
          className="space-y-6"
        >
          {/* Basic Information */}
          <FormSection
            title="Contact Information"
            description="How can we reach you?"
          >
            <FormFieldGroup columns={2}>
              <FormField
                name="name"
                label="Full Name"
                required
                description="Your full name"
              >
                <Input
                  {...form.register('name')}
                  placeholder="Enter your name"
                />
              </FormField>

              <FormField
                name="email"
                label="Email Address"
                required
                description="Your email address"
              >
                <Input
                  type="email"
                  {...form.register('email')}
                  placeholder="your@email.com"
                />
              </FormField>
            </FormFieldGroup>

            {showPhone && (
              <FormField
                name="phone"
                label="Phone Number"
                description="Your phone number (optional)"
              >
                <Input
                  {...form.register('phone')}
                  placeholder="+1 (555) 123-4567"
                />
              </FormField>
            )}

            {showOrganization && (
              <FormField
                name="organization"
                label="Organization"
                description="Your church or organization (optional)"
              >
                <Input
                  {...form.register('organization')}
                  placeholder="Organization name"
                />
              </FormField>
            )}

            <FormField
              name="preferredContactMethod"
              label="Preferred Contact Method"
              description="How would you like us to respond?"
            >
              <Select
                onValueChange={value =>
                  form.setValue(
                    'preferredContactMethod',
                    value as 'email' | 'phone'
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select contact method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </FormSection>

          {/* Message Details */}
          <FormSection
            title="Message Details"
            description="Tell us what you'd like to discuss"
          >
            {showCategory && (
              <FormField
                name="category"
                label="Category"
                description="What type of inquiry is this?"
              >
                <Select
                  onValueChange={value =>
                    form.setValue('category', value as any)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="support">Technical Support</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="media">Media Inquiry</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            )}

            <FormField
              name="subject"
              label="Subject"
              required
              description="Brief subject line for your message"
            >
              <Input
                {...form.register('subject')}
                placeholder="What's this about?"
              />
            </FormField>

            <FormField
              name="message"
              label="Message"
              required
              description="Please provide details about your inquiry"
            >
              <Textarea
                {...form.register('message')}
                placeholder="Tell us more about your question or request..."
                rows={6}
              />
            </FormField>
          </FormSection>
        </BaseForm>
      </CardContent>
    </Card>
  );
}

// Specialized contact forms
export function SupportContactForm(
  props: Omit<ContactFormProps, 'title' | 'description' | 'showCategory'>
) {
  return (
    <ContactForm
      {...props}
      title="Technical Support"
      description="Having trouble with the platform? Our support team is here to help."
      showCategory={false}
    />
  );
}

export function PartnershipContactForm(
  props: Omit<ContactFormProps, 'title' | 'description'>
) {
  return (
    <ContactForm
      {...props}
      title="Partnership Inquiry"
      description="Interested in partnering with us? We'd love to explore opportunities together."
      showCategory={false}
    />
  );
}

export function FeedbackForm(
  props: Omit<ContactFormProps, 'title' | 'description' | 'showCategory'>
) {
  return (
    <ContactForm
      {...props}
      title="Send Feedback"
      description="Help us improve by sharing your thoughts and suggestions."
      showCategory={false}
    />
  );
}
