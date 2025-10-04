import { z } from 'zod';
/**
 * Create Organization Operation Schema
 * Derived from CreateOrganizationSchema with operation-specific validation
 */
export declare const CreateOrganizationOperationSchema: z.ZodObject<{
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
 * Update Organization Operation Schema
 * Derived from UpdateOrganizationSchema with operation-specific validation
 */
export declare const UpdateOrganizationOperationSchema: z.ZodEffects<z.ZodObject<{
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
 * Create Organization Membership Operation Schema
 * Derived from CreateOrganizationMembershipSchema with operation-specific validation
 */
export declare const CreateOrganizationMembershipOperationSchema: z.ZodObject<{
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
 * Update Organization Membership Operation Schema
 * Derived from UpdateOrganizationMembershipSchema with operation-specific validation
 */
export declare const UpdateOrganizationMembershipOperationSchema: z.ZodEffects<z.ZodObject<{
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
 * Invite User to Organization Operation Schema
 * Send invitation to join organization
 */
export declare const InviteUserToOrganizationOperationSchema: z.ZodObject<{
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