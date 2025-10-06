import { z } from 'zod';
import { PaginatedResponseSchema } from './user.contracts';
/**
 * Create Organization API Request Contract
 * Derived from CreateOrganizationOperationSchema
 */
export declare const CreateOrganizationApiRequestSchema: z.ZodObject<{
    status: z.ZodDefault<z.ZodEnum<["trial", "active", "suspended", "cancelled"]>>;
    description: z.ZodOptional<z.ZodString>;
    licenseType: z.ZodDefault<z.ZodEnum<["individual", "team", "enterprise"]>>;
    website: z.ZodOptional<z.ZodString>;
    logoUrl: z.ZodOptional<z.ZodString>;
    sizeCategory: z.ZodOptional<z.ZodEnum<["startup", "small", "medium", "large", "enterprise"]>>;
    contactEmail: z.ZodOptional<z.ZodString>;
    contactPhone: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodObject<{
        street: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        state: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
        postalCode: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        street?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        postalCode?: string | undefined;
    }, {
        street?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        postalCode?: string | undefined;
    }>>;
    maxUsers: z.ZodDefault<z.ZodNumber>;
    billingEmail: z.ZodOptional<z.ZodString>;
    accountOwnerId: z.ZodOptional<z.ZodString>;
    stripeCustomerId: z.ZodOptional<z.ZodString>;
    stripeProductId: z.ZodOptional<z.ZodString>;
    organizationType: z.ZodEnum<["church", "denomination", "seminary", "ministry_network", "nonprofit", "business", "other"]>;
} & {
    name: z.ZodEffects<z.ZodString, string, string>;
    slug: z.ZodEffects<z.ZodString, string, string>;
    subdomain: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
}, "strip", z.ZodTypeAny, {
    status: "active" | "suspended" | "trial" | "cancelled";
    name: string;
    slug: string;
    licenseType: "individual" | "enterprise" | "team";
    organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
    maxUsers: number;
    subdomain?: string | undefined;
    description?: string | undefined;
    website?: string | undefined;
    logoUrl?: string | undefined;
    sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
    contactEmail?: string | undefined;
    contactPhone?: string | undefined;
    address?: {
        street?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        postalCode?: string | undefined;
    } | undefined;
    billingEmail?: string | undefined;
    accountOwnerId?: string | undefined;
    stripeCustomerId?: string | undefined;
    stripeProductId?: string | undefined;
}, {
    name: string;
    slug: string;
    organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
    status?: "active" | "suspended" | "trial" | "cancelled" | undefined;
    subdomain?: string | undefined;
    description?: string | undefined;
    licenseType?: "individual" | "enterprise" | "team" | undefined;
    website?: string | undefined;
    logoUrl?: string | undefined;
    sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
    contactEmail?: string | undefined;
    contactPhone?: string | undefined;
    address?: {
        street?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        postalCode?: string | undefined;
    } | undefined;
    maxUsers?: number | undefined;
    billingEmail?: string | undefined;
    accountOwnerId?: string | undefined;
    stripeCustomerId?: string | undefined;
    stripeProductId?: string | undefined;
}>;
/**
 * Update Organization API Request Contract
 * Derived from UpdateOrganizationOperationSchema
 */
export declare const UpdateOrganizationApiRequestSchema: z.ZodEffects<z.ZodObject<Omit<{
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["trial", "active", "suspended", "cancelled"]>>>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    licenseType: z.ZodOptional<z.ZodDefault<z.ZodEnum<["individual", "team", "enterprise"]>>>;
    website: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    logoUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    sizeCategory: z.ZodOptional<z.ZodOptional<z.ZodEnum<["startup", "small", "medium", "large", "enterprise"]>>>;
    contactEmail: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    contactPhone: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    address: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        street: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        state: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
        postalCode: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        street?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        postalCode?: string | undefined;
    }, {
        street?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        postalCode?: string | undefined;
    }>>>;
    maxUsers: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    billingEmail: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    accountOwnerId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    stripeCustomerId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    stripeProductId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    name: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    organizationType: z.ZodOptional<z.ZodEnum<["church", "denomination", "seminary", "ministry_network", "nonprofit", "business", "other"]>>;
}, "slug">, "strip", z.ZodTypeAny, {
    status?: "active" | "suspended" | "trial" | "cancelled" | undefined;
    name?: string | undefined;
    description?: string | undefined;
    licenseType?: "individual" | "enterprise" | "team" | undefined;
    website?: string | undefined;
    logoUrl?: string | undefined;
    organizationType?: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network" | undefined;
    sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
    contactEmail?: string | undefined;
    contactPhone?: string | undefined;
    address?: {
        street?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        postalCode?: string | undefined;
    } | undefined;
    maxUsers?: number | undefined;
    billingEmail?: string | undefined;
    accountOwnerId?: string | undefined;
    stripeCustomerId?: string | undefined;
    stripeProductId?: string | undefined;
}, {
    status?: "active" | "suspended" | "trial" | "cancelled" | undefined;
    name?: string | undefined;
    description?: string | undefined;
    licenseType?: "individual" | "enterprise" | "team" | undefined;
    website?: string | undefined;
    logoUrl?: string | undefined;
    organizationType?: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network" | undefined;
    sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
    contactEmail?: string | undefined;
    contactPhone?: string | undefined;
    address?: {
        street?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        postalCode?: string | undefined;
    } | undefined;
    maxUsers?: number | undefined;
    billingEmail?: string | undefined;
    accountOwnerId?: string | undefined;
    stripeCustomerId?: string | undefined;
    stripeProductId?: string | undefined;
}>, {
    status?: "active" | "suspended" | "trial" | "cancelled" | undefined;
    name?: string | undefined;
    description?: string | undefined;
    licenseType?: "individual" | "enterprise" | "team" | undefined;
    website?: string | undefined;
    logoUrl?: string | undefined;
    organizationType?: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network" | undefined;
    sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
    contactEmail?: string | undefined;
    contactPhone?: string | undefined;
    address?: {
        street?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        postalCode?: string | undefined;
    } | undefined;
    maxUsers?: number | undefined;
    billingEmail?: string | undefined;
    accountOwnerId?: string | undefined;
    stripeCustomerId?: string | undefined;
    stripeProductId?: string | undefined;
}, {
    status?: "active" | "suspended" | "trial" | "cancelled" | undefined;
    name?: string | undefined;
    description?: string | undefined;
    licenseType?: "individual" | "enterprise" | "team" | undefined;
    website?: string | undefined;
    logoUrl?: string | undefined;
    organizationType?: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network" | undefined;
    sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
    contactEmail?: string | undefined;
    contactPhone?: string | undefined;
    address?: {
        street?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        postalCode?: string | undefined;
    } | undefined;
    maxUsers?: number | undefined;
    billingEmail?: string | undefined;
    accountOwnerId?: string | undefined;
    stripeCustomerId?: string | undefined;
    stripeProductId?: string | undefined;
}>;
/**
 * Create Organization Membership API Request Contract
 * Derived from CreateOrganizationMembershipOperationSchema
 */
export declare const CreateOrganizationMembershipApiRequestSchema: z.ZodObject<{
    status: z.ZodDefault<z.ZodEnum<["pending", "active", "inactive", "cancelled"]>>;
    permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    invitedAt: z.ZodOptional<z.ZodString>;
    invitedBy: z.ZodOptional<z.ZodString>;
    userId: z.ZodString;
    organizationId: z.ZodString;
} & {
    user_id: z.ZodString;
    organization_id: z.ZodString;
    role: z.ZodDefault<z.ZodEnum<["owner", "admin", "member", "viewer"]>>;
}, "strip", z.ZodTypeAny, {
    status: "active" | "inactive" | "pending" | "cancelled";
    organizationId: string;
    role: "owner" | "admin" | "member" | "viewer";
    organization_id: string;
    userId: string;
    permissions: string[];
    user_id: string;
    invitedAt?: string | undefined;
    invitedBy?: string | undefined;
}, {
    organizationId: string;
    organization_id: string;
    userId: string;
    user_id: string;
    status?: "active" | "inactive" | "pending" | "cancelled" | undefined;
    role?: "owner" | "admin" | "member" | "viewer" | undefined;
    permissions?: string[] | undefined;
    invitedAt?: string | undefined;
    invitedBy?: string | undefined;
}>;
/**
 * Update Organization Membership API Request Contract
 * Derived from UpdateOrganizationMembershipOperationSchema
 */
export declare const UpdateOrganizationMembershipApiRequestSchema: z.ZodEffects<z.ZodObject<Omit<{
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["pending", "active", "inactive", "cancelled"]>>>;
    permissions: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    invitedAt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    invitedBy: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    userId: z.ZodOptional<z.ZodString>;
    organizationId: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodEnum<["owner", "admin", "member", "viewer"]>>;
}, "organizationId" | "userId">, "strip", z.ZodTypeAny, {
    status?: "active" | "inactive" | "pending" | "cancelled" | undefined;
    role?: "owner" | "admin" | "member" | "viewer" | undefined;
    permissions?: string[] | undefined;
    invitedAt?: string | undefined;
    invitedBy?: string | undefined;
}, {
    status?: "active" | "inactive" | "pending" | "cancelled" | undefined;
    role?: "owner" | "admin" | "member" | "viewer" | undefined;
    permissions?: string[] | undefined;
    invitedAt?: string | undefined;
    invitedBy?: string | undefined;
}>, {
    status?: "active" | "inactive" | "pending" | "cancelled" | undefined;
    role?: "owner" | "admin" | "member" | "viewer" | undefined;
    permissions?: string[] | undefined;
    invitedAt?: string | undefined;
    invitedBy?: string | undefined;
}, {
    status?: "active" | "inactive" | "pending" | "cancelled" | undefined;
    role?: "owner" | "admin" | "member" | "viewer" | undefined;
    permissions?: string[] | undefined;
    invitedAt?: string | undefined;
    invitedBy?: string | undefined;
}>;
/**
 * Invite User to Organization API Request Contract
 * Derived from InviteUserToOrganizationOperationSchema
 */
export declare const InviteUserToOrganizationApiRequestSchema: z.ZodObject<{
    email: z.ZodString;
} & {
    message: z.ZodOptional<z.ZodString>;
    expires_at: z.ZodOptional<z.ZodString>;
    role: z.ZodDefault<z.ZodEnum<["owner", "admin", "member", "viewer"]>>;
}, "strip", z.ZodTypeAny, {
    email: string;
    role: "owner" | "admin" | "member" | "viewer";
    message?: string | undefined;
    expires_at?: string | undefined;
}, {
    email: string;
    message?: string | undefined;
    role?: "owner" | "admin" | "member" | "viewer" | undefined;
    expires_at?: string | undefined;
}>;
/**
 * Accept Organization Invitation API Request Contract
 * Derived from AcceptOrganizationInvitationOperationSchema
 */
export declare const AcceptOrganizationInvitationApiRequestSchema: z.ZodObject<{
    invitation_id: z.ZodString;
    user_id: z.ZodString;
    accepted_at: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    user_id: string;
    invitation_id: string;
    accepted_at?: string | undefined;
}, {
    user_id: string;
    invitation_id: string;
    accepted_at?: string | undefined;
}>;
/**
 * Reject Organization Invitation API Request Contract
 * Derived from RejectOrganizationInvitationOperationSchema
 */
export declare const RejectOrganizationInvitationApiRequestSchema: z.ZodObject<{
    invitation_id: z.ZodString;
    user_id: z.ZodString;
    reason: z.ZodOptional<z.ZodString>;
    rejected_at: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    user_id: string;
    invitation_id: string;
    reason?: string | undefined;
    rejected_at?: string | undefined;
}, {
    user_id: string;
    invitation_id: string;
    reason?: string | undefined;
    rejected_at?: string | undefined;
}>;
/**
 * Remove User from Organization API Request Contract
 * Derived from RemoveUserFromOrganizationOperationSchema
 */
export declare const RemoveUserFromOrganizationApiRequestSchema: z.ZodObject<{
    organization_id: z.ZodString;
    user_id: z.ZodString;
    reason: z.ZodOptional<z.ZodString>;
    transfer_ownership: z.ZodOptional<z.ZodObject<{
        new_owner_id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        new_owner_id: string;
    }, {
        new_owner_id: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    organization_id: string;
    user_id: string;
    transfer_ownership?: {
        new_owner_id: string;
    } | undefined;
    reason?: string | undefined;
}, {
    organization_id: string;
    user_id: string;
    transfer_ownership?: {
        new_owner_id: string;
    } | undefined;
    reason?: string | undefined;
}>;
/**
 * Update Organization Settings API Request Contract
 * Derived from UpdateOrganizationSettingsOperationSchema
 */
export declare const UpdateOrganizationSettingsApiRequestSchema: z.ZodObject<{
    organization_id: z.ZodString;
    settings: z.ZodObject<{
        allow_public_membership: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
        require_approval_for_membership: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
        allow_member_invites: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
        default_member_role: z.ZodOptional<z.ZodOptional<z.ZodEnum<["owner", "admin", "member", "viewer"]>>>;
        max_members: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        allow_public_membership?: boolean | undefined;
        require_approval_for_membership?: boolean | undefined;
        allow_member_invites?: boolean | undefined;
        default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
        max_members?: number | undefined;
    }, {
        allow_public_membership?: boolean | undefined;
        require_approval_for_membership?: boolean | undefined;
        allow_member_invites?: boolean | undefined;
        default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
        max_members?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    organization_id: string;
    settings: {
        allow_public_membership?: boolean | undefined;
        require_approval_for_membership?: boolean | undefined;
        allow_member_invites?: boolean | undefined;
        default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
        max_members?: number | undefined;
    };
}, {
    organization_id: string;
    settings: {
        allow_public_membership?: boolean | undefined;
        require_approval_for_membership?: boolean | undefined;
        allow_member_invites?: boolean | undefined;
        default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
        max_members?: number | undefined;
    };
}>;
/**
 * Update Organization Branding API Request Contract
 * Derived from UpdateOrganizationBrandingOperationSchema
 */
export declare const UpdateOrganizationBrandingApiRequestSchema: z.ZodObject<{
    organization_id: z.ZodString;
    branding: z.ZodObject<{
        logo_url: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        brand_colors: z.ZodOptional<z.ZodOptional<z.ZodObject<{
            primary: z.ZodString;
            secondary: z.ZodString;
            accent: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            primary: string;
            secondary: string;
            accent: string;
        }, {
            primary: string;
            secondary: string;
            accent: string;
        }>>>;
        custom_domain: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        logo_url?: string | undefined;
        brand_colors?: {
            primary: string;
            secondary: string;
            accent: string;
        } | undefined;
        custom_domain?: string | undefined;
    }, {
        logo_url?: string | undefined;
        brand_colors?: {
            primary: string;
            secondary: string;
            accent: string;
        } | undefined;
        custom_domain?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    organization_id: string;
    branding: {
        logo_url?: string | undefined;
        brand_colors?: {
            primary: string;
            secondary: string;
            accent: string;
        } | undefined;
        custom_domain?: string | undefined;
    };
}, {
    organization_id: string;
    branding: {
        logo_url?: string | undefined;
        brand_colors?: {
            primary: string;
            secondary: string;
            accent: string;
        } | undefined;
        custom_domain?: string | undefined;
    };
}>;
/**
 * Search Organizations API Request Contract
 * Derived from SearchOrganizationsOperationSchema
 */
export declare const SearchOrganizationsApiRequestSchema: z.ZodObject<{
    query: z.ZodString;
    organization_type: z.ZodOptional<z.ZodArray<z.ZodEnum<["church", "denomination", "seminary", "nonprofit", "ministry", "business", "other"]>, "many">>;
    organization_size: z.ZodOptional<z.ZodArray<z.ZodEnum<["startup", "small", "medium", "large", "enterprise"]>, "many">>;
    status: z.ZodOptional<z.ZodArray<z.ZodEnum<["active", "inactive", "suspended", "pending_approval"]>, "many">>;
    country_code: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sort_by: z.ZodDefault<z.ZodEnum<["relevance", "created_at", "name", "employee_count"]>>;
    sort_order: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    query: string;
    sort_by: "name" | "relevance" | "created_at" | "employee_count";
    sort_order: "asc" | "desc";
    status?: ("active" | "inactive" | "suspended" | "pending_approval")[] | undefined;
    organization_type?: ("other" | "denomination" | "church" | "seminary" | "nonprofit" | "ministry" | "business")[] | undefined;
    country_code?: string[] | undefined;
    organization_size?: ("startup" | "small" | "medium" | "large" | "enterprise")[] | undefined;
}, {
    query: string;
    status?: ("active" | "inactive" | "suspended" | "pending_approval")[] | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    organization_type?: ("other" | "denomination" | "church" | "seminary" | "nonprofit" | "ministry" | "business")[] | undefined;
    country_code?: string[] | undefined;
    sort_by?: "name" | "relevance" | "created_at" | "employee_count" | undefined;
    sort_order?: "asc" | "desc" | undefined;
    organization_size?: ("startup" | "small" | "medium" | "large" | "enterprise")[] | undefined;
}>;
/**
 * Organization API Response Contract
 * Derived from OrganizationEntitySchema
 */
export declare const OrganizationApiResponseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    website: z.ZodOptional<z.ZodString>;
    logoUrl: z.ZodOptional<z.ZodString>;
    organizationType: z.ZodEnum<["church", "denomination", "seminary", "ministry_network", "nonprofit", "business", "other"]>;
    sizeCategory: z.ZodOptional<z.ZodEnum<["startup", "small", "medium", "large", "enterprise"]>>;
    contactEmail: z.ZodOptional<z.ZodString>;
    contactPhone: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodObject<{
        street: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        state: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
        postalCode: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        street?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        postalCode?: string | undefined;
    }, {
        street?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        postalCode?: string | undefined;
    }>>;
    licenseType: z.ZodDefault<z.ZodEnum<["individual", "team", "enterprise"]>>;
    maxUsers: z.ZodDefault<z.ZodNumber>;
    billingEmail: z.ZodOptional<z.ZodString>;
    accountOwnerId: z.ZodOptional<z.ZodString>;
    stripeCustomerId: z.ZodOptional<z.ZodString>;
    stripeProductId: z.ZodOptional<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<["trial", "active", "suspended", "cancelled"]>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: "active" | "suspended" | "trial" | "cancelled";
    createdAt: string;
    updatedAt: string;
    name: string;
    slug: string;
    licenseType: "individual" | "enterprise" | "team";
    organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
    maxUsers: number;
    description?: string | undefined;
    website?: string | undefined;
    logoUrl?: string | undefined;
    sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
    contactEmail?: string | undefined;
    contactPhone?: string | undefined;
    address?: {
        street?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        postalCode?: string | undefined;
    } | undefined;
    billingEmail?: string | undefined;
    accountOwnerId?: string | undefined;
    stripeCustomerId?: string | undefined;
    stripeProductId?: string | undefined;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    slug: string;
    organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
    status?: "active" | "suspended" | "trial" | "cancelled" | undefined;
    description?: string | undefined;
    licenseType?: "individual" | "enterprise" | "team" | undefined;
    website?: string | undefined;
    logoUrl?: string | undefined;
    sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
    contactEmail?: string | undefined;
    contactPhone?: string | undefined;
    address?: {
        street?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        postalCode?: string | undefined;
    } | undefined;
    maxUsers?: number | undefined;
    billingEmail?: string | undefined;
    accountOwnerId?: string | undefined;
    stripeCustomerId?: string | undefined;
    stripeProductId?: string | undefined;
}>;
/**
 * Organization with Members API Response Contract
 * Extends organization with member information
 */
export declare const OrganizationWithMembersApiResponseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    website: z.ZodOptional<z.ZodString>;
    logoUrl: z.ZodOptional<z.ZodString>;
    organizationType: z.ZodEnum<["church", "denomination", "seminary", "ministry_network", "nonprofit", "business", "other"]>;
    sizeCategory: z.ZodOptional<z.ZodEnum<["startup", "small", "medium", "large", "enterprise"]>>;
    contactEmail: z.ZodOptional<z.ZodString>;
    contactPhone: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodObject<{
        street: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        state: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
        postalCode: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        street?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        postalCode?: string | undefined;
    }, {
        street?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        postalCode?: string | undefined;
    }>>;
    licenseType: z.ZodDefault<z.ZodEnum<["individual", "team", "enterprise"]>>;
    maxUsers: z.ZodDefault<z.ZodNumber>;
    billingEmail: z.ZodOptional<z.ZodString>;
    accountOwnerId: z.ZodOptional<z.ZodString>;
    stripeCustomerId: z.ZodOptional<z.ZodString>;
    stripeProductId: z.ZodOptional<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<["trial", "active", "suspended", "cancelled"]>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
} & {
    members: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        user_id: z.ZodString;
        user: z.ZodObject<{
            id: z.ZodString;
            first_name: z.ZodString;
            last_name: z.ZodString;
            display_name: z.ZodOptional<z.ZodString>;
            avatar_url: z.ZodOptional<z.ZodString>;
            email: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
        }, {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
        }>;
        role: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
        status: z.ZodEnum<["active", "inactive", "pending", "suspended"]>;
        joined_at: z.ZodOptional<z.ZodString>;
        permissions: z.ZodOptional<z.ZodObject<{
            can_manage_members: z.ZodBoolean;
            can_manage_content: z.ZodBoolean;
            can_manage_assessments: z.ZodBoolean;
            can_view_analytics: z.ZodBoolean;
            can_manage_billing: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            can_manage_members: boolean;
            can_manage_content: boolean;
            can_manage_assessments: boolean;
            can_view_analytics: boolean;
            can_manage_billing: boolean;
        }, {
            can_manage_members: boolean;
            can_manage_content: boolean;
            can_manage_assessments: boolean;
            can_view_analytics: boolean;
            can_manage_billing: boolean;
        }>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        status: "active" | "inactive" | "suspended" | "pending";
        role: "owner" | "admin" | "member" | "viewer";
        user: {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
        };
        user_id: string;
        joined_at?: string | undefined;
        permissions?: {
            can_manage_members: boolean;
            can_manage_content: boolean;
            can_manage_assessments: boolean;
            can_view_analytics: boolean;
            can_manage_billing: boolean;
        } | undefined;
    }, {
        id: string;
        status: "active" | "inactive" | "suspended" | "pending";
        role: "owner" | "admin" | "member" | "viewer";
        user: {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
        };
        user_id: string;
        joined_at?: string | undefined;
        permissions?: {
            can_manage_members: boolean;
            can_manage_content: boolean;
            can_manage_assessments: boolean;
            can_view_analytics: boolean;
            can_manage_billing: boolean;
        } | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: "active" | "suspended" | "trial" | "cancelled";
    createdAt: string;
    updatedAt: string;
    name: string;
    slug: string;
    licenseType: "individual" | "enterprise" | "team";
    organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
    maxUsers: number;
    members: {
        id: string;
        status: "active" | "inactive" | "suspended" | "pending";
        role: "owner" | "admin" | "member" | "viewer";
        user: {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
        };
        user_id: string;
        joined_at?: string | undefined;
        permissions?: {
            can_manage_members: boolean;
            can_manage_content: boolean;
            can_manage_assessments: boolean;
            can_view_analytics: boolean;
            can_manage_billing: boolean;
        } | undefined;
    }[];
    description?: string | undefined;
    website?: string | undefined;
    logoUrl?: string | undefined;
    sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
    contactEmail?: string | undefined;
    contactPhone?: string | undefined;
    address?: {
        street?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        postalCode?: string | undefined;
    } | undefined;
    billingEmail?: string | undefined;
    accountOwnerId?: string | undefined;
    stripeCustomerId?: string | undefined;
    stripeProductId?: string | undefined;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    slug: string;
    organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
    status?: "active" | "suspended" | "trial" | "cancelled" | undefined;
    description?: string | undefined;
    licenseType?: "individual" | "enterprise" | "team" | undefined;
    website?: string | undefined;
    logoUrl?: string | undefined;
    sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
    contactEmail?: string | undefined;
    contactPhone?: string | undefined;
    address?: {
        street?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        postalCode?: string | undefined;
    } | undefined;
    maxUsers?: number | undefined;
    billingEmail?: string | undefined;
    accountOwnerId?: string | undefined;
    stripeCustomerId?: string | undefined;
    stripeProductId?: string | undefined;
    members?: {
        id: string;
        status: "active" | "inactive" | "suspended" | "pending";
        role: "owner" | "admin" | "member" | "viewer";
        user: {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
        };
        user_id: string;
        joined_at?: string | undefined;
        permissions?: {
            can_manage_members: boolean;
            can_manage_content: boolean;
            can_manage_assessments: boolean;
            can_view_analytics: boolean;
            can_manage_billing: boolean;
        } | undefined;
    }[] | undefined;
}>;
/**
 * Organization Membership API Response Contract
 * Derived from OrganizationMembershipEntitySchema
 */
export declare const OrganizationMembershipApiResponseSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    organizationId: z.ZodString;
    role: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
    permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    status: z.ZodDefault<z.ZodEnum<["pending", "active", "inactive", "cancelled"]>>;
    joinedAt: z.ZodOptional<z.ZodString>;
    invitedAt: z.ZodOptional<z.ZodString>;
    invitedBy: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: "active" | "inactive" | "pending" | "cancelled";
    createdAt: string;
    updatedAt: string;
    organizationId: string;
    role: "owner" | "admin" | "member" | "viewer";
    userId: string;
    permissions: string[];
    joinedAt?: string | undefined;
    invitedAt?: string | undefined;
    invitedBy?: string | undefined;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
    organizationId: string;
    role: "owner" | "admin" | "member" | "viewer";
    userId: string;
    status?: "active" | "inactive" | "pending" | "cancelled" | undefined;
    permissions?: string[] | undefined;
    joinedAt?: string | undefined;
    invitedAt?: string | undefined;
    invitedBy?: string | undefined;
}>;
/**
 * Organization Membership with Details API Response Contract
 * Extends membership with organization and user details
 */
export declare const OrganizationMembershipWithDetailsApiResponseSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    organizationId: z.ZodString;
    role: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
    permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    status: z.ZodDefault<z.ZodEnum<["pending", "active", "inactive", "cancelled"]>>;
    joinedAt: z.ZodOptional<z.ZodString>;
    invitedAt: z.ZodOptional<z.ZodString>;
    invitedBy: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
} & {
    organization: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        website: z.ZodOptional<z.ZodString>;
        logoUrl: z.ZodOptional<z.ZodString>;
        organizationType: z.ZodEnum<["church", "denomination", "seminary", "ministry_network", "nonprofit", "business", "other"]>;
        sizeCategory: z.ZodOptional<z.ZodEnum<["startup", "small", "medium", "large", "enterprise"]>>;
        contactEmail: z.ZodOptional<z.ZodString>;
        contactPhone: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodObject<{
            street: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            street?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        }, {
            street?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        }>>;
        licenseType: z.ZodDefault<z.ZodEnum<["individual", "team", "enterprise"]>>;
        maxUsers: z.ZodDefault<z.ZodNumber>;
        billingEmail: z.ZodOptional<z.ZodString>;
        accountOwnerId: z.ZodOptional<z.ZodString>;
        stripeCustomerId: z.ZodOptional<z.ZodString>;
        stripeProductId: z.ZodOptional<z.ZodString>;
        status: z.ZodDefault<z.ZodEnum<["trial", "active", "suspended", "cancelled"]>>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        status: "active" | "suspended" | "trial" | "cancelled";
        createdAt: string;
        updatedAt: string;
        name: string;
        slug: string;
        licenseType: "individual" | "enterprise" | "team";
        organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
        maxUsers: number;
        description?: string | undefined;
        website?: string | undefined;
        logoUrl?: string | undefined;
        sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
        contactEmail?: string | undefined;
        contactPhone?: string | undefined;
        address?: {
            street?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        billingEmail?: string | undefined;
        accountOwnerId?: string | undefined;
        stripeCustomerId?: string | undefined;
        stripeProductId?: string | undefined;
    }, {
        id: string;
        createdAt: string;
        updatedAt: string;
        name: string;
        slug: string;
        organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
        status?: "active" | "suspended" | "trial" | "cancelled" | undefined;
        description?: string | undefined;
        licenseType?: "individual" | "enterprise" | "team" | undefined;
        website?: string | undefined;
        logoUrl?: string | undefined;
        sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
        contactEmail?: string | undefined;
        contactPhone?: string | undefined;
        address?: {
            street?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        maxUsers?: number | undefined;
        billingEmail?: string | undefined;
        accountOwnerId?: string | undefined;
        stripeCustomerId?: string | undefined;
        stripeProductId?: string | undefined;
    }>;
    user: z.ZodObject<{
        id: z.ZodString;
        first_name: z.ZodString;
        last_name: z.ZodString;
        display_name: z.ZodOptional<z.ZodString>;
        avatar_url: z.ZodOptional<z.ZodString>;
        email: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        display_name?: string | undefined;
        avatar_url?: string | undefined;
    }, {
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        display_name?: string | undefined;
        avatar_url?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: "active" | "inactive" | "pending" | "cancelled";
    createdAt: string;
    updatedAt: string;
    organization: {
        id: string;
        status: "active" | "suspended" | "trial" | "cancelled";
        createdAt: string;
        updatedAt: string;
        name: string;
        slug: string;
        licenseType: "individual" | "enterprise" | "team";
        organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
        maxUsers: number;
        description?: string | undefined;
        website?: string | undefined;
        logoUrl?: string | undefined;
        sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
        contactEmail?: string | undefined;
        contactPhone?: string | undefined;
        address?: {
            street?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        billingEmail?: string | undefined;
        accountOwnerId?: string | undefined;
        stripeCustomerId?: string | undefined;
        stripeProductId?: string | undefined;
    };
    organizationId: string;
    role: "owner" | "admin" | "member" | "viewer";
    user: {
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        display_name?: string | undefined;
        avatar_url?: string | undefined;
    };
    userId: string;
    permissions: string[];
    joinedAt?: string | undefined;
    invitedAt?: string | undefined;
    invitedBy?: string | undefined;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
    organization: {
        id: string;
        createdAt: string;
        updatedAt: string;
        name: string;
        slug: string;
        organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
        status?: "active" | "suspended" | "trial" | "cancelled" | undefined;
        description?: string | undefined;
        licenseType?: "individual" | "enterprise" | "team" | undefined;
        website?: string | undefined;
        logoUrl?: string | undefined;
        sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
        contactEmail?: string | undefined;
        contactPhone?: string | undefined;
        address?: {
            street?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        maxUsers?: number | undefined;
        billingEmail?: string | undefined;
        accountOwnerId?: string | undefined;
        stripeCustomerId?: string | undefined;
        stripeProductId?: string | undefined;
    };
    organizationId: string;
    role: "owner" | "admin" | "member" | "viewer";
    user: {
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        display_name?: string | undefined;
        avatar_url?: string | undefined;
    };
    userId: string;
    status?: "active" | "inactive" | "pending" | "cancelled" | undefined;
    permissions?: string[] | undefined;
    joinedAt?: string | undefined;
    invitedAt?: string | undefined;
    invitedBy?: string | undefined;
}>;
/**
 * Organization List API Response Contract
 * Paginated list of organizations
 */
export declare const OrganizationListApiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        website: z.ZodOptional<z.ZodString>;
        logoUrl: z.ZodOptional<z.ZodString>;
        organizationType: z.ZodEnum<["church", "denomination", "seminary", "ministry_network", "nonprofit", "business", "other"]>;
        sizeCategory: z.ZodOptional<z.ZodEnum<["startup", "small", "medium", "large", "enterprise"]>>;
        contactEmail: z.ZodOptional<z.ZodString>;
        contactPhone: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodObject<{
            street: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            street?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        }, {
            street?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        }>>;
        licenseType: z.ZodDefault<z.ZodEnum<["individual", "team", "enterprise"]>>;
        maxUsers: z.ZodDefault<z.ZodNumber>;
        billingEmail: z.ZodOptional<z.ZodString>;
        accountOwnerId: z.ZodOptional<z.ZodString>;
        stripeCustomerId: z.ZodOptional<z.ZodString>;
        stripeProductId: z.ZodOptional<z.ZodString>;
        status: z.ZodDefault<z.ZodEnum<["trial", "active", "suspended", "cancelled"]>>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        status: "active" | "suspended" | "trial" | "cancelled";
        createdAt: string;
        updatedAt: string;
        name: string;
        slug: string;
        licenseType: "individual" | "enterprise" | "team";
        organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
        maxUsers: number;
        description?: string | undefined;
        website?: string | undefined;
        logoUrl?: string | undefined;
        sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
        contactEmail?: string | undefined;
        contactPhone?: string | undefined;
        address?: {
            street?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        billingEmail?: string | undefined;
        accountOwnerId?: string | undefined;
        stripeCustomerId?: string | undefined;
        stripeProductId?: string | undefined;
    }, {
        id: string;
        createdAt: string;
        updatedAt: string;
        name: string;
        slug: string;
        organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
        status?: "active" | "suspended" | "trial" | "cancelled" | undefined;
        description?: string | undefined;
        licenseType?: "individual" | "enterprise" | "team" | undefined;
        website?: string | undefined;
        logoUrl?: string | undefined;
        sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
        contactEmail?: string | undefined;
        contactPhone?: string | undefined;
        address?: {
            street?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        maxUsers?: number | undefined;
        billingEmail?: string | undefined;
        accountOwnerId?: string | undefined;
        stripeCustomerId?: string | undefined;
        stripeProductId?: string | undefined;
    }>, "many">;
    meta: z.ZodObject<{
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            total_pages: z.ZodNumber;
            has_next: z.ZodBoolean;
            has_prev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        }, {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        }>;
        timestamp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    }, {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    }>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    data: {
        id: string;
        status: "active" | "suspended" | "trial" | "cancelled";
        createdAt: string;
        updatedAt: string;
        name: string;
        slug: string;
        licenseType: "individual" | "enterprise" | "team";
        organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
        maxUsers: number;
        description?: string | undefined;
        website?: string | undefined;
        logoUrl?: string | undefined;
        sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
        contactEmail?: string | undefined;
        contactPhone?: string | undefined;
        address?: {
            street?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        billingEmail?: string | undefined;
        accountOwnerId?: string | undefined;
        stripeCustomerId?: string | undefined;
        stripeProductId?: string | undefined;
    }[];
    meta: {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    };
}, {
    success: boolean;
    data: {
        id: string;
        createdAt: string;
        updatedAt: string;
        name: string;
        slug: string;
        organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
        status?: "active" | "suspended" | "trial" | "cancelled" | undefined;
        description?: string | undefined;
        licenseType?: "individual" | "enterprise" | "team" | undefined;
        website?: string | undefined;
        logoUrl?: string | undefined;
        sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
        contactEmail?: string | undefined;
        contactPhone?: string | undefined;
        address?: {
            street?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        maxUsers?: number | undefined;
        billingEmail?: string | undefined;
        accountOwnerId?: string | undefined;
        stripeCustomerId?: string | undefined;
        stripeProductId?: string | undefined;
    }[];
    meta: {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    };
}>;
/**
 * Organization Search API Response Contract
 * Search results for organizations
 */
export declare const OrganizationSearchApiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodObject<{
        organizations: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            slug: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            website: z.ZodOptional<z.ZodString>;
            logoUrl: z.ZodOptional<z.ZodString>;
            organizationType: z.ZodEnum<["church", "denomination", "seminary", "ministry_network", "nonprofit", "business", "other"]>;
            sizeCategory: z.ZodOptional<z.ZodEnum<["startup", "small", "medium", "large", "enterprise"]>>;
            contactEmail: z.ZodOptional<z.ZodString>;
            contactPhone: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                street: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }, {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }>>;
            licenseType: z.ZodDefault<z.ZodEnum<["individual", "team", "enterprise"]>>;
            maxUsers: z.ZodDefault<z.ZodNumber>;
            billingEmail: z.ZodOptional<z.ZodString>;
            accountOwnerId: z.ZodOptional<z.ZodString>;
            stripeCustomerId: z.ZodOptional<z.ZodString>;
            stripeProductId: z.ZodOptional<z.ZodString>;
            status: z.ZodDefault<z.ZodEnum<["trial", "active", "suspended", "cancelled"]>>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            status: "active" | "suspended" | "trial" | "cancelled";
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            licenseType: "individual" | "enterprise" | "team";
            organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
            maxUsers: number;
            description?: string | undefined;
            website?: string | undefined;
            logoUrl?: string | undefined;
            sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            contactEmail?: string | undefined;
            contactPhone?: string | undefined;
            address?: {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
            billingEmail?: string | undefined;
            accountOwnerId?: string | undefined;
            stripeCustomerId?: string | undefined;
            stripeProductId?: string | undefined;
        }, {
            id: string;
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
            status?: "active" | "suspended" | "trial" | "cancelled" | undefined;
            description?: string | undefined;
            licenseType?: "individual" | "enterprise" | "team" | undefined;
            website?: string | undefined;
            logoUrl?: string | undefined;
            sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            contactEmail?: string | undefined;
            contactPhone?: string | undefined;
            address?: {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
            maxUsers?: number | undefined;
            billingEmail?: string | undefined;
            accountOwnerId?: string | undefined;
            stripeCustomerId?: string | undefined;
            stripeProductId?: string | undefined;
        }>, "many">;
        total: z.ZodNumber;
        query: z.ZodString;
        took: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        total: number;
        query: string;
        organizations: {
            id: string;
            status: "active" | "suspended" | "trial" | "cancelled";
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            licenseType: "individual" | "enterprise" | "team";
            organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
            maxUsers: number;
            description?: string | undefined;
            website?: string | undefined;
            logoUrl?: string | undefined;
            sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            contactEmail?: string | undefined;
            contactPhone?: string | undefined;
            address?: {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
            billingEmail?: string | undefined;
            accountOwnerId?: string | undefined;
            stripeCustomerId?: string | undefined;
            stripeProductId?: string | undefined;
        }[];
        took: number;
    }, {
        total: number;
        query: string;
        organizations: {
            id: string;
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
            status?: "active" | "suspended" | "trial" | "cancelled" | undefined;
            description?: string | undefined;
            licenseType?: "individual" | "enterprise" | "team" | undefined;
            website?: string | undefined;
            logoUrl?: string | undefined;
            sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            contactEmail?: string | undefined;
            contactPhone?: string | undefined;
            address?: {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
            maxUsers?: number | undefined;
            billingEmail?: string | undefined;
            accountOwnerId?: string | undefined;
            stripeCustomerId?: string | undefined;
            stripeProductId?: string | undefined;
        }[];
        took: number;
    }>;
    meta: z.ZodObject<{
        timestamp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        timestamp: string;
    }, {
        timestamp: string;
    }>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    data: {
        total: number;
        query: string;
        organizations: {
            id: string;
            status: "active" | "suspended" | "trial" | "cancelled";
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            licenseType: "individual" | "enterprise" | "team";
            organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
            maxUsers: number;
            description?: string | undefined;
            website?: string | undefined;
            logoUrl?: string | undefined;
            sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            contactEmail?: string | undefined;
            contactPhone?: string | undefined;
            address?: {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
            billingEmail?: string | undefined;
            accountOwnerId?: string | undefined;
            stripeCustomerId?: string | undefined;
            stripeProductId?: string | undefined;
        }[];
        took: number;
    };
    meta: {
        timestamp: string;
    };
}, {
    success: boolean;
    data: {
        total: number;
        query: string;
        organizations: {
            id: string;
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
            status?: "active" | "suspended" | "trial" | "cancelled" | undefined;
            description?: string | undefined;
            licenseType?: "individual" | "enterprise" | "team" | undefined;
            website?: string | undefined;
            logoUrl?: string | undefined;
            sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            contactEmail?: string | undefined;
            contactPhone?: string | undefined;
            address?: {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
            maxUsers?: number | undefined;
            billingEmail?: string | undefined;
            accountOwnerId?: string | undefined;
            stripeCustomerId?: string | undefined;
            stripeProductId?: string | undefined;
        }[];
        took: number;
    };
    meta: {
        timestamp: string;
    };
}>;
/**
 * Organization Statistics API Response Contract
 * Organization metrics and statistics
 */
export declare const OrganizationStatisticsApiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodObject<{
        organization_id: z.ZodString;
        member_count: z.ZodNumber;
        active_members: z.ZodNumber;
        pending_invitations: z.ZodNumber;
        content_count: z.ZodNumber;
        assessment_completions: z.ZodNumber;
        engagement_metrics: z.ZodObject<{
            daily_active_users: z.ZodNumber;
            weekly_active_users: z.ZodNumber;
            monthly_active_users: z.ZodNumber;
            average_session_duration: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            daily_active_users: number;
            weekly_active_users: number;
            monthly_active_users: number;
            average_session_duration: number;
        }, {
            daily_active_users: number;
            weekly_active_users: number;
            monthly_active_users: number;
            average_session_duration: number;
        }>;
        growth_metrics: z.ZodObject<{
            new_members_this_month: z.ZodNumber;
            new_members_this_week: z.ZodNumber;
            member_retention_rate: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            new_members_this_month: number;
            new_members_this_week: number;
            member_retention_rate: number;
        }, {
            new_members_this_month: number;
            new_members_this_week: number;
            member_retention_rate: number;
        }>;
        trends: z.ZodOptional<z.ZodArray<z.ZodObject<{
            date: z.ZodString;
            active_members: z.ZodNumber;
            content_created: z.ZodNumber;
            assessments_completed: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            date: string;
            active_members: number;
            content_created: number;
            assessments_completed: number;
        }, {
            date: string;
            active_members: number;
            content_created: number;
            assessments_completed: number;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        organization_id: string;
        member_count: number;
        active_members: number;
        pending_invitations: number;
        content_count: number;
        assessment_completions: number;
        engagement_metrics: {
            daily_active_users: number;
            weekly_active_users: number;
            monthly_active_users: number;
            average_session_duration: number;
        };
        growth_metrics: {
            new_members_this_month: number;
            new_members_this_week: number;
            member_retention_rate: number;
        };
        trends?: {
            date: string;
            active_members: number;
            content_created: number;
            assessments_completed: number;
        }[] | undefined;
    }, {
        organization_id: string;
        member_count: number;
        active_members: number;
        pending_invitations: number;
        content_count: number;
        assessment_completions: number;
        engagement_metrics: {
            daily_active_users: number;
            weekly_active_users: number;
            monthly_active_users: number;
            average_session_duration: number;
        };
        growth_metrics: {
            new_members_this_month: number;
            new_members_this_week: number;
            member_retention_rate: number;
        };
        trends?: {
            date: string;
            active_members: number;
            content_created: number;
            assessments_completed: number;
        }[] | undefined;
    }>;
    meta: z.ZodObject<{
        timestamp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        timestamp: string;
    }, {
        timestamp: string;
    }>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    data: {
        organization_id: string;
        member_count: number;
        active_members: number;
        pending_invitations: number;
        content_count: number;
        assessment_completions: number;
        engagement_metrics: {
            daily_active_users: number;
            weekly_active_users: number;
            monthly_active_users: number;
            average_session_duration: number;
        };
        growth_metrics: {
            new_members_this_month: number;
            new_members_this_week: number;
            member_retention_rate: number;
        };
        trends?: {
            date: string;
            active_members: number;
            content_created: number;
            assessments_completed: number;
        }[] | undefined;
    };
    meta: {
        timestamp: string;
    };
}, {
    success: boolean;
    data: {
        organization_id: string;
        member_count: number;
        active_members: number;
        pending_invitations: number;
        content_count: number;
        assessment_completions: number;
        engagement_metrics: {
            daily_active_users: number;
            weekly_active_users: number;
            monthly_active_users: number;
            average_session_duration: number;
        };
        growth_metrics: {
            new_members_this_month: number;
            new_members_this_week: number;
            member_retention_rate: number;
        };
        trends?: {
            date: string;
            active_members: number;
            content_created: number;
            assessments_completed: number;
        }[] | undefined;
    };
    meta: {
        timestamp: string;
    };
}>;
/**
 * Organization Dashboard API Response Contract
 * Organization dashboard data
 */
export declare const OrganizationDashboardApiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodObject<{
        organization: z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            slug: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            website: z.ZodOptional<z.ZodString>;
            logoUrl: z.ZodOptional<z.ZodString>;
            organizationType: z.ZodEnum<["church", "denomination", "seminary", "ministry_network", "nonprofit", "business", "other"]>;
            sizeCategory: z.ZodOptional<z.ZodEnum<["startup", "small", "medium", "large", "enterprise"]>>;
            contactEmail: z.ZodOptional<z.ZodString>;
            contactPhone: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                street: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }, {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }>>;
            licenseType: z.ZodDefault<z.ZodEnum<["individual", "team", "enterprise"]>>;
            maxUsers: z.ZodDefault<z.ZodNumber>;
            billingEmail: z.ZodOptional<z.ZodString>;
            accountOwnerId: z.ZodOptional<z.ZodString>;
            stripeCustomerId: z.ZodOptional<z.ZodString>;
            stripeProductId: z.ZodOptional<z.ZodString>;
            status: z.ZodDefault<z.ZodEnum<["trial", "active", "suspended", "cancelled"]>>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            status: "active" | "suspended" | "trial" | "cancelled";
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            licenseType: "individual" | "enterprise" | "team";
            organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
            maxUsers: number;
            description?: string | undefined;
            website?: string | undefined;
            logoUrl?: string | undefined;
            sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            contactEmail?: string | undefined;
            contactPhone?: string | undefined;
            address?: {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
            billingEmail?: string | undefined;
            accountOwnerId?: string | undefined;
            stripeCustomerId?: string | undefined;
            stripeProductId?: string | undefined;
        }, {
            id: string;
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
            status?: "active" | "suspended" | "trial" | "cancelled" | undefined;
            description?: string | undefined;
            licenseType?: "individual" | "enterprise" | "team" | undefined;
            website?: string | undefined;
            logoUrl?: string | undefined;
            sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            contactEmail?: string | undefined;
            contactPhone?: string | undefined;
            address?: {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
            maxUsers?: number | undefined;
            billingEmail?: string | undefined;
            accountOwnerId?: string | undefined;
            stripeCustomerId?: string | undefined;
            stripeProductId?: string | undefined;
        }>;
        recent_activity: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            type: z.ZodEnum<["member_joined", "member_left", "content_created", "assessment_completed", "invitation_sent"]>;
            user: z.ZodObject<{
                id: z.ZodString;
                first_name: z.ZodString;
                last_name: z.ZodString;
                display_name: z.ZodOptional<z.ZodString>;
                avatar_url: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
            }, {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
            }>;
            description: z.ZodString;
            created_at: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            type: "content_created" | "member_joined" | "member_left" | "assessment_completed" | "invitation_sent";
            created_at: string;
            user: {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
            };
            description: string;
        }, {
            id: string;
            type: "content_created" | "member_joined" | "member_left" | "assessment_completed" | "invitation_sent";
            created_at: string;
            user: {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
            };
            description: string;
        }>, "many">>;
        member_summary: z.ZodObject<{
            total_members: z.ZodNumber;
            active_members: z.ZodNumber;
            pending_invitations: z.ZodNumber;
            new_members_this_week: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            active_members: number;
            pending_invitations: number;
            new_members_this_week: number;
            total_members: number;
        }, {
            active_members: number;
            pending_invitations: number;
            new_members_this_week: number;
            total_members: number;
        }>;
        content_summary: z.ZodOptional<z.ZodObject<{
            total_content: z.ZodNumber;
            published_content: z.ZodNumber;
            draft_content: z.ZodNumber;
            total_views: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            total_content: number;
            published_content: number;
            draft_content: number;
            total_views: number;
        }, {
            total_content: number;
            published_content: number;
            draft_content: number;
            total_views: number;
        }>>;
        assessment_summary: z.ZodOptional<z.ZodObject<{
            total_assessments: z.ZodNumber;
            completed_assessments: z.ZodNumber;
            average_completion_rate: z.ZodNumber;
            most_common_gift: z.ZodOptional<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>>;
        }, "strip", z.ZodTypeAny, {
            total_assessments: number;
            completed_assessments: number;
            average_completion_rate: number;
            most_common_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
        }, {
            total_assessments: number;
            completed_assessments: number;
            average_completion_rate: number;
            most_common_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        organization: {
            id: string;
            status: "active" | "suspended" | "trial" | "cancelled";
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            licenseType: "individual" | "enterprise" | "team";
            organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
            maxUsers: number;
            description?: string | undefined;
            website?: string | undefined;
            logoUrl?: string | undefined;
            sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            contactEmail?: string | undefined;
            contactPhone?: string | undefined;
            address?: {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
            billingEmail?: string | undefined;
            accountOwnerId?: string | undefined;
            stripeCustomerId?: string | undefined;
            stripeProductId?: string | undefined;
        };
        recent_activity: {
            id: string;
            type: "content_created" | "member_joined" | "member_left" | "assessment_completed" | "invitation_sent";
            created_at: string;
            user: {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
            };
            description: string;
        }[];
        member_summary: {
            active_members: number;
            pending_invitations: number;
            new_members_this_week: number;
            total_members: number;
        };
        content_summary?: {
            total_content: number;
            published_content: number;
            draft_content: number;
            total_views: number;
        } | undefined;
        assessment_summary?: {
            total_assessments: number;
            completed_assessments: number;
            average_completion_rate: number;
            most_common_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
        } | undefined;
    }, {
        organization: {
            id: string;
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
            status?: "active" | "suspended" | "trial" | "cancelled" | undefined;
            description?: string | undefined;
            licenseType?: "individual" | "enterprise" | "team" | undefined;
            website?: string | undefined;
            logoUrl?: string | undefined;
            sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            contactEmail?: string | undefined;
            contactPhone?: string | undefined;
            address?: {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
            maxUsers?: number | undefined;
            billingEmail?: string | undefined;
            accountOwnerId?: string | undefined;
            stripeCustomerId?: string | undefined;
            stripeProductId?: string | undefined;
        };
        member_summary: {
            active_members: number;
            pending_invitations: number;
            new_members_this_week: number;
            total_members: number;
        };
        recent_activity?: {
            id: string;
            type: "content_created" | "member_joined" | "member_left" | "assessment_completed" | "invitation_sent";
            created_at: string;
            user: {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
            };
            description: string;
        }[] | undefined;
        content_summary?: {
            total_content: number;
            published_content: number;
            draft_content: number;
            total_views: number;
        } | undefined;
        assessment_summary?: {
            total_assessments: number;
            completed_assessments: number;
            average_completion_rate: number;
            most_common_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
        } | undefined;
    }>;
    meta: z.ZodObject<{
        timestamp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        timestamp: string;
    }, {
        timestamp: string;
    }>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    data: {
        organization: {
            id: string;
            status: "active" | "suspended" | "trial" | "cancelled";
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            licenseType: "individual" | "enterprise" | "team";
            organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
            maxUsers: number;
            description?: string | undefined;
            website?: string | undefined;
            logoUrl?: string | undefined;
            sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            contactEmail?: string | undefined;
            contactPhone?: string | undefined;
            address?: {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
            billingEmail?: string | undefined;
            accountOwnerId?: string | undefined;
            stripeCustomerId?: string | undefined;
            stripeProductId?: string | undefined;
        };
        recent_activity: {
            id: string;
            type: "content_created" | "member_joined" | "member_left" | "assessment_completed" | "invitation_sent";
            created_at: string;
            user: {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
            };
            description: string;
        }[];
        member_summary: {
            active_members: number;
            pending_invitations: number;
            new_members_this_week: number;
            total_members: number;
        };
        content_summary?: {
            total_content: number;
            published_content: number;
            draft_content: number;
            total_views: number;
        } | undefined;
        assessment_summary?: {
            total_assessments: number;
            completed_assessments: number;
            average_completion_rate: number;
            most_common_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
        } | undefined;
    };
    meta: {
        timestamp: string;
    };
}, {
    success: boolean;
    data: {
        organization: {
            id: string;
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
            status?: "active" | "suspended" | "trial" | "cancelled" | undefined;
            description?: string | undefined;
            licenseType?: "individual" | "enterprise" | "team" | undefined;
            website?: string | undefined;
            logoUrl?: string | undefined;
            sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            contactEmail?: string | undefined;
            contactPhone?: string | undefined;
            address?: {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
            maxUsers?: number | undefined;
            billingEmail?: string | undefined;
            accountOwnerId?: string | undefined;
            stripeCustomerId?: string | undefined;
            stripeProductId?: string | undefined;
        };
        member_summary: {
            active_members: number;
            pending_invitations: number;
            new_members_this_week: number;
            total_members: number;
        };
        recent_activity?: {
            id: string;
            type: "content_created" | "member_joined" | "member_left" | "assessment_completed" | "invitation_sent";
            created_at: string;
            user: {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
            };
            description: string;
        }[] | undefined;
        content_summary?: {
            total_content: number;
            published_content: number;
            draft_content: number;
            total_views: number;
        } | undefined;
        assessment_summary?: {
            total_assessments: number;
            completed_assessments: number;
            average_completion_rate: number;
            most_common_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
        } | undefined;
    };
    meta: {
        timestamp: string;
    };
}>;
/**
 * Organization Invitation API Response Contract
 * Response for organization invitations
 */
export declare const OrganizationInvitationApiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodObject<{
        invitation: z.ZodObject<{
            id: z.ZodString;
            organization_id: z.ZodString;
            organization_name: z.ZodString;
            email: z.ZodString;
            role: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            status: z.ZodEnum<["pending", "accepted", "rejected", "expired"]>;
            invited_by: z.ZodObject<{
                id: z.ZodString;
                first_name: z.ZodString;
                last_name: z.ZodString;
                display_name: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
            }, {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
            }>;
            message: z.ZodOptional<z.ZodString>;
            expires_at: z.ZodOptional<z.ZodString>;
            created_at: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            email: string;
            status: "pending" | "accepted" | "rejected" | "expired";
            role: "owner" | "admin" | "member" | "viewer";
            organization_id: string;
            created_at: string;
            organization_name: string;
            invited_by: {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
            };
            message?: string | undefined;
            expires_at?: string | undefined;
        }, {
            id: string;
            email: string;
            status: "pending" | "accepted" | "rejected" | "expired";
            role: "owner" | "admin" | "member" | "viewer";
            organization_id: string;
            created_at: string;
            organization_name: string;
            invited_by: {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
            };
            message?: string | undefined;
            expires_at?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        invitation: {
            id: string;
            email: string;
            status: "pending" | "accepted" | "rejected" | "expired";
            role: "owner" | "admin" | "member" | "viewer";
            organization_id: string;
            created_at: string;
            organization_name: string;
            invited_by: {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
            };
            message?: string | undefined;
            expires_at?: string | undefined;
        };
    }, {
        invitation: {
            id: string;
            email: string;
            status: "pending" | "accepted" | "rejected" | "expired";
            role: "owner" | "admin" | "member" | "viewer";
            organization_id: string;
            created_at: string;
            organization_name: string;
            invited_by: {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
            };
            message?: string | undefined;
            expires_at?: string | undefined;
        };
    }>;
    meta: z.ZodObject<{
        timestamp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        timestamp: string;
    }, {
        timestamp: string;
    }>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    data: {
        invitation: {
            id: string;
            email: string;
            status: "pending" | "accepted" | "rejected" | "expired";
            role: "owner" | "admin" | "member" | "viewer";
            organization_id: string;
            created_at: string;
            organization_name: string;
            invited_by: {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
            };
            message?: string | undefined;
            expires_at?: string | undefined;
        };
    };
    meta: {
        timestamp: string;
    };
}, {
    success: boolean;
    data: {
        invitation: {
            id: string;
            email: string;
            status: "pending" | "accepted" | "rejected" | "expired";
            role: "owner" | "admin" | "member" | "viewer";
            organization_id: string;
            created_at: string;
            organization_name: string;
            invited_by: {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
            };
            message?: string | undefined;
            expires_at?: string | undefined;
        };
    };
    meta: {
        timestamp: string;
    };
}>;
/**
 * Organization Settings Update API Response Contract
 * Response for organization settings updates
 */
export declare const OrganizationSettingsUpdateApiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodObject<{
        organization: z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            slug: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            website: z.ZodOptional<z.ZodString>;
            logoUrl: z.ZodOptional<z.ZodString>;
            organizationType: z.ZodEnum<["church", "denomination", "seminary", "ministry_network", "nonprofit", "business", "other"]>;
            sizeCategory: z.ZodOptional<z.ZodEnum<["startup", "small", "medium", "large", "enterprise"]>>;
            contactEmail: z.ZodOptional<z.ZodString>;
            contactPhone: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                street: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }, {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }>>;
            licenseType: z.ZodDefault<z.ZodEnum<["individual", "team", "enterprise"]>>;
            maxUsers: z.ZodDefault<z.ZodNumber>;
            billingEmail: z.ZodOptional<z.ZodString>;
            accountOwnerId: z.ZodOptional<z.ZodString>;
            stripeCustomerId: z.ZodOptional<z.ZodString>;
            stripeProductId: z.ZodOptional<z.ZodString>;
            status: z.ZodDefault<z.ZodEnum<["trial", "active", "suspended", "cancelled"]>>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            status: "active" | "suspended" | "trial" | "cancelled";
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            licenseType: "individual" | "enterprise" | "team";
            organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
            maxUsers: number;
            description?: string | undefined;
            website?: string | undefined;
            logoUrl?: string | undefined;
            sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            contactEmail?: string | undefined;
            contactPhone?: string | undefined;
            address?: {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
            billingEmail?: string | undefined;
            accountOwnerId?: string | undefined;
            stripeCustomerId?: string | undefined;
            stripeProductId?: string | undefined;
        }, {
            id: string;
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
            status?: "active" | "suspended" | "trial" | "cancelled" | undefined;
            description?: string | undefined;
            licenseType?: "individual" | "enterprise" | "team" | undefined;
            website?: string | undefined;
            logoUrl?: string | undefined;
            sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            contactEmail?: string | undefined;
            contactPhone?: string | undefined;
            address?: {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
            maxUsers?: number | undefined;
            billingEmail?: string | undefined;
            accountOwnerId?: string | undefined;
            stripeCustomerId?: string | undefined;
            stripeProductId?: string | undefined;
        }>;
        updated_settings: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        organization: {
            id: string;
            status: "active" | "suspended" | "trial" | "cancelled";
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            licenseType: "individual" | "enterprise" | "team";
            organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
            maxUsers: number;
            description?: string | undefined;
            website?: string | undefined;
            logoUrl?: string | undefined;
            sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            contactEmail?: string | undefined;
            contactPhone?: string | undefined;
            address?: {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
            billingEmail?: string | undefined;
            accountOwnerId?: string | undefined;
            stripeCustomerId?: string | undefined;
            stripeProductId?: string | undefined;
        };
        updated_settings: string[];
    }, {
        organization: {
            id: string;
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
            status?: "active" | "suspended" | "trial" | "cancelled" | undefined;
            description?: string | undefined;
            licenseType?: "individual" | "enterprise" | "team" | undefined;
            website?: string | undefined;
            logoUrl?: string | undefined;
            sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            contactEmail?: string | undefined;
            contactPhone?: string | undefined;
            address?: {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
            maxUsers?: number | undefined;
            billingEmail?: string | undefined;
            accountOwnerId?: string | undefined;
            stripeCustomerId?: string | undefined;
            stripeProductId?: string | undefined;
        };
        updated_settings: string[];
    }>;
    meta: z.ZodObject<{
        timestamp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        timestamp: string;
    }, {
        timestamp: string;
    }>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    data: {
        organization: {
            id: string;
            status: "active" | "suspended" | "trial" | "cancelled";
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            licenseType: "individual" | "enterprise" | "team";
            organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
            maxUsers: number;
            description?: string | undefined;
            website?: string | undefined;
            logoUrl?: string | undefined;
            sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            contactEmail?: string | undefined;
            contactPhone?: string | undefined;
            address?: {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
            billingEmail?: string | undefined;
            accountOwnerId?: string | undefined;
            stripeCustomerId?: string | undefined;
            stripeProductId?: string | undefined;
        };
        updated_settings: string[];
    };
    meta: {
        timestamp: string;
    };
}, {
    success: boolean;
    data: {
        organization: {
            id: string;
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
            status?: "active" | "suspended" | "trial" | "cancelled" | undefined;
            description?: string | undefined;
            licenseType?: "individual" | "enterprise" | "team" | undefined;
            website?: string | undefined;
            logoUrl?: string | undefined;
            sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            contactEmail?: string | undefined;
            contactPhone?: string | undefined;
            address?: {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
            maxUsers?: number | undefined;
            billingEmail?: string | undefined;
            accountOwnerId?: string | undefined;
            stripeCustomerId?: string | undefined;
            stripeProductId?: string | undefined;
        };
        updated_settings: string[];
    };
    meta: {
        timestamp: string;
    };
}>;
/**
 * Organization Branding Update API Response Contract
 * Response for organization branding updates
 */
export declare const OrganizationBrandingUpdateApiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodObject<{
        organization: z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            slug: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            website: z.ZodOptional<z.ZodString>;
            logoUrl: z.ZodOptional<z.ZodString>;
            organizationType: z.ZodEnum<["church", "denomination", "seminary", "ministry_network", "nonprofit", "business", "other"]>;
            sizeCategory: z.ZodOptional<z.ZodEnum<["startup", "small", "medium", "large", "enterprise"]>>;
            contactEmail: z.ZodOptional<z.ZodString>;
            contactPhone: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                street: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }, {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }>>;
            licenseType: z.ZodDefault<z.ZodEnum<["individual", "team", "enterprise"]>>;
            maxUsers: z.ZodDefault<z.ZodNumber>;
            billingEmail: z.ZodOptional<z.ZodString>;
            accountOwnerId: z.ZodOptional<z.ZodString>;
            stripeCustomerId: z.ZodOptional<z.ZodString>;
            stripeProductId: z.ZodOptional<z.ZodString>;
            status: z.ZodDefault<z.ZodEnum<["trial", "active", "suspended", "cancelled"]>>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            status: "active" | "suspended" | "trial" | "cancelled";
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            licenseType: "individual" | "enterprise" | "team";
            organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
            maxUsers: number;
            description?: string | undefined;
            website?: string | undefined;
            logoUrl?: string | undefined;
            sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            contactEmail?: string | undefined;
            contactPhone?: string | undefined;
            address?: {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
            billingEmail?: string | undefined;
            accountOwnerId?: string | undefined;
            stripeCustomerId?: string | undefined;
            stripeProductId?: string | undefined;
        }, {
            id: string;
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
            status?: "active" | "suspended" | "trial" | "cancelled" | undefined;
            description?: string | undefined;
            licenseType?: "individual" | "enterprise" | "team" | undefined;
            website?: string | undefined;
            logoUrl?: string | undefined;
            sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            contactEmail?: string | undefined;
            contactPhone?: string | undefined;
            address?: {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
            maxUsers?: number | undefined;
            billingEmail?: string | undefined;
            accountOwnerId?: string | undefined;
            stripeCustomerId?: string | undefined;
            stripeProductId?: string | undefined;
        }>;
        updated_branding: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        organization: {
            id: string;
            status: "active" | "suspended" | "trial" | "cancelled";
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            licenseType: "individual" | "enterprise" | "team";
            organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
            maxUsers: number;
            description?: string | undefined;
            website?: string | undefined;
            logoUrl?: string | undefined;
            sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            contactEmail?: string | undefined;
            contactPhone?: string | undefined;
            address?: {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
            billingEmail?: string | undefined;
            accountOwnerId?: string | undefined;
            stripeCustomerId?: string | undefined;
            stripeProductId?: string | undefined;
        };
        updated_branding: string[];
    }, {
        organization: {
            id: string;
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
            status?: "active" | "suspended" | "trial" | "cancelled" | undefined;
            description?: string | undefined;
            licenseType?: "individual" | "enterprise" | "team" | undefined;
            website?: string | undefined;
            logoUrl?: string | undefined;
            sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            contactEmail?: string | undefined;
            contactPhone?: string | undefined;
            address?: {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
            maxUsers?: number | undefined;
            billingEmail?: string | undefined;
            accountOwnerId?: string | undefined;
            stripeCustomerId?: string | undefined;
            stripeProductId?: string | undefined;
        };
        updated_branding: string[];
    }>;
    meta: z.ZodObject<{
        timestamp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        timestamp: string;
    }, {
        timestamp: string;
    }>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    data: {
        organization: {
            id: string;
            status: "active" | "suspended" | "trial" | "cancelled";
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            licenseType: "individual" | "enterprise" | "team";
            organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
            maxUsers: number;
            description?: string | undefined;
            website?: string | undefined;
            logoUrl?: string | undefined;
            sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            contactEmail?: string | undefined;
            contactPhone?: string | undefined;
            address?: {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
            billingEmail?: string | undefined;
            accountOwnerId?: string | undefined;
            stripeCustomerId?: string | undefined;
            stripeProductId?: string | undefined;
        };
        updated_branding: string[];
    };
    meta: {
        timestamp: string;
    };
}, {
    success: boolean;
    data: {
        organization: {
            id: string;
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
            status?: "active" | "suspended" | "trial" | "cancelled" | undefined;
            description?: string | undefined;
            licenseType?: "individual" | "enterprise" | "team" | undefined;
            website?: string | undefined;
            logoUrl?: string | undefined;
            sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            contactEmail?: string | undefined;
            contactPhone?: string | undefined;
            address?: {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
            maxUsers?: number | undefined;
            billingEmail?: string | undefined;
            accountOwnerId?: string | undefined;
            stripeCustomerId?: string | undefined;
            stripeProductId?: string | undefined;
        };
        updated_branding: string[];
    };
    meta: {
        timestamp: string;
    };
}>;
/**
 * Get Organization by ID API Query Contract
 * Derived from GetOrganizationByIdOperationSchema
 */
export declare const GetOrganizationByIdApiQuerySchema: z.ZodObject<{
    id: z.ZodString;
    include_members: z.ZodDefault<z.ZodBoolean>;
    include_settings: z.ZodDefault<z.ZodBoolean>;
    include_statistics: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    id: string;
    include_members: boolean;
    include_settings: boolean;
    include_statistics: boolean;
}, {
    id: string;
    include_members?: boolean | undefined;
    include_settings?: boolean | undefined;
    include_statistics?: boolean | undefined;
}>;
/**
 * Get Organization by Subdomain API Query Contract
 * Derived from GetOrganizationBySubdomainOperationSchema
 */
export declare const GetOrganizationBySubdomainApiQuerySchema: z.ZodObject<{
    subdomain: z.ZodString;
    include_members: z.ZodDefault<z.ZodBoolean>;
    include_settings: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    subdomain: string;
    include_members: boolean;
    include_settings: boolean;
}, {
    subdomain: string;
    include_members?: boolean | undefined;
    include_settings?: boolean | undefined;
}>;
/**
 * List Organizations API Query Contract
 * Derived from ListOrganizationsOperationSchema
 */
export declare const ListOrganizationsApiQuerySchema: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    organizationType: z.ZodOptional<z.ZodString>;
    sizeCategory: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodString>;
    licenseType: z.ZodOptional<z.ZodString>;
    sortBy: z.ZodDefault<z.ZodEnum<["createdAt", "updatedAt", "name", "organizationType", "memberCount"]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    includeOwner: z.ZodDefault<z.ZodBoolean>;
    includeMembers: z.ZodDefault<z.ZodBoolean>;
    includeMemberCount: z.ZodDefault<z.ZodBoolean>;
} & {
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodDefault<z.ZodNumber>;
    sort_by: z.ZodDefault<z.ZodEnum<["created_at", "updated_at", "name", "employee_count"]>>;
    sort_order: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    include_members: z.ZodDefault<z.ZodBoolean>;
    include_statistics: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "createdAt" | "updatedAt" | "name" | "memberCount" | "organizationType";
    sortOrder: "asc" | "desc";
    sort_by: "name" | "created_at" | "updated_at" | "employee_count";
    sort_order: "asc" | "desc";
    offset: number;
    includeOwner: boolean;
    includeMembers: boolean;
    includeMemberCount: boolean;
    include_members: boolean;
    include_statistics: boolean;
    status?: string | undefined;
    search?: string | undefined;
    licenseType?: string | undefined;
    organizationType?: string | undefined;
    sizeCategory?: string | undefined;
}, {
    status?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    search?: string | undefined;
    sortBy?: "createdAt" | "updatedAt" | "name" | "memberCount" | "organizationType" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    sort_by?: "name" | "created_at" | "updated_at" | "employee_count" | undefined;
    sort_order?: "asc" | "desc" | undefined;
    offset?: number | undefined;
    licenseType?: string | undefined;
    organizationType?: string | undefined;
    sizeCategory?: string | undefined;
    includeOwner?: boolean | undefined;
    includeMembers?: boolean | undefined;
    includeMemberCount?: boolean | undefined;
    include_members?: boolean | undefined;
    include_statistics?: boolean | undefined;
}>;
/**
 * Get Organization Members API Query Contract
 * Derived from GetOrganizationMembersOperationSchema
 */
export declare const GetOrganizationMembersApiQuerySchema: z.ZodObject<{
    organization_id: z.ZodString;
    include_user_details: z.ZodDefault<z.ZodBoolean>;
    include_permissions: z.ZodDefault<z.ZodBoolean>;
    include_activity: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    organization_id: string;
    include_user_details: boolean;
    include_permissions: boolean;
    include_activity: boolean;
}, {
    organization_id: string;
    include_user_details?: boolean | undefined;
    include_permissions?: boolean | undefined;
    include_activity?: boolean | undefined;
}>;
/**
 * List Organization Memberships API Query Contract
 * Derived from ListOrganizationMembershipsOperationSchema
 */
export declare const ListOrganizationMembershipsApiQuerySchema: z.ZodObject<{
    organizationId: z.ZodOptional<z.ZodString>;
    userId: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodString>;
    sortBy: z.ZodDefault<z.ZodEnum<["createdAt", "joinedAt", "role", "status"]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    includeUser: z.ZodDefault<z.ZodBoolean>;
    includeOrganization: z.ZodDefault<z.ZodBoolean>;
} & {
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodDefault<z.ZodNumber>;
    sort_by: z.ZodDefault<z.ZodEnum<["created_at", "joined_at", "role", "status"]>>;
    sort_order: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    include_user_details: z.ZodDefault<z.ZodBoolean>;
    include_organization_details: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "status" | "createdAt" | "role" | "joinedAt";
    sortOrder: "asc" | "desc";
    includeOrganization: boolean;
    sort_by: "status" | "role" | "created_at" | "joined_at";
    sort_order: "asc" | "desc";
    offset: number;
    includeUser: boolean;
    include_user_details: boolean;
    include_organization_details: boolean;
    status?: string | undefined;
    organizationId?: string | undefined;
    role?: string | undefined;
    userId?: string | undefined;
}, {
    status?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "status" | "createdAt" | "role" | "joinedAt" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    organizationId?: string | undefined;
    includeOrganization?: boolean | undefined;
    role?: string | undefined;
    sort_by?: "status" | "role" | "created_at" | "joined_at" | undefined;
    sort_order?: "asc" | "desc" | undefined;
    offset?: number | undefined;
    userId?: string | undefined;
    includeUser?: boolean | undefined;
    include_user_details?: boolean | undefined;
    include_organization_details?: boolean | undefined;
}>;
/**
 * Get Organization Statistics API Query Contract
 * Derived from GetOrganizationStatisticsOperationSchema
 */
export declare const GetOrganizationStatisticsApiQuerySchema: z.ZodObject<{
    organization_id: z.ZodString;
    date_range: z.ZodOptional<z.ZodObject<{
        start_date: z.ZodString;
        end_date: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        start_date: string;
        end_date: string;
    }, {
        start_date: string;
        end_date: string;
    }>>;
    include_member_activity: z.ZodDefault<z.ZodBoolean>;
    include_content_metrics: z.ZodDefault<z.ZodBoolean>;
    include_assessment_metrics: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    organization_id: string;
    include_member_activity: boolean;
    include_content_metrics: boolean;
    include_assessment_metrics: boolean;
    date_range?: {
        start_date: string;
        end_date: string;
    } | undefined;
}, {
    organization_id: string;
    date_range?: {
        start_date: string;
        end_date: string;
    } | undefined;
    include_member_activity?: boolean | undefined;
    include_content_metrics?: boolean | undefined;
    include_assessment_metrics?: boolean | undefined;
}>;
/**
 * Get Organization Dashboard API Query Contract
 * Derived from GetOrganizationDashboardOperationSchema
 */
export declare const GetOrganizationDashboardApiQuerySchema: z.ZodObject<{
    organization_id: z.ZodString;
    include_recent_activity: z.ZodDefault<z.ZodBoolean>;
    include_member_summary: z.ZodDefault<z.ZodBoolean>;
    include_content_summary: z.ZodDefault<z.ZodBoolean>;
    include_assessment_summary: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    organization_id: string;
    include_recent_activity: boolean;
    include_member_summary: boolean;
    include_content_summary: boolean;
    include_assessment_summary: boolean;
}, {
    organization_id: string;
    include_recent_activity?: boolean | undefined;
    include_member_summary?: boolean | undefined;
    include_content_summary?: boolean | undefined;
    include_assessment_summary?: boolean | undefined;
}>;
export type CreateOrganizationApiRequest = z.infer<typeof CreateOrganizationApiRequestSchema>;
export type UpdateOrganizationApiRequest = z.infer<typeof UpdateOrganizationApiRequestSchema>;
export type CreateOrganizationMembershipApiRequest = z.infer<typeof CreateOrganizationMembershipApiRequestSchema>;
export type UpdateOrganizationMembershipApiRequest = z.infer<typeof UpdateOrganizationMembershipApiRequestSchema>;
export type InviteUserToOrganizationApiRequest = z.infer<typeof InviteUserToOrganizationApiRequestSchema>;
export type AcceptOrganizationInvitationApiRequest = z.infer<typeof AcceptOrganizationInvitationApiRequestSchema>;
export type RejectOrganizationInvitationApiRequest = z.infer<typeof RejectOrganizationInvitationApiRequestSchema>;
export type RemoveUserFromOrganizationApiRequest = z.infer<typeof RemoveUserFromOrganizationApiRequestSchema>;
export type UpdateOrganizationSettingsApiRequest = z.infer<typeof UpdateOrganizationSettingsApiRequestSchema>;
export type UpdateOrganizationBrandingApiRequest = z.infer<typeof UpdateOrganizationBrandingApiRequestSchema>;
export type SearchOrganizationsApiRequest = z.infer<typeof SearchOrganizationsApiRequestSchema>;
export type OrganizationApiResponse = z.infer<typeof OrganizationApiResponseSchema>;
export type OrganizationWithMembersApiResponse = z.infer<typeof OrganizationWithMembersApiResponseSchema>;
export type OrganizationMembershipApiResponse = z.infer<typeof OrganizationMembershipApiResponseSchema>;
export type OrganizationMembershipWithDetailsApiResponse = z.infer<typeof OrganizationMembershipWithDetailsApiResponseSchema>;
export type OrganizationListApiResponse = z.infer<ReturnType<typeof PaginatedResponseSchema<typeof OrganizationApiResponseSchema>>>;
export type OrganizationSearchApiResponse = z.infer<typeof OrganizationSearchApiResponseSchema>;
export type OrganizationStatisticsApiResponse = z.infer<typeof OrganizationStatisticsApiResponseSchema>;
export type OrganizationDashboardApiResponse = z.infer<typeof OrganizationDashboardApiResponseSchema>;
export type OrganizationInvitationApiResponse = z.infer<typeof OrganizationInvitationApiResponseSchema>;
export type OrganizationSettingsUpdateApiResponse = z.infer<typeof OrganizationSettingsUpdateApiResponseSchema>;
export type OrganizationBrandingUpdateApiResponse = z.infer<typeof OrganizationBrandingUpdateApiResponseSchema>;
export type GetOrganizationByIdApiQuery = z.infer<typeof GetOrganizationByIdApiQuerySchema>;
export type GetOrganizationBySubdomainApiQuery = z.infer<typeof GetOrganizationBySubdomainApiQuerySchema>;
export type ListOrganizationsApiQuery = z.infer<typeof ListOrganizationsApiQuerySchema>;
export type GetOrganizationMembersApiQuery = z.infer<typeof GetOrganizationMembersApiQuerySchema>;
export type ListOrganizationMembershipsApiQuery = z.infer<typeof ListOrganizationMembershipsApiQuerySchema>;
export type GetOrganizationStatisticsApiQuery = z.infer<typeof GetOrganizationStatisticsApiQuerySchema>;
export type GetOrganizationDashboardApiQuery = z.infer<typeof GetOrganizationDashboardApiQuerySchema>;
//# sourceMappingURL=organization.contracts.d.ts.map