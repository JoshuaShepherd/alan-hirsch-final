# Query Cookbook
*Alan Hirsch Digital Platform - Current Operational Queries*

## Overview

This cookbook contains the most important queries you can run **with the current deployed schema** to monitor platform health, user engagement, and business metrics. Each query includes purpose, expected results, and troubleshooting notes.

**⚠️ Current Schema Status**: Only queries for deployed tables are included. Queries for planned tables are marked as "PLANNED" and will be added when those tables are implemented.

**⚠️ Contract Testing**: If any of these queries suddenly fail or return unexpected results, it indicates schema drift or breaking changes.

---

## User Engagement & Platform Health

### 1. Daily Active Users (DAU) ✅ **IMPLEMENTED**
**Purpose**: Track daily platform engagement using Supabase Auth logs
**Frequency**: Daily

> **Note**: This query uses Supabase Auth logs and user activity tracking.

```sql
-- Daily active users for the last 30 days (when user_analytics_events is implemented)
SELECT 
    DATE(created_at) as date,
    COUNT(DISTINCT user_id) as daily_active_users,
    COUNT(*) as total_events
FROM user_analytics_events 
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

**Expected Results**: 
- Steady or growing DAU trend
- Typical range: 500-2000 DAU for mature platform
- Weekend dips are normal

**Red Flags**:
- Sudden 50%+ drop in DAU
- Zero events for any day
- Massive spike (could indicate bot traffic)

### 2. New User Onboarding Progress ✅ **IMPLEMENTED**
**Purpose**: Monitor conversion through onboarding funnel
**Frequency**: Daily

```sql
-- Onboarding completion rates by signup date
SELECT 
    DATE(created_at) as signup_date,
    COUNT(*) as total_signups,
    COUNT(*) FILTER (WHERE onboarding_completed = true) as completed_onboarding,
    ROUND(
        COUNT(*) FILTER (WHERE onboarding_completed = true) * 100.0 / COUNT(*), 
        2
    ) as completion_rate_percent,
    AVG(onboarding_step) as avg_onboarding_step
FROM user_profiles 
WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY DATE(created_at)
ORDER BY signup_date DESC;
```

**Expected Results**:
- 60-80% onboarding completion rate
- Average step progression > 3 (out of typical 5-7 steps)

**Red Flags**:
- Completion rate < 40%
- Users stuck at specific step (indicates UX issue)

### 3. Content Engagement Health ✅ **IMPLEMENTED**
**Purpose**: Identify most and least engaging content
**Frequency**: Weekly

```sql
-- Content performance over last 7 days
SELECT 
    c.title,
    c.content_type,
    c.published_at::date,
    c.view_count,
    c.like_count,
    c.share_count,
    c.comment_count,
    c.bookmark_count,
    c.network_amplification_score,
    p.display_name as author_name,
    -- Engagement score calculation
    (c.view_count * 1.0 + c.like_count * 3.0 + c.share_count * 5.0 + c.comment_count * 5.0 + c.bookmark_count * 3.0) as engagement_score
FROM content_items c
JOIN user_profiles p ON c.author_id = p.id
WHERE c.published_at >= CURRENT_DATE - INTERVAL '7 days'
AND c.status = 'published'
ORDER BY engagement_score DESC
LIMIT 20;
```

**Expected Results**:
- Top content should have engagement_score > 100
- Healthy mix of content types
- Multiple authors represented

**Red Flags**:
- All top content from single author (indicates network imbalance)
- Very low engagement scores across all content
- Zero likes/shares/comments (community not engaging)

---

## Assessment System Health ⏳ **PLANNED**

> **Note**: The assessment system is planned but not yet deployed. These queries will be available when the assessment tables are implemented.

### 4. Assessment Completion Rates ⏳ **PLANNED**
**Purpose**: Monitor assessment funnel and identify drop-off points
**Frequency**: Weekly

```sql
-- Assessment completion rates by type (when assessment tables are implemented)
SELECT 
    a.name as assessment_name,
    a.assessment_type,
    COUNT(ua.id) as total_attempts,
    COUNT(*) FILTER (WHERE ua.completed_at IS NOT NULL) as completed,
    ROUND(
        COUNT(*) FILTER (WHERE ua.completed_at IS NOT NULL) * 100.0 / COUNT(ua.id), 
        2
    ) as completion_rate_percent,
    AVG(ua.completion_percentage) as avg_completion_percentage,
    AVG(EXTRACT(EPOCH FROM (ua.completed_at - ua.started_at))/60) as avg_duration_minutes
FROM assessments a
LEFT JOIN user_assessments ua ON a.id = ua.assessment_id
WHERE ua.started_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY a.id, a.name, a.assessment_type
ORDER BY total_attempts DESC;
```

### 5. Assessment Quality Metrics ⏳ **PLANNED**
**Purpose**: Ensure assessment results are reliable and consistent
**Frequency**: Weekly

```sql
-- Assessment quality and consistency metrics (when assessment tables are implemented)
SELECT 
    a.name as assessment_name,
    COUNT(*) as completed_assessments,
    AVG(ua.response_consistency) as avg_consistency,
    AVG(ua.confidence_level) as avg_confidence,
    COUNT(*) FILTER (WHERE ua.response_consistency < 0.7) as low_consistency_count,
    -- Distribution of primary gifts (for APEST)
    COUNT(*) FILTER (WHERE ua.primary_gift = 'apostolic') as apostolic_count,
    COUNT(*) FILTER (WHERE ua.primary_gift = 'prophetic') as prophetic_count,
    COUNT(*) FILTER (WHERE ua.primary_gift = 'evangelistic') as evangelistic_count,
    COUNT(*) FILTER (WHERE ua.primary_gift = 'shepherding') as shepherding_count,
    COUNT(*) FILTER (WHERE ua.primary_gift = 'teaching') as teaching_count
FROM assessments a
JOIN user_assessments ua ON a.id = ua.assessment_id
WHERE ua.completed_at >= CURRENT_DATE - INTERVAL '30 days'
AND ua.completed_at IS NOT NULL
GROUP BY a.id, a.name
ORDER BY completed_assessments DESC;
```

---

## AI System Performance ⏳ **PLANNED**

> **Note**: The AI system is planned but not yet deployed. These queries will be available when the AI tables are implemented.

### 6. AI Conversation Quality ⏳ **PLANNED**
**Purpose**: Monitor AI interaction satisfaction and accuracy
**Frequency**: Daily

```sql
-- AI conversation quality metrics (when AI tables are implemented)
SELECT 
    DATE(created_at) as date,
    conversation_type,
    COUNT(*) as total_conversations,
    AVG(total_messages) as avg_messages_per_conversation,
    AVG(user_satisfaction_rating) as avg_satisfaction,
    COUNT(*) FILTER (WHERE user_satisfaction_rating >= 4) as high_satisfaction_count,
    COUNT(*) FILTER (WHERE theological_accuracy_verified = true) as verified_accurate_count,
    AVG(conversation_duration_minutes) as avg_duration_minutes
FROM ai_conversations 
WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY DATE(created_at), conversation_type
ORDER BY date DESC, total_conversations DESC;
```

### 7. AI Content Enhancement Status ⏳ **PLANNED**
**Purpose**: Track AI processing jobs and quality
**Frequency**: Daily

```sql
-- AI content processing job status (when AI tables are implemented)
SELECT 
    job_type,
    status,
    COUNT(*) as job_count,
    AVG(confidence_score) as avg_confidence,
    COUNT(*) FILTER (WHERE human_approved = true) as human_approved_count,
    AVG(processing_cost) as avg_cost,
    AVG(EXTRACT(EPOCH FROM (completed_at - started_at))/60) as avg_processing_minutes
FROM ai_content_jobs 
WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY job_type, status
ORDER BY job_type, status;
```

---

## Revenue & Subscription Health

### 8. Subscription Metrics Dashboard ✅ **IMPLEMENTED**
**Purpose**: Monitor subscription growth and churn
**Frequency**: Daily

```sql
-- Subscription health metrics
WITH subscription_metrics AS (
    SELECT 
        sp.name as plan_name,
        sp.plan_type,
        COUNT(*) as active_subscriptions,
        SUM(us.amount) as monthly_recurring_revenue,
        AVG(us.months_subscribed) as avg_months_subscribed,
        COUNT(*) FILTER (WHERE us.created_at >= CURRENT_DATE - INTERVAL '30 days') as new_subscriptions_30d,
        COUNT(*) FILTER (WHERE us.cancelled_at >= CURRENT_DATE - INTERVAL '30 days') as cancelled_30d
    FROM user_subscriptions us
    JOIN subscription_plans sp ON us.plan_id = sp.id
    WHERE us.status = 'active'
    GROUP BY sp.id, sp.name, sp.plan_type
)
SELECT 
    *,
    CASE 
        WHEN new_subscriptions_30d > 0 
        THEN ROUND(cancelled_30d * 100.0 / new_subscriptions_30d, 2)
        ELSE 0 
    END as churn_rate_percent
FROM subscription_metrics
ORDER BY monthly_recurring_revenue DESC;
```

**Expected Results**:
- Churn rate < 5% monthly
- Average subscription length > 6 months
- Growing MRR month-over-month
- Healthy mix across plan types

**Red Flags**:
- Churn rate > 10%
- Declining MRR
- All subscriptions concentrated in free tier

### 9. Revenue Attribution & Network Effects ⏳ **PLANNED**
**Purpose**: Track revenue sharing and network amplification
**Frequency**: Weekly

> **Note**: This query requires the `transactions` table which is not yet deployed.

```sql
-- Network revenue attribution analysis (when transactions table is implemented)
SELECT 
    p.display_name as leader_name,
    p.leader_tier,
    COUNT(DISTINCT us.id) as subscribers,
    SUM(t.leader_amount) as total_leader_revenue,
    SUM(t.platform_fee) as total_platform_revenue,
    AVG(t.network_amplification_factor) as avg_amplification_factor,
    COUNT(*) FILTER (WHERE t.attributed_to_network_effect = true) as network_attributed_transactions
FROM user_profiles p
LEFT JOIN user_subscriptions us ON p.id = us.leader_profile_id AND us.status = 'active'
LEFT JOIN transactions t ON p.id = t.leader_profile_id 
    AND t.payment_status = 'succeeded'
    AND t.processed_at >= CURRENT_DATE - INTERVAL '30 days'
WHERE p.leader_tier IS NOT NULL
GROUP BY p.id, p.display_name, p.leader_tier
HAVING COUNT(DISTINCT us.id) > 0 OR SUM(t.leader_amount) > 0
ORDER BY total_leader_revenue DESC;
```

---

## Content Network Health

### 10. Cross-Reference Network Analysis ⏳ **PLANNED**
**Purpose**: Monitor content interconnectedness and network effects
**Frequency**: Weekly

> **Note**: This query requires the `content_cross_references` table which is not yet deployed.

```sql
-- Content cross-reference network health (when cross-references are implemented)
WITH content_network AS (
    SELECT 
        c.id,
        c.title,
        c.author_id,
        p.display_name as author_name,
        COUNT(cr_in.id) as incoming_references,
        COUNT(cr_out.id) as outgoing_references,
        AVG(cr_in.relevance_score) as avg_incoming_relevance,
        SUM(cr_in.click_count) as total_clicks_received
    FROM content_items c
    JOIN user_profiles p ON c.author_id = p.id
    LEFT JOIN content_cross_references cr_in ON c.id = cr_in.target_content_id
    LEFT JOIN content_cross_references cr_out ON c.id = cr_out.source_content_id
    WHERE c.status = 'published'
    AND c.published_at >= CURRENT_DATE - INTERVAL '90 days'
    GROUP BY c.id, c.title, c.author_id, p.display_name
)
SELECT 
    author_name,
    COUNT(*) as content_pieces,
    AVG(incoming_references) as avg_incoming_refs,
    AVG(outgoing_references) as avg_outgoing_refs,
    SUM(total_clicks_received) as total_network_clicks,
    -- Network connectivity score
    AVG(incoming_references + outgoing_references) as avg_network_connectivity
FROM content_network
GROUP BY author_id, author_name
HAVING COUNT(*) >= 3  -- Authors with at least 3 pieces
ORDER BY avg_network_connectivity DESC;
```

### 11. Community Engagement Health ⏳ **PLANNED**
**Purpose**: Monitor community activity and member engagement
**Frequency**: Weekly

> **Note**: This query requires the `community_posts` table which is not yet deployed.

```sql
-- Community engagement metrics (when community posts are implemented)
SELECT 
    c.name as community_name,
    c.community_type,
    c.current_member_count,
    COUNT(DISTINCT cp.id) as posts_last_30d,
    COUNT(DISTINCT cp.author_id) as active_posters_30d,
    AVG(cp.upvotes - cp.downvotes) as avg_net_votes,
    COUNT(*) FILTER (WHERE cp.post_type = 'question') as questions_30d,
    COUNT(*) FILTER (WHERE cp.reply_count > 0) as posts_with_replies,
    -- Engagement rate calculation
    ROUND(
        COUNT(DISTINCT cp.author_id) * 100.0 / NULLIF(c.current_member_count, 0), 
        2
    ) as engagement_rate_percent
FROM communities c
LEFT JOIN community_posts cp ON c.id = cp.community_id 
    AND cp.created_at >= CURRENT_DATE - INTERVAL '30 days'
    AND cp.status = 'published'
WHERE c.current_member_count > 10  -- Focus on established communities
GROUP BY c.id, c.name, c.community_type, c.current_member_count
ORDER BY engagement_rate_percent DESC;
```

---

## Learning Outcomes & Impact ⏳ **PLANNED**

> **Note**: Learning tracking and impact measurement are planned but not yet deployed. These queries will be available when the analytics tables are implemented.

### 12. Learning Progress & Completion Rates ⏳ **PLANNED**
**Purpose**: Track user learning journey and content effectiveness
**Frequency**: Weekly

```sql
-- Learning progress and completion analysis (when user_content_interactions is implemented)
SELECT 
    cc.name as category_name,
    c.content_type,
    COUNT(DISTINCT uci.user_id) as unique_learners,
    COUNT(*) as total_interactions,
    AVG(uci.progress_percentage) as avg_progress,
    COUNT(*) FILTER (WHERE uci.progress_percentage = 100) as completions,
    AVG(uci.time_spent_minutes) as avg_time_spent,
    COUNT(*) FILTER (WHERE uci.implementation_status = 'implemented') as implemented_count,
    -- Completion rate
    ROUND(
        COUNT(*) FILTER (WHERE uci.progress_percentage = 100) * 100.0 / COUNT(*), 
        2
    ) as completion_rate_percent
FROM user_content_interactions uci
JOIN content_items c ON uci.content_id = c.id
LEFT JOIN content_categories cc ON c.primary_category_id = cc.id
WHERE uci.first_accessed_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY cc.name, c.content_type
HAVING COUNT(*) >= 10  -- Categories with meaningful sample size
ORDER BY completion_rate_percent DESC;
```

### 13. Ministry Impact Tracking ⏳ **PLANNED**
**Purpose**: Measure real-world ministry outcomes
**Frequency**: Monthly

```sql
-- Ministry impact and transformation indicators (when learning_outcomes is implemented)
SELECT 
    up.ministry_role,
    up.leader_tier,
    COUNT(DISTINCT up.id) as total_users,
    COUNT(DISTINCT lo.id) as users_with_outcomes,
    AVG(lo.improvement_percentage) as avg_improvement,
    COUNT(*) FILTER (WHERE lo.outcome_type = 'ministry_impact') as ministry_impacts,
    COUNT(*) FILTER (WHERE lo.outcome_type = 'behavior_change') as behavior_changes,
    COUNT(*) FILTER (WHERE lo.verified_by = 'supervisor_confirmed') as supervisor_verified,
    -- Outcome rate
    ROUND(
        COUNT(DISTINCT lo.user_id) * 100.0 / COUNT(DISTINCT up.id), 
        2
    ) as outcome_rate_percent
FROM user_profiles up
LEFT JOIN learning_outcomes lo ON up.id = lo.user_id 
    AND lo.measured_at >= CURRENT_DATE - INTERVAL '90 days'
WHERE up.account_status = 'active'
AND up.created_at <= CURRENT_DATE - INTERVAL '30 days'  -- Users active for at least 30 days
GROUP BY up.ministry_role, up.leader_tier
HAVING COUNT(DISTINCT up.id) >= 5
ORDER BY outcome_rate_percent DESC;
```

---

## System Health & Performance

### 14. Database Performance Monitor
**Purpose**: Identify slow queries and performance issues
**Frequency**: Daily

```sql
-- Query performance and database health
SELECT 
    schemaname,
    tablename,
    seq_scan,
    seq_tup_read,
    idx_scan,
    idx_tup_fetch,
    n_tup_ins as inserts,
    n_tup_upd as updates,
    n_tup_del as deletes,
    -- Index usage ratio
    CASE 
        WHEN seq_scan + idx_scan > 0 
        THEN ROUND(idx_scan * 100.0 / (seq_scan + idx_scan), 2)
        ELSE 0 
    END as index_usage_percent
FROM pg_stat_user_tables 
WHERE schemaname = 'public'
ORDER BY seq_tup_read DESC
LIMIT 20;
```

**Expected Results**:
- Index usage > 95% for large tables
- Low sequential scan counts on large tables
- Balanced read/write ratios

**Red Flags**:
- High sequential scans on tables with > 10k rows
- Index usage < 80%
- Extremely high insert/update rates (potential abuse)

### 15. Error Rate & System Stability ⏳ **PLANNED**
**Purpose**: Monitor application errors and system stability
**Frequency**: Hourly

> **Note**: This query requires the `audit_logs` table which is not yet deployed.

```sql
-- Error rates and system stability metrics (when audit_logs is implemented)
SELECT 
    DATE_TRUNC('hour', created_at) as hour,
    risk_level,
    COUNT(*) as event_count,
    COUNT(DISTINCT user_id) as affected_users,
    array_agg(DISTINCT action) as top_actions
FROM audit_logs 
WHERE created_at >= CURRENT_DATE - INTERVAL '24 hours'
GROUP BY DATE_TRUNC('hour', created_at), risk_level
ORDER BY hour DESC, risk_level DESC;
```

---

## Troubleshooting Queries

### 16. User Support Diagnostics ✅ **IMPLEMENTED**
**Purpose**: Quick diagnostics for user support issues
**Run**: As needed for support tickets

```sql
-- User account diagnostic (replace with actual user email)
WITH user_summary AS (
    SELECT 
        up.*,
        us.status as subscription_status,
        sp.name as plan_name,
        COUNT(DISTINCT c.id) as content_count
    FROM user_profiles up
    LEFT JOIN user_subscriptions us ON up.id = us.user_id AND us.status = 'active'
    LEFT JOIN subscription_plans sp ON us.plan_id = sp.id
    LEFT JOIN content_items c ON up.id = c.author_id
    WHERE up.email = 'user@example.com'  -- Replace with actual email
    GROUP BY up.id, us.status, sp.name
)
SELECT * FROM user_summary;
```

### 17. Content Performance Diagnostics ✅ **IMPLEMENTED**
**Purpose**: Analyze why specific content isn't performing
**Run**: As needed for content analysis

```sql
-- Content performance diagnostic (replace with actual content slug)
SELECT 
    c.*,
    p.display_name as author_name,
    cc.name as category_name
FROM content_items c
JOIN user_profiles p ON c.author_id = p.id
LEFT JOIN content_categories cc ON c.primary_category_id = cc.id
WHERE c.slug = 'your-content-slug'  -- Replace with actual slug;
```

---

## Automated Monitoring Setup

### Health Check Script Template ✅ **IMPLEMENTED**
```sql
-- Daily health check summary (current implementation)
WITH health_metrics AS (
    SELECT 
        'New Signups' as metric,
        COUNT(*) as value,
        'users' as unit
    FROM user_profiles 
    WHERE DATE(created_at) = CURRENT_DATE
    
    UNION ALL
    
    SELECT 
        'Content Published' as metric,
        COUNT(*) as value,
        'pieces' as unit
    FROM content_items 
    WHERE DATE(published_at) = CURRENT_DATE
    
    UNION ALL
    
    SELECT 
        'Active Subscriptions' as metric,
        COUNT(*) as value,
        'subscriptions' as unit
    FROM user_subscriptions 
    WHERE status = 'active'
    
    UNION ALL
    
    SELECT 
        'Communities' as metric,
        COUNT(*) as value,
        'communities' as unit
    FROM communities 
    WHERE is_active = true
)
SELECT 
    metric,
    value,
    unit,
    CURRENT_DATE as report_date
FROM health_metrics
ORDER BY metric;
```

### Alert Conditions
Set up alerts for:
- New signups drop > 50% day-over-day
- Content publication rate drops significantly
- Subscription churn > 10% monthly
- Database performance issues (slow queries)
- RLS policy violations

---

## Notes on Query Maintenance

1. **Performance**: Add `LIMIT` clauses for large result sets
2. **Indexes**: Ensure proper indexes exist for date range queries
3. **Caching**: Consider materializing frequently-run queries as views
4. **Monitoring**: Set up automated execution of key queries
5. **Documentation**: Update this cookbook when schema changes
6. **Testing**: Validate queries after any schema migrations
