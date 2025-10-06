-- Alan Hirsch Digital Platform - Seed Data

-- Insert subscription plans
INSERT INTO "subscription_plans" ("name", "slug", "plan_type", "price_monthly", "price_annual", "content_access_level", "features") VALUES
('Free Access', 'free', 'free', 0, 0, 'free', '{"contentLimit": 5, "communityAccess": true, "aiInteractions": 0}'),
('Individual Subscriber', 'individual', 'individual', 29, 290, 'premium', '{"contentLimit": null, "communityAccess": true, "aiInteractions": 50}'),
('Professional', 'professional', 'professional', 97, 970, 'vip', '{"contentLimit": null, "aiInteractions": 200, "collaborationTools": true, "analytics": true}'),
('Leader Platform', 'leader', 'leader', 297, 2970, 'all', '{"contentLimit": null, "aiInteractions": 1000, "collaborationTools": true, "analytics": true, "customBranding": true}')
ON CONFLICT (slug) DO NOTHING;

-- Insert content categories
INSERT INTO "content_categories" ("name", "slug", "description", "theological_discipline", "movement_relevance_score", "apest_relevance", "keywords") VALUES
('Incarnational Theology', 'incarnational-theology', 'Exploring God''s mission through incarnational presence', 'systematic', 10, '{"apostolic": 9, "prophetic": 8, "evangelistic": 9, "shepherding": 6, "teaching": 8}', '["incarnation", "presence", "mission", "theology"]'),
('Missional Ecclesiology', 'missional-ecclesiology', 'Understanding the church as a sent community', 'practical', 9, '{"apostolic": 10, "prophetic": 7, "evangelistic": 8, "shepherding": 8, "teaching": 7}', '["church", "mission", "ecclesiology", "community"]'),
('APEST Ministry', 'apest-ministry', 'Five-fold ministry gifts for church multiplication', 'practical', 10, '{"apostolic": 10, "prophetic": 10, "evangelistic": 10, "shepherding": 10, "teaching": 10}', '["apest", "ministry", "gifts", "leadership"]'),
('Leadership Development', 'leadership-development', 'Developing leaders for missional movements', 'practical', 8, '{"apostolic": 8, "prophetic": 6, "evangelistic": 7, "shepherding": 9, "teaching": 8}', '["leadership", "development", "training", "formation"]')
ON CONFLICT (slug) DO NOTHING;

-- Insert Alan Hirsch profile
INSERT INTO "user_profiles" (
    "id", "email", "first_name", "last_name", "display_name", "bio", 
    "ministry_role", "denomination", "organization_name", "years_in_ministry", 
    "country_code", "timezone", "language_primary", "cultural_context",
    "leader_tier", "subdomain", "custom_domain", "platform_title", 
    "subscription_tier", "theological_focus", "onboarding_completed", 
    "onboarding_step", "account_status"
) VALUES (
    '550e8400-e29b-41d4-a716-446655440000',
    'alan@movemental.com',
    'Alan',
    'Hirsch',
    'Alan Hirsch',
    'Founding director of Forge Mission Training Network and author of numerous books on missional church, leadership, and movements.',
    'seminary_professor',
    'Forge Network',
    'Forge Mission Training Network',
    35,
    'AU',
    'Australia/Melbourne',
    'en',
    'western',
    'core',
    'alan',
    'alanhirsch.com',
    'Alan Hirsch - Missional Leadership',
    'leader',
    '["incarnational_theology", "missional_ecclesiology", "apest_ministry"]',
    true,
    7,
    'active'
) ON CONFLICT (id) DO NOTHING;

-- Insert demo users
INSERT INTO "user_profiles" (
    "id", "email", "first_name", "last_name", "display_name", "bio",
    "ministry_role", "denomination", "organization_name", "years_in_ministry",
    "country_code", "timezone", "cultural_context", "leader_tier", 
    "subscription_tier", "theological_focus", "onboarding_completed", "account_status"
) VALUES 
(
    '660e8400-e29b-41d4-a716-446655440001',
    'pastor.john@example.com',
    'John',
    'Smith',
    'Pastor John',
    'Senior pastor passionate about church planting and community transformation.',
    'senior_pastor',
    'Baptist',
    'Grace Community Church',
    12,
    'US',
    'America/New_York',
    'western',
    'emerging',
    'professional',
    '["leadership_development", "cultural_engagement"]',
    true,
    'active'
),
(
    '770e8400-e29b-41d4-a716-446655440002',
    'maria.gonzalez@example.com',
    'Maria',
    'Gonzalez',
    'Maria Gonzalez',
    'Church planter and missionary working in urban contexts.',
    'church_planter',
    'Pentecostal',
    'Urban Hope Network',
    8,
    'MX',
    'America/Mexico_City',
    'latin_american',
    'network',
    'individual',
    '["missional_ecclesiology", "cultural_engagement"]',
    true,
    'active'
) ON CONFLICT (id) DO NOTHING;

-- Insert communities
INSERT INTO "communities" (
    "name", "slug", "description", "community_type", "geographic_focus",
    "cultural_context", "language_primary", "languages_supported", "visibility",
    "join_approval_required", "max_members", "allow_guest_posts", "moderation_level",
    "current_member_count", "total_posts_count", "guidelines", "rules", "created_by"
) VALUES 
(
    'APEST Leaders Network',
    'apest-leaders',
    'A global network of leaders exploring five-fold ministry',
    'apest_group',
    '["global"]',
    'global',
    'en',
    '["en", "es", "fr", "de"]',
    'public',
    false,
    5000,
    true,
    'moderated',
    1247,
    342,
    'This community is for discussing APEST ministry gifts, sharing experiences, and learning from one another.',
    '["Be respectful and encouraging", "Stay on topic related to APEST ministry", "No self-promotion without permission", "Share resources freely"]',
    '550e8400-e29b-41d4-a716-446655440000'
) ON CONFLICT (slug) DO NOTHING;

-- Insert sample content
INSERT INTO "content_items" (
    "title", "slug", "excerpt", "content", "author_id", "content_type", "format",
    "word_count", "estimated_reading_time", "view_count", "like_count", "share_count",
    "comment_count", "bookmark_count", "primary_category_id", "tags", "theological_themes",
    "visibility", "status", "network_amplification_score", "cross_reference_count",
    "ai_enhanced", "ai_summary", "ai_key_points", "meta_title", "meta_description", "published_at"
) VALUES (
    'The Incarnational Imperative: Why Presence Matters',
    'incarnational-imperative',
    'Exploring how incarnational presence transforms communities and advances God''s mission.',
    '# The Incarnational Imperative

The incarnation of Jesus Christ is not merely a theological doctrine to be understood, but a missional methodology to be embodied. When we speak of incarnational ministry, we''re talking about the profound act of entering into the world of another...

## The Pattern of Jesus

Jesus didn''t minister from a distance. He moved into the neighborhood (John 1:14). This pattern of presence, proximity, and powerlessness forms the foundation of all authentic missional engagement.

## Implications for Today

In our digital age, the temptation is to minister through screens and platforms. While technology can amplify our reach, it cannot replace our presence. True transformation happens through relationship, and relationship requires proximity.',
    '550e8400-e29b-41d4-a716-446655440000',
    'article',
    'text',
    1250,
    6,
    2847,
    156,
    89,
    23,
    234,
    (SELECT id FROM content_categories WHERE slug = 'incarnational-theology' LIMIT 1),
    '["incarnation", "mission", "presence", "ministry"]',
    '["incarnational_theology", "missional_practice"]',
    'public',
    'published',
    8.7,
    12,
    true,
    'This article explores the incarnational approach to ministry, emphasizing the importance of presence and proximity in missional engagement.',
    '["Incarnational ministry requires physical presence and proximity", "Jesus modeled incarnational engagement by moving into the neighborhood", "Digital ministry cannot replace relational presence"]',
    'The Incarnational Imperative: Why Presence Matters in Ministry',
    'Discover how incarnational presence transforms communities and advances God''s mission through proximity and relationship.',
    '2024-01-15 10:00:00'
) ON CONFLICT (slug) DO NOTHING;
