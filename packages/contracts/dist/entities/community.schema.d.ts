import { z } from 'zod';
export declare const communityEntitySchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    type: z.ZodDefault<z.ZodEnum<["public", "private", "invite_only"]>>;
    status: z.ZodDefault<z.ZodEnum<["active", "inactive", "archived"]>>;
    memberCount: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "public" | "private" | "invite_only";
    status: "active" | "archived" | "inactive";
    id: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    memberCount: number;
    description?: string | undefined;
}, {
    name: string;
    id: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    type?: "public" | "private" | "invite_only" | undefined;
    status?: "active" | "archived" | "inactive" | undefined;
    description?: string | undefined;
    memberCount?: number | undefined;
}>;
export declare const communityMembershipEntitySchema: z.ZodObject<{
    id: z.ZodString;
    communityId: z.ZodString;
    userId: z.ZodString;
    role: z.ZodDefault<z.ZodEnum<["owner", "admin", "moderator", "member"]>>;
    status: z.ZodDefault<z.ZodEnum<["active", "inactive", "banned"]>>;
    joinedAt: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "active" | "inactive" | "banned";
    id: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    communityId: string;
    role: "owner" | "admin" | "member" | "moderator";
    joinedAt: string;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    communityId: string;
    joinedAt: string;
    status?: "active" | "inactive" | "banned" | undefined;
    role?: "owner" | "admin" | "member" | "moderator" | undefined;
}>;
export declare const communityPostEntitySchema: z.ZodObject<{
    id: z.ZodString;
    communityId: z.ZodString;
    authorId: z.ZodString;
    title: z.ZodString;
    content: z.ZodString;
    type: z.ZodDefault<z.ZodEnum<["discussion", "announcement", "question", "resource"]>>;
    status: z.ZodDefault<z.ZodEnum<["published", "draft", "archived"]>>;
    viewCount: z.ZodDefault<z.ZodNumber>;
    likeCount: z.ZodDefault<z.ZodNumber>;
    commentCount: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "discussion" | "announcement" | "question" | "resource";
    status: "draft" | "published" | "archived";
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    content: string;
    authorId: string;
    viewCount: number;
    likeCount: number;
    commentCount: number;
    communityId: string;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    content: string;
    authorId: string;
    communityId: string;
    type?: "discussion" | "announcement" | "question" | "resource" | undefined;
    status?: "draft" | "published" | "archived" | undefined;
    viewCount?: number | undefined;
    likeCount?: number | undefined;
    commentCount?: number | undefined;
}>;
export declare const communityPostVoteEntitySchema: z.ZodObject<{
    id: z.ZodString;
    postId: z.ZodString;
    userId: z.ZodString;
    voteType: z.ZodEnum<["up", "down"]>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: string;
    userId: string;
    postId: string;
    voteType: "up" | "down";
}, {
    id: string;
    createdAt: string;
    userId: string;
    postId: string;
    voteType: "up" | "down";
}>;
export declare const collaborationEntitySchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    type: z.ZodEnum<["project", "initiative", "partnership", "event"]>;
    status: z.ZodDefault<z.ZodEnum<["planning", "active", "completed", "cancelled"]>>;
    leadUserId: z.ZodString;
    organizationId: z.ZodOptional<z.ZodString>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "project" | "initiative" | "partnership" | "event";
    status: "active" | "cancelled" | "planning" | "completed";
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    leadUserId: string;
    description?: string | undefined;
    organizationId?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
}, {
    type: "project" | "initiative" | "partnership" | "event";
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    leadUserId: string;
    status?: "active" | "cancelled" | "planning" | "completed" | undefined;
    description?: string | undefined;
    organizationId?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
}>;
export declare const createCommunitySchema: z.ZodObject<Omit<{
    id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    type: z.ZodDefault<z.ZodEnum<["public", "private", "invite_only"]>>;
    status: z.ZodDefault<z.ZodEnum<["active", "inactive", "archived"]>>;
    memberCount: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "id" | "createdAt" | "updatedAt" | "memberCount">, "strip", z.ZodTypeAny, {
    name: string;
    type: "public" | "private" | "invite_only";
    status: "active" | "archived" | "inactive";
    slug: string;
    description?: string | undefined;
}, {
    name: string;
    slug: string;
    type?: "public" | "private" | "invite_only" | undefined;
    status?: "active" | "archived" | "inactive" | undefined;
    description?: string | undefined;
}>;
export declare const createCommunityMembershipSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    communityId: z.ZodString;
    userId: z.ZodString;
    role: z.ZodDefault<z.ZodEnum<["owner", "admin", "moderator", "member"]>>;
    status: z.ZodDefault<z.ZodEnum<["active", "inactive", "banned"]>>;
    joinedAt: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
    status: "active" | "inactive" | "banned";
    userId: string;
    communityId: string;
    role: "owner" | "admin" | "member" | "moderator";
    joinedAt: string;
}, {
    userId: string;
    communityId: string;
    joinedAt: string;
    status?: "active" | "inactive" | "banned" | undefined;
    role?: "owner" | "admin" | "member" | "moderator" | undefined;
}>;
export declare const createCommunityPostSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    communityId: z.ZodString;
    authorId: z.ZodString;
    title: z.ZodString;
    content: z.ZodString;
    type: z.ZodDefault<z.ZodEnum<["discussion", "announcement", "question", "resource"]>>;
    status: z.ZodDefault<z.ZodEnum<["published", "draft", "archived"]>>;
    viewCount: z.ZodDefault<z.ZodNumber>;
    likeCount: z.ZodDefault<z.ZodNumber>;
    commentCount: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "id" | "createdAt" | "updatedAt" | "viewCount" | "likeCount" | "commentCount">, "strip", z.ZodTypeAny, {
    type: "discussion" | "announcement" | "question" | "resource";
    status: "draft" | "published" | "archived";
    title: string;
    content: string;
    authorId: string;
    communityId: string;
}, {
    title: string;
    content: string;
    authorId: string;
    communityId: string;
    type?: "discussion" | "announcement" | "question" | "resource" | undefined;
    status?: "draft" | "published" | "archived" | undefined;
}>;
export declare const createCommunityPostVoteSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    postId: z.ZodString;
    userId: z.ZodString;
    voteType: z.ZodEnum<["up", "down"]>;
    createdAt: z.ZodString;
}, "id" | "createdAt">, "strip", z.ZodTypeAny, {
    userId: string;
    postId: string;
    voteType: "up" | "down";
}, {
    userId: string;
    postId: string;
    voteType: "up" | "down";
}>;
export declare const createCollaborationSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    type: z.ZodEnum<["project", "initiative", "partnership", "event"]>;
    status: z.ZodDefault<z.ZodEnum<["planning", "active", "completed", "cancelled"]>>;
    leadUserId: z.ZodString;
    organizationId: z.ZodOptional<z.ZodString>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
    type: "project" | "initiative" | "partnership" | "event";
    status: "active" | "cancelled" | "planning" | "completed";
    title: string;
    leadUserId: string;
    description?: string | undefined;
    organizationId?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
}, {
    type: "project" | "initiative" | "partnership" | "event";
    title: string;
    leadUserId: string;
    status?: "active" | "cancelled" | "planning" | "completed" | undefined;
    description?: string | undefined;
    organizationId?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
}>;
export declare const updateCommunitySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodDefault<z.ZodEnum<["public", "private", "invite_only"]>>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["active", "inactive", "archived"]>>>;
    slug: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    type?: "public" | "private" | "invite_only" | undefined;
    status?: "active" | "archived" | "inactive" | undefined;
    slug?: string | undefined;
    description?: string | undefined;
}, {
    name?: string | undefined;
    type?: "public" | "private" | "invite_only" | undefined;
    status?: "active" | "archived" | "inactive" | undefined;
    slug?: string | undefined;
    description?: string | undefined;
}>;
export declare const updateCommunityMembershipSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["active", "inactive", "banned"]>>>;
    userId: z.ZodOptional<z.ZodString>;
    communityId: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodDefault<z.ZodEnum<["owner", "admin", "moderator", "member"]>>>;
    joinedAt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status?: "active" | "inactive" | "banned" | undefined;
    userId?: string | undefined;
    communityId?: string | undefined;
    role?: "owner" | "admin" | "member" | "moderator" | undefined;
    joinedAt?: string | undefined;
}, {
    status?: "active" | "inactive" | "banned" | undefined;
    userId?: string | undefined;
    communityId?: string | undefined;
    role?: "owner" | "admin" | "member" | "moderator" | undefined;
    joinedAt?: string | undefined;
}>;
export declare const updateCommunityPostSchema: z.ZodObject<{
    type: z.ZodOptional<z.ZodDefault<z.ZodEnum<["discussion", "announcement", "question", "resource"]>>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["published", "draft", "archived"]>>>;
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    authorId: z.ZodOptional<z.ZodString>;
    communityId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type?: "discussion" | "announcement" | "question" | "resource" | undefined;
    status?: "draft" | "published" | "archived" | undefined;
    title?: string | undefined;
    content?: string | undefined;
    authorId?: string | undefined;
    communityId?: string | undefined;
}, {
    type?: "discussion" | "announcement" | "question" | "resource" | undefined;
    status?: "draft" | "published" | "archived" | undefined;
    title?: string | undefined;
    content?: string | undefined;
    authorId?: string | undefined;
    communityId?: string | undefined;
}>;
export declare const updateCollaborationSchema: z.ZodObject<{
    type: z.ZodOptional<z.ZodEnum<["project", "initiative", "partnership", "event"]>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["planning", "active", "completed", "cancelled"]>>>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    title: z.ZodOptional<z.ZodString>;
    organizationId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    leadUserId: z.ZodOptional<z.ZodString>;
    startDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    endDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    type?: "project" | "initiative" | "partnership" | "event" | undefined;
    status?: "active" | "cancelled" | "planning" | "completed" | undefined;
    description?: string | undefined;
    title?: string | undefined;
    organizationId?: string | undefined;
    leadUserId?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
}, {
    type?: "project" | "initiative" | "partnership" | "event" | undefined;
    status?: "active" | "cancelled" | "planning" | "completed" | undefined;
    description?: string | undefined;
    title?: string | undefined;
    organizationId?: string | undefined;
    leadUserId?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
}>;
export type CommunityEntity = z.infer<typeof communityEntitySchema>;
export type CommunityMembershipEntity = z.infer<typeof communityMembershipEntitySchema>;
export type CommunityPostEntity = z.infer<typeof communityPostEntitySchema>;
export type CommunityPostVoteEntity = z.infer<typeof communityPostVoteEntitySchema>;
export type CollaborationEntity = z.infer<typeof collaborationEntitySchema>;
export type CreateCommunity = z.infer<typeof createCommunitySchema>;
export type CreateCommunityMembership = z.infer<typeof createCommunityMembershipSchema>;
export type CreateCommunityPost = z.infer<typeof createCommunityPostSchema>;
export type CreateCommunityPostVote = z.infer<typeof createCommunityPostVoteSchema>;
export type CreateCollaboration = z.infer<typeof createCollaborationSchema>;
export type UpdateCommunity = z.infer<typeof updateCommunitySchema>;
export type UpdateCommunityMembership = z.infer<typeof updateCommunityMembershipSchema>;
export type UpdateCommunityPost = z.infer<typeof updateCommunityPostSchema>;
export type UpdateCollaboration = z.infer<typeof updateCollaborationSchema>;
export declare const communitySchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    type: z.ZodDefault<z.ZodEnum<["public", "private", "invite_only"]>>;
    status: z.ZodDefault<z.ZodEnum<["active", "inactive", "archived"]>>;
    memberCount: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "public" | "private" | "invite_only";
    status: "active" | "archived" | "inactive";
    id: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    memberCount: number;
    description?: string | undefined;
}, {
    name: string;
    id: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    type?: "public" | "private" | "invite_only" | undefined;
    status?: "active" | "archived" | "inactive" | undefined;
    description?: string | undefined;
    memberCount?: number | undefined;
}>;
export declare const communityMembershipSchema: z.ZodObject<{
    id: z.ZodString;
    communityId: z.ZodString;
    userId: z.ZodString;
    role: z.ZodDefault<z.ZodEnum<["owner", "admin", "moderator", "member"]>>;
    status: z.ZodDefault<z.ZodEnum<["active", "inactive", "banned"]>>;
    joinedAt: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "active" | "inactive" | "banned";
    id: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    communityId: string;
    role: "owner" | "admin" | "member" | "moderator";
    joinedAt: string;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    communityId: string;
    joinedAt: string;
    status?: "active" | "inactive" | "banned" | undefined;
    role?: "owner" | "admin" | "member" | "moderator" | undefined;
}>;
export declare const communityPostSchema: z.ZodObject<{
    id: z.ZodString;
    communityId: z.ZodString;
    authorId: z.ZodString;
    title: z.ZodString;
    content: z.ZodString;
    type: z.ZodDefault<z.ZodEnum<["discussion", "announcement", "question", "resource"]>>;
    status: z.ZodDefault<z.ZodEnum<["published", "draft", "archived"]>>;
    viewCount: z.ZodDefault<z.ZodNumber>;
    likeCount: z.ZodDefault<z.ZodNumber>;
    commentCount: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "discussion" | "announcement" | "question" | "resource";
    status: "draft" | "published" | "archived";
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    content: string;
    authorId: string;
    viewCount: number;
    likeCount: number;
    commentCount: number;
    communityId: string;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    content: string;
    authorId: string;
    communityId: string;
    type?: "discussion" | "announcement" | "question" | "resource" | undefined;
    status?: "draft" | "published" | "archived" | undefined;
    viewCount?: number | undefined;
    likeCount?: number | undefined;
    commentCount?: number | undefined;
}>;
export declare const communityPostVoteSchema: z.ZodObject<{
    id: z.ZodString;
    postId: z.ZodString;
    userId: z.ZodString;
    voteType: z.ZodEnum<["up", "down"]>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: string;
    userId: string;
    postId: string;
    voteType: "up" | "down";
}, {
    id: string;
    createdAt: string;
    userId: string;
    postId: string;
    voteType: "up" | "down";
}>;
export declare const collaborationSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    type: z.ZodEnum<["project", "initiative", "partnership", "event"]>;
    status: z.ZodDefault<z.ZodEnum<["planning", "active", "completed", "cancelled"]>>;
    leadUserId: z.ZodString;
    organizationId: z.ZodOptional<z.ZodString>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "project" | "initiative" | "partnership" | "event";
    status: "active" | "cancelled" | "planning" | "completed";
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    leadUserId: string;
    description?: string | undefined;
    organizationId?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
}, {
    type: "project" | "initiative" | "partnership" | "event";
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    leadUserId: string;
    status?: "active" | "cancelled" | "planning" | "completed" | undefined;
    description?: string | undefined;
    organizationId?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
}>;
export declare const newCollaborationSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    type: z.ZodEnum<["project", "initiative", "partnership", "event"]>;
    status: z.ZodDefault<z.ZodEnum<["planning", "active", "completed", "cancelled"]>>;
    leadUserId: z.ZodString;
    organizationId: z.ZodOptional<z.ZodString>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
    type: "project" | "initiative" | "partnership" | "event";
    status: "active" | "cancelled" | "planning" | "completed";
    title: string;
    leadUserId: string;
    description?: string | undefined;
    organizationId?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
}, {
    type: "project" | "initiative" | "partnership" | "event";
    title: string;
    leadUserId: string;
    status?: "active" | "cancelled" | "planning" | "completed" | undefined;
    description?: string | undefined;
    organizationId?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
}>;
export declare const newCommunityMembershipSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    communityId: z.ZodString;
    userId: z.ZodString;
    role: z.ZodDefault<z.ZodEnum<["owner", "admin", "moderator", "member"]>>;
    status: z.ZodDefault<z.ZodEnum<["active", "inactive", "banned"]>>;
    joinedAt: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
    status: "active" | "inactive" | "banned";
    userId: string;
    communityId: string;
    role: "owner" | "admin" | "member" | "moderator";
    joinedAt: string;
}, {
    userId: string;
    communityId: string;
    joinedAt: string;
    status?: "active" | "inactive" | "banned" | undefined;
    role?: "owner" | "admin" | "member" | "moderator" | undefined;
}>;
export declare const newCommunityPostSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    communityId: z.ZodString;
    authorId: z.ZodString;
    title: z.ZodString;
    content: z.ZodString;
    type: z.ZodDefault<z.ZodEnum<["discussion", "announcement", "question", "resource"]>>;
    status: z.ZodDefault<z.ZodEnum<["published", "draft", "archived"]>>;
    viewCount: z.ZodDefault<z.ZodNumber>;
    likeCount: z.ZodDefault<z.ZodNumber>;
    commentCount: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "id" | "createdAt" | "updatedAt" | "viewCount" | "likeCount" | "commentCount">, "strip", z.ZodTypeAny, {
    type: "discussion" | "announcement" | "question" | "resource";
    status: "draft" | "published" | "archived";
    title: string;
    content: string;
    authorId: string;
    communityId: string;
}, {
    title: string;
    content: string;
    authorId: string;
    communityId: string;
    type?: "discussion" | "announcement" | "question" | "resource" | undefined;
    status?: "draft" | "published" | "archived" | undefined;
}>;
export declare const newCommunityPostVoteSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    postId: z.ZodString;
    userId: z.ZodString;
    voteType: z.ZodEnum<["up", "down"]>;
    createdAt: z.ZodString;
}, "id" | "createdAt">, "strip", z.ZodTypeAny, {
    userId: string;
    postId: string;
    voteType: "up" | "down";
}, {
    userId: string;
    postId: string;
    voteType: "up" | "down";
}>;
export declare const newCommunitySchema: z.ZodObject<Omit<{
    id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    type: z.ZodDefault<z.ZodEnum<["public", "private", "invite_only"]>>;
    status: z.ZodDefault<z.ZodEnum<["active", "inactive", "archived"]>>;
    memberCount: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "id" | "createdAt" | "updatedAt" | "memberCount">, "strip", z.ZodTypeAny, {
    name: string;
    type: "public" | "private" | "invite_only";
    status: "active" | "archived" | "inactive";
    slug: string;
    description?: string | undefined;
}, {
    name: string;
    slug: string;
    type?: "public" | "private" | "invite_only" | undefined;
    status?: "active" | "archived" | "inactive" | undefined;
    description?: string | undefined;
}>;
export type Community = CommunityEntity;
export type CommunityMembership = CommunityMembershipEntity;
export type CommunityPost = CommunityPostEntity;
export type CommunityPostVote = CommunityPostVoteEntity;
export type Collaboration = CollaborationEntity;
export type NewCommunity = CreateCommunity;
export type NewCommunityMembership = CreateCommunityMembership;
export type NewCommunityPost = CreateCommunityPost;
export type NewCommunityPostVote = CreateCommunityPostVote;
export type NewCollaboration = CreateCollaboration;
//# sourceMappingURL=community.schema.d.ts.map