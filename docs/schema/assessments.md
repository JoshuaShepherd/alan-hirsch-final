# Assessments Schema Guide

This document provides a comprehensive guide to the assessments database schema, including table structures, relationships, indexes, and common query patterns.

## Table Overview

The assessments system consists of four main tables:

- `assessments` - Core assessment definitions
- `assessment_questions` - Question bank for assessments
- `user_assessments` - Individual assessment results
- `assessment_responses` - Individual question responses

## Tables

### assessments

The main assessments table stores assessment definitions and metadata.

#### Columns

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | `uuid` | No | `gen_random_uuid()` | Primary key |
| `name` | `text` | No | - | Assessment name |
| `slug` | `text` | No | - | URL-friendly identifier (unique) |
| `description` | `text` | Yes | - | Assessment description |
| `assessment_type` | `text` | No | - | Type of assessment (enum) |
| `questions_count` | `integer` | No | - | Number of questions |
| `estimated_duration` | `integer` | Yes | - | Estimated duration in minutes |
| `passing_score` | `integer` | Yes | - | Passing score threshold |
| `version` | `text` | Yes | `'1.0'` | Version number |
| `language` | `text` | Yes | `'en'` | Language code |
| `cultural_adaptation` | `text` | Yes | `'universal'` | Cultural context (enum) |
| `research_backed` | `boolean` | Yes | `false` | Whether research-backed |
| `validity_score` | `numeric` | Yes | - | Validity score (0-1) |
| `reliability_score` | `numeric` | Yes | - | Reliability score (0-1) |
| `instructions` | `text` | Yes | - | Assessment instructions |
| `scoring_method` | `text` | Yes | `'likert_5'` | Scoring method (enum) |
| `status` | `text` | Yes | `'draft'` | Assessment status (enum) |
| `created_at` | `timestamp` | No | `now()` | Creation timestamp |
| `updated_at` | `timestamp` | No | `now()` | Last update timestamp |
| `published_at` | `timestamp` | Yes | - | Publication timestamp |

#### Enums

**assessment_type**
- `apest` - APEST (Apostolic, Prophetic, Evangelistic, Shepherding, Teaching)
- `mdna` - MDNA (Missional DNA)
- `cultural_intelligence` - Cultural Intelligence
- `leadership_style` - Leadership Style
- `spiritual_gifts` - Spiritual Gifts
- `other` - Other

**cultural_adaptation**
- `western` - Western cultural context
- `eastern` - Eastern cultural context
- `african` - African cultural context
- `latin_american` - Latin American cultural context
- `middle_eastern` - Middle Eastern cultural context
- `oceanic` - Oceanic cultural context
- `universal` - Universal (default)

**scoring_method**
- `likert_5` - 5-point Likert scale
- `likert_7` - 7-point Likert scale
- `binary` - Binary (Yes/No)
- `ranking` - Ranking
- `weighted` - Weighted scoring

**status**
- `draft` - Draft (not published)
- `active` - Active (published and available)
- `under_review` - Under review
- `archived` - Archived

#### Indexes

- Primary key on `id`
- Unique index on `slug`

### assessment_questions

Stores questions for assessments with APEST dimension mapping.

#### Columns

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | `uuid` | No | `gen_random_uuid()` | Primary key |
| `assessment_id` | `uuid` | No | - | Foreign key to assessments |
| `question_text` | `text` | No | - | Question text |
| `question_type` | `text` | No | - | Question type (enum) |
| `order_index` | `integer` | No | - | Display order |
| `is_required` | `boolean` | Yes | `true` | Whether question is required |
| `category` | `text` | Yes | - | Question category |
| `weight` | `numeric` | Yes | `1.0` | Question weight |
| `reverse_scored` | `boolean` | Yes | `false` | Whether reverse scored |
| `apest_dimension` | `text` | Yes | - | APEST dimension (enum) |
| `answer_options` | `jsonb` | Yes | - | Answer options (JSON) |
| `created_at` | `timestamp` | No | `now()` | Creation timestamp |
| `updated_at` | `timestamp` | No | `now()` | Last update timestamp |

#### Enums

**question_type**
- `likert` - Likert scale
- `multiple_choice` - Multiple choice
- `binary` - Binary (Yes/No)
- `ranking` - Ranking
- `text` - Text input

**apest_dimension**
- `apostolic` - Apostolic dimension
- `prophetic` - Prophetic dimension
- `evangelistic` - Evangelistic dimension
- `shepherding` - Shepherding dimension
- `teaching` - Teaching dimension

#### Indexes

- Primary key on `id`
- Foreign key on `assessment_id`

### user_assessments

Stores individual user assessment results and scores.

#### Columns

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | `uuid` | No | `gen_random_uuid()` | Primary key |
| `user_id` | `uuid` | No | - | Foreign key to user_profiles |
| `assessment_id` | `uuid` | No | - | Foreign key to assessments |
| `started_at` | `timestamp` | No | `now()` | Start timestamp |
| `completed_at` | `timestamp` | Yes | - | Completion timestamp |
| `completion_percentage` | `integer` | Yes | `0` | Completion percentage |
| `raw_scores` | `jsonb` | Yes | - | Raw scores (JSON) |
| `total_score` | `integer` | Yes | - | Total score |
| `max_possible_score` | `integer` | Yes | - | Maximum possible score |
| `apostolic_score` | `integer` | Yes | - | Apostolic dimension score |
| `prophetic_score` | `integer` | Yes | - | Prophetic dimension score |
| `evangelistic_score` | `integer` | Yes | - | Evangelistic dimension score |
| `shepherding_score` | `integer` | Yes | - | Shepherding dimension score |
| `teaching_score` | `integer` | Yes | - | Teaching dimension score |
| `normalized_scores` | `jsonb` | Yes | - | Normalized scores (JSON) |
| `primary_gift` | `text` | Yes | - | Primary gift identified |
| `secondary_gift` | `text` | Yes | - | Secondary gift identified |
| `response_consistency` | `numeric` | Yes | - | Response consistency score |
| `completion_time` | `integer` | Yes | - | Completion time in minutes |
| `confidence_level` | `integer` | Yes | - | Confidence level (1-5) |
| `cultural_adjustment_applied` | `boolean` | Yes | `false` | Whether cultural adjustment applied |
| `cultural_adjustment_factor` | `numeric` | Yes | - | Cultural adjustment factor |
| `ai_insights` | `text` | Yes | - | AI-generated insights |
| `personalized_recommendations` | `jsonb` | Yes | - | Personalized recommendations (JSON) |
| `suggested_peers` | `jsonb` | Yes | `[]` | Suggested peer user IDs (JSON) |
| `complementary_gifts` | `jsonb` | Yes | `[]` | Complementary gifts (JSON) |
| `created_at` | `timestamp` | No | `now()` | Creation timestamp |
| `updated_at` | `timestamp` | No | `now()` | Last update timestamp |

#### Indexes

- Primary key on `id`
- Foreign keys on `user_id` and `assessment_id`

### assessment_responses

Stores individual question responses.

#### Columns

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | `uuid` | No | `gen_random_uuid()` | Primary key |
| `user_assessment_id` | `uuid` | No | - | Foreign key to user_assessments |
| `question_id` | `uuid` | No | - | Foreign key to assessment_questions |
| `response_value` | `integer` | Yes | - | Numeric response value |
| `response_text` | `text` | Yes | - | Text response |
| `response_time` | `integer` | Yes | - | Response time in seconds |
| `confidence` | `integer` | Yes | - | Confidence level (1-5) |
| `skipped` | `boolean` | Yes | `false` | Whether question was skipped |
| `created_at` | `timestamp` | No | `now()` | Creation timestamp |
| `updated_at` | `timestamp` | No | `now()` | Last update timestamp |

#### Indexes

- Primary key on `id`
- Foreign keys on `user_assessment_id` and `question_id`

## Relationships

### Foreign Key Relationships

```
assessments (1) ←→ (many) assessment_questions
assessments (1) ←→ (many) user_assessments
user_profiles (1) ←→ (many) user_assessments
user_assessments (1) ←→ (many) assessment_responses
assessment_questions (1) ←→ (many) assessment_responses
```

### Cascade Rules

- Deleting an assessment cascades to delete its questions
- Deleting a user assessment cascades to delete its responses
- Deleting a user profile cascades to delete their assessments

## Common Query Patterns

### Get Assessment with Questions

```sql
SELECT 
  a.*,
  q.id as question_id,
  q.question_text,
  q.question_type,
  q.order_index,
  q.apest_dimension
FROM assessments a
LEFT JOIN assessment_questions q ON a.id = q.assessment_id
WHERE a.id = $1
ORDER BY q.order_index;
```

### Get User Assessment Results

```sql
SELECT 
  ua.*,
  a.name as assessment_name,
  a.assessment_type
FROM user_assessments ua
JOIN assessments a ON ua.assessment_id = a.id
WHERE ua.user_id = $1
ORDER BY ua.completed_at DESC;
```

### Get APEST Scores Summary

```sql
SELECT 
  ua.user_id,
  AVG(ua.apostolic_score) as avg_apostolic,
  AVG(ua.prophetic_score) as avg_prophetic,
  AVG(ua.evangelistic_score) as avg_evangelistic,
  AVG(ua.shepherding_score) as avg_shepherding,
  AVG(ua.teaching_score) as avg_teaching
FROM user_assessments ua
WHERE ua.completed_at IS NOT NULL
GROUP BY ua.user_id;
```

### Get Assessment Completion Rates

```sql
SELECT 
  a.id,
  a.name,
  COUNT(ua.id) as total_attempts,
  COUNT(ua.completed_at) as completed_attempts,
  ROUND(
    COUNT(ua.completed_at) * 100.0 / COUNT(ua.id), 2
  ) as completion_rate
FROM assessments a
LEFT JOIN user_assessments ua ON a.id = ua.assessment_id
GROUP BY a.id, a.name
ORDER BY completion_rate DESC;
```

## Drizzle ORM Examples

### Get Assessment with Questions

```typescript
import { db } from '@/lib/db/drizzle';
import { assessments, assessmentQuestions } from '@/lib/db/schema';
import { eq, asc } from 'drizzle-orm';

const assessmentWithQuestions = await db
  .select()
  .from(assessments)
  .leftJoin(assessmentQuestions, eq(assessments.id, assessmentQuestions.assessmentId))
  .where(eq(assessments.id, assessmentId))
  .orderBy(asc(assessmentQuestions.orderIndex));
```

### Create User Assessment

```typescript
import { db } from '@/lib/db/drizzle';
import { userAssessments } from '@/lib/db/schema';

const [newUserAssessment] = await db
  .insert(userAssessments)
  .values({
    userId,
    assessmentId,
    startedAt: new Date(),
  })
  .returning();
```

### Update Assessment Scores

```typescript
import { db } from '@/lib/db/drizzle';
import { userAssessments } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

await db
  .update(userAssessments)
  .set({
    totalScore,
    apostolicScore,
    propheticScore,
    evangelisticScore,
    shepherdingScore,
    teachingScore,
    completedAt: new Date(),
    completionPercentage: 100,
  })
  .where(eq(userAssessments.id, userAssessmentId));
```

## Gotchas and Best Practices

### Date/Time Handling

- All timestamps are stored as `timestamp without time zone`
- Use `toISOString()` when converting to JSON for API responses
- Be consistent with timezone handling in application code

### JSONB Fields

- `answer_options` in `assessment_questions` stores structured answer data
- `raw_scores` and `normalized_scores` in `user_assessments` store score mappings
- `personalized_recommendations` stores structured recommendation data
- Always validate JSONB structure in application code

### Enum Values

- Enum values are case-sensitive
- Use the exact enum values in queries
- Consider creating TypeScript enums that match database enums

### Performance Considerations

- Index frequently queried columns (user_id, assessment_id, status)
- Use pagination for large result sets
- Consider materialized views for complex aggregations
- Monitor query performance with EXPLAIN ANALYZE

### Data Integrity

- Use foreign key constraints to maintain referential integrity
- Implement application-level validation for enum values
- Consider using database triggers for audit trails
- Regular backups of assessment data

## Migration Notes

When modifying the assessments schema:

1. Always create migrations for schema changes
2. Test migrations on development database first
3. Consider data migration for existing records
4. Update Drizzle schema files to match database changes
5. Update TypeScript types and validation schemas
6. Update API documentation and tests

## Related Documentation

- [RLS Playbook for Assessments](./rls/assessments.md)
- [API Documentation](../MASTER/API_DOCUMENTATION.md)
- [Database Design Guide](../database-design/comprehensive-brief.md)
