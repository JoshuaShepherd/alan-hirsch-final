// Service Instances - Created separately to avoid circular dependencies
import { AssessmentService } from './assessment.service';
import { CommunityService } from './community.service';
import { ContentItemService } from './content.service';
import { OrganizationService } from './organization.service';
import { UserService } from './user.service';
// Create singleton instances for backward compatibility with existing imports
export const userService = new UserService();
export const contentService = new ContentItemService();
export const assessmentService = new AssessmentService();
export const organizationService = new OrganizationService();
export const communityService = new CommunityService();
// Note: These services don't exist yet but are imported by API routes
// They should be implemented or the imports should be updated
export const uploadService = {
    // Placeholder - needs implementation
    upload: async () => {
        throw new Error('UploadService not implemented');
    },
};
export const analyticsService = {
    // Placeholder - needs implementation
    getAnalytics: async () => {
        throw new Error('AnalyticsService not implemented');
    },
};
//# sourceMappingURL=service-instances.js.map