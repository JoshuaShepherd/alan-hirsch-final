import { communities } from '@platform/database';
import { z } from 'zod';
import { BaseService } from './base.service';
declare const newCommunitySchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    slug: z.ZodString;
    organizationId: z.ZodString;
    visibility: z.ZodDefault<z.ZodEnum<["public", "private", "restricted"]>>;
    settings: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    organizationId: string;
    name: string;
    slug: string;
    visibility: "public" | "private" | "restricted";
    description?: string | undefined;
    settings?: Record<string, any> | undefined;
}, {
    organizationId: string;
    name: string;
    slug: string;
    description?: string | undefined;
    visibility?: "public" | "private" | "restricted" | undefined;
    settings?: Record<string, any> | undefined;
}>;
declare const queryCommunitySchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    organizationId: z.ZodOptional<z.ZodString>;
    visibility: z.ZodOptional<z.ZodEnum<["public", "private", "restricted"]>>;
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    offset: number;
    organizationId?: string | undefined;
    id?: string | undefined;
    slug?: string | undefined;
    visibility?: "public" | "private" | "restricted" | undefined;
}, {
    limit?: number | undefined;
    organizationId?: string | undefined;
    id?: string | undefined;
    slug?: string | undefined;
    visibility?: "public" | "private" | "restricted" | undefined;
    offset?: number | undefined;
}>;
declare const updateCommunitySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    slug: z.ZodOptional<z.ZodString>;
    organizationId: z.ZodOptional<z.ZodString>;
    visibility: z.ZodOptional<z.ZodDefault<z.ZodEnum<["public", "private", "restricted"]>>>;
    settings: z.ZodOptional<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>>;
}, "strip", z.ZodTypeAny, {
    organizationId?: string | undefined;
    name?: string | undefined;
    description?: string | undefined;
    slug?: string | undefined;
    visibility?: "public" | "private" | "restricted" | undefined;
    settings?: Record<string, any> | undefined;
}, {
    organizationId?: string | undefined;
    name?: string | undefined;
    description?: string | undefined;
    slug?: string | undefined;
    visibility?: "public" | "private" | "restricted" | undefined;
    settings?: Record<string, any> | undefined;
}>;
declare const databaseCommunitySchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    slug: z.ZodString;
    organizationId: z.ZodString;
    visibility: z.ZodEnum<["public", "private", "restricted"]>;
    settings: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    organizationId: string;
    id: string;
    name: string;
    description: string | null;
    slug: string;
    visibility: "public" | "private" | "restricted";
    settings: Record<string, any> | null;
    createdAt: string;
    updatedAt: string;
}, {
    organizationId: string;
    id: string;
    name: string;
    description: string | null;
    slug: string;
    visibility: "public" | "private" | "restricted";
    settings: Record<string, any> | null;
    createdAt: string;
    updatedAt: string;
}>;
export declare class CommunityService extends BaseService<z.infer<typeof databaseCommunitySchema>, z.infer<typeof newCommunitySchema>, z.infer<typeof updateCommunitySchema>, z.infer<typeof queryCommunitySchema>, typeof communities> {
    protected table: import("drizzle-orm/pg-core").PgTableWithColumns<{
        name: "communities";
        schema: undefined;
        columns: {
            id: import("drizzle-orm/pg-core").PgColumn<{
                name: "id";
                tableName: "communities";
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
                tableName: "communities";
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
                tableName: "communities";
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
                tableName: "communities";
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
            communityType: import("drizzle-orm/pg-core").PgColumn<{
                name: "community_type";
                tableName: "communities";
                dataType: "string";
                columnType: "PgText";
                data: "general_discussion" | "church_planting_cohort" | "leadership_development" | "theological_study" | "regional_network" | "ministry_focus" | "apest_group";
                driverParam: string;
                notNull: true;
                hasDefault: false;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: ["general_discussion", "church_planting_cohort", "leadership_development", "theological_study", "regional_network", "ministry_focus", "apest_group"];
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            geographicFocus: import("drizzle-orm/pg-core").PgColumn<{
                name: "geographic_focus";
                tableName: "communities";
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
            culturalContext: import("drizzle-orm/pg-core").PgColumn<{
                name: "cultural_context";
                tableName: "communities";
                dataType: "string";
                columnType: "PgText";
                data: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global";
                driverParam: string;
                notNull: false;
                hasDefault: true;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: ["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "global"];
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            languagePrimary: import("drizzle-orm/pg-core").PgColumn<{
                name: "language_primary";
                tableName: "communities";
                dataType: "string";
                columnType: "PgText";
                data: string;
                driverParam: string;
                notNull: false;
                hasDefault: true;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: [string, ...string[]];
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            languagesSupported: import("drizzle-orm/pg-core").PgColumn<{
                name: "languages_supported";
                tableName: "communities";
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
            visibility: import("drizzle-orm/pg-core").PgColumn<{
                name: "visibility";
                tableName: "communities";
                dataType: "string";
                columnType: "PgText";
                data: "organization" | "public" | "private" | "invite_only";
                driverParam: string;
                notNull: false;
                hasDefault: true;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: ["public", "private", "invite_only", "organization"];
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            joinApprovalRequired: import("drizzle-orm/pg-core").PgColumn<{
                name: "join_approval_required";
                tableName: "communities";
                dataType: "boolean";
                columnType: "PgBoolean";
                data: boolean;
                driverParam: boolean;
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
            maxMembers: import("drizzle-orm/pg-core").PgColumn<{
                name: "max_members";
                tableName: "communities";
                dataType: "number";
                columnType: "PgInteger";
                data: number;
                driverParam: string | number;
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
            allowGuestPosts: import("drizzle-orm/pg-core").PgColumn<{
                name: "allow_guest_posts";
                tableName: "communities";
                dataType: "boolean";
                columnType: "PgBoolean";
                data: boolean;
                driverParam: boolean;
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
            moderationLevel: import("drizzle-orm/pg-core").PgColumn<{
                name: "moderation_level";
                tableName: "communities";
                dataType: "string";
                columnType: "PgText";
                data: "open" | "moderated" | "strict";
                driverParam: string;
                notNull: false;
                hasDefault: true;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: ["open", "moderated", "strict"];
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            currentMemberCount: import("drizzle-orm/pg-core").PgColumn<{
                name: "current_member_count";
                tableName: "communities";
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
            memberCount: import("drizzle-orm/pg-core").PgColumn<{
                name: "member_count";
                tableName: "communities";
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
            totalPostsCount: import("drizzle-orm/pg-core").PgColumn<{
                name: "total_posts_count";
                tableName: "communities";
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
            guidelines: import("drizzle-orm/pg-core").PgColumn<{
                name: "guidelines";
                tableName: "communities";
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
            rules: import("drizzle-orm/pg-core").PgColumn<{
                name: "rules";
                tableName: "communities";
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
            createdBy: import("drizzle-orm/pg-core").PgColumn<{
                name: "created_by";
                tableName: "communities";
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
            moderators: import("drizzle-orm/pg-core").PgColumn<{
                name: "moderators";
                tableName: "communities";
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
            isActive: import("drizzle-orm/pg-core").PgColumn<{
                name: "is_active";
                tableName: "communities";
                dataType: "boolean";
                columnType: "PgBoolean";
                data: boolean;
                driverParam: boolean;
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
            status: import("drizzle-orm/pg-core").PgColumn<{
                name: "status";
                tableName: "communities";
                dataType: "string";
                columnType: "PgText";
                data: "active" | "inactive" | "archived";
                driverParam: string;
                notNull: false;
                hasDefault: true;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: ["active", "inactive", "archived"];
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            focus: import("drizzle-orm/pg-core").PgColumn<{
                name: "focus";
                tableName: "communities";
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
            createdAt: import("drizzle-orm/pg-core").PgColumn<{
                name: "created_at";
                tableName: "communities";
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
                tableName: "communities";
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
    protected createSchema: any;
    protected updateSchema: any;
    protected querySchema: any;
    protected outputSchema: any;
    /**
     * Find community by slug
     */
    findBySlug(slug: string): Promise<z.infer<typeof databaseCommunitySchema> | null>;
    /**
     * Find active communities
     */
    findActive(): Promise<z.infer<typeof databaseCommunitySchema>[]>;
    /**
     * Find public communities
     */
    findPublic(): Promise<z.infer<typeof databaseCommunitySchema>[]>;
    /**
     * Find communities by type
     */
    findByType(communityType: string): Promise<z.infer<typeof databaseCommunitySchema>[]>;
    /**
     * Find communities by focus
     */
    findByFocus(focus: string): Promise<z.infer<typeof databaseCommunitySchema>[]>;
    /**
     * Search communities
     */
    searchCommunities(query: string, limit?: number): Promise<z.infer<typeof databaseCommunitySchema>[]>;
    /**
     * Activate community
     */
    activate(communityId: string): Promise<z.infer<typeof databaseCommunitySchema>>;
    /**
     * Deactivate community
     */
    deactivate(communityId: string): Promise<z.infer<typeof databaseCommunitySchema>>;
    /**
     * Archive community
     */
    archive(communityId: string): Promise<z.infer<typeof databaseCommunitySchema>>;
    /**
     * Get community statistics
     */
    getCommunityStats(): Promise<{
        total: number;
        active: number;
        inactive: number;
        pending: number;
        archived: number;
        byType: Record<string, number>;
        byFocus: Record<string, number>;
        byVisibility: Record<string, number>;
        totalMembers: number;
    }>;
    /**
     * Get trending communities
     */
    getTrendingCommunities(limit?: number): Promise<z.infer<typeof databaseCommunitySchema>[]>;
    /**
     * Check if slug is available
     */
    isSlugAvailable(slug: string, excludeCommunityId?: string): Promise<boolean>;
    /**
     * Update member count
     */
    updateMemberCount(communityId: string, memberCount: number): Promise<z.infer<typeof databaseCommunitySchema>>;
}
export declare const communityService: CommunityService;
export {};
//# sourceMappingURL=community.service.d.ts.map