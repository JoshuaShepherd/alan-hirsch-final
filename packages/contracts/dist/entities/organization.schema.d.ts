import { z } from 'zod';
export declare const organizationEntitySchema: z.ZodObject<{
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
export declare const organizationMembershipEntitySchema: z.ZodObject<{
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
export declare const organizationResponseSchema: z.ZodObject<{
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
    isActive: z.ZodBoolean;
    isTrial: z.ZodBoolean;
    hasCustomLogo: z.ZodBoolean;
    hasWebsite: z.ZodBoolean;
    memberCount: z.ZodNumber;
    displayName: z.ZodString;
    statusDisplay: z.ZodString;
    licenseTypeDisplay: z.ZodString;
    owner: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        firstName: z.ZodString;
        lastName: z.ZodString;
        email: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    }, {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    }>>;
    members: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        userId: z.ZodString;
        role: z.ZodString;
        status: z.ZodString;
        joinedAt: z.ZodString;
        user: z.ZodObject<{
            id: z.ZodString;
            firstName: z.ZodString;
            lastName: z.ZodString;
            email: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        }, {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        status: string;
        role: string;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
        userId: string;
        joinedAt: string;
    }, {
        id: string;
        status: string;
        role: string;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
        userId: string;
        joinedAt: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    id: string;
    displayName: string;
    status: "active" | "suspended" | "trial" | "cancelled";
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    name: string;
    slug: string;
    memberCount: number;
    licenseType: "individual" | "enterprise" | "team";
    organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
    maxUsers: number;
    isTrial: boolean;
    hasCustomLogo: boolean;
    hasWebsite: boolean;
    statusDisplay: string;
    licenseTypeDisplay: string;
    owner?: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    } | undefined;
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
    members?: {
        id: string;
        status: string;
        role: string;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
        userId: string;
        joinedAt: string;
    }[] | undefined;
}, {
    id: string;
    displayName: string;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    name: string;
    slug: string;
    memberCount: number;
    organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
    isTrial: boolean;
    hasCustomLogo: boolean;
    hasWebsite: boolean;
    statusDisplay: string;
    licenseTypeDisplay: string;
    status?: "active" | "suspended" | "trial" | "cancelled" | undefined;
    owner?: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    } | undefined;
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
        status: string;
        role: string;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
        userId: string;
        joinedAt: string;
    }[] | undefined;
}>;
export declare const organizationMembershipResponseSchema: z.ZodObject<{
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
    isActive: z.ZodBoolean;
    isPending: z.ZodBoolean;
    canManage: z.ZodBoolean;
    roleDisplay: z.ZodString;
    statusDisplay: z.ZodString;
    user: z.ZodObject<{
        id: z.ZodString;
        firstName: z.ZodString;
        lastName: z.ZodString;
        email: z.ZodString;
        avatarUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        avatarUrl?: string | undefined;
    }, {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        avatarUrl?: string | undefined;
    }>;
    organization: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        logoUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        slug: string;
        logoUrl?: string | undefined;
    }, {
        id: string;
        name: string;
        slug: string;
        logoUrl?: string | undefined;
    }>;
    invitedByUser: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        firstName: z.ZodString;
        lastName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        firstName: string;
        lastName: string;
    }, {
        id: string;
        firstName: string;
        lastName: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: "active" | "inactive" | "pending" | "cancelled";
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    organization: {
        id: string;
        name: string;
        slug: string;
        logoUrl?: string | undefined;
    };
    organizationId: string;
    role: "owner" | "admin" | "member" | "viewer";
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        avatarUrl?: string | undefined;
    };
    userId: string;
    permissions: string[];
    statusDisplay: string;
    isPending: boolean;
    canManage: boolean;
    roleDisplay: string;
    joinedAt?: string | undefined;
    invitedAt?: string | undefined;
    invitedBy?: string | undefined;
    invitedByUser?: {
        id: string;
        firstName: string;
        lastName: string;
    } | undefined;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    organization: {
        id: string;
        name: string;
        slug: string;
        logoUrl?: string | undefined;
    };
    organizationId: string;
    role: "owner" | "admin" | "member" | "viewer";
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        avatarUrl?: string | undefined;
    };
    userId: string;
    statusDisplay: string;
    isPending: boolean;
    canManage: boolean;
    roleDisplay: string;
    status?: "active" | "inactive" | "pending" | "cancelled" | undefined;
    permissions?: string[] | undefined;
    joinedAt?: string | undefined;
    invitedAt?: string | undefined;
    invitedBy?: string | undefined;
    invitedByUser?: {
        id: string;
        firstName: string;
        lastName: string;
    } | undefined;
}>;
export declare const createOrganizationSchema: z.ZodObject<{
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
} & {
    name: z.ZodString;
    slug: z.ZodString;
    organizationType: z.ZodEnum<["church", "denomination", "seminary", "ministry_network", "nonprofit", "business", "other"]>;
}, "strip", z.ZodTypeAny, {
    status: "active" | "suspended" | "trial" | "cancelled";
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
export declare const updateOrganizationSchema: z.ZodObject<Omit<{
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
}>;
export declare const createOrganizationMembershipSchema: z.ZodObject<{
    status: z.ZodDefault<z.ZodEnum<["pending", "active", "inactive", "cancelled"]>>;
    permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    invitedAt: z.ZodOptional<z.ZodString>;
    invitedBy: z.ZodOptional<z.ZodString>;
} & {
    userId: z.ZodString;
    organizationId: z.ZodString;
    role: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
}, "strip", z.ZodTypeAny, {
    status: "active" | "inactive" | "pending" | "cancelled";
    organizationId: string;
    role: "owner" | "admin" | "member" | "viewer";
    userId: string;
    permissions: string[];
    invitedAt?: string | undefined;
    invitedBy?: string | undefined;
}, {
    organizationId: string;
    role: "owner" | "admin" | "member" | "viewer";
    userId: string;
    status?: "active" | "inactive" | "pending" | "cancelled" | undefined;
    permissions?: string[] | undefined;
    invitedAt?: string | undefined;
    invitedBy?: string | undefined;
}>;
export declare const updateOrganizationMembershipSchema: z.ZodObject<Omit<{
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
}>;
export declare const organizationQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
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
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "createdAt" | "updatedAt" | "name" | "memberCount" | "organizationType";
    sortOrder: "asc" | "desc";
    includeOwner: boolean;
    includeMembers: boolean;
    includeMemberCount: boolean;
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
    licenseType?: string | undefined;
    organizationType?: string | undefined;
    sizeCategory?: string | undefined;
    includeOwner?: boolean | undefined;
    includeMembers?: boolean | undefined;
    includeMemberCount?: boolean | undefined;
}>;
export declare const organizationMembershipQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    organizationId: z.ZodOptional<z.ZodString>;
    userId: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodString>;
    sortBy: z.ZodDefault<z.ZodEnum<["createdAt", "joinedAt", "role", "status"]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    includeUser: z.ZodDefault<z.ZodBoolean>;
    includeOrganization: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "status" | "createdAt" | "role" | "joinedAt";
    sortOrder: "asc" | "desc";
    includeOrganization: boolean;
    includeUser: boolean;
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
    userId?: string | undefined;
    includeUser?: boolean | undefined;
}>;
export declare const organizationFormSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    website: z.ZodOptional<z.ZodString>;
    organizationType: z.ZodEnum<["church", "denomination", "seminary", "ministry_network", "nonprofit", "business", "other"]>;
    sizeCategory: z.ZodOptional<z.ZodEnum<["startup", "small", "medium", "large", "enterprise"]>>;
    contactEmail: z.ZodOptional<z.ZodString>;
    contactPhone: z.ZodOptional<z.ZodString>;
    billingEmail: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodObject<{
        street: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        state: z.ZodOptional<z.ZodString>;
        postalCode: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
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
}, "strip", z.ZodTypeAny, {
    name: string;
    licenseType: "individual" | "enterprise" | "team";
    organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
    maxUsers: number;
    description?: string | undefined;
    website?: string | undefined;
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
}, {
    name: string;
    organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
    description?: string | undefined;
    licenseType?: "individual" | "enterprise" | "team" | undefined;
    website?: string | undefined;
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
}>;
export declare const organizationInvitationSchema: z.ZodObject<{
    email: z.ZodString;
    role: z.ZodDefault<z.ZodEnum<["admin", "member", "viewer"]>>;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    role: "admin" | "member" | "viewer";
    message?: string | undefined;
}, {
    email: string;
    message?: string | undefined;
    role?: "admin" | "member" | "viewer" | undefined;
}>;
export type OrganizationEntity = z.infer<typeof organizationEntitySchema>;
export type OrganizationMembershipEntity = z.infer<typeof organizationMembershipEntitySchema>;
export type OrganizationResponse = z.infer<typeof organizationResponseSchema>;
export type OrganizationMembershipResponse = z.infer<typeof organizationMembershipResponseSchema>;
export type CreateOrganization = z.infer<typeof createOrganizationSchema>;
export type UpdateOrganization = z.infer<typeof updateOrganizationSchema>;
export type CreateOrganizationMembership = z.infer<typeof createOrganizationMembershipSchema>;
export type UpdateOrganizationMembership = z.infer<typeof updateOrganizationMembershipSchema>;
export type OrganizationQuery = z.infer<typeof organizationQuerySchema>;
export type OrganizationMembershipQuery = z.infer<typeof organizationMembershipQuerySchema>;
export type OrganizationForm = z.infer<typeof organizationFormSchema>;
export type OrganizationInvitation = z.infer<typeof organizationInvitationSchema>;
export type Organization = OrganizationEntity;
export type NewOrganization = CreateOrganization;
export type OrganizationMembership = OrganizationMembershipEntity;
export type NewOrganizationMembership = CreateOrganizationMembership;
export declare const organizationSchema: z.ZodObject<{
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
export declare const organizationMembershipSchema: z.ZodObject<{
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
export declare const databaseOrganizationSchema: z.ZodObject<{
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
//# sourceMappingURL=organization.schema.d.ts.map