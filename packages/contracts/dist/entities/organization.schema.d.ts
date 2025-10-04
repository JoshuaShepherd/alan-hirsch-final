import { z } from 'zod';
export declare const organizationStatusSchema: z.ZodEnum<["active", "inactive", "suspended", "pending_approval"]>;
export declare const organizationSizeSchema: z.ZodEnum<["startup", "small", "medium", "large", "enterprise"]>;
/**
 * Complete Organization Entity Schema
 * This is the single source of truth for all organization data structures
 */
export declare const OrganizationEntitySchema: z.ZodObject<{
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
 * Complete Organization Membership Entity Schema
 * This is the single source of truth for all organization membership data structures
 */
export declare const OrganizationMembershipEntitySchema: z.ZodObject<{
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
 * Create Organization Schema - Derived from Entity
 * Omits auto-generated fields
 */
export declare const CreateOrganizationSchema: z.ZodObject<Omit<{
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
}, "id" | "created_at" | "updated_at">, "strip", z.ZodTypeAny, {
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
 * Update Organization Schema - Derived from Create Schema
 * Makes all fields optional for partial updates
 */
export declare const UpdateOrganizationSchema: z.ZodObject<{
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
}>;
/**
 * Organization Query Schema - For filtering and searching
 * Extends entity with optional filters
 */
export declare const OrganizationQuerySchema: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
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
}>;
/**
 * Create Organization Membership Schema - Derived from Entity
 * Omits auto-generated fields
 */
export declare const CreateOrganizationMembershipSchema: z.ZodObject<Omit<{
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
}, "id" | "created_at" | "updated_at">, "strip", z.ZodTypeAny, {
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
 * Update Organization Membership Schema - Derived from Create Schema
 * Makes all fields optional for partial updates
 */
export declare const UpdateOrganizationMembershipSchema: z.ZodObject<{
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
}>;
/**
 * Organization Membership Query Schema - For filtering and searching
 * Extends entity with optional filters
 */
export declare const OrganizationMembershipQuerySchema: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
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
}>;
/**
 * Organization Form Schema - For form validation
 * Extends create schema with form-specific fields
 */
export declare const OrganizationFormSchema: z.ZodObject<Omit<{
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
}, "id" | "created_at" | "updated_at"> & {
    terms_accepted: z.ZodEffects<z.ZodBoolean, boolean, boolean>;
    privacy_policy_accepted: z.ZodEffects<z.ZodBoolean, boolean, boolean>;
}, "strip", z.ZodTypeAny, {
    status: "active" | "inactive" | "suspended" | "pending_approval";
    terms_accepted: boolean;
    name: string;
    slug: string;
    organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
    privacy_policy_accepted: boolean;
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
    terms_accepted: boolean;
    name: string;
    slug: string;
    organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
    privacy_policy_accepted: boolean;
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
 * Organization Invitation Schema - For inviting members
 * Extends membership schema with invitation-specific fields
 */
export declare const OrganizationInvitationSchema: z.ZodObject<{
    organization_id: z.ZodString;
    email: z.ZodString;
    role: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
    message: z.ZodOptional<z.ZodString>;
    expires_at: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    organization_id: string;
    role: "owner" | "admin" | "member" | "viewer";
    message?: string | undefined;
    expires_at?: string | undefined;
}, {
    email: string;
    organization_id: string;
    role: "owner" | "admin" | "member" | "viewer";
    message?: string | undefined;
    expires_at?: string | undefined;
}>;
export type OrganizationEntity = z.infer<typeof OrganizationEntitySchema>;
export type CreateOrganization = z.infer<typeof CreateOrganizationSchema>;
export type UpdateOrganization = z.infer<typeof UpdateOrganizationSchema>;
export type OrganizationQuery = z.infer<typeof OrganizationQuerySchema>;
export type OrganizationForm = z.infer<typeof OrganizationFormSchema>;
export type OrganizationInvitation = z.infer<typeof OrganizationInvitationSchema>;
export type OrganizationMembershipEntity = z.infer<typeof OrganizationMembershipEntitySchema>;
export type CreateOrganizationMembership = z.infer<typeof CreateOrganizationMembershipSchema>;
export type UpdateOrganizationMembership = z.infer<typeof UpdateOrganizationMembershipSchema>;
export type OrganizationMembershipQuery = z.infer<typeof OrganizationMembershipQuerySchema>;
export type OrganizationStatus = z.infer<typeof organizationStatusSchema>;
export type OrganizationSize = z.infer<typeof organizationSizeSchema>;
//# sourceMappingURL=organization.schema.d.ts.map