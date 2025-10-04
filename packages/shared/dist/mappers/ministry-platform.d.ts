import type { AssessmentRow, CommunityRow, ContentItemRow, MinistryAssessment, MinistryCommunity, MinistryContentItem, MinistryOrganization, MinistryUserProfile, OrganizationMembershipRow, OrganizationRow, UserProfileRow } from '../contracts';
export declare function toMinistryOrganizationDTO(org: OrganizationRow, totalMembers?: number, activeMembers?: number): MinistryOrganization;
export declare function toMinistryUserProfileDTO(profile: UserProfileRow, organizationContext?: any, includeMetrics?: boolean): MinistryUserProfile;
export declare function toMinistryContentItemDTO(content: ContentItemRow, includeMetrics?: boolean): MinistryContentItem;
export declare function toMinistryAssessmentDTO(assessment: AssessmentRow, includeMetrics?: boolean): MinistryAssessment;
export declare function toMinistryCommunityDTO(community: CommunityRow, includeMetrics?: boolean): MinistryCommunity;
export declare function toOrganizationContextDTO(membership: OrganizationMembershipRow): {
    organizationId: any;
    userRole: any;
    permissions: any;
    isOwner: boolean;
    isAdmin: boolean;
    canManageUsers: any;
    canManageContent: any;
    canViewAnalytics: any;
    canManageSubscriptions: any;
};
export declare function toAuthMinistryCombinedDTO(authUser: {
    id: string;
    email: string;
}, ministryProfile: MinistryUserProfile, organizationContext?: any): {
    auth: {
        id: string;
        email: string;
        isAuthenticated: boolean;
    };
    profile: MinistryUserProfile;
    organizationContext: any;
    permissions: any;
    ministryTier: string;
};
export declare function toOrganizationScopedDTO<T>(data: T, organizationContext: any, userProfile: MinistryUserProfile): {
    data: T;
    organizationContext: any;
    userContext: {
        id: any;
        role: any;
        permissions: any;
        ministryTier: string;
    };
    accessLevel: any;
};
export declare function filterByPlantTerritory<T extends {
    organizationId?: string;
}>(items: T[], organizationContext?: any): T[];
export declare function filterByRolePermissions<T extends Record<string, any>>(items: T[], organizationContext?: any, permissionField?: string): T[];
export declare function applyRoleBasedVisibility<T extends Record<string, any>>(data: T, userRole: string, fieldPermissions: Record<string, string[]>): T;
export declare function getMinistryFieldPermissions(): Record<string, string[]>;
export declare function aggregateMinistryMetrics(userProfile: UserProfileRow, contentMetrics?: any, communityMetrics?: any, learningMetrics?: any): {
    apestScores: {
        apostolic: any;
        prophetic: any;
        evangelistic: any;
        shepherding: any;
        teaching: any;
    };
    contentMetrics: any;
    communityMetrics: any;
    learningMetrics: any;
};
//# sourceMappingURL=ministry-platform.d.ts.map