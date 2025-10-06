import { organizationEntitySchema as databaseOrganizationSchema, organizationMembershipEntitySchema } from '@platform/contracts/entities/organization.schema';
import { CreateOrganizationMembershipOperationSchema as createOrganizationMembershipSchema, CreateOrganizationOperationSchema as newOrganizationSchema, UpdateOrganizationMembershipOperationSchema as updateOrganizationMembershipSchema, UpdateOrganizationOperationSchema as updateOrganizationSchema } from '@platform/contracts/operations/organization.operations';
import { organizationMemberships, organizations } from '@platform/database';
import { z } from 'zod';
import { BaseService } from './base.service';
declare const organizationQuerySchema: z.ZodObject<{
    where: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    orderBy: z.ZodOptional<z.ZodArray<z.ZodObject<{
        field: z.ZodString;
        direction: z.ZodEnum<["asc", "desc"]>;
    }, "strip", z.ZodTypeAny, {
        field: string;
        direction: "asc" | "desc";
    }, {
        field: string;
        direction: "asc" | "desc";
    }>, "many">>;
    limit: z.ZodOptional<z.ZodNumber>;
    offset: z.ZodOptional<z.ZodNumber>;
    include: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    limit?: number | undefined;
    offset?: number | undefined;
    where?: Record<string, any> | undefined;
    orderBy?: {
        field: string;
        direction: "asc" | "desc";
    }[] | undefined;
    include?: string[] | undefined;
}, {
    limit?: number | undefined;
    offset?: number | undefined;
    where?: Record<string, any> | undefined;
    orderBy?: {
        field: string;
        direction: "asc" | "desc";
    }[] | undefined;
    include?: string[] | undefined;
}>;
declare const organizationMembershipQuerySchema: z.ZodObject<{
    where: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    orderBy: z.ZodOptional<z.ZodArray<z.ZodObject<{
        field: z.ZodString;
        direction: z.ZodEnum<["asc", "desc"]>;
    }, "strip", z.ZodTypeAny, {
        field: string;
        direction: "asc" | "desc";
    }, {
        field: string;
        direction: "asc" | "desc";
    }>, "many">>;
    limit: z.ZodOptional<z.ZodNumber>;
    offset: z.ZodOptional<z.ZodNumber>;
    include: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    limit?: number | undefined;
    offset?: number | undefined;
    where?: Record<string, any> | undefined;
    orderBy?: {
        field: string;
        direction: "asc" | "desc";
    }[] | undefined;
    include?: string[] | undefined;
}, {
    limit?: number | undefined;
    offset?: number | undefined;
    where?: Record<string, any> | undefined;
    orderBy?: {
        field: string;
        direction: "asc" | "desc";
    }[] | undefined;
    include?: string[] | undefined;
}>;
export declare class OrganizationService extends BaseService<z.infer<typeof databaseOrganizationSchema>, z.infer<typeof newOrganizationSchema>, z.infer<typeof updateOrganizationSchema>, z.infer<typeof organizationQuerySchema>, typeof organizations> {
    protected table: import("drizzle-orm/pg-core").PgTableWithColumns<{
        name: "organizations";
        schema: undefined;
        columns: {
            id: import("drizzle-orm/pg-core").PgColumn<{
                name: "id";
                tableName: "organizations";
                dataType: "string";
                columnType: "PgUUID";
                data: string;
                driverParam: string;
                notNull: true;
                hasDefault: true;
                isPrimaryKey: true;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: undefined;
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            name: import("drizzle-orm/pg-core").PgColumn<{
                name: "name";
                tableName: "organizations";
                dataType: "string";
                columnType: "PgText";
                data: string;
                driverParam: string;
                notNull: true;
                hasDefault: false;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: [string, ...string[]];
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            slug: import("drizzle-orm/pg-core").PgColumn<{
                name: "slug";
                tableName: "organizations";
                dataType: "string";
                columnType: "PgText";
                data: string;
                driverParam: string;
                notNull: true;
                hasDefault: false;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: [string, ...string[]];
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            description: import("drizzle-orm/pg-core").PgColumn<{
                name: "description";
                tableName: "organizations";
                dataType: "string";
                columnType: "PgText";
                data: string;
                driverParam: string;
                notNull: false;
                hasDefault: false;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: [string, ...string[]];
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            website: import("drizzle-orm/pg-core").PgColumn<{
                name: "website";
                tableName: "organizations";
                dataType: "string";
                columnType: "PgText";
                data: string;
                driverParam: string;
                notNull: false;
                hasDefault: false;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: [string, ...string[]];
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            logoUrl: import("drizzle-orm/pg-core").PgColumn<{
                name: "logo_url";
                tableName: "organizations";
                dataType: "string";
                columnType: "PgText";
                data: string;
                driverParam: string;
                notNull: false;
                hasDefault: false;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: [string, ...string[]];
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            organizationType: import("drizzle-orm/pg-core").PgColumn<{
                name: "organization_type";
                tableName: "organizations";
                dataType: "string";
                columnType: "PgText";
                data: "other" | "denomination" | "church" | "seminary" | "ministry_network" | "nonprofit" | "business";
                driverParam: string;
                notNull: true;
                hasDefault: false;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: ["church", "denomination", "seminary", "ministry_network", "nonprofit", "business", "other"];
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            sizeCategory: import("drizzle-orm/pg-core").PgColumn<{
                name: "size_category";
                tableName: "organizations";
                dataType: "string";
                columnType: "PgText";
                data: "small" | "startup" | "medium" | "large" | "enterprise";
                driverParam: string;
                notNull: false;
                hasDefault: false;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: ["startup", "small", "medium", "large", "enterprise"];
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            contactEmail: import("drizzle-orm/pg-core").PgColumn<{
                name: "contact_email";
                tableName: "organizations";
                dataType: "string";
                columnType: "PgText";
                data: string;
                driverParam: string;
                notNull: false;
                hasDefault: false;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: [string, ...string[]];
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            contactPhone: import("drizzle-orm/pg-core").PgColumn<{
                name: "contact_phone";
                tableName: "organizations";
                dataType: "string";
                columnType: "PgText";
                data: string;
                driverParam: string;
                notNull: false;
                hasDefault: false;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: [string, ...string[]];
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            address: import("drizzle-orm/pg-core").PgColumn<{
                name: "address";
                tableName: "organizations";
                dataType: "json";
                columnType: "PgJsonb";
                data: {
                    street: string;
                    city: string;
                    state: string;
                    country: string;
                    postalCode: string;
                };
                driverParam: unknown;
                notNull: false;
                hasDefault: false;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: undefined;
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {
                $type: {
                    street: string;
                    city: string;
                    state: string;
                    country: string;
                    postalCode: string;
                };
            }>;
            licenseType: import("drizzle-orm/pg-core").PgColumn<{
                name: "license_type";
                tableName: "organizations";
                dataType: "string";
                columnType: "PgText";
                data: "individual" | "enterprise" | "team";
                driverParam: string;
                notNull: false;
                hasDefault: true;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: ["individual", "team", "enterprise"];
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            maxUsers: import("drizzle-orm/pg-core").PgColumn<{
                name: "max_users";
                tableName: "organizations";
                dataType: "number";
                columnType: "PgInteger";
                data: number;
                driverParam: string | number;
                notNull: false;
                hasDefault: true;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: undefined;
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            billingEmail: import("drizzle-orm/pg-core").PgColumn<{
                name: "billing_email";
                tableName: "organizations";
                dataType: "string";
                columnType: "PgText";
                data: string;
                driverParam: string;
                notNull: false;
                hasDefault: false;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: [string, ...string[]];
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            accountOwnerId: import("drizzle-orm/pg-core").PgColumn<{
                name: "account_owner_id";
                tableName: "organizations";
                dataType: "string";
                columnType: "PgUUID";
                data: string;
                driverParam: string;
                notNull: false;
                hasDefault: false;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: undefined;
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            stripeCustomerId: import("drizzle-orm/pg-core").PgColumn<{
                name: "stripe_customer_id";
                tableName: "organizations";
                dataType: "string";
                columnType: "PgText";
                data: string;
                driverParam: string;
                notNull: false;
                hasDefault: false;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: [string, ...string[]];
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            stripeProductId: import("drizzle-orm/pg-core").PgColumn<{
                name: "stripe_product_id";
                tableName: "organizations";
                dataType: "string";
                columnType: "PgText";
                data: string;
                driverParam: string;
                notNull: false;
                hasDefault: false;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: [string, ...string[]];
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            status: import("drizzle-orm/pg-core").PgColumn<{
                name: "status";
                tableName: "organizations";
                dataType: "string";
                columnType: "PgText";
                data: "active" | "suspended" | "trial" | "cancelled";
                driverParam: string;
                notNull: false;
                hasDefault: true;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: ["trial", "active", "suspended", "cancelled"];
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            createdAt: import("drizzle-orm/pg-core").PgColumn<{
                name: "created_at";
                tableName: "organizations";
                dataType: "date";
                columnType: "PgTimestamp";
                data: Date;
                driverParam: string;
                notNull: true;
                hasDefault: true;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: undefined;
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            updatedAt: import("drizzle-orm/pg-core").PgColumn<{
                name: "updated_at";
                tableName: "organizations";
                dataType: "date";
                columnType: "PgTimestamp";
                data: Date;
                driverParam: string;
                notNull: true;
                hasDefault: true;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: undefined;
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
        };
        dialect: "pg";
    }>;
    protected entityName: string;
    protected createSchema: z.ZodObject<{
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
    protected updateSchema: z.ZodEffects<z.ZodObject<Omit<{
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
    protected querySchema: z.ZodObject<{
        where: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        orderBy: z.ZodOptional<z.ZodArray<z.ZodObject<{
            field: z.ZodString;
            direction: z.ZodEnum<["asc", "desc"]>;
        }, "strip", z.ZodTypeAny, {
            field: string;
            direction: "asc" | "desc";
        }, {
            field: string;
            direction: "asc" | "desc";
        }>, "many">>;
        limit: z.ZodOptional<z.ZodNumber>;
        offset: z.ZodOptional<z.ZodNumber>;
        include: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        limit?: number | undefined;
        offset?: number | undefined;
        where?: Record<string, any> | undefined;
        orderBy?: {
            field: string;
            direction: "asc" | "desc";
        }[] | undefined;
        include?: string[] | undefined;
    }, {
        limit?: number | undefined;
        offset?: number | undefined;
        where?: Record<string, any> | undefined;
        orderBy?: {
            field: string;
            direction: "asc" | "desc";
        }[] | undefined;
        include?: string[] | undefined;
    }>;
    protected outputSchema: z.ZodObject<{
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
     * Find organization by slug
     */
    findBySlug(slug: string): Promise<z.infer<typeof databaseOrganizationSchema> | null>;
    /**
     * Find organizations by account owner
     */
    findByAccountOwner(accountOwnerId: string): Promise<z.infer<typeof databaseOrganizationSchema>[]>;
    /**
     * Find organizations by type
     */
    findByType(organizationType: string): Promise<z.infer<typeof databaseOrganizationSchema>[]>;
    /**
     * Find organizations by size category
     */
    findBySizeCategory(sizeCategory: string): Promise<z.infer<typeof databaseOrganizationSchema>[]>;
    /**
     * Find organizations by status
     */
    findByStatus(status: string): Promise<z.infer<typeof databaseOrganizationSchema>[]>;
    /**
     * Get organization with members
     */
    findWithMembers(organizationId: string): Promise<{
        organization: z.infer<typeof databaseOrganizationSchema>;
        members: Array<{
            membership: z.infer<typeof organizationMembershipEntitySchema>;
            user: any;
        }>;
    } | null>;
    /**
     * Get organization statistics
     */
    getOrganizationStats(organizationId: string): Promise<{
        memberCount: number;
        activeMembers: number;
        pendingMembers: number;
        ownerCount: number;
        adminCount: number;
    }>;
    /**
     * Activate organization
     */
    activate(organizationId: string): Promise<z.infer<typeof databaseOrganizationSchema>>;
    /**
     * Deactivate organization
     */
    deactivate(organizationId: string): Promise<z.infer<typeof databaseOrganizationSchema>>;
    /**
     * Suspend organization
     */
    suspend(organizationId: string): Promise<z.infer<typeof databaseOrganizationSchema>>;
    /**
     * Check if slug is available
     */
    isSlugAvailable(slug: string, excludeOrganizationId?: string): Promise<boolean>;
    /**
     * Search organizations
     */
    searchOrganizations(query: string, limit?: number): Promise<z.infer<typeof databaseOrganizationSchema>[]>;
}
export declare class OrganizationMembershipService extends BaseService<z.infer<typeof organizationMembershipEntitySchema>, z.infer<typeof createOrganizationMembershipSchema>, z.infer<typeof updateOrganizationMembershipSchema>, z.infer<typeof organizationMembershipQuerySchema>, typeof organizationMemberships> {
    protected table: import("drizzle-orm/pg-core").PgTableWithColumns<{
        name: "organization_memberships";
        schema: undefined;
        columns: {
            id: import("drizzle-orm/pg-core").PgColumn<{
                name: "id";
                tableName: "organization_memberships";
                dataType: "string";
                columnType: "PgUUID";
                data: string;
                driverParam: string;
                notNull: true;
                hasDefault: true;
                isPrimaryKey: true;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: undefined;
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            userId: import("drizzle-orm/pg-core").PgColumn<{
                name: "user_id";
                tableName: "organization_memberships";
                dataType: "string";
                columnType: "PgUUID";
                data: string;
                driverParam: string;
                notNull: true;
                hasDefault: false;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: undefined;
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            organizationId: import("drizzle-orm/pg-core").PgColumn<{
                name: "organization_id";
                tableName: "organization_memberships";
                dataType: "string";
                columnType: "PgUUID";
                data: string;
                driverParam: string;
                notNull: true;
                hasDefault: false;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: undefined;
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            role: import("drizzle-orm/pg-core").PgColumn<{
                name: "role";
                tableName: "organization_memberships";
                dataType: "string";
                columnType: "PgText";
                data: "owner" | "admin" | "member" | "viewer";
                driverParam: string;
                notNull: true;
                hasDefault: false;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: ["owner", "admin", "member", "viewer"];
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            permissions: import("drizzle-orm/pg-core").PgColumn<{
                name: "permissions";
                tableName: "organization_memberships";
                dataType: "json";
                columnType: "PgJsonb";
                data: string[];
                driverParam: unknown;
                notNull: false;
                hasDefault: true;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: undefined;
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {
                $type: string[];
            }>;
            status: import("drizzle-orm/pg-core").PgColumn<{
                name: "status";
                tableName: "organization_memberships";
                dataType: "string";
                columnType: "PgText";
                data: "active" | "inactive" | "cancelled" | "pending";
                driverParam: string;
                notNull: false;
                hasDefault: true;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: ["pending", "active", "inactive", "cancelled"];
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            joinedAt: import("drizzle-orm/pg-core").PgColumn<{
                name: "joined_at";
                tableName: "organization_memberships";
                dataType: "date";
                columnType: "PgTimestamp";
                data: Date;
                driverParam: string;
                notNull: false;
                hasDefault: true;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: undefined;
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            invitedAt: import("drizzle-orm/pg-core").PgColumn<{
                name: "invited_at";
                tableName: "organization_memberships";
                dataType: "date";
                columnType: "PgTimestamp";
                data: Date;
                driverParam: string;
                notNull: false;
                hasDefault: false;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: undefined;
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            invitedBy: import("drizzle-orm/pg-core").PgColumn<{
                name: "invited_by";
                tableName: "organization_memberships";
                dataType: "string";
                columnType: "PgUUID";
                data: string;
                driverParam: string;
                notNull: false;
                hasDefault: false;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: undefined;
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            createdAt: import("drizzle-orm/pg-core").PgColumn<{
                name: "created_at";
                tableName: "organization_memberships";
                dataType: "date";
                columnType: "PgTimestamp";
                data: Date;
                driverParam: string;
                notNull: true;
                hasDefault: true;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: undefined;
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            updatedAt: import("drizzle-orm/pg-core").PgColumn<{
                name: "updated_at";
                tableName: "organization_memberships";
                dataType: "date";
                columnType: "PgTimestamp";
                data: Date;
                driverParam: string;
                notNull: true;
                hasDefault: true;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: undefined;
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
        };
        dialect: "pg";
    }>;
    protected entityName: string;
    protected createSchema: z.ZodObject<{
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
    protected updateSchema: z.ZodEffects<z.ZodObject<Omit<{
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
    protected querySchema: z.ZodObject<{
        where: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        orderBy: z.ZodOptional<z.ZodArray<z.ZodObject<{
            field: z.ZodString;
            direction: z.ZodEnum<["asc", "desc"]>;
        }, "strip", z.ZodTypeAny, {
            field: string;
            direction: "asc" | "desc";
        }, {
            field: string;
            direction: "asc" | "desc";
        }>, "many">>;
        limit: z.ZodOptional<z.ZodNumber>;
        offset: z.ZodOptional<z.ZodNumber>;
        include: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        limit?: number | undefined;
        offset?: number | undefined;
        where?: Record<string, any> | undefined;
        orderBy?: {
            field: string;
            direction: "asc" | "desc";
        }[] | undefined;
        include?: string[] | undefined;
    }, {
        limit?: number | undefined;
        offset?: number | undefined;
        where?: Record<string, any> | undefined;
        orderBy?: {
            field: string;
            direction: "asc" | "desc";
        }[] | undefined;
        include?: string[] | undefined;
    }>;
    protected outputSchema: z.ZodObject<{
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
     * Find membership by user and organization
     */
    findByUserAndOrganization(userId: string, organizationId: string): Promise<z.infer<typeof organizationMembershipEntitySchema> | null>;
    /**
     * Find memberships by user
     */
    findByUser(userId: string): Promise<Array<z.infer<typeof organizationMembershipEntitySchema> & {
        organization: z.infer<typeof databaseOrganizationSchema>;
    }>>;
    /**
     * Find memberships by organization
     */
    findByOrganization(organizationId: string): Promise<Array<z.infer<typeof organizationMembershipEntitySchema> & {
        user: any;
    }>>;
    /**
     * Find active memberships by user
     */
    findActiveByUser(userId: string): Promise<Array<z.infer<typeof organizationMembershipEntitySchema> & {
        organization: z.infer<typeof databaseOrganizationSchema>;
    }>>;
    /**
     * Find memberships by role
     */
    findByRole(organizationId: string, role: string): Promise<z.infer<typeof organizationMembershipEntitySchema>[]>;
    /**
     * Add user to organization
     */
    addMember(userId: string, organizationId: string, role?: string, invitedBy?: string): Promise<z.infer<typeof organizationMembershipEntitySchema>>;
    /**
     * Remove user from organization
     */
    removeMember(userId: string, organizationId: string): Promise<boolean>;
    /**
     * Update member role
     */
    updateMemberRole(userId: string, organizationId: string, newRole: 'owner' | 'admin' | 'member' | 'viewer'): Promise<z.infer<typeof organizationMembershipEntitySchema>>;
    /**
     * Update membership status
     */
    updateMembershipStatus(userId: string, organizationId: string, status: 'pending' | 'active' | 'inactive' | 'cancelled'): Promise<z.infer<typeof organizationMembershipEntitySchema>>;
    /**
     * Check if user is member of organization
     */
    isMember(userId: string, organizationId: string): Promise<boolean>;
    /**
     * Check if user has specific role in organization
     */
    hasRole(userId: string, organizationId: string, role: string): Promise<boolean>;
    /**
     * Check if user is admin or owner of organization
     */
    isAdminOrOwner(userId: string, organizationId: string): Promise<boolean>;
    /**
     * Get organization owners
     */
    getOwners(organizationId: string): Promise<z.infer<typeof organizationMembershipEntitySchema>[]>;
    /**
     * Get organization admins
     */
    getAdmins(organizationId: string): Promise<z.infer<typeof organizationMembershipEntitySchema>[]>;
    /**
     * Get pending memberships
     */
    getPendingMemberships(organizationId: string): Promise<z.infer<typeof organizationMembershipEntitySchema>[]>;
}
export {};
//# sourceMappingURL=organization.service.d.ts.map