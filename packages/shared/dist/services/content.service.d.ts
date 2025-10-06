import { contentCategoryEntitySchema as databaseContentCategorySchema, contentItemEntitySchema as databaseContentItemSchema } from '@platform/contracts/entities/content.schema';
import { CreateContentCategoryOperationSchema as newContentCategorySchema, CreateContentItemOperationSchema as newContentItemSchema, UpdateContentCategoryOperationSchema as updateContentCategorySchema, UpdateContentItemOperationSchema as updateContentItemSchema } from '@platform/contracts/operations/content.operations';
import { contentCategories, contentItems } from '@platform/database';
import { z } from 'zod';
import { BaseService } from './base.service';
declare const contentItemQuerySchema: z.ZodObject<{
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
export declare class ContentItemService extends BaseService<z.infer<typeof databaseContentItemSchema>, z.infer<typeof newContentItemSchema>, z.infer<typeof updateContentItemSchema>, z.infer<typeof contentItemQuerySchema>, typeof contentItems> {
    protected table: import("drizzle-orm/pg-core").PgTableWithColumns<{
        name: "content_items";
        schema: undefined;
        columns: {
            id: import("drizzle-orm/pg-core").PgColumn<{
                name: "id";
                tableName: "content_items";
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
            title: import("drizzle-orm/pg-core").PgColumn<{
                name: "title";
                tableName: "content_items";
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
                tableName: "content_items";
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
            excerpt: import("drizzle-orm/pg-core").PgColumn<{
                name: "excerpt";
                tableName: "content_items";
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
            content: import("drizzle-orm/pg-core").PgColumn<{
                name: "content";
                tableName: "content_items";
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
            authorId: import("drizzle-orm/pg-core").PgColumn<{
                name: "author_id";
                tableName: "content_items";
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
            coAuthors: import("drizzle-orm/pg-core").PgColumn<{
                name: "co_authors";
                tableName: "content_items";
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
            contentType: import("drizzle-orm/pg-core").PgColumn<{
                name: "content_type";
                tableName: "content_items";
                dataType: "string";
                columnType: "PgText";
                data: "framework" | "article" | "video" | "podcast" | "tool" | "case_study" | "interview" | "course_lesson";
                driverParam: string;
                notNull: true;
                hasDefault: false;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: ["article", "video", "podcast", "framework", "tool", "case_study", "interview", "course_lesson"];
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            format: import("drizzle-orm/pg-core").PgColumn<{
                name: "format";
                tableName: "content_items";
                dataType: "string";
                columnType: "PgText";
                data: "text" | "video" | "audio" | "interactive" | "pdf" | "presentation";
                driverParam: string;
                notNull: false;
                hasDefault: true;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: ["text", "video", "audio", "interactive", "pdf", "presentation"];
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            wordCount: import("drizzle-orm/pg-core").PgColumn<{
                name: "word_count";
                tableName: "content_items";
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
            estimatedReadingTime: import("drizzle-orm/pg-core").PgColumn<{
                name: "estimated_reading_time";
                tableName: "content_items";
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
            viewCount: import("drizzle-orm/pg-core").PgColumn<{
                name: "view_count";
                tableName: "content_items";
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
            likeCount: import("drizzle-orm/pg-core").PgColumn<{
                name: "like_count";
                tableName: "content_items";
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
            shareCount: import("drizzle-orm/pg-core").PgColumn<{
                name: "share_count";
                tableName: "content_items";
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
            commentCount: import("drizzle-orm/pg-core").PgColumn<{
                name: "comment_count";
                tableName: "content_items";
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
            bookmarkCount: import("drizzle-orm/pg-core").PgColumn<{
                name: "bookmark_count";
                tableName: "content_items";
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
            primaryCategoryId: import("drizzle-orm/pg-core").PgColumn<{
                name: "primary_category_id";
                tableName: "content_items";
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
            secondaryCategories: import("drizzle-orm/pg-core").PgColumn<{
                name: "secondary_categories";
                tableName: "content_items";
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
            tags: import("drizzle-orm/pg-core").PgColumn<{
                name: "tags";
                tableName: "content_items";
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
            theologicalThemes: import("drizzle-orm/pg-core").PgColumn<{
                name: "theological_themes";
                tableName: "content_items";
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
            seriesId: import("drizzle-orm/pg-core").PgColumn<{
                name: "series_id";
                tableName: "content_items";
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
            seriesOrder: import("drizzle-orm/pg-core").PgColumn<{
                name: "series_order";
                tableName: "content_items";
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
            visibility: import("drizzle-orm/pg-core").PgColumn<{
                name: "visibility";
                tableName: "content_items";
                dataType: "string";
                columnType: "PgText";
                data: "organization" | "public" | "premium" | "vip" | "private" | "invite_only";
                driverParam: string;
                notNull: false;
                hasDefault: true;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: ["public", "premium", "vip", "private", "organization", "invite_only"];
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            status: import("drizzle-orm/pg-core").PgColumn<{
                name: "status";
                tableName: "content_items";
                dataType: "string";
                columnType: "PgText";
                data: "draft" | "archived" | "under_review" | "published" | "scheduled";
                driverParam: string;
                notNull: false;
                hasDefault: true;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: ["draft", "published", "archived", "under_review", "scheduled"];
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            networkAmplificationScore: import("drizzle-orm/pg-core").PgColumn<{
                name: "network_amplification_score";
                tableName: "content_items";
                dataType: "string";
                columnType: "PgNumeric";
                data: string;
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
            crossReferenceCount: import("drizzle-orm/pg-core").PgColumn<{
                name: "cross_reference_count";
                tableName: "content_items";
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
            aiEnhanced: import("drizzle-orm/pg-core").PgColumn<{
                name: "ai_enhanced";
                tableName: "content_items";
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
            aiSummary: import("drizzle-orm/pg-core").PgColumn<{
                name: "ai_summary";
                tableName: "content_items";
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
            aiKeyPoints: import("drizzle-orm/pg-core").PgColumn<{
                name: "ai_key_points";
                tableName: "content_items";
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
            featuredImageUrl: import("drizzle-orm/pg-core").PgColumn<{
                name: "featured_image_url";
                tableName: "content_items";
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
            videoUrl: import("drizzle-orm/pg-core").PgColumn<{
                name: "video_url";
                tableName: "content_items";
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
            audioUrl: import("drizzle-orm/pg-core").PgColumn<{
                name: "audio_url";
                tableName: "content_items";
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
            attachments: import("drizzle-orm/pg-core").PgColumn<{
                name: "attachments";
                tableName: "content_items";
                dataType: "json";
                columnType: "PgJsonb";
                data: {
                    name: string;
                    url: string;
                    type: string;
                    size: number;
                }[];
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
                $type: {
                    name: string;
                    url: string;
                    type: string;
                    size: number;
                }[];
            }>;
            metaTitle: import("drizzle-orm/pg-core").PgColumn<{
                name: "meta_title";
                tableName: "content_items";
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
            metaDescription: import("drizzle-orm/pg-core").PgColumn<{
                name: "meta_description";
                tableName: "content_items";
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
            canonicalUrl: import("drizzle-orm/pg-core").PgColumn<{
                name: "canonical_url";
                tableName: "content_items";
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
            originalSource: import("drizzle-orm/pg-core").PgColumn<{
                name: "original_source";
                tableName: "content_items";
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
            licenseType: import("drizzle-orm/pg-core").PgColumn<{
                name: "license_type";
                tableName: "content_items";
                dataType: "string";
                columnType: "PgText";
                data: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use";
                driverParam: string;
                notNull: false;
                hasDefault: true;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: ["all_rights_reserved", "creative_commons", "public_domain", "fair_use"];
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            attributionRequired: import("drizzle-orm/pg-core").PgColumn<{
                name: "attribution_required";
                tableName: "content_items";
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
            createdAt: import("drizzle-orm/pg-core").PgColumn<{
                name: "created_at";
                tableName: "content_items";
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
                tableName: "content_items";
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
            publishedAt: import("drizzle-orm/pg-core").PgColumn<{
                name: "published_at";
                tableName: "content_items";
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
            scheduledAt: import("drizzle-orm/pg-core").PgColumn<{
                name: "scheduled_at";
                tableName: "content_items";
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
        };
        dialect: "pg";
    }>;
    protected entityName: string;
    protected createSchema: z.ZodObject<{
        status: z.ZodDefault<z.ZodEnum<["draft", "published", "archived", "under_review", "scheduled"]>>;
        metaDescription: z.ZodOptional<z.ZodString>;
        excerpt: z.ZodOptional<z.ZodString>;
        authorId: z.ZodString;
        coAuthors: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        format: z.ZodDefault<z.ZodEnum<["text", "video", "audio", "interactive", "pdf", "presentation"]>>;
        wordCount: z.ZodOptional<z.ZodNumber>;
        estimatedReadingTime: z.ZodOptional<z.ZodNumber>;
        primaryCategoryId: z.ZodOptional<z.ZodString>;
        secondaryCategories: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        theologicalThemes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        seriesId: z.ZodOptional<z.ZodString>;
        seriesOrder: z.ZodOptional<z.ZodNumber>;
        visibility: z.ZodDefault<z.ZodEnum<["public", "premium", "vip", "private", "organization", "invite_only"]>>;
        networkAmplificationScore: z.ZodDefault<z.ZodNumber>;
        crossReferenceCount: z.ZodDefault<z.ZodNumber>;
        aiEnhanced: z.ZodDefault<z.ZodBoolean>;
        aiSummary: z.ZodOptional<z.ZodString>;
        aiKeyPoints: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        featuredImageUrl: z.ZodOptional<z.ZodString>;
        videoUrl: z.ZodOptional<z.ZodString>;
        audioUrl: z.ZodOptional<z.ZodString>;
        attachments: z.ZodDefault<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            url: z.ZodString;
            type: z.ZodString;
            size: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            name: string;
            url: string;
            type: string;
            size: number;
        }, {
            name: string;
            url: string;
            type: string;
            size: number;
        }>, "many">>;
        metaTitle: z.ZodOptional<z.ZodString>;
        canonicalUrl: z.ZodOptional<z.ZodString>;
        originalSource: z.ZodOptional<z.ZodString>;
        publishedAt: z.ZodOptional<z.ZodString>;
        scheduledAt: z.ZodOptional<z.ZodString>;
        licenseType: z.ZodDefault<z.ZodEnum<["all_rights_reserved", "creative_commons", "public_domain", "fair_use"]>>;
        attributionRequired: z.ZodDefault<z.ZodBoolean>;
        contentType: z.ZodEnum<["article", "video", "podcast", "framework", "tool", "case_study", "interview", "course_lesson"]>;
    } & {
        title: z.ZodEffects<z.ZodString, string, string>;
        slug: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
        content: z.ZodEffects<z.ZodString, string, string>;
    }, "strip", z.ZodTypeAny, {
        status: "draft" | "published" | "archived" | "under_review" | "scheduled";
        title: string;
        content: string;
        authorId: string;
        coAuthors: string[];
        contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
        format: "video" | "text" | "audio" | "interactive" | "pdf" | "presentation";
        secondaryCategories: string[];
        tags: string[];
        theologicalThemes: string[];
        visibility: "public" | "private" | "premium" | "vip" | "organization" | "invite_only";
        networkAmplificationScore: number;
        crossReferenceCount: number;
        aiEnhanced: boolean;
        aiKeyPoints: string[];
        attachments: {
            name: string;
            url: string;
            type: string;
            size: number;
        }[];
        licenseType: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use";
        attributionRequired: boolean;
        slug?: string | undefined;
        metaDescription?: string | undefined;
        excerpt?: string | undefined;
        wordCount?: number | undefined;
        estimatedReadingTime?: number | undefined;
        primaryCategoryId?: string | undefined;
        seriesId?: string | undefined;
        seriesOrder?: number | undefined;
        aiSummary?: string | undefined;
        featuredImageUrl?: string | undefined;
        videoUrl?: string | undefined;
        audioUrl?: string | undefined;
        metaTitle?: string | undefined;
        canonicalUrl?: string | undefined;
        originalSource?: string | undefined;
        publishedAt?: string | undefined;
        scheduledAt?: string | undefined;
    }, {
        title: string;
        content: string;
        authorId: string;
        contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
        status?: "draft" | "published" | "archived" | "under_review" | "scheduled" | undefined;
        slug?: string | undefined;
        metaDescription?: string | undefined;
        excerpt?: string | undefined;
        coAuthors?: string[] | undefined;
        format?: "video" | "text" | "audio" | "interactive" | "pdf" | "presentation" | undefined;
        wordCount?: number | undefined;
        estimatedReadingTime?: number | undefined;
        primaryCategoryId?: string | undefined;
        secondaryCategories?: string[] | undefined;
        tags?: string[] | undefined;
        theologicalThemes?: string[] | undefined;
        seriesId?: string | undefined;
        seriesOrder?: number | undefined;
        visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
        networkAmplificationScore?: number | undefined;
        crossReferenceCount?: number | undefined;
        aiEnhanced?: boolean | undefined;
        aiSummary?: string | undefined;
        aiKeyPoints?: string[] | undefined;
        featuredImageUrl?: string | undefined;
        videoUrl?: string | undefined;
        audioUrl?: string | undefined;
        attachments?: {
            name: string;
            url: string;
            type: string;
            size: number;
        }[] | undefined;
        metaTitle?: string | undefined;
        canonicalUrl?: string | undefined;
        originalSource?: string | undefined;
        publishedAt?: string | undefined;
        scheduledAt?: string | undefined;
        licenseType?: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use" | undefined;
        attributionRequired?: boolean | undefined;
    }>;
    protected updateSchema: z.ZodEffects<z.ZodObject<Omit<{
        status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["draft", "published", "archived", "under_review", "scheduled"]>>>;
        metaDescription: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        excerpt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        content: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        authorId: z.ZodOptional<z.ZodString>;
        coAuthors: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
        format: z.ZodOptional<z.ZodDefault<z.ZodEnum<["text", "video", "audio", "interactive", "pdf", "presentation"]>>>;
        wordCount: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        estimatedReadingTime: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        primaryCategoryId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        secondaryCategories: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
        tags: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
        theologicalThemes: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
        seriesId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        seriesOrder: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        visibility: z.ZodOptional<z.ZodDefault<z.ZodEnum<["public", "premium", "vip", "private", "organization", "invite_only"]>>>;
        networkAmplificationScore: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        crossReferenceCount: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        aiEnhanced: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        aiSummary: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        aiKeyPoints: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
        featuredImageUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        videoUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        audioUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        attachments: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            url: z.ZodString;
            type: z.ZodString;
            size: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            name: string;
            url: string;
            type: string;
            size: number;
        }, {
            name: string;
            url: string;
            type: string;
            size: number;
        }>, "many">>>;
        metaTitle: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        canonicalUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        originalSource: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        publishedAt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        scheduledAt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        licenseType: z.ZodOptional<z.ZodDefault<z.ZodEnum<["all_rights_reserved", "creative_commons", "public_domain", "fair_use"]>>>;
        attributionRequired: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        title: z.ZodOptional<z.ZodString>;
        slug: z.ZodOptional<z.ZodString>;
        contentType: z.ZodOptional<z.ZodEnum<["article", "video", "podcast", "framework", "tool", "case_study", "interview", "course_lesson"]>>;
    }, "slug">, "strip", z.ZodTypeAny, {
        status?: "draft" | "published" | "archived" | "under_review" | "scheduled" | undefined;
        metaDescription?: string | undefined;
        title?: string | undefined;
        excerpt?: string | undefined;
        content?: string | undefined;
        authorId?: string | undefined;
        coAuthors?: string[] | undefined;
        contentType?: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson" | undefined;
        format?: "video" | "text" | "audio" | "interactive" | "pdf" | "presentation" | undefined;
        wordCount?: number | undefined;
        estimatedReadingTime?: number | undefined;
        primaryCategoryId?: string | undefined;
        secondaryCategories?: string[] | undefined;
        tags?: string[] | undefined;
        theologicalThemes?: string[] | undefined;
        seriesId?: string | undefined;
        seriesOrder?: number | undefined;
        visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
        networkAmplificationScore?: number | undefined;
        crossReferenceCount?: number | undefined;
        aiEnhanced?: boolean | undefined;
        aiSummary?: string | undefined;
        aiKeyPoints?: string[] | undefined;
        featuredImageUrl?: string | undefined;
        videoUrl?: string | undefined;
        audioUrl?: string | undefined;
        attachments?: {
            name: string;
            url: string;
            type: string;
            size: number;
        }[] | undefined;
        metaTitle?: string | undefined;
        canonicalUrl?: string | undefined;
        originalSource?: string | undefined;
        publishedAt?: string | undefined;
        scheduledAt?: string | undefined;
        licenseType?: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use" | undefined;
        attributionRequired?: boolean | undefined;
    }, {
        status?: "draft" | "published" | "archived" | "under_review" | "scheduled" | undefined;
        metaDescription?: string | undefined;
        title?: string | undefined;
        excerpt?: string | undefined;
        content?: string | undefined;
        authorId?: string | undefined;
        coAuthors?: string[] | undefined;
        contentType?: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson" | undefined;
        format?: "video" | "text" | "audio" | "interactive" | "pdf" | "presentation" | undefined;
        wordCount?: number | undefined;
        estimatedReadingTime?: number | undefined;
        primaryCategoryId?: string | undefined;
        secondaryCategories?: string[] | undefined;
        tags?: string[] | undefined;
        theologicalThemes?: string[] | undefined;
        seriesId?: string | undefined;
        seriesOrder?: number | undefined;
        visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
        networkAmplificationScore?: number | undefined;
        crossReferenceCount?: number | undefined;
        aiEnhanced?: boolean | undefined;
        aiSummary?: string | undefined;
        aiKeyPoints?: string[] | undefined;
        featuredImageUrl?: string | undefined;
        videoUrl?: string | undefined;
        audioUrl?: string | undefined;
        attachments?: {
            name: string;
            url: string;
            type: string;
            size: number;
        }[] | undefined;
        metaTitle?: string | undefined;
        canonicalUrl?: string | undefined;
        originalSource?: string | undefined;
        publishedAt?: string | undefined;
        scheduledAt?: string | undefined;
        licenseType?: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use" | undefined;
        attributionRequired?: boolean | undefined;
    }>, {
        status?: "draft" | "published" | "archived" | "under_review" | "scheduled" | undefined;
        metaDescription?: string | undefined;
        title?: string | undefined;
        excerpt?: string | undefined;
        content?: string | undefined;
        authorId?: string | undefined;
        coAuthors?: string[] | undefined;
        contentType?: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson" | undefined;
        format?: "video" | "text" | "audio" | "interactive" | "pdf" | "presentation" | undefined;
        wordCount?: number | undefined;
        estimatedReadingTime?: number | undefined;
        primaryCategoryId?: string | undefined;
        secondaryCategories?: string[] | undefined;
        tags?: string[] | undefined;
        theologicalThemes?: string[] | undefined;
        seriesId?: string | undefined;
        seriesOrder?: number | undefined;
        visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
        networkAmplificationScore?: number | undefined;
        crossReferenceCount?: number | undefined;
        aiEnhanced?: boolean | undefined;
        aiSummary?: string | undefined;
        aiKeyPoints?: string[] | undefined;
        featuredImageUrl?: string | undefined;
        videoUrl?: string | undefined;
        audioUrl?: string | undefined;
        attachments?: {
            name: string;
            url: string;
            type: string;
            size: number;
        }[] | undefined;
        metaTitle?: string | undefined;
        canonicalUrl?: string | undefined;
        originalSource?: string | undefined;
        publishedAt?: string | undefined;
        scheduledAt?: string | undefined;
        licenseType?: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use" | undefined;
        attributionRequired?: boolean | undefined;
    }, {
        status?: "draft" | "published" | "archived" | "under_review" | "scheduled" | undefined;
        metaDescription?: string | undefined;
        title?: string | undefined;
        excerpt?: string | undefined;
        content?: string | undefined;
        authorId?: string | undefined;
        coAuthors?: string[] | undefined;
        contentType?: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson" | undefined;
        format?: "video" | "text" | "audio" | "interactive" | "pdf" | "presentation" | undefined;
        wordCount?: number | undefined;
        estimatedReadingTime?: number | undefined;
        primaryCategoryId?: string | undefined;
        secondaryCategories?: string[] | undefined;
        tags?: string[] | undefined;
        theologicalThemes?: string[] | undefined;
        seriesId?: string | undefined;
        seriesOrder?: number | undefined;
        visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
        networkAmplificationScore?: number | undefined;
        crossReferenceCount?: number | undefined;
        aiEnhanced?: boolean | undefined;
        aiSummary?: string | undefined;
        aiKeyPoints?: string[] | undefined;
        featuredImageUrl?: string | undefined;
        videoUrl?: string | undefined;
        audioUrl?: string | undefined;
        attachments?: {
            name: string;
            url: string;
            type: string;
            size: number;
        }[] | undefined;
        metaTitle?: string | undefined;
        canonicalUrl?: string | undefined;
        originalSource?: string | undefined;
        publishedAt?: string | undefined;
        scheduledAt?: string | undefined;
        licenseType?: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use" | undefined;
        attributionRequired?: boolean | undefined;
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
        title: z.ZodString;
        slug: z.ZodString;
        excerpt: z.ZodOptional<z.ZodString>;
        content: z.ZodOptional<z.ZodString>;
        authorId: z.ZodString;
        coAuthors: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        contentType: z.ZodEnum<["article", "video", "podcast", "framework", "tool", "case_study", "interview", "course_lesson"]>;
        format: z.ZodDefault<z.ZodEnum<["text", "video", "audio", "interactive", "pdf", "presentation"]>>;
        wordCount: z.ZodOptional<z.ZodNumber>;
        estimatedReadingTime: z.ZodOptional<z.ZodNumber>;
        viewCount: z.ZodDefault<z.ZodNumber>;
        likeCount: z.ZodDefault<z.ZodNumber>;
        shareCount: z.ZodDefault<z.ZodNumber>;
        commentCount: z.ZodDefault<z.ZodNumber>;
        bookmarkCount: z.ZodDefault<z.ZodNumber>;
        primaryCategoryId: z.ZodOptional<z.ZodString>;
        secondaryCategories: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        theologicalThemes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        seriesId: z.ZodOptional<z.ZodString>;
        seriesOrder: z.ZodOptional<z.ZodNumber>;
        visibility: z.ZodDefault<z.ZodEnum<["public", "premium", "vip", "private", "organization", "invite_only"]>>;
        status: z.ZodDefault<z.ZodEnum<["draft", "published", "archived", "under_review", "scheduled"]>>;
        networkAmplificationScore: z.ZodDefault<z.ZodNumber>;
        crossReferenceCount: z.ZodDefault<z.ZodNumber>;
        aiEnhanced: z.ZodDefault<z.ZodBoolean>;
        aiSummary: z.ZodOptional<z.ZodString>;
        aiKeyPoints: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        featuredImageUrl: z.ZodOptional<z.ZodString>;
        videoUrl: z.ZodOptional<z.ZodString>;
        audioUrl: z.ZodOptional<z.ZodString>;
        attachments: z.ZodDefault<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            url: z.ZodString;
            type: z.ZodString;
            size: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            name: string;
            url: string;
            type: string;
            size: number;
        }, {
            name: string;
            url: string;
            type: string;
            size: number;
        }>, "many">>;
        metaTitle: z.ZodOptional<z.ZodString>;
        metaDescription: z.ZodOptional<z.ZodString>;
        canonicalUrl: z.ZodOptional<z.ZodString>;
        originalSource: z.ZodOptional<z.ZodString>;
        publishedAt: z.ZodOptional<z.ZodString>;
        scheduledAt: z.ZodOptional<z.ZodString>;
        licenseType: z.ZodDefault<z.ZodEnum<["all_rights_reserved", "creative_commons", "public_domain", "fair_use"]>>;
        attributionRequired: z.ZodDefault<z.ZodBoolean>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: "draft" | "published" | "archived" | "under_review" | "scheduled";
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        title: string;
        authorId: string;
        coAuthors: string[];
        contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
        format: "video" | "text" | "audio" | "interactive" | "pdf" | "presentation";
        viewCount: number;
        likeCount: number;
        shareCount: number;
        commentCount: number;
        bookmarkCount: number;
        secondaryCategories: string[];
        tags: string[];
        theologicalThemes: string[];
        visibility: "public" | "private" | "premium" | "vip" | "organization" | "invite_only";
        networkAmplificationScore: number;
        crossReferenceCount: number;
        aiEnhanced: boolean;
        aiKeyPoints: string[];
        attachments: {
            name: string;
            url: string;
            type: string;
            size: number;
        }[];
        licenseType: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use";
        attributionRequired: boolean;
        metaDescription?: string | undefined;
        excerpt?: string | undefined;
        content?: string | undefined;
        wordCount?: number | undefined;
        estimatedReadingTime?: number | undefined;
        primaryCategoryId?: string | undefined;
        seriesId?: string | undefined;
        seriesOrder?: number | undefined;
        aiSummary?: string | undefined;
        featuredImageUrl?: string | undefined;
        videoUrl?: string | undefined;
        audioUrl?: string | undefined;
        metaTitle?: string | undefined;
        canonicalUrl?: string | undefined;
        originalSource?: string | undefined;
        publishedAt?: string | undefined;
        scheduledAt?: string | undefined;
    }, {
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        title: string;
        authorId: string;
        contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
        status?: "draft" | "published" | "archived" | "under_review" | "scheduled" | undefined;
        metaDescription?: string | undefined;
        excerpt?: string | undefined;
        content?: string | undefined;
        coAuthors?: string[] | undefined;
        format?: "video" | "text" | "audio" | "interactive" | "pdf" | "presentation" | undefined;
        wordCount?: number | undefined;
        estimatedReadingTime?: number | undefined;
        viewCount?: number | undefined;
        likeCount?: number | undefined;
        shareCount?: number | undefined;
        commentCount?: number | undefined;
        bookmarkCount?: number | undefined;
        primaryCategoryId?: string | undefined;
        secondaryCategories?: string[] | undefined;
        tags?: string[] | undefined;
        theologicalThemes?: string[] | undefined;
        seriesId?: string | undefined;
        seriesOrder?: number | undefined;
        visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
        networkAmplificationScore?: number | undefined;
        crossReferenceCount?: number | undefined;
        aiEnhanced?: boolean | undefined;
        aiSummary?: string | undefined;
        aiKeyPoints?: string[] | undefined;
        featuredImageUrl?: string | undefined;
        videoUrl?: string | undefined;
        audioUrl?: string | undefined;
        attachments?: {
            name: string;
            url: string;
            type: string;
            size: number;
        }[] | undefined;
        metaTitle?: string | undefined;
        canonicalUrl?: string | undefined;
        originalSource?: string | undefined;
        publishedAt?: string | undefined;
        scheduledAt?: string | undefined;
        licenseType?: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use" | undefined;
        attributionRequired?: boolean | undefined;
    }>;
    /**
     * Find content by slug
     */
    findBySlug(slug: string): Promise<z.infer<typeof databaseContentItemSchema> | null>;
    /**
     * Find content with author and category information
     */
    findWithDetails(contentId: string): Promise<{
        content: z.infer<typeof databaseContentItemSchema>;
        author: any;
        category: any;
    } | null>;
    /**
     * Find content by author
     */
    findByAuthor(authorId: string, options?: {
        status?: string;
        visibility?: string;
        limit?: number;
        offset?: number;
    }): Promise<z.infer<typeof databaseContentItemSchema>[]>;
    /**
     * Find content by category
     */
    findByCategory(categoryId: string, options?: {
        status?: string;
        visibility?: string;
        limit?: number;
        offset?: number;
    }): Promise<z.infer<typeof databaseContentItemSchema>[]>;
    /**
     * Find published content
     */
    findPublished(options?: {
        visibility?: string;
        contentType?: string;
        limit?: number;
        offset?: number;
    }): Promise<z.infer<typeof databaseContentItemSchema>[]>;
    /**
     * Search content by text
     */
    searchContent(query: string, options?: {
        status?: string;
        visibility?: string;
        contentType?: string;
        limit?: number;
        offset?: number;
    }): Promise<z.infer<typeof databaseContentItemSchema>[]>;
    /**
     * Update content view count
     */
    incrementViewCount(contentId: string): Promise<z.infer<typeof databaseContentItemSchema>>;
    /**
     * Update content like count
     */
    incrementLikeCount(contentId: string): Promise<z.infer<typeof databaseContentItemSchema>>;
    /**
     * Update content share count
     */
    incrementShareCount(contentId: string): Promise<z.infer<typeof databaseContentItemSchema>>;
    /**
     * Publish content
     */
    publish(contentId: string, publishedAt?: Date): Promise<z.infer<typeof databaseContentItemSchema>>;
    /**
     * Unpublish content
     */
    unpublish(contentId: string): Promise<z.infer<typeof databaseContentItemSchema>>;
    /**
     * Archive content
     */
    archive(contentId: string): Promise<z.infer<typeof databaseContentItemSchema>>;
    /**
     * Get content statistics for an author
     */
    getAuthorStats(authorId: string): Promise<{
        totalContent: number;
        publishedContent: number;
        draftContent: number;
        archivedContent: number;
        totalViews: number;
        totalLikes: number;
        totalShares: number;
    }>;
    /**
     * Get trending content
     */
    getTrendingContent(options?: {
        timeframe?: 'day' | 'week' | 'month';
        limit?: number;
        contentType?: string;
    }): Promise<z.infer<typeof databaseContentItemSchema>[]>;
}
declare const contentCategoryQuerySchema: z.ZodObject<{
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
export declare class ContentCategoryService extends BaseService<z.infer<typeof databaseContentCategorySchema>, z.infer<typeof newContentCategorySchema>, z.infer<typeof updateContentCategorySchema>, z.infer<typeof contentCategoryQuerySchema>, typeof contentCategories> {
    protected table: any;
    protected entityName: string;
    protected createSchema: z.ZodObject<{
        description: z.ZodOptional<z.ZodString>;
        parentId: z.ZodOptional<z.ZodString>;
        orderIndex: z.ZodDefault<z.ZodNumber>;
        theologicalDiscipline: z.ZodOptional<z.ZodEnum<["systematic", "biblical", "practical", "historical", "philosophical", "missional", "pastoral"]>>;
        movementRelevanceScore: z.ZodDefault<z.ZodNumber>;
        apestRelevance: z.ZodDefault<z.ZodObject<{
            apostolic: z.ZodDefault<z.ZodNumber>;
            prophetic: z.ZodDefault<z.ZodNumber>;
            evangelistic: z.ZodDefault<z.ZodNumber>;
            shepherding: z.ZodDefault<z.ZodNumber>;
            teaching: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            apostolic: number;
            prophetic: number;
            evangelistic: number;
            shepherding: number;
            teaching: number;
        }, {
            apostolic?: number | undefined;
            prophetic?: number | undefined;
            evangelistic?: number | undefined;
            shepherding?: number | undefined;
            teaching?: number | undefined;
        }>>;
        metaDescription: z.ZodOptional<z.ZodString>;
        keywords: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        isActive: z.ZodDefault<z.ZodBoolean>;
    } & {
        name: z.ZodEffects<z.ZodString, string, string>;
        slug: z.ZodEffects<z.ZodString, string, string>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        slug: string;
        orderIndex: number;
        movementRelevanceScore: number;
        apestRelevance: {
            apostolic: number;
            prophetic: number;
            evangelistic: number;
            shepherding: number;
            teaching: number;
        };
        keywords: string[];
        isActive: boolean;
        description?: string | undefined;
        parentId?: string | undefined;
        theologicalDiscipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
        metaDescription?: string | undefined;
    }, {
        name: string;
        slug: string;
        description?: string | undefined;
        parentId?: string | undefined;
        orderIndex?: number | undefined;
        theologicalDiscipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
        movementRelevanceScore?: number | undefined;
        apestRelevance?: {
            apostolic?: number | undefined;
            prophetic?: number | undefined;
            evangelistic?: number | undefined;
            shepherding?: number | undefined;
            teaching?: number | undefined;
        } | undefined;
        metaDescription?: string | undefined;
        keywords?: string[] | undefined;
        isActive?: boolean | undefined;
    }>;
    protected updateSchema: z.ZodEffects<z.ZodObject<Omit<{
        description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        parentId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        orderIndex: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        theologicalDiscipline: z.ZodOptional<z.ZodOptional<z.ZodEnum<["systematic", "biblical", "practical", "historical", "philosophical", "missional", "pastoral"]>>>;
        movementRelevanceScore: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        apestRelevance: z.ZodOptional<z.ZodDefault<z.ZodObject<{
            apostolic: z.ZodDefault<z.ZodNumber>;
            prophetic: z.ZodDefault<z.ZodNumber>;
            evangelistic: z.ZodDefault<z.ZodNumber>;
            shepherding: z.ZodDefault<z.ZodNumber>;
            teaching: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            apostolic: number;
            prophetic: number;
            evangelistic: number;
            shepherding: number;
            teaching: number;
        }, {
            apostolic?: number | undefined;
            prophetic?: number | undefined;
            evangelistic?: number | undefined;
            shepherding?: number | undefined;
            teaching?: number | undefined;
        }>>>;
        metaDescription: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        keywords: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
        isActive: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        name: z.ZodOptional<z.ZodString>;
        slug: z.ZodOptional<z.ZodString>;
    }, "slug">, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        description?: string | undefined;
        parentId?: string | undefined;
        orderIndex?: number | undefined;
        theologicalDiscipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
        movementRelevanceScore?: number | undefined;
        apestRelevance?: {
            apostolic: number;
            prophetic: number;
            evangelistic: number;
            shepherding: number;
            teaching: number;
        } | undefined;
        metaDescription?: string | undefined;
        keywords?: string[] | undefined;
        isActive?: boolean | undefined;
    }, {
        name?: string | undefined;
        description?: string | undefined;
        parentId?: string | undefined;
        orderIndex?: number | undefined;
        theologicalDiscipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
        movementRelevanceScore?: number | undefined;
        apestRelevance?: {
            apostolic?: number | undefined;
            prophetic?: number | undefined;
            evangelistic?: number | undefined;
            shepherding?: number | undefined;
            teaching?: number | undefined;
        } | undefined;
        metaDescription?: string | undefined;
        keywords?: string[] | undefined;
        isActive?: boolean | undefined;
    }>, {
        name?: string | undefined;
        description?: string | undefined;
        parentId?: string | undefined;
        orderIndex?: number | undefined;
        theologicalDiscipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
        movementRelevanceScore?: number | undefined;
        apestRelevance?: {
            apostolic: number;
            prophetic: number;
            evangelistic: number;
            shepherding: number;
            teaching: number;
        } | undefined;
        metaDescription?: string | undefined;
        keywords?: string[] | undefined;
        isActive?: boolean | undefined;
    }, {
        name?: string | undefined;
        description?: string | undefined;
        parentId?: string | undefined;
        orderIndex?: number | undefined;
        theologicalDiscipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
        movementRelevanceScore?: number | undefined;
        apestRelevance?: {
            apostolic?: number | undefined;
            prophetic?: number | undefined;
            evangelistic?: number | undefined;
            shepherding?: number | undefined;
            teaching?: number | undefined;
        } | undefined;
        metaDescription?: string | undefined;
        keywords?: string[] | undefined;
        isActive?: boolean | undefined;
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
        parentId: z.ZodOptional<z.ZodString>;
        orderIndex: z.ZodDefault<z.ZodNumber>;
        theologicalDiscipline: z.ZodOptional<z.ZodEnum<["systematic", "biblical", "practical", "historical", "philosophical", "missional", "pastoral"]>>;
        movementRelevanceScore: z.ZodDefault<z.ZodNumber>;
        apestRelevance: z.ZodDefault<z.ZodObject<{
            apostolic: z.ZodDefault<z.ZodNumber>;
            prophetic: z.ZodDefault<z.ZodNumber>;
            evangelistic: z.ZodDefault<z.ZodNumber>;
            shepherding: z.ZodDefault<z.ZodNumber>;
            teaching: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            apostolic: number;
            prophetic: number;
            evangelistic: number;
            shepherding: number;
            teaching: number;
        }, {
            apostolic?: number | undefined;
            prophetic?: number | undefined;
            evangelistic?: number | undefined;
            shepherding?: number | undefined;
            teaching?: number | undefined;
        }>>;
        metaDescription: z.ZodOptional<z.ZodString>;
        keywords: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        isActive: z.ZodDefault<z.ZodBoolean>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: string;
        slug: string;
        orderIndex: number;
        movementRelevanceScore: number;
        apestRelevance: {
            apostolic: number;
            prophetic: number;
            evangelistic: number;
            shepherding: number;
            teaching: number;
        };
        keywords: string[];
        isActive: boolean;
        createdAt: string;
        updatedAt: string;
        description?: string | undefined;
        parentId?: string | undefined;
        theologicalDiscipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
        metaDescription?: string | undefined;
    }, {
        name: string;
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        description?: string | undefined;
        parentId?: string | undefined;
        orderIndex?: number | undefined;
        theologicalDiscipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
        movementRelevanceScore?: number | undefined;
        apestRelevance?: {
            apostolic?: number | undefined;
            prophetic?: number | undefined;
            evangelistic?: number | undefined;
            shepherding?: number | undefined;
            teaching?: number | undefined;
        } | undefined;
        metaDescription?: string | undefined;
        keywords?: string[] | undefined;
        isActive?: boolean | undefined;
    }>;
    /**
     * Find category by slug
     */
    findBySlug(slug: string): Promise<z.infer<typeof databaseContentCategorySchema> | null>;
    /**
     * Find categories by parent
     */
    findByParent(parentId: string): Promise<z.infer<typeof databaseContentCategorySchema>[]>;
    /**
     * Find root categories (no parent)
     */
    findRootCategories(): Promise<z.infer<typeof databaseContentCategorySchema>[]>;
    /**
     * Find categories by theological discipline
     */
    findByTheologicalDiscipline(discipline: string): Promise<z.infer<typeof databaseContentCategorySchema>[]>;
    /**
     * Get category tree (with children)
     */
    getCategoryTree(): Promise<Array<z.infer<typeof databaseContentCategorySchema> & {
        children: any[];
    }>>;
    /**
     * Get category with content count
     */
    getCategoryWithContentCount(categoryId: string): Promise<{
        category: z.infer<typeof databaseContentCategorySchema>;
        contentCount: number;
        publishedContentCount: number;
    } | null>;
}
export {};
//# sourceMappingURL=content.service.d.ts.map