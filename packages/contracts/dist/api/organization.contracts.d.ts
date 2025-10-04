import { z } from 'zod';
import { PaginatedResponseSchema } from './user.contracts';
/**
 * Create Organization API Request Contract
 * Derived from CreateOrganizationOperationSchema
 */
export declare const CreateOrganizationApiRequestSchema: z.ZodObject<{
    status: z.ZodDefault<z.ZodEnum<["active", "inactive", "suspended", "pending_approval"]>>;
    email: z.ZodOptional<z.ZodString>;
    country_code: z.ZodOptional<z.ZodString>;
    custom_domain: z.ZodOptional<z.ZodString>;
    brand_colors: z.ZodOptional<z.ZodObject<{
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
    }>>;
    description: z.ZodOptional<z.ZodString>;
    organization_type: z.ZodEnum<["church", "denomination", "seminary", "nonprofit", "ministry", "business", "other"]>;
    organization_size: z.ZodOptional<z.ZodEnum<["startup", "small", "medium", "large", "enterprise"]>>;
    website_url: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    address_line1: z.ZodOptional<z.ZodString>;
    address_line2: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    state_province: z.ZodOptional<z.ZodString>;
    postal_code: z.ZodOptional<z.ZodString>;
    founded_year: z.ZodOptional<z.ZodNumber>;
    employee_count: z.ZodOptional<z.ZodNumber>;
    annual_budget: z.ZodOptional<z.ZodNumber>;
    logo_url: z.ZodOptional<z.ZodString>;
    settings: z.ZodOptional<z.ZodObject<{
        allow_public_membership: z.ZodDefault<z.ZodBoolean>;
        require_approval_for_membership: z.ZodDefault<z.ZodBoolean>;
        allow_member_invites: z.ZodDefault<z.ZodBoolean>;
        default_member_role: z.ZodDefault<z.ZodEnum<["owner", "admin", "member", "viewer"]>>;
        max_members: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        allow_public_membership: boolean;
        require_approval_for_membership: boolean;
        allow_member_invites: boolean;
        default_member_role: "owner" | "admin" | "member" | "viewer";
        max_members?: number | undefined;
    }, {
        allow_public_membership?: boolean | undefined;
        require_approval_for_membership?: boolean | undefined;
        allow_member_invites?: boolean | undefined;
        default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
        max_members?: number | undefined;
    }>>;
} & {
    name: z.ZodEffects<z.ZodString, string, string>;
    slug: z.ZodEffects<z.ZodString, string, string>;
    subdomain: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
}, "strip", z.ZodTypeAny, {
    status: "active" | "inactive" | "suspended" | "pending_approval";
    name: string;
    slug: string;
    organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
    email?: string | undefined;
    country_code?: string | undefined;
    subdomain?: string | undefined;
    custom_domain?: string | undefined;
    brand_colors?: {
        primary: string;
        secondary: string;
        accent: string;
    } | undefined;
    description?: string | undefined;
    organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
    website_url?: string | undefined;
    phone?: string | undefined;
    address_line1?: string | undefined;
    address_line2?: string | undefined;
    city?: string | undefined;
    state_province?: string | undefined;
    postal_code?: string | undefined;
    founded_year?: number | undefined;
    employee_count?: number | undefined;
    annual_budget?: number | undefined;
    logo_url?: string | undefined;
    settings?: {
        allow_public_membership: boolean;
        require_approval_for_membership: boolean;
        allow_member_invites: boolean;
        default_member_role: "owner" | "admin" | "member" | "viewer";
        max_members?: number | undefined;
    } | undefined;
}, {
    name: string;
    slug: string;
    organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
    status?: "active" | "inactive" | "suspended" | "pending_approval" | undefined;
    email?: string | undefined;
    country_code?: string | undefined;
    subdomain?: string | undefined;
    custom_domain?: string | undefined;
    brand_colors?: {
        primary: string;
        secondary: string;
        accent: string;
    } | undefined;
    description?: string | undefined;
    organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
    website_url?: string | undefined;
    phone?: string | undefined;
    address_line1?: string | undefined;
    address_line2?: string | undefined;
    city?: string | undefined;
    state_province?: string | undefined;
    postal_code?: string | undefined;
    founded_year?: number | undefined;
    employee_count?: number | undefined;
    annual_budget?: number | undefined;
    logo_url?: string | undefined;
    settings?: {
        allow_public_membership?: boolean | undefined;
        require_approval_for_membership?: boolean | undefined;
        allow_member_invites?: boolean | undefined;
        default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
        max_members?: number | undefined;
    } | undefined;
}>;
/**
 * Update Organization API Request Contract
 * Derived from UpdateOrganizationOperationSchema
 */
export declare const UpdateOrganizationApiRequestSchema: z.ZodEffects<z.ZodObject<{
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["active", "inactive", "suspended", "pending_approval"]>>>;
    email: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    country_code: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    subdomain: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    custom_domain: z.ZodOptional<z.ZodOptional<z.ZodString>>;
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
    name: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    organization_type: z.ZodOptional<z.ZodEnum<["church", "denomination", "seminary", "nonprofit", "ministry", "business", "other"]>>;
    organization_size: z.ZodOptional<z.ZodOptional<z.ZodEnum<["startup", "small", "medium", "large", "enterprise"]>>>;
    website_url: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    phone: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    address_line1: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    address_line2: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    city: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    state_province: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    postal_code: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    founded_year: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    employee_count: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    annual_budget: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    logo_url: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    settings: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        allow_public_membership: z.ZodDefault<z.ZodBoolean>;
        require_approval_for_membership: z.ZodDefault<z.ZodBoolean>;
        allow_member_invites: z.ZodDefault<z.ZodBoolean>;
        default_member_role: z.ZodDefault<z.ZodEnum<["owner", "admin", "member", "viewer"]>>;
        max_members: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        allow_public_membership: boolean;
        require_approval_for_membership: boolean;
        allow_member_invites: boolean;
        default_member_role: "owner" | "admin" | "member" | "viewer";
        max_members?: number | undefined;
    }, {
        allow_public_membership?: boolean | undefined;
        require_approval_for_membership?: boolean | undefined;
        allow_member_invites?: boolean | undefined;
        default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
        max_members?: number | undefined;
    }>>>;
}, "strip", z.ZodTypeAny, {
    status?: "active" | "inactive" | "suspended" | "pending_approval" | undefined;
    email?: string | undefined;
    country_code?: string | undefined;
    subdomain?: string | undefined;
    custom_domain?: string | undefined;
    brand_colors?: {
        primary: string;
        secondary: string;
        accent: string;
    } | undefined;
    name?: string | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    organization_type?: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business" | undefined;
    organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
    website_url?: string | undefined;
    phone?: string | undefined;
    address_line1?: string | undefined;
    address_line2?: string | undefined;
    city?: string | undefined;
    state_province?: string | undefined;
    postal_code?: string | undefined;
    founded_year?: number | undefined;
    employee_count?: number | undefined;
    annual_budget?: number | undefined;
    logo_url?: string | undefined;
    settings?: {
        allow_public_membership: boolean;
        require_approval_for_membership: boolean;
        allow_member_invites: boolean;
        default_member_role: "owner" | "admin" | "member" | "viewer";
        max_members?: number | undefined;
    } | undefined;
}, {
    status?: "active" | "inactive" | "suspended" | "pending_approval" | undefined;
    email?: string | undefined;
    country_code?: string | undefined;
    subdomain?: string | undefined;
    custom_domain?: string | undefined;
    brand_colors?: {
        primary: string;
        secondary: string;
        accent: string;
    } | undefined;
    name?: string | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    organization_type?: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business" | undefined;
    organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
    website_url?: string | undefined;
    phone?: string | undefined;
    address_line1?: string | undefined;
    address_line2?: string | undefined;
    city?: string | undefined;
    state_province?: string | undefined;
    postal_code?: string | undefined;
    founded_year?: number | undefined;
    employee_count?: number | undefined;
    annual_budget?: number | undefined;
    logo_url?: string | undefined;
    settings?: {
        allow_public_membership?: boolean | undefined;
        require_approval_for_membership?: boolean | undefined;
        allow_member_invites?: boolean | undefined;
        default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
        max_members?: number | undefined;
    } | undefined;
}>, {
    status?: "active" | "inactive" | "suspended" | "pending_approval" | undefined;
    email?: string | undefined;
    country_code?: string | undefined;
    subdomain?: string | undefined;
    custom_domain?: string | undefined;
    brand_colors?: {
        primary: string;
        secondary: string;
        accent: string;
    } | undefined;
    name?: string | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    organization_type?: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business" | undefined;
    organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
    website_url?: string | undefined;
    phone?: string | undefined;
    address_line1?: string | undefined;
    address_line2?: string | undefined;
    city?: string | undefined;
    state_province?: string | undefined;
    postal_code?: string | undefined;
    founded_year?: number | undefined;
    employee_count?: number | undefined;
    annual_budget?: number | undefined;
    logo_url?: string | undefined;
    settings?: {
        allow_public_membership: boolean;
        require_approval_for_membership: boolean;
        allow_member_invites: boolean;
        default_member_role: "owner" | "admin" | "member" | "viewer";
        max_members?: number | undefined;
    } | undefined;
}, {
    status?: "active" | "inactive" | "suspended" | "pending_approval" | undefined;
    email?: string | undefined;
    country_code?: string | undefined;
    subdomain?: string | undefined;
    custom_domain?: string | undefined;
    brand_colors?: {
        primary: string;
        secondary: string;
        accent: string;
    } | undefined;
    name?: string | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    organization_type?: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business" | undefined;
    organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
    website_url?: string | undefined;
    phone?: string | undefined;
    address_line1?: string | undefined;
    address_line2?: string | undefined;
    city?: string | undefined;
    state_province?: string | undefined;
    postal_code?: string | undefined;
    founded_year?: number | undefined;
    employee_count?: number | undefined;
    annual_budget?: number | undefined;
    logo_url?: string | undefined;
    settings?: {
        allow_public_membership?: boolean | undefined;
        require_approval_for_membership?: boolean | undefined;
        allow_member_invites?: boolean | undefined;
        default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
        max_members?: number | undefined;
    } | undefined;
}>;
/**
 * Create Organization Membership API Request Contract
 * Derived from CreateOrganizationMembershipOperationSchema
 */
export declare const CreateOrganizationMembershipApiRequestSchema: z.ZodObject<{
    status: z.ZodDefault<z.ZodEnum<["active", "inactive", "pending", "suspended"]>>;
    permissions: z.ZodOptional<z.ZodObject<{
        can_manage_members: z.ZodDefault<z.ZodBoolean>;
        can_manage_content: z.ZodDefault<z.ZodBoolean>;
        can_manage_assessments: z.ZodDefault<z.ZodBoolean>;
        can_view_analytics: z.ZodDefault<z.ZodBoolean>;
        can_manage_billing: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        can_manage_members: boolean;
        can_manage_content: boolean;
        can_manage_assessments: boolean;
        can_view_analytics: boolean;
        can_manage_billing: boolean;
    }, {
        can_manage_members?: boolean | undefined;
        can_manage_content?: boolean | undefined;
        can_manage_assessments?: boolean | undefined;
        can_view_analytics?: boolean | undefined;
        can_manage_billing?: boolean | undefined;
    }>>;
    invited_by: z.ZodOptional<z.ZodString>;
    invited_at: z.ZodOptional<z.ZodString>;
    joined_at: z.ZodOptional<z.ZodString>;
} & {
    user_id: z.ZodString;
    organization_id: z.ZodString;
    role: z.ZodDefault<z.ZodEnum<["owner", "admin", "member", "viewer"]>>;
}, "strip", z.ZodTypeAny, {
    status: "active" | "inactive" | "suspended" | "pending";
    user_id: string;
    organization_id: string;
    role: "owner" | "admin" | "member" | "viewer";
    permissions?: {
        can_manage_members: boolean;
        can_manage_content: boolean;
        can_manage_assessments: boolean;
        can_view_analytics: boolean;
        can_manage_billing: boolean;
    } | undefined;
    invited_by?: string | undefined;
    invited_at?: string | undefined;
    joined_at?: string | undefined;
}, {
    user_id: string;
    organization_id: string;
    status?: "active" | "inactive" | "suspended" | "pending" | undefined;
    role?: "owner" | "admin" | "member" | "viewer" | undefined;
    permissions?: {
        can_manage_members?: boolean | undefined;
        can_manage_content?: boolean | undefined;
        can_manage_assessments?: boolean | undefined;
        can_view_analytics?: boolean | undefined;
        can_manage_billing?: boolean | undefined;
    } | undefined;
    invited_by?: string | undefined;
    invited_at?: string | undefined;
    joined_at?: string | undefined;
}>;
/**
 * Update Organization Membership API Request Contract
 * Derived from UpdateOrganizationMembershipOperationSchema
 */
export declare const UpdateOrganizationMembershipApiRequestSchema: z.ZodEffects<z.ZodObject<{
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["active", "inactive", "pending", "suspended"]>>>;
    user_id: z.ZodOptional<z.ZodString>;
    organization_id: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodEnum<["owner", "admin", "member", "viewer"]>>;
    permissions: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        can_manage_members: z.ZodDefault<z.ZodBoolean>;
        can_manage_content: z.ZodDefault<z.ZodBoolean>;
        can_manage_assessments: z.ZodDefault<z.ZodBoolean>;
        can_view_analytics: z.ZodDefault<z.ZodBoolean>;
        can_manage_billing: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        can_manage_members: boolean;
        can_manage_content: boolean;
        can_manage_assessments: boolean;
        can_view_analytics: boolean;
        can_manage_billing: boolean;
    }, {
        can_manage_members?: boolean | undefined;
        can_manage_content?: boolean | undefined;
        can_manage_assessments?: boolean | undefined;
        can_view_analytics?: boolean | undefined;
        can_manage_billing?: boolean | undefined;
    }>>>;
    invited_by: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    invited_at: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    joined_at: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    status?: "active" | "inactive" | "suspended" | "pending" | undefined;
    user_id?: string | undefined;
    organization_id?: string | undefined;
    role?: "owner" | "admin" | "member" | "viewer" | undefined;
    permissions?: {
        can_manage_members: boolean;
        can_manage_content: boolean;
        can_manage_assessments: boolean;
        can_view_analytics: boolean;
        can_manage_billing: boolean;
    } | undefined;
    invited_by?: string | undefined;
    invited_at?: string | undefined;
    joined_at?: string | undefined;
}, {
    status?: "active" | "inactive" | "suspended" | "pending" | undefined;
    user_id?: string | undefined;
    organization_id?: string | undefined;
    role?: "owner" | "admin" | "member" | "viewer" | undefined;
    permissions?: {
        can_manage_members?: boolean | undefined;
        can_manage_content?: boolean | undefined;
        can_manage_assessments?: boolean | undefined;
        can_view_analytics?: boolean | undefined;
        can_manage_billing?: boolean | undefined;
    } | undefined;
    invited_by?: string | undefined;
    invited_at?: string | undefined;
    joined_at?: string | undefined;
}>, {
    status?: "active" | "inactive" | "suspended" | "pending" | undefined;
    user_id?: string | undefined;
    organization_id?: string | undefined;
    role?: "owner" | "admin" | "member" | "viewer" | undefined;
    permissions?: {
        can_manage_members: boolean;
        can_manage_content: boolean;
        can_manage_assessments: boolean;
        can_view_analytics: boolean;
        can_manage_billing: boolean;
    } | undefined;
    invited_by?: string | undefined;
    invited_at?: string | undefined;
    joined_at?: string | undefined;
}, {
    status?: "active" | "inactive" | "suspended" | "pending" | undefined;
    user_id?: string | undefined;
    organization_id?: string | undefined;
    role?: "owner" | "admin" | "member" | "viewer" | undefined;
    permissions?: {
        can_manage_members?: boolean | undefined;
        can_manage_content?: boolean | undefined;
        can_manage_assessments?: boolean | undefined;
        can_view_analytics?: boolean | undefined;
        can_manage_billing?: boolean | undefined;
    } | undefined;
    invited_by?: string | undefined;
    invited_at?: string | undefined;
    joined_at?: string | undefined;
}>;
/**
 * Invite User to Organization API Request Contract
 * Derived from InviteUserToOrganizationOperationSchema
 */
export declare const InviteUserToOrganizationApiRequestSchema: z.ZodObject<{
    organization_id: z.ZodString;
    email: z.ZodString;
} & {
    message: z.ZodOptional<z.ZodString>;
    expires_at: z.ZodOptional<z.ZodString>;
    role: z.ZodDefault<z.ZodEnum<["owner", "admin", "member", "viewer"]>>;
}, "strip", z.ZodTypeAny, {
    email: string;
    organization_id: string;
    role: "owner" | "admin" | "member" | "viewer";
    message?: string | undefined;
    expires_at?: string | undefined;
}, {
    email: string;
    organization_id: string;
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
    user_id: string;
    organization_id: string;
    transfer_ownership?: {
        new_owner_id: string;
    } | undefined;
    reason?: string | undefined;
}, {
    user_id: string;
    organization_id: string;
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
    settings: {
        allow_public_membership?: boolean | undefined;
        require_approval_for_membership?: boolean | undefined;
        allow_member_invites?: boolean | undefined;
        default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
        max_members?: number | undefined;
    };
    organization_id: string;
}, {
    settings: {
        allow_public_membership?: boolean | undefined;
        require_approval_for_membership?: boolean | undefined;
        allow_member_invites?: boolean | undefined;
        default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
        max_members?: number | undefined;
    };
    organization_id: string;
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
        custom_domain?: string | undefined;
        brand_colors?: {
            primary: string;
            secondary: string;
            accent: string;
        } | undefined;
        logo_url?: string | undefined;
    }, {
        custom_domain?: string | undefined;
        brand_colors?: {
            primary: string;
            secondary: string;
            accent: string;
        } | undefined;
        logo_url?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    organization_id: string;
    branding: {
        custom_domain?: string | undefined;
        brand_colors?: {
            primary: string;
            secondary: string;
            accent: string;
        } | undefined;
        logo_url?: string | undefined;
    };
}, {
    organization_id: string;
    branding: {
        custom_domain?: string | undefined;
        brand_colors?: {
            primary: string;
            secondary: string;
            accent: string;
        } | undefined;
        logo_url?: string | undefined;
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
    sort_by: "created_at" | "name" | "employee_count" | "relevance";
    sort_order: "asc" | "desc";
    query: string;
    status?: ("active" | "inactive" | "suspended" | "pending_approval")[] | undefined;
    country_code?: string[] | undefined;
    organization_type?: ("other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business")[] | undefined;
    organization_size?: ("startup" | "small" | "medium" | "large" | "enterprise")[] | undefined;
}, {
    query: string;
    status?: ("active" | "inactive" | "suspended" | "pending_approval")[] | undefined;
    country_code?: string[] | undefined;
    organization_type?: ("other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business")[] | undefined;
    organization_size?: ("startup" | "small" | "medium" | "large" | "enterprise")[] | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort_by?: "created_at" | "name" | "employee_count" | "relevance" | undefined;
    sort_order?: "asc" | "desc" | undefined;
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
    organization_type: z.ZodEnum<["church", "denomination", "seminary", "nonprofit", "ministry", "business", "other"]>;
    organization_size: z.ZodOptional<z.ZodEnum<["startup", "small", "medium", "large", "enterprise"]>>;
    website_url: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    address_line1: z.ZodOptional<z.ZodString>;
    address_line2: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    state_province: z.ZodOptional<z.ZodString>;
    postal_code: z.ZodOptional<z.ZodString>;
    country_code: z.ZodOptional<z.ZodString>;
    founded_year: z.ZodOptional<z.ZodNumber>;
    employee_count: z.ZodOptional<z.ZodNumber>;
    annual_budget: z.ZodOptional<z.ZodNumber>;
    subdomain: z.ZodOptional<z.ZodString>;
    custom_domain: z.ZodOptional<z.ZodString>;
    logo_url: z.ZodOptional<z.ZodString>;
    brand_colors: z.ZodOptional<z.ZodObject<{
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
    }>>;
    settings: z.ZodOptional<z.ZodObject<{
        allow_public_membership: z.ZodDefault<z.ZodBoolean>;
        require_approval_for_membership: z.ZodDefault<z.ZodBoolean>;
        allow_member_invites: z.ZodDefault<z.ZodBoolean>;
        default_member_role: z.ZodDefault<z.ZodEnum<["owner", "admin", "member", "viewer"]>>;
        max_members: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        allow_public_membership: boolean;
        require_approval_for_membership: boolean;
        allow_member_invites: boolean;
        default_member_role: "owner" | "admin" | "member" | "viewer";
        max_members?: number | undefined;
    }, {
        allow_public_membership?: boolean | undefined;
        require_approval_for_membership?: boolean | undefined;
        allow_member_invites?: boolean | undefined;
        default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
        max_members?: number | undefined;
    }>>;
    status: z.ZodDefault<z.ZodEnum<["active", "inactive", "suspended", "pending_approval"]>>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "active" | "inactive" | "suspended" | "pending_approval";
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
    slug: string;
    organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
    email?: string | undefined;
    country_code?: string | undefined;
    subdomain?: string | undefined;
    custom_domain?: string | undefined;
    brand_colors?: {
        primary: string;
        secondary: string;
        accent: string;
    } | undefined;
    description?: string | undefined;
    organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
    website_url?: string | undefined;
    phone?: string | undefined;
    address_line1?: string | undefined;
    address_line2?: string | undefined;
    city?: string | undefined;
    state_province?: string | undefined;
    postal_code?: string | undefined;
    founded_year?: number | undefined;
    employee_count?: number | undefined;
    annual_budget?: number | undefined;
    logo_url?: string | undefined;
    settings?: {
        allow_public_membership: boolean;
        require_approval_for_membership: boolean;
        allow_member_invites: boolean;
        default_member_role: "owner" | "admin" | "member" | "viewer";
        max_members?: number | undefined;
    } | undefined;
}, {
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
    slug: string;
    organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
    status?: "active" | "inactive" | "suspended" | "pending_approval" | undefined;
    email?: string | undefined;
    country_code?: string | undefined;
    subdomain?: string | undefined;
    custom_domain?: string | undefined;
    brand_colors?: {
        primary: string;
        secondary: string;
        accent: string;
    } | undefined;
    description?: string | undefined;
    organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
    website_url?: string | undefined;
    phone?: string | undefined;
    address_line1?: string | undefined;
    address_line2?: string | undefined;
    city?: string | undefined;
    state_province?: string | undefined;
    postal_code?: string | undefined;
    founded_year?: number | undefined;
    employee_count?: number | undefined;
    annual_budget?: number | undefined;
    logo_url?: string | undefined;
    settings?: {
        allow_public_membership?: boolean | undefined;
        require_approval_for_membership?: boolean | undefined;
        allow_member_invites?: boolean | undefined;
        default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
        max_members?: number | undefined;
    } | undefined;
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
    organization_type: z.ZodEnum<["church", "denomination", "seminary", "nonprofit", "ministry", "business", "other"]>;
    organization_size: z.ZodOptional<z.ZodEnum<["startup", "small", "medium", "large", "enterprise"]>>;
    website_url: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    address_line1: z.ZodOptional<z.ZodString>;
    address_line2: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    state_province: z.ZodOptional<z.ZodString>;
    postal_code: z.ZodOptional<z.ZodString>;
    country_code: z.ZodOptional<z.ZodString>;
    founded_year: z.ZodOptional<z.ZodNumber>;
    employee_count: z.ZodOptional<z.ZodNumber>;
    annual_budget: z.ZodOptional<z.ZodNumber>;
    subdomain: z.ZodOptional<z.ZodString>;
    custom_domain: z.ZodOptional<z.ZodString>;
    logo_url: z.ZodOptional<z.ZodString>;
    brand_colors: z.ZodOptional<z.ZodObject<{
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
    }>>;
    settings: z.ZodOptional<z.ZodObject<{
        allow_public_membership: z.ZodDefault<z.ZodBoolean>;
        require_approval_for_membership: z.ZodDefault<z.ZodBoolean>;
        allow_member_invites: z.ZodDefault<z.ZodBoolean>;
        default_member_role: z.ZodDefault<z.ZodEnum<["owner", "admin", "member", "viewer"]>>;
        max_members: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        allow_public_membership: boolean;
        require_approval_for_membership: boolean;
        allow_member_invites: boolean;
        default_member_role: "owner" | "admin" | "member" | "viewer";
        max_members?: number | undefined;
    }, {
        allow_public_membership?: boolean | undefined;
        require_approval_for_membership?: boolean | undefined;
        allow_member_invites?: boolean | undefined;
        default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
        max_members?: number | undefined;
    }>>;
    status: z.ZodDefault<z.ZodEnum<["active", "inactive", "suspended", "pending_approval"]>>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
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
        status: "active" | "inactive" | "suspended" | "pending";
        id: string;
        user_id: string;
        role: "owner" | "admin" | "member" | "viewer";
        user: {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
        };
        permissions?: {
            can_manage_members: boolean;
            can_manage_content: boolean;
            can_manage_assessments: boolean;
            can_view_analytics: boolean;
            can_manage_billing: boolean;
        } | undefined;
        joined_at?: string | undefined;
    }, {
        status: "active" | "inactive" | "suspended" | "pending";
        id: string;
        user_id: string;
        role: "owner" | "admin" | "member" | "viewer";
        user: {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
        };
        permissions?: {
            can_manage_members: boolean;
            can_manage_content: boolean;
            can_manage_assessments: boolean;
            can_view_analytics: boolean;
            can_manage_billing: boolean;
        } | undefined;
        joined_at?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    status: "active" | "inactive" | "suspended" | "pending_approval";
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
    slug: string;
    organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
    members: {
        status: "active" | "inactive" | "suspended" | "pending";
        id: string;
        user_id: string;
        role: "owner" | "admin" | "member" | "viewer";
        user: {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
        };
        permissions?: {
            can_manage_members: boolean;
            can_manage_content: boolean;
            can_manage_assessments: boolean;
            can_view_analytics: boolean;
            can_manage_billing: boolean;
        } | undefined;
        joined_at?: string | undefined;
    }[];
    email?: string | undefined;
    country_code?: string | undefined;
    subdomain?: string | undefined;
    custom_domain?: string | undefined;
    brand_colors?: {
        primary: string;
        secondary: string;
        accent: string;
    } | undefined;
    description?: string | undefined;
    organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
    website_url?: string | undefined;
    phone?: string | undefined;
    address_line1?: string | undefined;
    address_line2?: string | undefined;
    city?: string | undefined;
    state_province?: string | undefined;
    postal_code?: string | undefined;
    founded_year?: number | undefined;
    employee_count?: number | undefined;
    annual_budget?: number | undefined;
    logo_url?: string | undefined;
    settings?: {
        allow_public_membership: boolean;
        require_approval_for_membership: boolean;
        allow_member_invites: boolean;
        default_member_role: "owner" | "admin" | "member" | "viewer";
        max_members?: number | undefined;
    } | undefined;
}, {
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
    slug: string;
    organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
    status?: "active" | "inactive" | "suspended" | "pending_approval" | undefined;
    email?: string | undefined;
    country_code?: string | undefined;
    subdomain?: string | undefined;
    custom_domain?: string | undefined;
    brand_colors?: {
        primary: string;
        secondary: string;
        accent: string;
    } | undefined;
    description?: string | undefined;
    organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
    website_url?: string | undefined;
    phone?: string | undefined;
    address_line1?: string | undefined;
    address_line2?: string | undefined;
    city?: string | undefined;
    state_province?: string | undefined;
    postal_code?: string | undefined;
    founded_year?: number | undefined;
    employee_count?: number | undefined;
    annual_budget?: number | undefined;
    logo_url?: string | undefined;
    settings?: {
        allow_public_membership?: boolean | undefined;
        require_approval_for_membership?: boolean | undefined;
        allow_member_invites?: boolean | undefined;
        default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
        max_members?: number | undefined;
    } | undefined;
    members?: {
        status: "active" | "inactive" | "suspended" | "pending";
        id: string;
        user_id: string;
        role: "owner" | "admin" | "member" | "viewer";
        user: {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
        };
        permissions?: {
            can_manage_members: boolean;
            can_manage_content: boolean;
            can_manage_assessments: boolean;
            can_view_analytics: boolean;
            can_manage_billing: boolean;
        } | undefined;
        joined_at?: string | undefined;
    }[] | undefined;
}>;
/**
 * Organization Membership API Response Contract
 * Derived from OrganizationMembershipEntitySchema
 */
export declare const OrganizationMembershipApiResponseSchema: z.ZodObject<{
    id: z.ZodString;
    organization_id: z.ZodString;
    user_id: z.ZodString;
    role: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
    status: z.ZodDefault<z.ZodEnum<["active", "inactive", "pending", "suspended"]>>;
    permissions: z.ZodOptional<z.ZodObject<{
        can_manage_members: z.ZodDefault<z.ZodBoolean>;
        can_manage_content: z.ZodDefault<z.ZodBoolean>;
        can_manage_assessments: z.ZodDefault<z.ZodBoolean>;
        can_view_analytics: z.ZodDefault<z.ZodBoolean>;
        can_manage_billing: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        can_manage_members: boolean;
        can_manage_content: boolean;
        can_manage_assessments: boolean;
        can_view_analytics: boolean;
        can_manage_billing: boolean;
    }, {
        can_manage_members?: boolean | undefined;
        can_manage_content?: boolean | undefined;
        can_manage_assessments?: boolean | undefined;
        can_view_analytics?: boolean | undefined;
        can_manage_billing?: boolean | undefined;
    }>>;
    invited_by: z.ZodOptional<z.ZodString>;
    invited_at: z.ZodOptional<z.ZodString>;
    joined_at: z.ZodOptional<z.ZodString>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "active" | "inactive" | "suspended" | "pending";
    id: string;
    created_at: string;
    updated_at: string;
    user_id: string;
    organization_id: string;
    role: "owner" | "admin" | "member" | "viewer";
    permissions?: {
        can_manage_members: boolean;
        can_manage_content: boolean;
        can_manage_assessments: boolean;
        can_view_analytics: boolean;
        can_manage_billing: boolean;
    } | undefined;
    invited_by?: string | undefined;
    invited_at?: string | undefined;
    joined_at?: string | undefined;
}, {
    id: string;
    created_at: string;
    updated_at: string;
    user_id: string;
    organization_id: string;
    role: "owner" | "admin" | "member" | "viewer";
    status?: "active" | "inactive" | "suspended" | "pending" | undefined;
    permissions?: {
        can_manage_members?: boolean | undefined;
        can_manage_content?: boolean | undefined;
        can_manage_assessments?: boolean | undefined;
        can_view_analytics?: boolean | undefined;
        can_manage_billing?: boolean | undefined;
    } | undefined;
    invited_by?: string | undefined;
    invited_at?: string | undefined;
    joined_at?: string | undefined;
}>;
/**
 * Organization Membership with Details API Response Contract
 * Extends membership with organization and user details
 */
export declare const OrganizationMembershipWithDetailsApiResponseSchema: z.ZodObject<{
    id: z.ZodString;
    organization_id: z.ZodString;
    user_id: z.ZodString;
    role: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
    status: z.ZodDefault<z.ZodEnum<["active", "inactive", "pending", "suspended"]>>;
    permissions: z.ZodOptional<z.ZodObject<{
        can_manage_members: z.ZodDefault<z.ZodBoolean>;
        can_manage_content: z.ZodDefault<z.ZodBoolean>;
        can_manage_assessments: z.ZodDefault<z.ZodBoolean>;
        can_view_analytics: z.ZodDefault<z.ZodBoolean>;
        can_manage_billing: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        can_manage_members: boolean;
        can_manage_content: boolean;
        can_manage_assessments: boolean;
        can_view_analytics: boolean;
        can_manage_billing: boolean;
    }, {
        can_manage_members?: boolean | undefined;
        can_manage_content?: boolean | undefined;
        can_manage_assessments?: boolean | undefined;
        can_view_analytics?: boolean | undefined;
        can_manage_billing?: boolean | undefined;
    }>>;
    invited_by: z.ZodOptional<z.ZodString>;
    invited_at: z.ZodOptional<z.ZodString>;
    joined_at: z.ZodOptional<z.ZodString>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
} & {
    organization: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        organization_type: z.ZodEnum<["church", "denomination", "seminary", "nonprofit", "ministry", "business", "other"]>;
        organization_size: z.ZodOptional<z.ZodEnum<["startup", "small", "medium", "large", "enterprise"]>>;
        website_url: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        address_line1: z.ZodOptional<z.ZodString>;
        address_line2: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        state_province: z.ZodOptional<z.ZodString>;
        postal_code: z.ZodOptional<z.ZodString>;
        country_code: z.ZodOptional<z.ZodString>;
        founded_year: z.ZodOptional<z.ZodNumber>;
        employee_count: z.ZodOptional<z.ZodNumber>;
        annual_budget: z.ZodOptional<z.ZodNumber>;
        subdomain: z.ZodOptional<z.ZodString>;
        custom_domain: z.ZodOptional<z.ZodString>;
        logo_url: z.ZodOptional<z.ZodString>;
        brand_colors: z.ZodOptional<z.ZodObject<{
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
        }>>;
        settings: z.ZodOptional<z.ZodObject<{
            allow_public_membership: z.ZodDefault<z.ZodBoolean>;
            require_approval_for_membership: z.ZodDefault<z.ZodBoolean>;
            allow_member_invites: z.ZodDefault<z.ZodBoolean>;
            default_member_role: z.ZodDefault<z.ZodEnum<["owner", "admin", "member", "viewer"]>>;
            max_members: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            allow_public_membership: boolean;
            require_approval_for_membership: boolean;
            allow_member_invites: boolean;
            default_member_role: "owner" | "admin" | "member" | "viewer";
            max_members?: number | undefined;
        }, {
            allow_public_membership?: boolean | undefined;
            require_approval_for_membership?: boolean | undefined;
            allow_member_invites?: boolean | undefined;
            default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
            max_members?: number | undefined;
        }>>;
        status: z.ZodDefault<z.ZodEnum<["active", "inactive", "suspended", "pending_approval"]>>;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: "active" | "inactive" | "suspended" | "pending_approval";
        id: string;
        created_at: string;
        updated_at: string;
        name: string;
        slug: string;
        organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
        email?: string | undefined;
        country_code?: string | undefined;
        subdomain?: string | undefined;
        custom_domain?: string | undefined;
        brand_colors?: {
            primary: string;
            secondary: string;
            accent: string;
        } | undefined;
        description?: string | undefined;
        organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
        website_url?: string | undefined;
        phone?: string | undefined;
        address_line1?: string | undefined;
        address_line2?: string | undefined;
        city?: string | undefined;
        state_province?: string | undefined;
        postal_code?: string | undefined;
        founded_year?: number | undefined;
        employee_count?: number | undefined;
        annual_budget?: number | undefined;
        logo_url?: string | undefined;
        settings?: {
            allow_public_membership: boolean;
            require_approval_for_membership: boolean;
            allow_member_invites: boolean;
            default_member_role: "owner" | "admin" | "member" | "viewer";
            max_members?: number | undefined;
        } | undefined;
    }, {
        id: string;
        created_at: string;
        updated_at: string;
        name: string;
        slug: string;
        organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
        status?: "active" | "inactive" | "suspended" | "pending_approval" | undefined;
        email?: string | undefined;
        country_code?: string | undefined;
        subdomain?: string | undefined;
        custom_domain?: string | undefined;
        brand_colors?: {
            primary: string;
            secondary: string;
            accent: string;
        } | undefined;
        description?: string | undefined;
        organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
        website_url?: string | undefined;
        phone?: string | undefined;
        address_line1?: string | undefined;
        address_line2?: string | undefined;
        city?: string | undefined;
        state_province?: string | undefined;
        postal_code?: string | undefined;
        founded_year?: number | undefined;
        employee_count?: number | undefined;
        annual_budget?: number | undefined;
        logo_url?: string | undefined;
        settings?: {
            allow_public_membership?: boolean | undefined;
            require_approval_for_membership?: boolean | undefined;
            allow_member_invites?: boolean | undefined;
            default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
            max_members?: number | undefined;
        } | undefined;
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
    status: "active" | "inactive" | "suspended" | "pending";
    id: string;
    created_at: string;
    updated_at: string;
    user_id: string;
    organization_id: string;
    role: "owner" | "admin" | "member" | "viewer";
    organization: {
        status: "active" | "inactive" | "suspended" | "pending_approval";
        id: string;
        created_at: string;
        updated_at: string;
        name: string;
        slug: string;
        organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
        email?: string | undefined;
        country_code?: string | undefined;
        subdomain?: string | undefined;
        custom_domain?: string | undefined;
        brand_colors?: {
            primary: string;
            secondary: string;
            accent: string;
        } | undefined;
        description?: string | undefined;
        organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
        website_url?: string | undefined;
        phone?: string | undefined;
        address_line1?: string | undefined;
        address_line2?: string | undefined;
        city?: string | undefined;
        state_province?: string | undefined;
        postal_code?: string | undefined;
        founded_year?: number | undefined;
        employee_count?: number | undefined;
        annual_budget?: number | undefined;
        logo_url?: string | undefined;
        settings?: {
            allow_public_membership: boolean;
            require_approval_for_membership: boolean;
            allow_member_invites: boolean;
            default_member_role: "owner" | "admin" | "member" | "viewer";
            max_members?: number | undefined;
        } | undefined;
    };
    user: {
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        display_name?: string | undefined;
        avatar_url?: string | undefined;
    };
    permissions?: {
        can_manage_members: boolean;
        can_manage_content: boolean;
        can_manage_assessments: boolean;
        can_view_analytics: boolean;
        can_manage_billing: boolean;
    } | undefined;
    invited_by?: string | undefined;
    invited_at?: string | undefined;
    joined_at?: string | undefined;
}, {
    id: string;
    created_at: string;
    updated_at: string;
    user_id: string;
    organization_id: string;
    role: "owner" | "admin" | "member" | "viewer";
    organization: {
        id: string;
        created_at: string;
        updated_at: string;
        name: string;
        slug: string;
        organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
        status?: "active" | "inactive" | "suspended" | "pending_approval" | undefined;
        email?: string | undefined;
        country_code?: string | undefined;
        subdomain?: string | undefined;
        custom_domain?: string | undefined;
        brand_colors?: {
            primary: string;
            secondary: string;
            accent: string;
        } | undefined;
        description?: string | undefined;
        organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
        website_url?: string | undefined;
        phone?: string | undefined;
        address_line1?: string | undefined;
        address_line2?: string | undefined;
        city?: string | undefined;
        state_province?: string | undefined;
        postal_code?: string | undefined;
        founded_year?: number | undefined;
        employee_count?: number | undefined;
        annual_budget?: number | undefined;
        logo_url?: string | undefined;
        settings?: {
            allow_public_membership?: boolean | undefined;
            require_approval_for_membership?: boolean | undefined;
            allow_member_invites?: boolean | undefined;
            default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
            max_members?: number | undefined;
        } | undefined;
    };
    user: {
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        display_name?: string | undefined;
        avatar_url?: string | undefined;
    };
    status?: "active" | "inactive" | "suspended" | "pending" | undefined;
    permissions?: {
        can_manage_members?: boolean | undefined;
        can_manage_content?: boolean | undefined;
        can_manage_assessments?: boolean | undefined;
        can_view_analytics?: boolean | undefined;
        can_manage_billing?: boolean | undefined;
    } | undefined;
    invited_by?: string | undefined;
    invited_at?: string | undefined;
    joined_at?: string | undefined;
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
        organization_type: z.ZodEnum<["church", "denomination", "seminary", "nonprofit", "ministry", "business", "other"]>;
        organization_size: z.ZodOptional<z.ZodEnum<["startup", "small", "medium", "large", "enterprise"]>>;
        website_url: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        address_line1: z.ZodOptional<z.ZodString>;
        address_line2: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        state_province: z.ZodOptional<z.ZodString>;
        postal_code: z.ZodOptional<z.ZodString>;
        country_code: z.ZodOptional<z.ZodString>;
        founded_year: z.ZodOptional<z.ZodNumber>;
        employee_count: z.ZodOptional<z.ZodNumber>;
        annual_budget: z.ZodOptional<z.ZodNumber>;
        subdomain: z.ZodOptional<z.ZodString>;
        custom_domain: z.ZodOptional<z.ZodString>;
        logo_url: z.ZodOptional<z.ZodString>;
        brand_colors: z.ZodOptional<z.ZodObject<{
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
        }>>;
        settings: z.ZodOptional<z.ZodObject<{
            allow_public_membership: z.ZodDefault<z.ZodBoolean>;
            require_approval_for_membership: z.ZodDefault<z.ZodBoolean>;
            allow_member_invites: z.ZodDefault<z.ZodBoolean>;
            default_member_role: z.ZodDefault<z.ZodEnum<["owner", "admin", "member", "viewer"]>>;
            max_members: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            allow_public_membership: boolean;
            require_approval_for_membership: boolean;
            allow_member_invites: boolean;
            default_member_role: "owner" | "admin" | "member" | "viewer";
            max_members?: number | undefined;
        }, {
            allow_public_membership?: boolean | undefined;
            require_approval_for_membership?: boolean | undefined;
            allow_member_invites?: boolean | undefined;
            default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
            max_members?: number | undefined;
        }>>;
        status: z.ZodDefault<z.ZodEnum<["active", "inactive", "suspended", "pending_approval"]>>;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: "active" | "inactive" | "suspended" | "pending_approval";
        id: string;
        created_at: string;
        updated_at: string;
        name: string;
        slug: string;
        organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
        email?: string | undefined;
        country_code?: string | undefined;
        subdomain?: string | undefined;
        custom_domain?: string | undefined;
        brand_colors?: {
            primary: string;
            secondary: string;
            accent: string;
        } | undefined;
        description?: string | undefined;
        organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
        website_url?: string | undefined;
        phone?: string | undefined;
        address_line1?: string | undefined;
        address_line2?: string | undefined;
        city?: string | undefined;
        state_province?: string | undefined;
        postal_code?: string | undefined;
        founded_year?: number | undefined;
        employee_count?: number | undefined;
        annual_budget?: number | undefined;
        logo_url?: string | undefined;
        settings?: {
            allow_public_membership: boolean;
            require_approval_for_membership: boolean;
            allow_member_invites: boolean;
            default_member_role: "owner" | "admin" | "member" | "viewer";
            max_members?: number | undefined;
        } | undefined;
    }, {
        id: string;
        created_at: string;
        updated_at: string;
        name: string;
        slug: string;
        organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
        status?: "active" | "inactive" | "suspended" | "pending_approval" | undefined;
        email?: string | undefined;
        country_code?: string | undefined;
        subdomain?: string | undefined;
        custom_domain?: string | undefined;
        brand_colors?: {
            primary: string;
            secondary: string;
            accent: string;
        } | undefined;
        description?: string | undefined;
        organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
        website_url?: string | undefined;
        phone?: string | undefined;
        address_line1?: string | undefined;
        address_line2?: string | undefined;
        city?: string | undefined;
        state_province?: string | undefined;
        postal_code?: string | undefined;
        founded_year?: number | undefined;
        employee_count?: number | undefined;
        annual_budget?: number | undefined;
        logo_url?: string | undefined;
        settings?: {
            allow_public_membership?: boolean | undefined;
            require_approval_for_membership?: boolean | undefined;
            allow_member_invites?: boolean | undefined;
            default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
            max_members?: number | undefined;
        } | undefined;
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
        status: "active" | "inactive" | "suspended" | "pending_approval";
        id: string;
        created_at: string;
        updated_at: string;
        name: string;
        slug: string;
        organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
        email?: string | undefined;
        country_code?: string | undefined;
        subdomain?: string | undefined;
        custom_domain?: string | undefined;
        brand_colors?: {
            primary: string;
            secondary: string;
            accent: string;
        } | undefined;
        description?: string | undefined;
        organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
        website_url?: string | undefined;
        phone?: string | undefined;
        address_line1?: string | undefined;
        address_line2?: string | undefined;
        city?: string | undefined;
        state_province?: string | undefined;
        postal_code?: string | undefined;
        founded_year?: number | undefined;
        employee_count?: number | undefined;
        annual_budget?: number | undefined;
        logo_url?: string | undefined;
        settings?: {
            allow_public_membership: boolean;
            require_approval_for_membership: boolean;
            allow_member_invites: boolean;
            default_member_role: "owner" | "admin" | "member" | "viewer";
            max_members?: number | undefined;
        } | undefined;
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
        created_at: string;
        updated_at: string;
        name: string;
        slug: string;
        organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
        status?: "active" | "inactive" | "suspended" | "pending_approval" | undefined;
        email?: string | undefined;
        country_code?: string | undefined;
        subdomain?: string | undefined;
        custom_domain?: string | undefined;
        brand_colors?: {
            primary: string;
            secondary: string;
            accent: string;
        } | undefined;
        description?: string | undefined;
        organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
        website_url?: string | undefined;
        phone?: string | undefined;
        address_line1?: string | undefined;
        address_line2?: string | undefined;
        city?: string | undefined;
        state_province?: string | undefined;
        postal_code?: string | undefined;
        founded_year?: number | undefined;
        employee_count?: number | undefined;
        annual_budget?: number | undefined;
        logo_url?: string | undefined;
        settings?: {
            allow_public_membership?: boolean | undefined;
            require_approval_for_membership?: boolean | undefined;
            allow_member_invites?: boolean | undefined;
            default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
            max_members?: number | undefined;
        } | undefined;
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
            organization_type: z.ZodEnum<["church", "denomination", "seminary", "nonprofit", "ministry", "business", "other"]>;
            organization_size: z.ZodOptional<z.ZodEnum<["startup", "small", "medium", "large", "enterprise"]>>;
            website_url: z.ZodOptional<z.ZodString>;
            email: z.ZodOptional<z.ZodString>;
            phone: z.ZodOptional<z.ZodString>;
            address_line1: z.ZodOptional<z.ZodString>;
            address_line2: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state_province: z.ZodOptional<z.ZodString>;
            postal_code: z.ZodOptional<z.ZodString>;
            country_code: z.ZodOptional<z.ZodString>;
            founded_year: z.ZodOptional<z.ZodNumber>;
            employee_count: z.ZodOptional<z.ZodNumber>;
            annual_budget: z.ZodOptional<z.ZodNumber>;
            subdomain: z.ZodOptional<z.ZodString>;
            custom_domain: z.ZodOptional<z.ZodString>;
            logo_url: z.ZodOptional<z.ZodString>;
            brand_colors: z.ZodOptional<z.ZodObject<{
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
            }>>;
            settings: z.ZodOptional<z.ZodObject<{
                allow_public_membership: z.ZodDefault<z.ZodBoolean>;
                require_approval_for_membership: z.ZodDefault<z.ZodBoolean>;
                allow_member_invites: z.ZodDefault<z.ZodBoolean>;
                default_member_role: z.ZodDefault<z.ZodEnum<["owner", "admin", "member", "viewer"]>>;
                max_members: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                allow_public_membership: boolean;
                require_approval_for_membership: boolean;
                allow_member_invites: boolean;
                default_member_role: "owner" | "admin" | "member" | "viewer";
                max_members?: number | undefined;
            }, {
                allow_public_membership?: boolean | undefined;
                require_approval_for_membership?: boolean | undefined;
                allow_member_invites?: boolean | undefined;
                default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
                max_members?: number | undefined;
            }>>;
            status: z.ZodDefault<z.ZodEnum<["active", "inactive", "suspended", "pending_approval"]>>;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            status: "active" | "inactive" | "suspended" | "pending_approval";
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
            email?: string | undefined;
            country_code?: string | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            description?: string | undefined;
            organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            website_url?: string | undefined;
            phone?: string | undefined;
            address_line1?: string | undefined;
            address_line2?: string | undefined;
            city?: string | undefined;
            state_province?: string | undefined;
            postal_code?: string | undefined;
            founded_year?: number | undefined;
            employee_count?: number | undefined;
            annual_budget?: number | undefined;
            logo_url?: string | undefined;
            settings?: {
                allow_public_membership: boolean;
                require_approval_for_membership: boolean;
                allow_member_invites: boolean;
                default_member_role: "owner" | "admin" | "member" | "viewer";
                max_members?: number | undefined;
            } | undefined;
        }, {
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
            status?: "active" | "inactive" | "suspended" | "pending_approval" | undefined;
            email?: string | undefined;
            country_code?: string | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            description?: string | undefined;
            organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            website_url?: string | undefined;
            phone?: string | undefined;
            address_line1?: string | undefined;
            address_line2?: string | undefined;
            city?: string | undefined;
            state_province?: string | undefined;
            postal_code?: string | undefined;
            founded_year?: number | undefined;
            employee_count?: number | undefined;
            annual_budget?: number | undefined;
            logo_url?: string | undefined;
            settings?: {
                allow_public_membership?: boolean | undefined;
                require_approval_for_membership?: boolean | undefined;
                allow_member_invites?: boolean | undefined;
                default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
                max_members?: number | undefined;
            } | undefined;
        }>, "many">;
        total: z.ZodNumber;
        query: z.ZodString;
        took: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        query: string;
        total: number;
        organizations: {
            status: "active" | "inactive" | "suspended" | "pending_approval";
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
            email?: string | undefined;
            country_code?: string | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            description?: string | undefined;
            organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            website_url?: string | undefined;
            phone?: string | undefined;
            address_line1?: string | undefined;
            address_line2?: string | undefined;
            city?: string | undefined;
            state_province?: string | undefined;
            postal_code?: string | undefined;
            founded_year?: number | undefined;
            employee_count?: number | undefined;
            annual_budget?: number | undefined;
            logo_url?: string | undefined;
            settings?: {
                allow_public_membership: boolean;
                require_approval_for_membership: boolean;
                allow_member_invites: boolean;
                default_member_role: "owner" | "admin" | "member" | "viewer";
                max_members?: number | undefined;
            } | undefined;
        }[];
        took: number;
    }, {
        query: string;
        total: number;
        organizations: {
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
            status?: "active" | "inactive" | "suspended" | "pending_approval" | undefined;
            email?: string | undefined;
            country_code?: string | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            description?: string | undefined;
            organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            website_url?: string | undefined;
            phone?: string | undefined;
            address_line1?: string | undefined;
            address_line2?: string | undefined;
            city?: string | undefined;
            state_province?: string | undefined;
            postal_code?: string | undefined;
            founded_year?: number | undefined;
            employee_count?: number | undefined;
            annual_budget?: number | undefined;
            logo_url?: string | undefined;
            settings?: {
                allow_public_membership?: boolean | undefined;
                require_approval_for_membership?: boolean | undefined;
                allow_member_invites?: boolean | undefined;
                default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
                max_members?: number | undefined;
            } | undefined;
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
        query: string;
        total: number;
        organizations: {
            status: "active" | "inactive" | "suspended" | "pending_approval";
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
            email?: string | undefined;
            country_code?: string | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            description?: string | undefined;
            organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            website_url?: string | undefined;
            phone?: string | undefined;
            address_line1?: string | undefined;
            address_line2?: string | undefined;
            city?: string | undefined;
            state_province?: string | undefined;
            postal_code?: string | undefined;
            founded_year?: number | undefined;
            employee_count?: number | undefined;
            annual_budget?: number | undefined;
            logo_url?: string | undefined;
            settings?: {
                allow_public_membership: boolean;
                require_approval_for_membership: boolean;
                allow_member_invites: boolean;
                default_member_role: "owner" | "admin" | "member" | "viewer";
                max_members?: number | undefined;
            } | undefined;
        }[];
        took: number;
    };
    meta: {
        timestamp: string;
    };
}, {
    success: boolean;
    data: {
        query: string;
        total: number;
        organizations: {
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
            status?: "active" | "inactive" | "suspended" | "pending_approval" | undefined;
            email?: string | undefined;
            country_code?: string | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            description?: string | undefined;
            organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            website_url?: string | undefined;
            phone?: string | undefined;
            address_line1?: string | undefined;
            address_line2?: string | undefined;
            city?: string | undefined;
            state_province?: string | undefined;
            postal_code?: string | undefined;
            founded_year?: number | undefined;
            employee_count?: number | undefined;
            annual_budget?: number | undefined;
            logo_url?: string | undefined;
            settings?: {
                allow_public_membership?: boolean | undefined;
                require_approval_for_membership?: boolean | undefined;
                allow_member_invites?: boolean | undefined;
                default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
                max_members?: number | undefined;
            } | undefined;
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
        engagement_metrics: {
            daily_active_users: number;
            weekly_active_users: number;
            monthly_active_users: number;
            average_session_duration: number;
        };
        member_count: number;
        active_members: number;
        pending_invitations: number;
        content_count: number;
        assessment_completions: number;
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
        engagement_metrics: {
            daily_active_users: number;
            weekly_active_users: number;
            monthly_active_users: number;
            average_session_duration: number;
        };
        member_count: number;
        active_members: number;
        pending_invitations: number;
        content_count: number;
        assessment_completions: number;
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
        engagement_metrics: {
            daily_active_users: number;
            weekly_active_users: number;
            monthly_active_users: number;
            average_session_duration: number;
        };
        member_count: number;
        active_members: number;
        pending_invitations: number;
        content_count: number;
        assessment_completions: number;
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
        engagement_metrics: {
            daily_active_users: number;
            weekly_active_users: number;
            monthly_active_users: number;
            average_session_duration: number;
        };
        member_count: number;
        active_members: number;
        pending_invitations: number;
        content_count: number;
        assessment_completions: number;
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
            organization_type: z.ZodEnum<["church", "denomination", "seminary", "nonprofit", "ministry", "business", "other"]>;
            organization_size: z.ZodOptional<z.ZodEnum<["startup", "small", "medium", "large", "enterprise"]>>;
            website_url: z.ZodOptional<z.ZodString>;
            email: z.ZodOptional<z.ZodString>;
            phone: z.ZodOptional<z.ZodString>;
            address_line1: z.ZodOptional<z.ZodString>;
            address_line2: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state_province: z.ZodOptional<z.ZodString>;
            postal_code: z.ZodOptional<z.ZodString>;
            country_code: z.ZodOptional<z.ZodString>;
            founded_year: z.ZodOptional<z.ZodNumber>;
            employee_count: z.ZodOptional<z.ZodNumber>;
            annual_budget: z.ZodOptional<z.ZodNumber>;
            subdomain: z.ZodOptional<z.ZodString>;
            custom_domain: z.ZodOptional<z.ZodString>;
            logo_url: z.ZodOptional<z.ZodString>;
            brand_colors: z.ZodOptional<z.ZodObject<{
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
            }>>;
            settings: z.ZodOptional<z.ZodObject<{
                allow_public_membership: z.ZodDefault<z.ZodBoolean>;
                require_approval_for_membership: z.ZodDefault<z.ZodBoolean>;
                allow_member_invites: z.ZodDefault<z.ZodBoolean>;
                default_member_role: z.ZodDefault<z.ZodEnum<["owner", "admin", "member", "viewer"]>>;
                max_members: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                allow_public_membership: boolean;
                require_approval_for_membership: boolean;
                allow_member_invites: boolean;
                default_member_role: "owner" | "admin" | "member" | "viewer";
                max_members?: number | undefined;
            }, {
                allow_public_membership?: boolean | undefined;
                require_approval_for_membership?: boolean | undefined;
                allow_member_invites?: boolean | undefined;
                default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
                max_members?: number | undefined;
            }>>;
            status: z.ZodDefault<z.ZodEnum<["active", "inactive", "suspended", "pending_approval"]>>;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            status: "active" | "inactive" | "suspended" | "pending_approval";
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
            email?: string | undefined;
            country_code?: string | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            description?: string | undefined;
            organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            website_url?: string | undefined;
            phone?: string | undefined;
            address_line1?: string | undefined;
            address_line2?: string | undefined;
            city?: string | undefined;
            state_province?: string | undefined;
            postal_code?: string | undefined;
            founded_year?: number | undefined;
            employee_count?: number | undefined;
            annual_budget?: number | undefined;
            logo_url?: string | undefined;
            settings?: {
                allow_public_membership: boolean;
                require_approval_for_membership: boolean;
                allow_member_invites: boolean;
                default_member_role: "owner" | "admin" | "member" | "viewer";
                max_members?: number | undefined;
            } | undefined;
        }, {
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
            status?: "active" | "inactive" | "suspended" | "pending_approval" | undefined;
            email?: string | undefined;
            country_code?: string | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            description?: string | undefined;
            organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            website_url?: string | undefined;
            phone?: string | undefined;
            address_line1?: string | undefined;
            address_line2?: string | undefined;
            city?: string | undefined;
            state_province?: string | undefined;
            postal_code?: string | undefined;
            founded_year?: number | undefined;
            employee_count?: number | undefined;
            annual_budget?: number | undefined;
            logo_url?: string | undefined;
            settings?: {
                allow_public_membership?: boolean | undefined;
                require_approval_for_membership?: boolean | undefined;
                allow_member_invites?: boolean | undefined;
                default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
                max_members?: number | undefined;
            } | undefined;
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
            type: "content_created" | "member_joined" | "member_left" | "assessment_completed" | "invitation_sent";
            id: string;
            created_at: string;
            description: string;
            user: {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
            };
        }, {
            type: "content_created" | "member_joined" | "member_left" | "assessment_completed" | "invitation_sent";
            id: string;
            created_at: string;
            description: string;
            user: {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
            };
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
            total_views: number;
            total_content: number;
            published_content: number;
            draft_content: number;
        }, {
            total_views: number;
            total_content: number;
            published_content: number;
            draft_content: number;
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
            status: "active" | "inactive" | "suspended" | "pending_approval";
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
            email?: string | undefined;
            country_code?: string | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            description?: string | undefined;
            organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            website_url?: string | undefined;
            phone?: string | undefined;
            address_line1?: string | undefined;
            address_line2?: string | undefined;
            city?: string | undefined;
            state_province?: string | undefined;
            postal_code?: string | undefined;
            founded_year?: number | undefined;
            employee_count?: number | undefined;
            annual_budget?: number | undefined;
            logo_url?: string | undefined;
            settings?: {
                allow_public_membership: boolean;
                require_approval_for_membership: boolean;
                allow_member_invites: boolean;
                default_member_role: "owner" | "admin" | "member" | "viewer";
                max_members?: number | undefined;
            } | undefined;
        };
        recent_activity: {
            type: "content_created" | "member_joined" | "member_left" | "assessment_completed" | "invitation_sent";
            id: string;
            created_at: string;
            description: string;
            user: {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
            };
        }[];
        member_summary: {
            active_members: number;
            pending_invitations: number;
            new_members_this_week: number;
            total_members: number;
        };
        content_summary?: {
            total_views: number;
            total_content: number;
            published_content: number;
            draft_content: number;
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
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
            status?: "active" | "inactive" | "suspended" | "pending_approval" | undefined;
            email?: string | undefined;
            country_code?: string | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            description?: string | undefined;
            organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            website_url?: string | undefined;
            phone?: string | undefined;
            address_line1?: string | undefined;
            address_line2?: string | undefined;
            city?: string | undefined;
            state_province?: string | undefined;
            postal_code?: string | undefined;
            founded_year?: number | undefined;
            employee_count?: number | undefined;
            annual_budget?: number | undefined;
            logo_url?: string | undefined;
            settings?: {
                allow_public_membership?: boolean | undefined;
                require_approval_for_membership?: boolean | undefined;
                allow_member_invites?: boolean | undefined;
                default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
                max_members?: number | undefined;
            } | undefined;
        };
        member_summary: {
            active_members: number;
            pending_invitations: number;
            new_members_this_week: number;
            total_members: number;
        };
        recent_activity?: {
            type: "content_created" | "member_joined" | "member_left" | "assessment_completed" | "invitation_sent";
            id: string;
            created_at: string;
            description: string;
            user: {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
            };
        }[] | undefined;
        content_summary?: {
            total_views: number;
            total_content: number;
            published_content: number;
            draft_content: number;
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
            status: "active" | "inactive" | "suspended" | "pending_approval";
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
            email?: string | undefined;
            country_code?: string | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            description?: string | undefined;
            organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            website_url?: string | undefined;
            phone?: string | undefined;
            address_line1?: string | undefined;
            address_line2?: string | undefined;
            city?: string | undefined;
            state_province?: string | undefined;
            postal_code?: string | undefined;
            founded_year?: number | undefined;
            employee_count?: number | undefined;
            annual_budget?: number | undefined;
            logo_url?: string | undefined;
            settings?: {
                allow_public_membership: boolean;
                require_approval_for_membership: boolean;
                allow_member_invites: boolean;
                default_member_role: "owner" | "admin" | "member" | "viewer";
                max_members?: number | undefined;
            } | undefined;
        };
        recent_activity: {
            type: "content_created" | "member_joined" | "member_left" | "assessment_completed" | "invitation_sent";
            id: string;
            created_at: string;
            description: string;
            user: {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
            };
        }[];
        member_summary: {
            active_members: number;
            pending_invitations: number;
            new_members_this_week: number;
            total_members: number;
        };
        content_summary?: {
            total_views: number;
            total_content: number;
            published_content: number;
            draft_content: number;
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
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
            status?: "active" | "inactive" | "suspended" | "pending_approval" | undefined;
            email?: string | undefined;
            country_code?: string | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            description?: string | undefined;
            organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            website_url?: string | undefined;
            phone?: string | undefined;
            address_line1?: string | undefined;
            address_line2?: string | undefined;
            city?: string | undefined;
            state_province?: string | undefined;
            postal_code?: string | undefined;
            founded_year?: number | undefined;
            employee_count?: number | undefined;
            annual_budget?: number | undefined;
            logo_url?: string | undefined;
            settings?: {
                allow_public_membership?: boolean | undefined;
                require_approval_for_membership?: boolean | undefined;
                allow_member_invites?: boolean | undefined;
                default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
                max_members?: number | undefined;
            } | undefined;
        };
        member_summary: {
            active_members: number;
            pending_invitations: number;
            new_members_this_week: number;
            total_members: number;
        };
        recent_activity?: {
            type: "content_created" | "member_joined" | "member_left" | "assessment_completed" | "invitation_sent";
            id: string;
            created_at: string;
            description: string;
            user: {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
            };
        }[] | undefined;
        content_summary?: {
            total_views: number;
            total_content: number;
            published_content: number;
            draft_content: number;
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
            status: "pending" | "accepted" | "rejected" | "expired";
            id: string;
            email: string;
            organization_name: string;
            created_at: string;
            organization_id: string;
            role: "owner" | "admin" | "member" | "viewer";
            invited_by: {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
            };
            message?: string | undefined;
            expires_at?: string | undefined;
        }, {
            status: "pending" | "accepted" | "rejected" | "expired";
            id: string;
            email: string;
            organization_name: string;
            created_at: string;
            organization_id: string;
            role: "owner" | "admin" | "member" | "viewer";
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
            status: "pending" | "accepted" | "rejected" | "expired";
            id: string;
            email: string;
            organization_name: string;
            created_at: string;
            organization_id: string;
            role: "owner" | "admin" | "member" | "viewer";
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
            status: "pending" | "accepted" | "rejected" | "expired";
            id: string;
            email: string;
            organization_name: string;
            created_at: string;
            organization_id: string;
            role: "owner" | "admin" | "member" | "viewer";
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
            status: "pending" | "accepted" | "rejected" | "expired";
            id: string;
            email: string;
            organization_name: string;
            created_at: string;
            organization_id: string;
            role: "owner" | "admin" | "member" | "viewer";
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
            status: "pending" | "accepted" | "rejected" | "expired";
            id: string;
            email: string;
            organization_name: string;
            created_at: string;
            organization_id: string;
            role: "owner" | "admin" | "member" | "viewer";
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
            organization_type: z.ZodEnum<["church", "denomination", "seminary", "nonprofit", "ministry", "business", "other"]>;
            organization_size: z.ZodOptional<z.ZodEnum<["startup", "small", "medium", "large", "enterprise"]>>;
            website_url: z.ZodOptional<z.ZodString>;
            email: z.ZodOptional<z.ZodString>;
            phone: z.ZodOptional<z.ZodString>;
            address_line1: z.ZodOptional<z.ZodString>;
            address_line2: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state_province: z.ZodOptional<z.ZodString>;
            postal_code: z.ZodOptional<z.ZodString>;
            country_code: z.ZodOptional<z.ZodString>;
            founded_year: z.ZodOptional<z.ZodNumber>;
            employee_count: z.ZodOptional<z.ZodNumber>;
            annual_budget: z.ZodOptional<z.ZodNumber>;
            subdomain: z.ZodOptional<z.ZodString>;
            custom_domain: z.ZodOptional<z.ZodString>;
            logo_url: z.ZodOptional<z.ZodString>;
            brand_colors: z.ZodOptional<z.ZodObject<{
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
            }>>;
            settings: z.ZodOptional<z.ZodObject<{
                allow_public_membership: z.ZodDefault<z.ZodBoolean>;
                require_approval_for_membership: z.ZodDefault<z.ZodBoolean>;
                allow_member_invites: z.ZodDefault<z.ZodBoolean>;
                default_member_role: z.ZodDefault<z.ZodEnum<["owner", "admin", "member", "viewer"]>>;
                max_members: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                allow_public_membership: boolean;
                require_approval_for_membership: boolean;
                allow_member_invites: boolean;
                default_member_role: "owner" | "admin" | "member" | "viewer";
                max_members?: number | undefined;
            }, {
                allow_public_membership?: boolean | undefined;
                require_approval_for_membership?: boolean | undefined;
                allow_member_invites?: boolean | undefined;
                default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
                max_members?: number | undefined;
            }>>;
            status: z.ZodDefault<z.ZodEnum<["active", "inactive", "suspended", "pending_approval"]>>;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            status: "active" | "inactive" | "suspended" | "pending_approval";
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
            email?: string | undefined;
            country_code?: string | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            description?: string | undefined;
            organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            website_url?: string | undefined;
            phone?: string | undefined;
            address_line1?: string | undefined;
            address_line2?: string | undefined;
            city?: string | undefined;
            state_province?: string | undefined;
            postal_code?: string | undefined;
            founded_year?: number | undefined;
            employee_count?: number | undefined;
            annual_budget?: number | undefined;
            logo_url?: string | undefined;
            settings?: {
                allow_public_membership: boolean;
                require_approval_for_membership: boolean;
                allow_member_invites: boolean;
                default_member_role: "owner" | "admin" | "member" | "viewer";
                max_members?: number | undefined;
            } | undefined;
        }, {
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
            status?: "active" | "inactive" | "suspended" | "pending_approval" | undefined;
            email?: string | undefined;
            country_code?: string | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            description?: string | undefined;
            organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            website_url?: string | undefined;
            phone?: string | undefined;
            address_line1?: string | undefined;
            address_line2?: string | undefined;
            city?: string | undefined;
            state_province?: string | undefined;
            postal_code?: string | undefined;
            founded_year?: number | undefined;
            employee_count?: number | undefined;
            annual_budget?: number | undefined;
            logo_url?: string | undefined;
            settings?: {
                allow_public_membership?: boolean | undefined;
                require_approval_for_membership?: boolean | undefined;
                allow_member_invites?: boolean | undefined;
                default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
                max_members?: number | undefined;
            } | undefined;
        }>;
        updated_settings: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        organization: {
            status: "active" | "inactive" | "suspended" | "pending_approval";
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
            email?: string | undefined;
            country_code?: string | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            description?: string | undefined;
            organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            website_url?: string | undefined;
            phone?: string | undefined;
            address_line1?: string | undefined;
            address_line2?: string | undefined;
            city?: string | undefined;
            state_province?: string | undefined;
            postal_code?: string | undefined;
            founded_year?: number | undefined;
            employee_count?: number | undefined;
            annual_budget?: number | undefined;
            logo_url?: string | undefined;
            settings?: {
                allow_public_membership: boolean;
                require_approval_for_membership: boolean;
                allow_member_invites: boolean;
                default_member_role: "owner" | "admin" | "member" | "viewer";
                max_members?: number | undefined;
            } | undefined;
        };
        updated_settings: string[];
    }, {
        organization: {
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
            status?: "active" | "inactive" | "suspended" | "pending_approval" | undefined;
            email?: string | undefined;
            country_code?: string | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            description?: string | undefined;
            organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            website_url?: string | undefined;
            phone?: string | undefined;
            address_line1?: string | undefined;
            address_line2?: string | undefined;
            city?: string | undefined;
            state_province?: string | undefined;
            postal_code?: string | undefined;
            founded_year?: number | undefined;
            employee_count?: number | undefined;
            annual_budget?: number | undefined;
            logo_url?: string | undefined;
            settings?: {
                allow_public_membership?: boolean | undefined;
                require_approval_for_membership?: boolean | undefined;
                allow_member_invites?: boolean | undefined;
                default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
                max_members?: number | undefined;
            } | undefined;
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
            status: "active" | "inactive" | "suspended" | "pending_approval";
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
            email?: string | undefined;
            country_code?: string | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            description?: string | undefined;
            organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            website_url?: string | undefined;
            phone?: string | undefined;
            address_line1?: string | undefined;
            address_line2?: string | undefined;
            city?: string | undefined;
            state_province?: string | undefined;
            postal_code?: string | undefined;
            founded_year?: number | undefined;
            employee_count?: number | undefined;
            annual_budget?: number | undefined;
            logo_url?: string | undefined;
            settings?: {
                allow_public_membership: boolean;
                require_approval_for_membership: boolean;
                allow_member_invites: boolean;
                default_member_role: "owner" | "admin" | "member" | "viewer";
                max_members?: number | undefined;
            } | undefined;
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
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
            status?: "active" | "inactive" | "suspended" | "pending_approval" | undefined;
            email?: string | undefined;
            country_code?: string | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            description?: string | undefined;
            organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            website_url?: string | undefined;
            phone?: string | undefined;
            address_line1?: string | undefined;
            address_line2?: string | undefined;
            city?: string | undefined;
            state_province?: string | undefined;
            postal_code?: string | undefined;
            founded_year?: number | undefined;
            employee_count?: number | undefined;
            annual_budget?: number | undefined;
            logo_url?: string | undefined;
            settings?: {
                allow_public_membership?: boolean | undefined;
                require_approval_for_membership?: boolean | undefined;
                allow_member_invites?: boolean | undefined;
                default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
                max_members?: number | undefined;
            } | undefined;
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
            organization_type: z.ZodEnum<["church", "denomination", "seminary", "nonprofit", "ministry", "business", "other"]>;
            organization_size: z.ZodOptional<z.ZodEnum<["startup", "small", "medium", "large", "enterprise"]>>;
            website_url: z.ZodOptional<z.ZodString>;
            email: z.ZodOptional<z.ZodString>;
            phone: z.ZodOptional<z.ZodString>;
            address_line1: z.ZodOptional<z.ZodString>;
            address_line2: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state_province: z.ZodOptional<z.ZodString>;
            postal_code: z.ZodOptional<z.ZodString>;
            country_code: z.ZodOptional<z.ZodString>;
            founded_year: z.ZodOptional<z.ZodNumber>;
            employee_count: z.ZodOptional<z.ZodNumber>;
            annual_budget: z.ZodOptional<z.ZodNumber>;
            subdomain: z.ZodOptional<z.ZodString>;
            custom_domain: z.ZodOptional<z.ZodString>;
            logo_url: z.ZodOptional<z.ZodString>;
            brand_colors: z.ZodOptional<z.ZodObject<{
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
            }>>;
            settings: z.ZodOptional<z.ZodObject<{
                allow_public_membership: z.ZodDefault<z.ZodBoolean>;
                require_approval_for_membership: z.ZodDefault<z.ZodBoolean>;
                allow_member_invites: z.ZodDefault<z.ZodBoolean>;
                default_member_role: z.ZodDefault<z.ZodEnum<["owner", "admin", "member", "viewer"]>>;
                max_members: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                allow_public_membership: boolean;
                require_approval_for_membership: boolean;
                allow_member_invites: boolean;
                default_member_role: "owner" | "admin" | "member" | "viewer";
                max_members?: number | undefined;
            }, {
                allow_public_membership?: boolean | undefined;
                require_approval_for_membership?: boolean | undefined;
                allow_member_invites?: boolean | undefined;
                default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
                max_members?: number | undefined;
            }>>;
            status: z.ZodDefault<z.ZodEnum<["active", "inactive", "suspended", "pending_approval"]>>;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            status: "active" | "inactive" | "suspended" | "pending_approval";
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
            email?: string | undefined;
            country_code?: string | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            description?: string | undefined;
            organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            website_url?: string | undefined;
            phone?: string | undefined;
            address_line1?: string | undefined;
            address_line2?: string | undefined;
            city?: string | undefined;
            state_province?: string | undefined;
            postal_code?: string | undefined;
            founded_year?: number | undefined;
            employee_count?: number | undefined;
            annual_budget?: number | undefined;
            logo_url?: string | undefined;
            settings?: {
                allow_public_membership: boolean;
                require_approval_for_membership: boolean;
                allow_member_invites: boolean;
                default_member_role: "owner" | "admin" | "member" | "viewer";
                max_members?: number | undefined;
            } | undefined;
        }, {
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
            status?: "active" | "inactive" | "suspended" | "pending_approval" | undefined;
            email?: string | undefined;
            country_code?: string | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            description?: string | undefined;
            organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            website_url?: string | undefined;
            phone?: string | undefined;
            address_line1?: string | undefined;
            address_line2?: string | undefined;
            city?: string | undefined;
            state_province?: string | undefined;
            postal_code?: string | undefined;
            founded_year?: number | undefined;
            employee_count?: number | undefined;
            annual_budget?: number | undefined;
            logo_url?: string | undefined;
            settings?: {
                allow_public_membership?: boolean | undefined;
                require_approval_for_membership?: boolean | undefined;
                allow_member_invites?: boolean | undefined;
                default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
                max_members?: number | undefined;
            } | undefined;
        }>;
        updated_branding: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        organization: {
            status: "active" | "inactive" | "suspended" | "pending_approval";
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
            email?: string | undefined;
            country_code?: string | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            description?: string | undefined;
            organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            website_url?: string | undefined;
            phone?: string | undefined;
            address_line1?: string | undefined;
            address_line2?: string | undefined;
            city?: string | undefined;
            state_province?: string | undefined;
            postal_code?: string | undefined;
            founded_year?: number | undefined;
            employee_count?: number | undefined;
            annual_budget?: number | undefined;
            logo_url?: string | undefined;
            settings?: {
                allow_public_membership: boolean;
                require_approval_for_membership: boolean;
                allow_member_invites: boolean;
                default_member_role: "owner" | "admin" | "member" | "viewer";
                max_members?: number | undefined;
            } | undefined;
        };
        updated_branding: string[];
    }, {
        organization: {
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
            status?: "active" | "inactive" | "suspended" | "pending_approval" | undefined;
            email?: string | undefined;
            country_code?: string | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            description?: string | undefined;
            organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            website_url?: string | undefined;
            phone?: string | undefined;
            address_line1?: string | undefined;
            address_line2?: string | undefined;
            city?: string | undefined;
            state_province?: string | undefined;
            postal_code?: string | undefined;
            founded_year?: number | undefined;
            employee_count?: number | undefined;
            annual_budget?: number | undefined;
            logo_url?: string | undefined;
            settings?: {
                allow_public_membership?: boolean | undefined;
                require_approval_for_membership?: boolean | undefined;
                allow_member_invites?: boolean | undefined;
                default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
                max_members?: number | undefined;
            } | undefined;
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
            status: "active" | "inactive" | "suspended" | "pending_approval";
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
            email?: string | undefined;
            country_code?: string | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            description?: string | undefined;
            organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            website_url?: string | undefined;
            phone?: string | undefined;
            address_line1?: string | undefined;
            address_line2?: string | undefined;
            city?: string | undefined;
            state_province?: string | undefined;
            postal_code?: string | undefined;
            founded_year?: number | undefined;
            employee_count?: number | undefined;
            annual_budget?: number | undefined;
            logo_url?: string | undefined;
            settings?: {
                allow_public_membership: boolean;
                require_approval_for_membership: boolean;
                allow_member_invites: boolean;
                default_member_role: "owner" | "admin" | "member" | "viewer";
                max_members?: number | undefined;
            } | undefined;
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
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
            status?: "active" | "inactive" | "suspended" | "pending_approval" | undefined;
            email?: string | undefined;
            country_code?: string | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            description?: string | undefined;
            organization_size?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            website_url?: string | undefined;
            phone?: string | undefined;
            address_line1?: string | undefined;
            address_line2?: string | undefined;
            city?: string | undefined;
            state_province?: string | undefined;
            postal_code?: string | undefined;
            founded_year?: number | undefined;
            employee_count?: number | undefined;
            annual_budget?: number | undefined;
            logo_url?: string | undefined;
            settings?: {
                allow_public_membership?: boolean | undefined;
                require_approval_for_membership?: boolean | undefined;
                allow_member_invites?: boolean | undefined;
                default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
                max_members?: number | undefined;
            } | undefined;
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
    include_statistics: boolean;
    include_members: boolean;
    include_settings: boolean;
}, {
    id: string;
    include_statistics?: boolean | undefined;
    include_members?: boolean | undefined;
    include_settings?: boolean | undefined;
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
    id: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    website_url: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    email: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    phone: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    address_line1: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    address_line2: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    city: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    state_province: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    postal_code: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    founded_year: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    employee_count: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    annual_budget: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    subdomain: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    custom_domain: z.ZodOptional<z.ZodOptional<z.ZodString>>;
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
    settings: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        allow_public_membership: z.ZodDefault<z.ZodBoolean>;
        require_approval_for_membership: z.ZodDefault<z.ZodBoolean>;
        allow_member_invites: z.ZodDefault<z.ZodBoolean>;
        default_member_role: z.ZodDefault<z.ZodEnum<["owner", "admin", "member", "viewer"]>>;
        max_members: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        allow_public_membership: boolean;
        require_approval_for_membership: boolean;
        allow_member_invites: boolean;
        default_member_role: "owner" | "admin" | "member" | "viewer";
        max_members?: number | undefined;
    }, {
        allow_public_membership?: boolean | undefined;
        require_approval_for_membership?: boolean | undefined;
        allow_member_invites?: boolean | undefined;
        default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
        max_members?: number | undefined;
    }>>>;
    created_at: z.ZodOptional<z.ZodString>;
    updated_at: z.ZodOptional<z.ZodString>;
} & {
    search: z.ZodOptional<z.ZodString>;
    organization_type: z.ZodOptional<z.ZodArray<z.ZodEnum<["church", "denomination", "seminary", "nonprofit", "ministry", "business", "other"]>, "many">>;
    organization_size: z.ZodOptional<z.ZodArray<z.ZodEnum<["startup", "small", "medium", "large", "enterprise"]>, "many">>;
    status: z.ZodOptional<z.ZodArray<z.ZodEnum<["active", "inactive", "suspended", "pending_approval"]>, "many">>;
    country_code: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    created_after: z.ZodOptional<z.ZodString>;
    created_before: z.ZodOptional<z.ZodString>;
    founded_after: z.ZodOptional<z.ZodNumber>;
    founded_before: z.ZodOptional<z.ZodNumber>;
    employee_count_min: z.ZodOptional<z.ZodNumber>;
    employee_count_max: z.ZodOptional<z.ZodNumber>;
    annual_budget_min: z.ZodOptional<z.ZodNumber>;
    annual_budget_max: z.ZodOptional<z.ZodNumber>;
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
    offset: number;
    sort_by: "created_at" | "updated_at" | "name" | "employee_count";
    sort_order: "asc" | "desc";
    include_statistics: boolean;
    include_members: boolean;
    status?: ("active" | "inactive" | "suspended" | "pending_approval")[] | undefined;
    id?: string | undefined;
    email?: string | undefined;
    country_code?: string[] | undefined;
    subdomain?: string | undefined;
    custom_domain?: string | undefined;
    brand_colors?: {
        primary: string;
        secondary: string;
        accent: string;
    } | undefined;
    created_at?: string | undefined;
    updated_at?: string | undefined;
    search?: string | undefined;
    created_after?: string | undefined;
    created_before?: string | undefined;
    name?: string | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    organization_type?: ("other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business")[] | undefined;
    organization_size?: ("startup" | "small" | "medium" | "large" | "enterprise")[] | undefined;
    website_url?: string | undefined;
    phone?: string | undefined;
    address_line1?: string | undefined;
    address_line2?: string | undefined;
    city?: string | undefined;
    state_province?: string | undefined;
    postal_code?: string | undefined;
    founded_year?: number | undefined;
    employee_count?: number | undefined;
    annual_budget?: number | undefined;
    logo_url?: string | undefined;
    settings?: {
        allow_public_membership: boolean;
        require_approval_for_membership: boolean;
        allow_member_invites: boolean;
        default_member_role: "owner" | "admin" | "member" | "viewer";
        max_members?: number | undefined;
    } | undefined;
    founded_after?: number | undefined;
    founded_before?: number | undefined;
    employee_count_min?: number | undefined;
    employee_count_max?: number | undefined;
    annual_budget_min?: number | undefined;
    annual_budget_max?: number | undefined;
}, {
    status?: ("active" | "inactive" | "suspended" | "pending_approval")[] | undefined;
    id?: string | undefined;
    email?: string | undefined;
    country_code?: string[] | undefined;
    subdomain?: string | undefined;
    custom_domain?: string | undefined;
    brand_colors?: {
        primary: string;
        secondary: string;
        accent: string;
    } | undefined;
    created_at?: string | undefined;
    updated_at?: string | undefined;
    search?: string | undefined;
    created_after?: string | undefined;
    created_before?: string | undefined;
    name?: string | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    organization_type?: ("other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business")[] | undefined;
    organization_size?: ("startup" | "small" | "medium" | "large" | "enterprise")[] | undefined;
    website_url?: string | undefined;
    phone?: string | undefined;
    address_line1?: string | undefined;
    address_line2?: string | undefined;
    city?: string | undefined;
    state_province?: string | undefined;
    postal_code?: string | undefined;
    founded_year?: number | undefined;
    employee_count?: number | undefined;
    annual_budget?: number | undefined;
    logo_url?: string | undefined;
    settings?: {
        allow_public_membership?: boolean | undefined;
        require_approval_for_membership?: boolean | undefined;
        allow_member_invites?: boolean | undefined;
        default_member_role?: "owner" | "admin" | "member" | "viewer" | undefined;
        max_members?: number | undefined;
    } | undefined;
    founded_after?: number | undefined;
    founded_before?: number | undefined;
    employee_count_min?: number | undefined;
    employee_count_max?: number | undefined;
    annual_budget_min?: number | undefined;
    annual_budget_max?: number | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    sort_by?: "created_at" | "updated_at" | "name" | "employee_count" | undefined;
    sort_order?: "asc" | "desc" | undefined;
    include_statistics?: boolean | undefined;
    include_members?: boolean | undefined;
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
    id: z.ZodOptional<z.ZodString>;
    permissions: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        can_manage_members: z.ZodDefault<z.ZodBoolean>;
        can_manage_content: z.ZodDefault<z.ZodBoolean>;
        can_manage_assessments: z.ZodDefault<z.ZodBoolean>;
        can_view_analytics: z.ZodDefault<z.ZodBoolean>;
        can_manage_billing: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        can_manage_members: boolean;
        can_manage_content: boolean;
        can_manage_assessments: boolean;
        can_view_analytics: boolean;
        can_manage_billing: boolean;
    }, {
        can_manage_members?: boolean | undefined;
        can_manage_content?: boolean | undefined;
        can_manage_assessments?: boolean | undefined;
        can_view_analytics?: boolean | undefined;
        can_manage_billing?: boolean | undefined;
    }>>>;
    invited_by: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    invited_at: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    joined_at: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    created_at: z.ZodOptional<z.ZodString>;
    updated_at: z.ZodOptional<z.ZodString>;
} & {
    organization_id: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    user_id: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    role: z.ZodOptional<z.ZodArray<z.ZodEnum<["owner", "admin", "member", "viewer"]>, "many">>;
    status: z.ZodOptional<z.ZodArray<z.ZodEnum<["active", "inactive", "pending", "suspended"]>, "many">>;
    created_after: z.ZodOptional<z.ZodString>;
    created_before: z.ZodOptional<z.ZodString>;
    joined_after: z.ZodOptional<z.ZodString>;
    joined_before: z.ZodOptional<z.ZodString>;
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
    offset: number;
    sort_by: "status" | "created_at" | "role" | "joined_at";
    sort_order: "asc" | "desc";
    include_user_details: boolean;
    include_organization_details: boolean;
    status?: ("active" | "inactive" | "suspended" | "pending")[] | undefined;
    id?: string | undefined;
    created_at?: string | undefined;
    updated_at?: string | undefined;
    created_after?: string | undefined;
    created_before?: string | undefined;
    user_id?: string[] | undefined;
    organization_id?: string[] | undefined;
    role?: ("owner" | "admin" | "member" | "viewer")[] | undefined;
    permissions?: {
        can_manage_members: boolean;
        can_manage_content: boolean;
        can_manage_assessments: boolean;
        can_view_analytics: boolean;
        can_manage_billing: boolean;
    } | undefined;
    invited_by?: string | undefined;
    invited_at?: string | undefined;
    joined_at?: string | undefined;
    joined_after?: string | undefined;
    joined_before?: string | undefined;
}, {
    status?: ("active" | "inactive" | "suspended" | "pending")[] | undefined;
    id?: string | undefined;
    created_at?: string | undefined;
    updated_at?: string | undefined;
    created_after?: string | undefined;
    created_before?: string | undefined;
    user_id?: string[] | undefined;
    organization_id?: string[] | undefined;
    role?: ("owner" | "admin" | "member" | "viewer")[] | undefined;
    permissions?: {
        can_manage_members?: boolean | undefined;
        can_manage_content?: boolean | undefined;
        can_manage_assessments?: boolean | undefined;
        can_view_analytics?: boolean | undefined;
        can_manage_billing?: boolean | undefined;
    } | undefined;
    invited_by?: string | undefined;
    invited_at?: string | undefined;
    joined_at?: string | undefined;
    joined_after?: string | undefined;
    joined_before?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    sort_by?: "status" | "created_at" | "role" | "joined_at" | undefined;
    sort_order?: "asc" | "desc" | undefined;
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