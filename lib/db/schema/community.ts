import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  jsonb,
  boolean,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { userProfiles } from './auth';

// Communities - Discussion groups and networking spaces
export const communities = pgTable('communities', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  
  // Community Classification
  communityType: text('community_type', {
    enum: ['general_discussion', 'church_planting_cohort', 'leadership_development', 
           'theological_study', 'regional_network', 'ministry_focus', 'apest_group']
  }).notNull(),
  
  // Geographic & Cultural Focus
  geographicFocus: jsonb('geographic_focus').$type<string[]>().default([]), // Country codes
  culturalContext: text('cultural_context', {
    enum: ['western', 'eastern', 'african', 'latin_american', 'middle_eastern', 'oceanic', 'global']
  }).default('global'),
  
  // Language & Localization
  languagePrimary: text('language_primary').default('en'),
  languagesSupported: jsonb('languages_supported').$type<string[]>().default(['en']),
  
  // Access Control
  visibility: text('visibility', {
    enum: ['public', 'private', 'invite_only', 'organization']
  }).default('public'),
  joinApprovalRequired: boolean('join_approval_required').default(false),
  
  // Community Configuration
  maxMembers: integer('max_members'),
  allowGuestPosts: boolean('allow_guest_posts').default(false),
  moderationLevel: text('moderation_level', {
    enum: ['open', 'moderated', 'strict']
  }).default('moderated'),
  
  // Membership Statistics
  currentMemberCount: integer('current_member_count').default(0),
  totalPostsCount: integer('total_posts_count').default(0),
  
  // Community Guidelines
  guidelines: text('guidelines'),
  rules: jsonb('rules').$type<string[]>().default([]),
  
  // Leadership
  createdBy: uuid('created_by').notNull().references(() => userProfiles.id),
  moderators: jsonb('moderators').$type<string[]>().default([]), // User IDs
  
  // Status
  isActive: boolean('is_active').default(true),
  
  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Community Memberships - User participation in communities
export const communityMemberships = pgTable('community_memberships', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => userProfiles.id, { onDelete: 'cascade' }),
  communityId: uuid('community_id').notNull().references(() => communities.id, { onDelete: 'cascade' }),
  
  // Membership Role
  role: text('role', {
    enum: ['member', 'moderator', 'admin', 'owner']
  }).default('member'),
  
  // Status
  status: text('status', {
    enum: ['active', 'inactive', 'pending', 'banned', 'left']
  }).default('pending'),
  
  // Engagement Metrics
  postsCount: integer('posts_count').default(0),
  commentsCount: integer('comments_count').default(0),
  lastActiveAt: timestamp('last_active_at'),
  
  // Notifications
  emailNotifications: boolean('email_notifications').default(true),
  pushNotifications: boolean('push_notifications').default(true),
  
  // Timestamps
  joinedAt: timestamp('joined_at').defaultNow(),
  approvedAt: timestamp('approved_at'),
  leftAt: timestamp('left_at'),
  
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Community Posts - Discussions and content sharing
export const communityPosts: any = pgTable('community_posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  communityId: uuid('community_id').notNull().references(() => communities.id, { onDelete: 'cascade' }),
  authorId: uuid('author_id').notNull().references(() => userProfiles.id, { onDelete: 'cascade' }),
  
  // Post Content
  title: text('title'),
  content: text('content').notNull(),
  
  // Post Classification
  postType: text('post_type', {
    enum: ['discussion', 'question', 'announcement', 'resource_share', 'prayer_request', 'testimony']
  }).default('discussion'),
  
  // Threading
  parentPostId: uuid('parent_post_id').references(() => communityPosts.id),
  replyCount: integer('reply_count').default(0),
  
  // Engagement
  upvotes: integer('upvotes').default(0),
  downvotes: integer('downvotes').default(0),
  viewCount: integer('view_count').default(0),
  
  // Tagging & Categorization
  tags: jsonb('tags').$type<string[]>().default([]),
  
  // Moderation
  status: text('status', {
    enum: ['published', 'draft', 'pending_review', 'flagged', 'removed']
  }).default('published'),
  flaggedCount: integer('flagged_count').default(0),
  moderationNotes: text('moderation_notes'),
  
  // Media Attachments
  attachments: jsonb('attachments').$type<{
    name: string;
    url: string;
    type: string;
    size: number;
  }[]>().default([]),
  
  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  publishedAt: timestamp('published_at'),
});

// Community Post Votes - User voting on posts
export const communityPostVotes = pgTable('community_post_votes', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id').notNull().references(() => communityPosts.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => userProfiles.id, { onDelete: 'cascade' }),
  
  // Vote Type
  voteType: text('vote_type', {
    enum: ['upvote', 'downvote']
  }).notNull(),
  
  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Collaborations - Multi-author content creation with revenue sharing
export const collaborations = pgTable('collaborations', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description'),
  
  // Collaboration Type
  collaborationType: text('collaboration_type', {
    enum: ['content_creation', 'research_project', 'course_development', 'book_writing', 'event_planning']
  }).notNull(),
  
  // Leadership
  leadAuthorId: uuid('lead_author_id').notNull().references(() => userProfiles.id),
  collaborators: jsonb('collaborators').$type<{
    userId: string;
    role: string;
    revenueShare: number; // Percentage
    joinedAt: string;
  }[]>().default([]),
  
  // Revenue Configuration
  revenueShareModel: text('revenue_share_model', {
    enum: ['equal', 'weighted', 'lead_majority', 'custom']
  }).default('equal'),
  totalRevenueShare: integer('total_revenue_share').default(100), // Should sum to 100%
  
  // Project Management
  status: text('status', {
    enum: ['planning', 'active', 'review', 'completed', 'cancelled']
  }).default('planning'),
  
  // Timeline
  startDate: timestamp('start_date'),
  targetCompletionDate: timestamp('target_completion_date'),
  actualCompletionDate: timestamp('actual_completion_date'),
  
  // Deliverables
  expectedDeliverables: jsonb('expected_deliverables').$type<{
    type: string;
    description: string;
    dueDate: string;
    completed: boolean;
  }[]>().default([]),
  
  // Network Impact
  networkAmplificationGoal: integer('network_amplification_goal'), // Target score
  actualNetworkImpact: integer('actual_network_impact'),
  
  // Communication
  communicationChannels: jsonb('communication_channels').$type<{
    type: string;
    url: string;
    primary: boolean;
  }[]>().default([]),
  
  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Relations
export const communitiesRelations = relations(communities, ({ one, many }) => ({
  creator: one(userProfiles, {
    fields: [communities.createdBy],
    references: [userProfiles.id],
  }),
  memberships: many(communityMemberships),
  posts: many(communityPosts),
}));

export const communityMembershipsRelations = relations(communityMemberships, ({ one }) => ({
  user: one(userProfiles, {
    fields: [communityMemberships.userId],
    references: [userProfiles.id],
  }),
  community: one(communities, {
    fields: [communityMemberships.communityId],
    references: [communities.id],
  }),
}));

export const communityPostsRelations = relations(communityPosts, ({ one, many }) => ({
  community: one(communities, {
    fields: [communityPosts.communityId],
    references: [communities.id],
  }),
  author: one(userProfiles, {
    fields: [communityPosts.authorId],
    references: [userProfiles.id],
  }),
  parentPost: one(communityPosts, {
    fields: [communityPosts.parentPostId],
    references: [communityPosts.id],
  }),
  replies: many(communityPosts),
  votes: many(communityPostVotes),
}));

export const communityPostVotesRelations = relations(communityPostVotes, ({ one }) => ({
  post: one(communityPosts, {
    fields: [communityPostVotes.postId],
    references: [communityPosts.id],
  }),
  user: one(userProfiles, {
    fields: [communityPostVotes.userId],
    references: [userProfiles.id],
  }),
}));

export const collaborationsRelations = relations(collaborations, ({ one }) => ({
  leadAuthor: one(userProfiles, {
    fields: [collaborations.leadAuthorId],
    references: [userProfiles.id],
  }),
}));

// Type exports
export type Community = typeof communities.$inferSelect;
export type NewCommunity = typeof communities.$inferInsert;
export type CommunityMembership = typeof communityMemberships.$inferSelect;
export type NewCommunityMembership = typeof communityMemberships.$inferInsert;
export type CommunityPost = typeof communityPosts.$inferSelect;
export type NewCommunityPost = typeof communityPosts.$inferInsert;
export type CommunityPostVote = typeof communityPostVotes.$inferSelect;
export type NewCommunityPostVote = typeof communityPostVotes.$inferInsert;
export type Collaboration = typeof collaborations.$inferSelect;
export type NewCollaboration = typeof collaborations.$inferInsert;
