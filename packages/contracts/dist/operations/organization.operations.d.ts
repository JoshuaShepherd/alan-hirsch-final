import { z } from 'zod';
/**
 * Create Organization Operation Schema
 * Derived from CreateOrganizationSchema with operation-specific validation
 */
export declare const CreateOrganizationOperationSchema: z.ZodObject<{
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
 * Update Organization Operation Schema
 * Derived from UpdateOrganizationSchema with operation-specific validation
 */
export declare const UpdateOrganizationOperationSchema: z.ZodEffects<z.ZodObject<Omit<{
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
 * Get Organization by ID Operation Schema
 * Organization retrieval with options
 */
export declare const GetOrganizationByIdOperationSchema: z.ZodObject<{
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
 * Get Organization by Subdomain Operation Schema
 * Organization retrieval by subdomain
 */
export declare const GetOrganizationBySubdomainOperationSchema: z.ZodObject<{
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
 * List Organizations Operation Schema
 * Paginated organization listing with filters
 */
export declare const ListOrganizationsOperationSchema: z.ZodObject<{
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
 * Search Organizations Operation Schema
 * Full-text search for organizations
 */
export declare const SearchOrganizationsOperationSchema: z.ZodObject<{
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
 * Create Organization Membership Operation Schema
 * Derived from CreateOrganizationMembershipSchema with operation-specific validation
 */
export declare const CreateOrganizationMembershipOperationSchema: z.ZodObject<{
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
 * Update Organization Membership Operation Schema
 * Derived from UpdateOrganizationMembershipSchema with operation-specific validation
 */
export declare const UpdateOrganizationMembershipOperationSchema: z.ZodEffects<z.ZodObject<Omit<{
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
 * Invite User to Organization Operation Schema
 * Send invitation to join organization
 */
export declare const InviteUserToOrganizationOperationSchema: z.ZodObject<{
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
 * Accept Organization Invitation Operation Schema
 * Accept pending organization invitation
 */
export declare const AcceptOrganizationInvitationOperationSchema: z.ZodObject<{
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
 * Reject Organization Invitation Operation Schema
 * Reject pending organization invitation
 */
export declare const RejectOrganizationInvitationOperationSchema: z.ZodObject<{
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
 * Remove User from Organization Operation Schema
 * Remove user from organization
 */
export declare const RemoveUserFromOrganizationOperationSchema: z.ZodObject<{
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
 * Get Organization Members Operation Schema
 * Retrieve organization members with details
 */
export declare const GetOrganizationMembersOperationSchema: z.ZodObject<{
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
 * List Organization Memberships Operation Schema
 * Paginated organization membership listing
 */
export declare const ListOrganizationMembershipsOperationSchema: z.ZodObject<{
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
 * Update Organization Settings Operation Schema
 * Update organization-specific settings
 */
export declare const UpdateOrganizationSettingsOperationSchema: z.ZodObject<{
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
 * Update Organization Branding Operation Schema
 * Update organization visual branding
 */
export declare const UpdateOrganizationBrandingOperationSchema: z.ZodObject<{
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
 * Get Organization Statistics Operation Schema
 * Retrieve organization metrics and statistics
 */
export declare const GetOrganizationStatisticsOperationSchema: z.ZodObject<{
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
 * Get Organization Dashboard Operation Schema
 * Retrieve organization dashboard data
 */
export declare const GetOrganizationDashboardOperationSchema: z.ZodObject<{
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
export type CreateOrganizationOperation = z.infer<typeof CreateOrganizationOperationSchema>;
export type UpdateOrganizationOperation = z.infer<typeof UpdateOrganizationOperationSchema>;
export type GetOrganizationByIdOperation = z.infer<typeof GetOrganizationByIdOperationSchema>;
export type GetOrganizationBySubdomainOperation = z.infer<typeof GetOrganizationBySubdomainOperationSchema>;
export type ListOrganizationsOperation = z.infer<typeof ListOrganizationsOperationSchema>;
export type SearchOrganizationsOperation = z.infer<typeof SearchOrganizationsOperationSchema>;
export type CreateOrganizationMembershipOperation = z.infer<typeof CreateOrganizationMembershipOperationSchema>;
export type UpdateOrganizationMembershipOperation = z.infer<typeof UpdateOrganizationMembershipOperationSchema>;
export type InviteUserToOrganizationOperation = z.infer<typeof InviteUserToOrganizationOperationSchema>;
export type AcceptOrganizationInvitationOperation = z.infer<typeof AcceptOrganizationInvitationOperationSchema>;
export type RejectOrganizationInvitationOperation = z.infer<typeof RejectOrganizationInvitationOperationSchema>;
export type RemoveUserFromOrganizationOperation = z.infer<typeof RemoveUserFromOrganizationOperationSchema>;
export type GetOrganizationMembersOperation = z.infer<typeof GetOrganizationMembersOperationSchema>;
export type ListOrganizationMembershipsOperation = z.infer<typeof ListOrganizationMembershipsOperationSchema>;
export type UpdateOrganizationSettingsOperation = z.infer<typeof UpdateOrganizationSettingsOperationSchema>;
export type UpdateOrganizationBrandingOperation = z.infer<typeof UpdateOrganizationBrandingOperationSchema>;
export type GetOrganizationStatisticsOperation = z.infer<typeof GetOrganizationStatisticsOperationSchema>;
export type GetOrganizationDashboardOperation = z.infer<typeof GetOrganizationDashboardOperationSchema>;
//# sourceMappingURL=organization.operations.d.ts.map