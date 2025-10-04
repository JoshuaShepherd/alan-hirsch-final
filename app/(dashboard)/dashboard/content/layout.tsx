import { ContentNavigation } from '@/components/content/content-navigation';

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='space-y-6'>
      {/* Content Navigation */}
      <div className='border-b border-gray-200 pb-4'>
        <ContentNavigation />
      </div>

      {/* Page Content */}
      {children}
    </div>
  );
}
