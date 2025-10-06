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
// Import actual service implementations
import { analyticsService } from './analytics.service';
import { uploadService } from './upload.service';
// Export the actual service instances
export { analyticsService, uploadService };
//# sourceMappingURL=service-instances.js.map