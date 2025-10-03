import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  jsonb,
  boolean,
  decimal,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { userProfiles } from './auth';

// Assessments - APEST and other ministry assessment frameworks
export const assessments = pgTable('assessments', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),

  // Assessment Classification
  assessmentType: text('assessment_type', {
    enum: [
      'apest',
      'mdna',
      'cultural_intelligence',
      'leadership_style',
      'spiritual_gifts',
      'other',
    ],
  }).notNull(),

  // Assessment Configuration
  questionsCount: integer('questions_count').notNull(),
  estimatedDuration: integer('estimated_duration'), // minutes
  passingScore: integer('passing_score'),

  // Versioning & Localization
  version: text('version').default('1.0'),
  language: text('language').default('en'),
  culturalAdaptation: text('cultural_adaptation', {
    enum: [
      'western',
      'eastern',
      'african',
      'latin_american',
      'middle_eastern',
      'oceanic',
      'universal',
      'global',
    ],
  }).default('universal'),

  // Research & Validity
  researchBacked: boolean('research_backed').default(false),
  validityScore: decimal('validity_score', { precision: 3, scale: 2 }),
  reliabilityScore: decimal('reliability_score', { precision: 3, scale: 2 }),

  // Configuration
  instructions: text('instructions'),
  scoringMethod: text('scoring_method', {
    enum: ['likert_5', 'likert_7', 'binary', 'ranking', 'weighted'],
  }).default('likert_5'),

  // Status
  status: text('status', {
    enum: ['draft', 'active', 'archived', 'under_review'],
  }).default('draft'),

  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  publishedAt: timestamp('published_at'),
});

// Assessment Questions - Question bank for assessments
export const assessmentQuestions = pgTable('assessment_questions', {
  id: uuid('id').primaryKey().defaultRandom(),
  assessmentId: uuid('assessment_id')
    .notNull()
    .references(() => assessments.id, { onDelete: 'cascade' }),

  // Question Content
  questionText: text('question_text').notNull(),
  questionType: text('question_type', {
    enum: ['likert', 'multiple_choice', 'binary', 'ranking', 'text'],
  }).notNull(),

  // Question Configuration
  orderIndex: integer('order_index').notNull(),
  isRequired: boolean('is_required').default(true),
  category: text('category'), // For grouping questions

  // Scoring
  weight: decimal('weight', { precision: 3, scale: 2 }).default('1.0'),
  reverseScored: boolean('reverse_scored').default(false),

  // APEST Mapping (for APEST assessments)
  apestDimension: text('apest_dimension', {
    enum: ['apostolic', 'prophetic', 'evangelistic', 'shepherding', 'teaching'],
  }),

  // Answer Options (for multiple choice, likert, etc.)
  answerOptions: jsonb('answer_options').$type<
    {
      value: number;
      label: string;
      description?: string;
    }[]
  >(),

  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// User Assessments - Individual assessment results
export const userAssessments = pgTable('user_assessments', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => userProfiles.id, { onDelete: 'cascade' }),
  assessmentId: uuid('assessment_id')
    .notNull()
    .references(() => assessments.id),

  // Completion Status
  startedAt: timestamp('started_at').notNull().defaultNow(),
  completedAt: timestamp('completed_at'),
  completionPercentage: integer('completion_percentage').default(0),

  // Raw Scores
  rawScores: jsonb('raw_scores').$type<Record<string, number>>(),
  totalScore: integer('total_score'),
  maxPossibleScore: integer('max_possible_score'),

  // APEST Specific Scores (for APEST assessments)
  apostolicScore: integer('apostolic_score'),
  propheticScore: integer('prophetic_score'),
  evangelisticScore: integer('evangelistic_score'),
  shepherdingScore: integer('shepherding_score'),
  teachingScore: integer('teaching_score'),

  // Normalized Scores (0-100 scale)
  normalizedScores: jsonb('normalized_scores').$type<Record<string, number>>(),
  primaryGift: text('primary_gift'),
  secondaryGift: text('secondary_gift'),

  // Quality Metrics
  responseConsistency: decimal('response_consistency', {
    precision: 3,
    scale: 2,
  }),
  completionTime: integer('completion_time'), // minutes
  confidenceLevel: integer('confidence_level'), // 1-5 scale

  // Cultural Adjustment
  culturalAdjustmentApplied: boolean('cultural_adjustment_applied').default(
    false
  ),
  culturalAdjustmentFactor: decimal('cultural_adjustment_factor', {
    precision: 3,
    scale: 2,
  }),

  // AI Generated Insights
  aiInsights: text('ai_insights'),
  personalizedRecommendations: jsonb('personalized_recommendations').$type<{
    strengths: string[];
    growthAreas: string[];
    actionItems: string[];
    contentRecommendations: string[];
  }>(),

  // Peer Matching
  suggestedPeers: jsonb('suggested_peers').$type<string[]>(), // User IDs
  complementaryGifts: jsonb('complementary_gifts').$type<string[]>(),

  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Assessment Responses - Individual question responses
export const assessmentResponses = pgTable('assessment_responses', {
  id: uuid('id').primaryKey().defaultRandom(),
  userAssessmentId: uuid('user_assessment_id')
    .notNull()
    .references(() => userAssessments.id, { onDelete: 'cascade' }),
  questionId: uuid('question_id')
    .notNull()
    .references(() => assessmentQuestions.id),

  // Response Data
  responseValue: integer('response_value'),
  responseText: text('response_text'),
  responseTime: integer('response_time'), // seconds to answer

  // Quality Indicators
  confidence: integer('confidence'), // 1-5 scale
  skipped: boolean('skipped').default(false),

  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Relations
export const assessmentsRelations = relations(assessments, ({ many }) => ({
  questions: many(assessmentQuestions),
  userAssessments: many(userAssessments),
}));

export const assessmentQuestionsRelations = relations(
  assessmentQuestions,
  ({ one, many }) => ({
    assessment: one(assessments, {
      fields: [assessmentQuestions.assessmentId],
      references: [assessments.id],
    }),
    responses: many(assessmentResponses),
  })
);

export const userAssessmentsRelations = relations(
  userAssessments,
  ({ one, many }) => ({
    user: one(userProfiles, {
      fields: [userAssessments.userId],
      references: [userProfiles.id],
    }),
    assessment: one(assessments, {
      fields: [userAssessments.assessmentId],
      references: [assessments.id],
    }),
    responses: many(assessmentResponses),
  })
);

export const assessmentResponsesRelations = relations(
  assessmentResponses,
  ({ one }) => ({
    userAssessment: one(userAssessments, {
      fields: [assessmentResponses.userAssessmentId],
      references: [userAssessments.id],
    }),
    question: one(assessmentQuestions, {
      fields: [assessmentResponses.questionId],
      references: [assessmentQuestions.id],
    }),
  })
);

// Type exports
export type Assessment = typeof assessments.$inferSelect;
export type NewAssessment = typeof assessments.$inferInsert;
export type AssessmentQuestion = typeof assessmentQuestions.$inferSelect;
export type NewAssessmentQuestion = typeof assessmentQuestions.$inferInsert;
export type UserAssessment = typeof userAssessments.$inferSelect;
export type NewUserAssessment = typeof userAssessments.$inferInsert;
export type AssessmentResponse = typeof assessmentResponses.$inferSelect;
export type NewAssessmentResponse = typeof assessmentResponses.$inferInsert;
