-- Alan Hirsch Digital Platform - Comprehensive RLS Policies
-- This migration creates comprehensive Row-Level Security policies for all platform tables

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_series ENABLE ROW LEVEL SECURITY;
ALTER TABLE series_content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_cross_references ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_post_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaborations ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_content_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_outcomes ENABLE ROW LEVEL SECURITY;
ALTER TABLE movement_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_feature_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_consents ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notification_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- ==============================================
-- HELPER FUNCTIONS FOR RLS POLICIES
-- ==============================================

-- Function to check if user is organization member
CREATE OR REPLACE FUNCTION is_organization_member(org_id UUID, user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM organization_memberships
    WHERE organization_id = org_id
    AND user_id = is_organization_member.user_id
    AND status = 'active'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user is organization admin
CREATE OR REPLACE FUNCTION is_organization_admin(org_id UUID, user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM organization_memberships
    WHERE organization_id = org_id
    AND user_id = is_organization_admin.user_id
    AND status = 'active'
    AND role IN ('admin', 'owner')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user has active subscription
CREATE OR REPLACE FUNCTION has_active_subscription(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_subscriptions
    WHERE user_id = has_active_subscription.user_id
    AND status = 'active'
    AND current_period_end > NOW()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user has premium subscription
CREATE OR REPLACE FUNCTION has_premium_subscription(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_subscriptions us
    JOIN subscription_plans sp ON us.plan_id = sp.id
    WHERE us.user_id = has_premium_subscription.user_id
    AND us.status = 'active'
    AND us.current_period_end > NOW()
    AND sp.content_access_level IN ('premium', 'vip')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================================
-- USER PROFILES POLICIES
-- ==============================================

-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

-- Users can insert their own profile (during registration)
CREATE POLICY "Users can insert own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Public profiles are viewable by authenticated users
CREATE POLICY "Public profiles are viewable" ON user_profiles
    FOR SELECT USING (
        account_status = 'active'
        AND (privacy_settings->>'publicProfile')::boolean = true
    );

-- ==============================================
-- ORGANIZATIONS POLICIES
-- ==============================================

-- Organization members can view their organization
CREATE POLICY "Organization members can view org" ON organizations
    FOR SELECT USING (is_organization_member(id));

-- Organization admins can update their organization
CREATE POLICY "Organization admins can update org" ON organizations
    FOR UPDATE USING (is_organization_admin(id));

-- Organization owners can insert organizations
CREATE POLICY "Users can create organizations" ON organizations
    FOR INSERT WITH CHECK (auth.uid() = account_owner_id);

-- ==============================================
-- ORGANIZATION MEMBERSHIPS POLICIES
-- ==============================================

-- Users can view their own memberships
CREATE POLICY "Users can view own memberships" ON organization_memberships
    FOR SELECT USING (auth.uid() = user_id);

-- Organization admins can view all memberships in their org
CREATE POLICY "Org admins can view memberships" ON organization_memberships
    FOR SELECT USING (is_organization_admin(organization_id));

-- Organization admins can manage memberships
CREATE POLICY "Org admins can manage memberships" ON organization_memberships
    FOR ALL USING (is_organization_admin(organization_id));

-- Users can accept invitations to join organizations
CREATE POLICY "Users can accept invitations" ON organization_memberships
    FOR UPDATE USING (
        auth.uid() = user_id
        AND status = 'pending'
    );

-- ==============================================
-- CONTENT CATEGORIES POLICIES
-- ==============================================

-- Active categories are publicly readable
CREATE POLICY "Active categories are public" ON content_categories
    FOR SELECT USING (is_active = true);

-- Organization admins can manage categories in their org
CREATE POLICY "Org admins can manage categories" ON content_categories
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM organizations o
            WHERE o.id = (
                SELECT organization_id FROM user_profiles up
                WHERE up.id = auth.uid()
                LIMIT 1
            )
            AND is_organization_admin(o.id)
        )
    );

-- ==============================================
-- CONTENT ITEMS POLICIES
-- ==============================================

-- Published public content is readable by all
CREATE POLICY "Published content is public" ON content_items
    FOR SELECT USING (
        status = 'published'
        AND visibility = 'public'
    );

-- Authors can manage their own content
CREATE POLICY "Authors can manage own content" ON content_items
    FOR ALL USING (auth.uid() = author_id);

-- Premium content requires premium subscription
CREATE POLICY "Premium content requires subscription" ON content_items
    FOR SELECT USING (
        visibility = 'premium'
        AND has_premium_subscription()
    );

-- Organization members can view org content
CREATE POLICY "Org members can view org content" ON content_items
    FOR SELECT USING (
        visibility = 'organization'
        AND EXISTS (
            SELECT 1 FROM user_profiles up
            JOIN organization_memberships om ON up.id = om.user_id
            WHERE up.id = auth.uid()
            AND om.organization_id = (
                SELECT organization_id FROM user_profiles up2
                WHERE up2.id = content_items.author_id
            )
            AND om.status = 'active'
        )
    );

-- ==============================================
-- CONTENT SERIES POLICIES
-- ==============================================

-- Published series are publicly readable
CREATE POLICY "Published series are public" ON content_series
    FOR SELECT USING (
        status = 'published'
        AND visibility = 'public'
    );

-- Authors can manage their own series
CREATE POLICY "Authors can manage own series" ON content_series
    FOR ALL USING (auth.uid() = author_id);

-- Premium series require premium subscription
CREATE POLICY "Premium series require subscription" ON content_series
    FOR SELECT USING (
        visibility = 'premium'
        AND has_premium_subscription()
    );

-- ==============================================
-- SERIES CONTENT ITEMS POLICIES
-- ==============================================

-- Users can view series content if they can view the series
CREATE POLICY "Series content follows series access" ON series_content_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM content_series cs
            WHERE cs.id = series_content_items.series_id
            AND (
                (cs.status = 'published' AND cs.visibility = 'public')
                OR (cs.visibility = 'premium' AND has_premium_subscription())
                OR (cs.author_id = auth.uid())
            )
        )
    );

-- Series authors can manage series content
CREATE POLICY "Series authors can manage content" ON series_content_items
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM content_series cs
            WHERE cs.id = series_content_items.series_id
            AND cs.author_id = auth.uid()
        )
    );

-- ==============================================
-- CONTENT CROSS REFERENCES POLICIES
-- ==============================================

-- Users can view cross-references for content they can access
CREATE POLICY "Cross-references follow content access" ON content_cross_references
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM content_items ci
            WHERE ci.id = content_cross_references.source_content_id
            AND (
                (ci.status = 'published' AND ci.visibility = 'public')
                OR (ci.visibility = 'premium' AND has_premium_subscription())
                OR (ci.author_id = auth.uid())
            )
        )
    );

-- Content authors can manage their cross-references
CREATE POLICY "Authors can manage cross-references" ON content_cross_references
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM content_items ci
            WHERE ci.id = content_cross_references.source_content_id
            AND ci.author_id = auth.uid()
        )
    );

-- ==============================================
-- ASSESSMENTS POLICIES
-- ==============================================

-- Published assessments are publicly readable
CREATE POLICY "Published assessments are public" ON assessments
    FOR SELECT USING (status = 'published');

-- Organization admins can manage assessments
CREATE POLICY "Org admins can manage assessments" ON assessments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM organizations o
            WHERE o.id = (
                SELECT organization_id FROM user_profiles up
                WHERE up.id = auth.uid()
                LIMIT 1
            )
            AND is_organization_admin(o.id)
        )
    );

-- ==============================================
-- ASSESSMENT QUESTIONS POLICIES
-- ==============================================

-- Users can view questions for assessments they can access
CREATE POLICY "Questions follow assessment access" ON assessment_questions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM assessments a
            WHERE a.id = assessment_questions.assessment_id
            AND a.status = 'published'
        )
    );

-- Assessment managers can manage questions
CREATE POLICY "Assessment managers can manage questions" ON assessment_questions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM assessments a
            WHERE a.id = assessment_questions.assessment_id
            AND EXISTS (
                SELECT 1 FROM organizations o
                WHERE o.id = (
                    SELECT organization_id FROM user_profiles up
                    WHERE up.id = auth.uid()
                    LIMIT 1
                )
                AND is_organization_admin(o.id)
            )
        )
    );

-- ==============================================
-- USER ASSESSMENTS POLICIES
-- ==============================================

-- Users can view their own assessments
CREATE POLICY "Users can view own assessments" ON user_assessments
    FOR SELECT USING (auth.uid() = user_id);

-- Users can create their own assessments
CREATE POLICY "Users can create own assessments" ON user_assessments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own assessments
CREATE POLICY "Users can update own assessments" ON user_assessments
    FOR UPDATE USING (auth.uid() = user_id);

-- Organization admins can view org member assessments (with privacy respect)
CREATE POLICY "Org admins can view member assessments" ON user_assessments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_profiles up
            JOIN organization_memberships om ON up.id = om.user_id
            WHERE up.id = auth.uid()
            AND om.organization_id = (
                SELECT organization_id FROM user_profiles up2
                WHERE up2.id = user_assessments.user_id
            )
            AND om.status = 'active'
            AND om.role IN ('admin', 'owner')
            AND (
                SELECT (privacy_settings->>'showAssessmentResults')::boolean
                FROM user_profiles up3
                WHERE up3.id = user_assessments.user_id
            ) = true
        )
    );

-- ==============================================
-- ASSESSMENT RESPONSES POLICIES
-- ==============================================

-- Users can view their own responses
CREATE POLICY "Users can view own responses" ON assessment_responses
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_assessments ua
            WHERE ua.id = assessment_responses.user_assessment_id
            AND ua.user_id = auth.uid()
        )
    );

-- Users can create their own responses
CREATE POLICY "Users can create own responses" ON assessment_responses
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM user_assessments ua
            WHERE ua.id = assessment_responses.user_assessment_id
            AND ua.user_id = auth.uid()
        )
    );

-- Users can update their own responses
CREATE POLICY "Users can update own responses" ON assessment_responses
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM user_assessments ua
            WHERE ua.id = assessment_responses.user_assessment_id
            AND ua.user_id = auth.uid()
        )
    );

-- ==============================================
-- COMMUNITIES POLICIES
-- ==============================================

-- Public communities are viewable by all
CREATE POLICY "Public communities are viewable" ON communities
    FOR SELECT USING (visibility = 'public');

-- Community creators can manage their communities
CREATE POLICY "Creators can manage communities" ON communities
    FOR ALL USING (auth.uid() = created_by);

-- Organization members can view org communities
CREATE POLICY "Org members can view org communities" ON communities
    FOR SELECT USING (
        visibility = 'organization'
        AND EXISTS (
            SELECT 1 FROM user_profiles up
            JOIN organization_memberships om ON up.id = om.user_id
            WHERE up.id = auth.uid()
            AND om.organization_id = (
                SELECT organization_id FROM user_profiles up2
                WHERE up2.id = communities.created_by
            )
            AND om.status = 'active'
        )
    );

-- ==============================================
-- COMMUNITY MEMBERSHIPS POLICIES
-- ==============================================

-- Users can view their own memberships
CREATE POLICY "Users can view own memberships" ON community_memberships
    FOR SELECT USING (auth.uid() = user_id);

-- Users can join public communities
CREATE POLICY "Users can join public communities" ON community_memberships
    FOR INSERT WITH CHECK (
        auth.uid() = user_id
        AND EXISTS (
            SELECT 1 FROM communities c
            WHERE c.id = community_memberships.community_id
            AND c.visibility = 'public'
        )
    );

-- Users can leave communities
CREATE POLICY "Users can leave communities" ON community_memberships
    FOR UPDATE USING (
        auth.uid() = user_id
        AND status = 'active'
    );

-- Community moderators can manage memberships
CREATE POLICY "Moderators can manage memberships" ON community_memberships
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM communities c
            WHERE c.id = community_memberships.community_id
            AND (
                c.created_by = auth.uid()
                OR auth.uid() = ANY(
                    SELECT jsonb_array_elements_text(c.moderators)::uuid
                )
            )
        )
    );

-- ==============================================
-- COMMUNITY POSTS POLICIES
-- ==============================================

-- Community members can view posts in their communities
CREATE POLICY "Members can view community posts" ON community_posts
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM community_memberships cm
            WHERE cm.community_id = community_posts.community_id
            AND cm.user_id = auth.uid()
            AND cm.status = 'active'
        )
    );

-- Community members can create posts
CREATE POLICY "Members can create posts" ON community_posts
    FOR INSERT WITH CHECK (
        auth.uid() = author_id
        AND EXISTS (
            SELECT 1 FROM community_memberships cm
            WHERE cm.community_id = community_posts.community_id
            AND cm.user_id = auth.uid()
            AND cm.status = 'active'
        )
    );

-- Authors can manage their own posts
CREATE POLICY "Authors can manage own posts" ON community_posts
    FOR UPDATE USING (auth.uid() = author_id);

-- Community moderators can moderate posts
CREATE POLICY "Moderators can moderate posts" ON community_posts
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM communities c
            WHERE c.id = community_posts.community_id
            AND (
                c.created_by = auth.uid()
                OR auth.uid() = ANY(
                    SELECT jsonb_array_elements_text(c.moderators)::uuid
                )
            )
        )
    );

-- ==============================================
-- COMMUNITY POST VOTES POLICIES
-- ==============================================

-- Community members can vote on posts
CREATE POLICY "Members can vote on posts" ON community_post_votes
    FOR ALL USING (
        auth.uid() = user_id
        AND EXISTS (
            SELECT 1 FROM community_memberships cm
            JOIN community_posts cp ON cm.community_id = cp.community_id
            WHERE cp.id = community_post_votes.post_id
            AND cm.user_id = auth.uid()
            AND cm.status = 'active'
        )
    );

-- ==============================================
-- COLLABORATIONS POLICIES
-- ==============================================

-- Lead authors can manage their collaborations
CREATE POLICY "Lead authors can manage collaborations" ON collaborations
    FOR ALL USING (auth.uid() = lead_author_id);

-- Collaborators can view collaborations they're part of
CREATE POLICY "Collaborators can view collaborations" ON collaborations
    FOR SELECT USING (
        auth.uid() = lead_author_id
        OR auth.uid() = ANY(
            SELECT jsonb_array_elements_text(collaborators)::uuid
        )
    );

-- ==============================================
-- SUBSCRIPTION PLANS POLICIES
-- ==============================================

-- Active subscription plans are publicly readable
CREATE POLICY "Active plans are public" ON subscription_plans
    FOR SELECT USING (is_active = true);

-- Organization admins can manage plans
CREATE POLICY "Org admins can manage plans" ON subscription_plans
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM organizations o
            WHERE o.id = (
                SELECT organization_id FROM user_profiles up
                WHERE up.id = auth.uid()
                LIMIT 1
            )
            AND is_organization_admin(o.id)
        )
    );

-- ==============================================
-- USER SUBSCRIPTIONS POLICIES
-- ==============================================

-- Users can view their own subscriptions
CREATE POLICY "Users can view own subscriptions" ON user_subscriptions
    FOR SELECT USING (auth.uid() = user_id);

-- Users can create their own subscriptions
CREATE POLICY "Users can create own subscriptions" ON user_subscriptions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own subscriptions
CREATE POLICY "Users can update own subscriptions" ON user_subscriptions
    FOR UPDATE USING (auth.uid() = user_id);

-- Organization admins can view org subscriptions
CREATE POLICY "Org admins can view org subscriptions" ON user_subscriptions
    FOR SELECT USING (
        organization_id IS NOT NULL
        AND is_organization_admin(organization_id)
    );

-- ==============================================
-- TRANSACTIONS POLICIES
-- ==============================================

-- Users can view their own transactions
CREATE POLICY "Users can view own transactions" ON transactions
    FOR SELECT USING (auth.uid() = user_id);

-- Users can create their own transactions
CREATE POLICY "Users can create own transactions" ON transactions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Organization admins can view org transactions
CREATE POLICY "Org admins can view org transactions" ON transactions
    FOR SELECT USING (
        organization_id IS NOT NULL
        AND is_organization_admin(organization_id)
    );

-- ==============================================
-- PAYMENT METHODS POLICIES
-- ==============================================

-- Users can manage their own payment methods
CREATE POLICY "Users can manage own payment methods" ON payment_methods
    FOR ALL USING (auth.uid() = user_id);

-- ==============================================
-- COUPONS POLICIES
-- ==============================================

-- Active coupons are publicly readable
CREATE POLICY "Active coupons are public" ON coupons
    FOR SELECT USING (is_active = true);

-- Organization admins can manage coupons
CREATE POLICY "Org admins can manage coupons" ON coupons
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM organizations o
            WHERE o.id = (
                SELECT organization_id FROM user_profiles up
                WHERE up.id = auth.uid()
                LIMIT 1
            )
            AND is_organization_admin(o.id)
        )
    );

-- ==============================================
-- USER ANALYTICS EVENTS POLICIES
-- ==============================================

-- Users can view their own analytics
CREATE POLICY "Users can view own analytics" ON user_analytics_events
    FOR SELECT USING (auth.uid() = user_id);

-- Users can create their own analytics events
CREATE POLICY "Users can create own analytics" ON user_analytics_events
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Organization admins can view org analytics (with privacy respect)
CREATE POLICY "Org admins can view org analytics" ON user_analytics_events
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_profiles up
            JOIN organization_memberships om ON up.id = om.user_id
            WHERE up.id = auth.uid()
            AND om.organization_id = (
                SELECT organization_id FROM user_profiles up2
                WHERE up2.id = user_analytics_events.user_id
            )
            AND om.status = 'active'
            AND om.role IN ('admin', 'owner')
            AND (
                SELECT (privacy_settings->>'shareAnalytics')::boolean
                FROM user_profiles up3
                WHERE up3.id = user_analytics_events.user_id
            ) = true
        )
    );

-- ==============================================
-- USER CONTENT INTERACTIONS POLICIES
-- ==============================================

-- Users can manage their own content interactions
CREATE POLICY "Users can manage own interactions" ON user_content_interactions
    FOR ALL USING (auth.uid() = user_id);

-- ==============================================
-- LEARNING OUTCOMES POLICIES
-- ==============================================

-- Users can view their own learning outcomes
CREATE POLICY "Users can view own outcomes" ON learning_outcomes
    FOR SELECT USING (auth.uid() = user_id);

-- Users can create their own learning outcomes
CREATE POLICY "Users can create own outcomes" ON learning_outcomes
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Organization admins can view org learning outcomes
CREATE POLICY "Org admins can view org outcomes" ON learning_outcomes
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_profiles up
            JOIN organization_memberships om ON up.id = om.user_id
            WHERE up.id = auth.uid()
            AND om.organization_id = (
                SELECT organization_id FROM user_profiles up2
                WHERE up2.id = learning_outcomes.user_id
            )
            AND om.status = 'active'
            AND om.role IN ('admin', 'owner')
        )
    );

-- ==============================================
-- MOVEMENT METRICS POLICIES
-- ==============================================

-- Organization admins can view movement metrics
CREATE POLICY "Org admins can view metrics" ON movement_metrics
    FOR SELECT USING (
        organization_id IS NOT NULL
        AND is_organization_admin(organization_id)
    );

-- Organization admins can manage movement metrics
CREATE POLICY "Org admins can manage metrics" ON movement_metrics
    FOR ALL USING (
        organization_id IS NOT NULL
        AND is_organization_admin(organization_id)
    );

-- ==============================================
-- PERFORMANCE REPORTS POLICIES
-- ==============================================

-- Users can view their own performance reports
CREATE POLICY "Users can view own reports" ON performance_reports
    FOR SELECT USING (auth.uid() = user_id);

-- Organization admins can view org performance reports
CREATE POLICY "Org admins can view org reports" ON performance_reports
    FOR SELECT USING (
        organization_id IS NOT NULL
        AND is_organization_admin(organization_id)
    );

-- ==============================================
-- AUDIT LOGS POLICIES
-- ==============================================

-- Users can view their own audit logs
CREATE POLICY "Users can view own audit logs" ON audit_logs
    FOR SELECT USING (auth.uid() = user_id);

-- Organization admins can view org audit logs
CREATE POLICY "Org admins can view org audit logs" ON audit_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_profiles up
            JOIN organization_memberships om ON up.id = om.user_id
            WHERE up.id = auth.uid()
            AND om.organization_id = (
                SELECT organization_id FROM user_profiles up2
                WHERE up2.id = audit_logs.user_id
            )
            AND om.status = 'active'
            AND om.role IN ('admin', 'owner')
        )
    );

-- System can create audit logs
CREATE POLICY "System can create audit logs" ON audit_logs
    FOR INSERT WITH CHECK (true);

-- ==============================================
-- FEATURE FLAGS POLICIES
-- ==============================================

-- Active feature flags are publicly readable
CREATE POLICY "Active flags are public" ON feature_flags
    FOR SELECT USING (is_active = true);

-- Organization admins can manage feature flags
CREATE POLICY "Org admins can manage flags" ON feature_flags
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM organizations o
            WHERE o.id = (
                SELECT organization_id FROM user_profiles up
                WHERE up.id = auth.uid()
                LIMIT 1
            )
            AND is_organization_admin(o.id)
        )
    );

-- ==============================================
-- USER FEATURE FLAGS POLICIES
-- ==============================================

-- Users can manage their own feature flags
CREATE POLICY "Users can manage own flags" ON user_feature_flags
    FOR ALL USING (auth.uid() = user_id);

-- ==============================================
-- USER CONSENTS POLICIES
-- ==============================================

-- Users can manage their own consents
CREATE POLICY "Users can manage own consents" ON user_consents
    FOR ALL USING (auth.uid() = user_id);

-- ==============================================
-- SYSTEM NOTIFICATIONS POLICIES
-- ==============================================

-- Active notifications are publicly readable
CREATE POLICY "Active notifications are public" ON system_notifications
    FOR SELECT USING (is_active = true);

-- Organization admins can manage notifications
CREATE POLICY "Org admins can manage notifications" ON system_notifications
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM organizations o
            WHERE o.id = (
                SELECT organization_id FROM user_profiles up
                WHERE up.id = auth.uid()
                LIMIT 1
            )
            AND is_organization_admin(o.id)
        )
    );

-- ==============================================
-- USER NOTIFICATION STATUS POLICIES
-- ==============================================

-- Users can manage their own notification status
CREATE POLICY "Users can manage own notification status" ON user_notification_status
    FOR ALL USING (auth.uid() = user_id);

-- ==============================================
-- API KEYS POLICIES
-- ==============================================

-- Users can manage their own API keys
CREATE POLICY "Users can manage own API keys" ON api_keys
    FOR ALL USING (auth.uid() = user_id);

-- Organization admins can view org API keys
CREATE POLICY "Org admins can view org API keys" ON api_keys
    FOR SELECT USING (
        organization_id IS NOT NULL
        AND is_organization_admin(organization_id)
    );

-- ==============================================
-- COMMENTS
-- ==============================================

COMMENT ON FUNCTION is_organization_member(UUID, UUID) IS 'Helper function to check if user is active member of organization';
COMMENT ON FUNCTION is_organization_admin(UUID, UUID) IS 'Helper function to check if user is admin/owner of organization';
COMMENT ON FUNCTION has_active_subscription(UUID) IS 'Helper function to check if user has active subscription';
COMMENT ON FUNCTION has_premium_subscription(UUID) IS 'Helper function to check if user has premium subscription';

-- ==============================================
-- POLICY SUMMARY
-- ==============================================

-- This migration creates comprehensive RLS policies for all Alan Hirsch platform tables:
-- ✅ User Profiles: Own profile access + public profile visibility
-- ✅ Organizations: Member-based access + admin management
-- ✅ Content: Public/premium access + author management
-- ✅ Assessments: User privacy + organization management
-- ✅ Communities: Member-based access + moderation
-- ✅ Subscriptions: User-specific + organization billing
-- ✅ Analytics: Privacy-respecting + organization insights
-- ✅ System: Admin management + user preferences
