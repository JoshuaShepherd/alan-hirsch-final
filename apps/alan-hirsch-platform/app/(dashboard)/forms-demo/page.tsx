import {
  AssessmentForm,
  AssessmentSearchForm,
  ComprehensiveFormExample,
  ContactForm,
  ContentItemForm,
  ContentSearchForm,
  CreateUserForm,
  MultiStepOnboardingForm,
  OrganizationForm,
  UserProfileForm,
  UserSearchForm,
} from '@/components/forms';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@platform/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@platform/ui/tabs';

/**
 * Forms Demo Page - Demonstrates all form components and features
 */
export default function FormsDemoPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Form System Demo</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive demonstration of our type-safe form system built with
          React Hook Form, Zod validation, and shadcn/ui components.
        </p>
      </div>

      <Tabs defaultValue="user-forms" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="user-forms">User Forms</TabsTrigger>
          <TabsTrigger value="content-forms">Content Forms</TabsTrigger>
          <TabsTrigger value="search-forms">Search Forms</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {/* User Forms */}
        <TabsContent value="user-forms" className="space-y-6">
          <div className="grid gap-6">
            <CreateUserForm
              onSuccess={user => console.log('User created:', user)}
              onError={error => console.error('Error:', error)}
            />

            <UserProfileForm
              mode="profile"
              onSuccess={user => console.log('Profile updated:', user)}
              onError={error => console.error('Error:', error)}
            />
          </div>
        </TabsContent>

        {/* Content Forms */}
        <TabsContent value="content-forms" className="space-y-6">
          <div className="grid gap-6">
            <AssessmentForm
              onSuccess={assessment =>
                console.log('Assessment created:', assessment)
              }
              onError={error => console.error('Error:', error)}
            />

            <ContentItemForm
              onSuccess={content => console.log('Content created:', content)}
              onError={error => console.error('Error:', error)}
            />

            <OrganizationForm
              onSuccess={org => console.log('Organization created:', org)}
              onError={error => console.error('Error:', error)}
            />
          </div>
        </TabsContent>

        {/* Search Forms */}
        <TabsContent value="search-forms" className="space-y-6">
          <div className="grid gap-6">
            <ContentSearchForm
              onSearch={filters => console.log('Content search:', filters)}
              syncWithURL={true}
            />

            <UserSearchForm
              onSearch={filters => console.log('User search:', filters)}
              syncWithURL={true}
            />

            <AssessmentSearchForm
              onSearch={filters => console.log('Assessment search:', filters)}
              syncWithURL={true}
            />

            <ContactForm
              onSuccess={data => console.log('Contact form submitted:', data)}
              onError={error => console.error('Error:', error)}
            />
          </div>
        </TabsContent>

        {/* Advanced Forms */}
        <TabsContent value="advanced" className="space-y-6">
          <div className="grid gap-6">
            <MultiStepOnboardingForm
              onComplete={data => console.log('Onboarding completed:', data)}
              onError={error => console.error('Error:', error)}
            />

            <ComprehensiveFormExample
              onSuccess={data =>
                console.log('Comprehensive form submitted:', data)
              }
              onError={error => console.error('Error:', error)}
              persistKey="demo-comprehensive-form"
              syncWithURL={true}
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Features Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Form System Features</CardTitle>
          <CardDescription>
            Complete type-safe form handling with advanced features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Type Safety</h4>
              <p className="text-sm text-gray-600">
                Complete TypeScript inference from Zod schemas to form data
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Real-time Validation</h4>
              <p className="text-sm text-gray-600">
                Instant validation feedback with debounced error checking
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Form Persistence</h4>
              <p className="text-sm text-gray-600">
                Auto-save form state to localStorage with restoration
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">File Upload</h4>
              <p className="text-sm text-gray-600">
                Drag & drop file upload with progress tracking
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Multi-step Forms</h4>
              <p className="text-sm text-gray-600">
                Complex forms with step-by-step validation
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">URL Synchronization</h4>
              <p className="text-sm text-gray-600">
                Sync form state with URL parameters for shareable links
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Conditional Fields</h4>
              <p className="text-sm text-gray-600">
                Show/hide fields based on other field values
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Array Fields</h4>
              <p className="text-sm text-gray-600">
                Dynamic lists with add/remove functionality
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Accessibility</h4>
              <p className="text-sm text-gray-600">
                Full ARIA support and keyboard navigation
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
