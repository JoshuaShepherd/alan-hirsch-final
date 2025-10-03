-- =============================================
-- ALAN HIRSCH DIGITAL PLATFORM
-- Comprehensive Supabase Database Schema
-- =============================================
-- 
-- Complete database architecture supporting:
-- - Individual platform excellence (Alan's flagship)
-- - Network amplification (Movement Leaders Collective)
-- - Global movement multiplication (20,000+ practitioners)
--
-- Generated: October 2, 2025
-- Architecture: Three-tier scalable ecosystem
-- =============================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "vector";

-- =============================================
-- AUTHENTICATION & USER MANAGEMENT
-- =============================================

-- Enhanced user profiles extending Supabase auth.users
CREATE TABLE user_profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    
    -- Basic Information
    email TEXT UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    display_name TEXT,
    bio TEXT,
    avatar_url TEXT,
    website_url TEXT,
    
    -- Platform Configuration (for leaders)
    subdomain TEXT UNIQUE, -- alan.movemental.com
    custom_domain TEXT UNIQUE, -- alanhirsch.com
    platform_title TEXT,
    platform_description TEXT,
    
    -- Geographic & Cultural Context
    country_code TEXT,
    state_province TEXT,
    city TEXT,
    timezone TEXT DEFAULT 'UTC',
    primary_language TEXT DEFAULT 'en',
    cultural_context JSONB DEFAULT '{}',
    
    -- Ministry Context
    ministry_role TEXT CHECK (ministry_role IN (
        'senior_pastor', 'associate_pastor', 'church_planter', 'denominational_leader',
        'seminary_professor', 'seminary_student', 'ministry_staff', 'missionary',
        'marketplace_minister', 'nonprofit_leader', 'consultant', 'academic_researcher',
        'emerging_leader', 'other'
    )) NOT NULL,
    denomination TEXT,
    organization_name TEXT,
    years_in_ministry INTEGER,
    leadership_level TEXT CHECK (leadership_level IN ('emerging', 'experienced', 'senior', 'expert')),
    church_size TEXT CHECK (church_size IN (
        'planting', 'small_0_50', 'medium_51_200', 'large_201_500', 
        'very_large_501_1000', 'mega_1000_plus', 'network_multiple'
    )),
    
    -- Leader Classification (for network tier)
    leader_tier TEXT CHECK (leader_tier IN (
        'core', 'emerging', 'academic', 'practitioner', 'justice', 'global'
    )),
    theological_focus TEXT[] DEFAULT '{}',
    
    -- Assessment Scores (100-point rubric for leader evaluation)
    assessment_movement_alignment INTEGER CHECK (assessment_movement_alignment >= 0 AND assessment_movement_alignment <= 25),
    assessment_audience_engagement INTEGER CHECK (assessment_audience_engagement >= 0 AND assessment_audience_engagement <= 20),
    assessment_content_readiness INTEGER CHECK (assessment_content_readiness >= 0 AND assessment_content_readiness <= 20),
    assessment_revenue_potential INTEGER CHECK (assessment_revenue_potential >= 0 AND assessment_revenue_potential <= 15),
    assessment_network_effects INTEGER CHECK (assessment_network_effects >= 0 AND assessment_network_effects <= 10),
    assessment_strategic_fit INTEGER CHECK (assessment_strategic_fit >= 0 AND assessment_strategic_fit <= 10),
    assessment_total INTEGER GENERATED ALWAYS AS (
        COALESCE(assessment_movement_alignment, 0) + 
        COALESCE(assessment_audience_engagement, 0) + 
        COALESCE(assessment_content_readiness, 0) + 
        COALESCE(assessment_revenue_potential, 0) + 
        COALESCE(assessment_network_effects, 0) + 
        COALESCE(assessment_strategic_fit, 0)
    ) STORED,
    
    -- Platform Engagement
    onboarding_completed BOOLEAN DEFAULT FALSE,
    onboarding_step INTEGER DEFAULT 0,
    preferred_content_format TEXT[] DEFAULT ARRAY['video', 'text', 'audio'],
    learning_pace TEXT DEFAULT 'moderate' CHECK (learning_pace IN ('intensive', 'moderate', 'casual')),
    
    -- Account Status & Permissions
    account_status TEXT DEFAULT 'active' CHECK (account_status IN ('pending', 'active', 'suspended', 'archived')),
    subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN (
        'free', 'basic', 'premium', 'enterprise', 'academic', 'leader'
    )),
    is_founding_partner BOOLEAN DEFAULT FALSE,
    equity_percentage DECIMAL(5,2) DEFAULT 0.00,
    
    -- Business Intelligence
    referral_source TEXT,
    utm_campaign TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    acquisition_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Platform Customization (for leaders)
    brand_colors JSONB DEFAULT '{"primary": "#2563eb", "secondary": "#64748b", "accent": "#059669"}',
    custom_css TEXT,
    google_analytics_id TEXT,
    
    -- Settings & Preferences
    email_notifications JSONB DEFAULT '{"daily_digest": true, "collaboration_requests": true, "revenue_reports": true}',
    privacy_settings JSONB DEFAULT '{"show_analytics": false, "allow_collaboration": true, "public_profile": true}',
    content_preferences JSONB DEFAULT '{}',
    
    -- AI Interaction Preferences
    ai_conversation_style TEXT DEFAULT 'balanced' CHECK (ai_conversation_style IN ('concise', 'detailed', 'balanced', 'conversational')),
    theological_depth_preference TEXT DEFAULT 'intermediate' CHECK (theological_depth_preference IN ('basic', 'intermediate', 'advanced', 'scholarly')),
    ai_interaction_count INTEGER DEFAULT 0,
    
    -- Legacy Import (for archive migration)
    archive_imported_at TIMESTAMP WITH TIME ZONE,
    archive_article_count INTEGER DEFAULT 0,
    legacy_metadata JSONB DEFAULT '{}',
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_active_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Organizations (Churches, Denominations, Seminaries, Networks)
CREATE TABLE organizations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    organization_type TEXT NOT NULL CHECK (organization_type IN (
        'church', 'denomination', 'seminary', 'nonprofit', 'missions_agency',
        'ministry_network', 'consulting_firm', 'academic_institution'
    )),
    size_category TEXT CHECK (size_category IN ('small', 'medium', 'large', 'enterprise')),
    
    -- Contact Information
    website_url TEXT,
    primary_email TEXT,
    phone TEXT,
    
    -- Geographic Information
    country_code TEXT,
    state_province TEXT,
    city TEXT,
    address JSONB DEFAULT '{}',
    
    -- Ministry Context
    denomination TEXT,
    ministry_focus TEXT[] DEFAULT '{}',
    theological_position TEXT,
    
    -- Platform Integration
    license_type TEXT CHECK (license_type IN ('individual', 'group', 'institutional', 'enterprise')),
    max_users INTEGER DEFAULT 1,
    current_users INTEGER DEFAULT 0,
    
    -- Account Management
    account_owner_id UUID REFERENCES user_profiles(id) NOT NULL,
    billing_contact_id UUID REFERENCES user_profiles(id),
    
    -- Billing Information
    billing_email TEXT,
    billing_address JSONB DEFAULT '{}',
    tax_id TEXT,
    
    -- Settings
    settings JSONB DEFAULT '{}',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User-Organization Relationships
CREATE TABLE organization_memberships (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    
    role TEXT NOT NULL CHECK (role IN ('member', 'admin', 'owner', 'billing_manager', 'instructor')),
    status TEXT DEFAULT 'active' CHECK (status IN ('pending', 'active', 'inactive', 'suspended')),
    
    -- Permissions
    can_manage_billing BOOLEAN DEFAULT FALSE,
    can_invite_users BOOLEAN DEFAULT FALSE,
    can_manage_settings BOOLEAN DEFAULT FALSE,
    can_moderate_content BOOLEAN DEFAULT FALSE,
    
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, organization_id)
);

-- =============================================
-- ASSESSMENT SYSTEM & PERSONALIZATION
-- =============================================

-- APEST and other assessment frameworks
CREATE TABLE assessments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    assessment_type TEXT NOT NULL CHECK (assessment_type IN (
        'apest', 'mdna', 'leadership_style', 'cultural_context', 'ministry_readiness'
    )),
    version TEXT NOT NULL DEFAULT '1.0',
    
    -- Assessment Configuration
    questions_count INTEGER NOT NULL,
    estimated_duration INTEGER, -- in minutes
    scoring_algorithm JSONB DEFAULT '{}',
    
    -- Validity & Research
    research_basis TEXT,
    validity_studies JSONB DEFAULT '{}',
    cultural_adaptations JSONB DEFAULT '{}',
    
    -- Status
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'deprecated')),
    published_at TIMESTAMP WITH TIME ZONE,
    deprecated_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Assessment Questions
CREATE TABLE assessment_questions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    assessment_id UUID REFERENCES assessments(id) ON DELETE CASCADE,
    question_order INTEGER NOT NULL,
    question_text TEXT NOT NULL,
    question_type TEXT NOT NULL CHECK (question_type IN (
        'likert', 'multiple_choice', 'ranking', 'scenario', 'text_response'
    )),
    
    -- Question Configuration
    options JSONB DEFAULT '{}', -- Answer options and scoring weights
    cultural_variants JSONB DEFAULT '{}', -- Different phrasings for different cultures
    theological_basis TEXT,
    
    -- Scoring
    scoring_dimensions JSONB DEFAULT '{}', -- Which dimensions this question measures
    weight DECIMAL DEFAULT 1.0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Assessment Results
CREATE TABLE user_assessments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    assessment_id UUID REFERENCES assessments(id) ON DELETE CASCADE,
    
    -- Assessment Session
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    duration_minutes INTEGER,
    completion_percentage DECIMAL DEFAULT 0,
    
    -- Results
    raw_scores JSONB DEFAULT '{}',
    normalized_scores JSONB DEFAULT '{}',
    primary_gift TEXT,
    secondary_gift TEXT,
    gift_combination TEXT,
    
    -- Insights & Recommendations
    strengths JSONB DEFAULT '{}',
    growth_areas JSONB DEFAULT '{}',
    recommended_content JSONB DEFAULT '{}',
    peer_matches JSONB DEFAULT '{}',
    
    -- Quality Metrics
    response_consistency DECIMAL,
    cultural_adjustment DECIMAL,
    confidence_level DECIMAL,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, assessment_id)
);

-- Individual Question Responses
CREATE TABLE assessment_responses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_assessment_id UUID REFERENCES user_assessments(id) ON DELETE CASCADE,
    question_id UUID REFERENCES assessment_questions(id) ON DELETE CASCADE,
    
    response_value JSONB NOT NULL,
    response_time INTEGER, -- seconds
    confidence_level INTEGER CHECK (confidence_level >= 1 AND confidence_level <= 5),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- CONTENT MANAGEMENT SYSTEM
-- =============================================

-- Content Categories & Taxonomy
CREATE TABLE content_categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    parent_id UUID REFERENCES content_categories(id),
    
    -- Taxonomy Properties
    level INTEGER DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    icon TEXT,
    color TEXT,
    
    -- Theological Classification
    theological_discipline TEXT CHECK (theological_discipline IN (
        'systematic', 'biblical', 'practical', 'historical', 'philosophical'
    )),
    movement_relevance_score INTEGER CHECK (movement_relevance_score >= 1 AND movement_relevance_score <= 10),
    
    -- APEST Relevance
    apest_relevance JSONB DEFAULT '{}',
    audience_segments TEXT[] DEFAULT '{}',
    
    -- Network Effects
    cross_reference_weight DECIMAL(3,2) DEFAULT 1.00,
    
    -- SEO
    meta_title TEXT,
    meta_description TEXT,
    
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Main Content Repository
CREATE TABLE content_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    
    -- Basic Information
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    subtitle TEXT,
    excerpt TEXT,
    content TEXT NOT NULL, -- Full markdown content
    content_html TEXT, -- Rendered HTML (cached)
    
    -- Author Information
    author_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
    co_authors UUID[] DEFAULT '{}', -- Array of profile IDs for collaborative content
    
    -- Content Classification
    content_type TEXT NOT NULL CHECK (content_type IN (
        'article', 'video', 'podcast', 'book_chapter', 'white_paper', 'case_study',
        'framework', 'toolkit', 'template', 'assessment', 'course_lesson', 'webinar',
        'infographic', 'quote', 'devotional', 'flagship', 'archive'
    )),
    article_type TEXT CHECK (article_type IN ('original', 'curated', 'commentary', 'collaborative')),
    content_source TEXT, -- For curated content
    
    -- Categorization
    primary_category_id UUID REFERENCES content_categories(id),
    secondary_categories UUID[] DEFAULT '{}',
    theological_themes TEXT[] DEFAULT '{}',
    practical_applications TEXT[] DEFAULT '{}',
    target_audience TEXT[] DEFAULT '{}',
    ministry_context TEXT[] DEFAULT '{}',
    
    -- Scripture & Theological References
    scripture_references TEXT[] DEFAULT '{}',
    theological_keywords TEXT[] DEFAULT '{}',
    key_concepts TEXT[] DEFAULT '{}',
    
    -- Attribution (Critical for Academic Integrity)
    original_author TEXT,
    original_source TEXT,
    original_publication_date DATE,
    permission_status TEXT CHECK (permission_status IN (
        'granted', 'fair_use', 'public_domain', 'pending', 'restricted'
    )),
    attribution_note TEXT,
    
    -- Publishing Status
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'scheduled', 'published', 'archived')),
    visibility TEXT DEFAULT 'public' CHECK (visibility IN ('public', 'subscribers', 'premium', 'network', 'private')),
    published_at TIMESTAMP WITH TIME ZONE,
    featured_until TIMESTAMP WITH TIME ZONE,
    
    -- SEO & Discovery
    meta_title TEXT,
    meta_description TEXT,
    keywords TEXT[] DEFAULT '{}',
    featured_image_url TEXT,
    featured_image_alt TEXT,
    canonical_url TEXT,
    
    -- Reading Experience
    word_count INTEGER,
    estimated_reading_time INTEGER, -- minutes
    complexity_score INTEGER CHECK (complexity_score >= 1 AND complexity_score <= 10),
    
    -- Network Amplification
    allow_cross_referencing BOOLEAN DEFAULT TRUE,
    allow_collaboration BOOLEAN DEFAULT TRUE,
    network_amplification_score DECIMAL(5,2) DEFAULT 0.00,
    
    -- Engagement Tracking
    view_count INTEGER DEFAULT 0,
    unique_view_count INTEGER DEFAULT 0,
    share_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0,
    bookmark_count INTEGER DEFAULT 0,
    average_rating DECIMAL(3,2),
    
    -- AI Enhancement
    ai_enhanced BOOLEAN DEFAULT FALSE,
    ai_summary TEXT,
    ai_discussion_questions TEXT[] DEFAULT '{}',
    ai_related_concepts TEXT[] DEFAULT '{}',
    embedding_vector VECTOR(1536), -- OpenAI embeddings for semantic search
    
    -- Legacy Import (for Alan's archive)
    legacy_id TEXT,
    legacy_created_date TIMESTAMP WITH TIME ZONE,
    legacy_metadata JSONB DEFAULT '{}',
    
    -- Versioning
    version INTEGER DEFAULT 1,
    parent_content_id UUID REFERENCES content_items(id),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(slug, author_id)
);

-- Content Series (for structured learning paths)
CREATE TABLE content_series (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    
    author_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    
    series_type TEXT NOT NULL CHECK (series_type IN (
        'course', 'book', 'video_series', 'podcast_series', 'framework_collection'
    )),
    
    -- Organization
    total_items INTEGER DEFAULT 0,
    estimated_duration_hours INTEGER,
    completion_rate DECIMAL(5,2),
    
    -- Access Control
    access_level TEXT DEFAULT 'free' CHECK (access_level IN ('free', 'basic', 'premium', 'enterprise')),
    prerequisite_series UUID REFERENCES content_series(id),
    
    -- Status
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    visibility TEXT DEFAULT 'public' CHECK (visibility IN ('public', 'subscribers', 'premium')),
    
    -- SEO
    featured_image_url TEXT,
    meta_title TEXT,
    meta_description TEXT,
    tags TEXT[] DEFAULT '{}',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(slug, author_id)
);

-- Series-Content Relationships
CREATE TABLE series_content_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    series_id UUID REFERENCES content_series(id) ON DELETE CASCADE,
    content_id UUID REFERENCES content_items(id) ON DELETE CASCADE,
    position INTEGER NOT NULL,
    
    UNIQUE(series_id, content_id),
    UNIQUE(series_id, position)
);

-- =============================================
-- NETWORK AMPLIFICATION SYSTEM
-- =============================================

-- Cross-references between content (core network feature)
CREATE TABLE content_cross_references (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    
    source_content_id UUID REFERENCES content_items(id) ON DELETE CASCADE NOT NULL,
    target_content_id UUID REFERENCES content_items(id) ON DELETE CASCADE NOT NULL,
    
    -- Reference Type
    reference_type TEXT CHECK (reference_type IN (
        'builds_on', 'contradicts', 'supports', 'applies', 'questions', 'quotes', 'extends'
    )) NOT NULL,
    
    -- Context
    source_excerpt TEXT,
    context_note TEXT,
    
    -- Quality & Relevance
    relevance_score INTEGER CHECK (relevance_score >= 1 AND relevance_score <= 10) DEFAULT 5,
    is_ai_generated BOOLEAN DEFAULT FALSE,
    is_author_approved BOOLEAN DEFAULT TRUE,
    
    -- Network Analytics
    click_count INTEGER DEFAULT 0,
    conversion_rate DECIMAL(5,4) DEFAULT 0.0000,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(source_content_id, target_content_id, reference_type)
);

-- Collaborative Content (when leaders work together)
CREATE TABLE collaborations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    
    -- Participants
    initiator_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
    participants UUID[] NOT NULL,
    
    -- Collaboration Details
    title TEXT NOT NULL,
    description TEXT,
    collaboration_type TEXT CHECK (collaboration_type IN (
        'article', 'series', 'course', 'event', 'research'
    )) NOT NULL,
    
    status TEXT CHECK (status IN (
        'proposed', 'accepted', 'in_progress', 'completed', 'cancelled'
    )) NOT NULL DEFAULT 'proposed',
    
    -- Content References
    content_items UUID[] DEFAULT '{}',
    primary_content_id UUID REFERENCES content_items(id),
    
    -- Revenue Sharing
    revenue_split JSONB DEFAULT '{}', -- {"profile_id": percentage}
    
    -- Timeline
    deadline DATE,
    completed_at TIMESTAMP WITH TIME ZONE,
    
    -- Network Impact
    projected_amplification_factor DECIMAL(5,2),
    actual_amplification_factor DECIMAL(5,2),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Theological Knowledge Graph
CREATE TABLE theological_concepts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    
    -- Concept Details
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    definition TEXT,
    description TEXT,
    
    -- Classification
    concept_type TEXT CHECK (concept_type IN (
        'doctrine', 'practice', 'framework', 'movement', 'tradition', 'methodology'
    )) NOT NULL,
    theological_discipline TEXT,
    
    -- Relationships
    related_concepts UUID[] DEFAULT '{}',
    foundational_concepts UUID[] DEFAULT '{}',
    derived_concepts UUID[] DEFAULT '{}',
    
    -- Scripture Connections
    key_scripture_references TEXT[] DEFAULT '{}',
    
    -- Usage Tracking
    content_mentions_count INTEGER DEFAULT 0,
    leaders_using_count INTEGER DEFAULT 0,
    
    -- Network Amplification
    cross_reference_weight DECIMAL(3,2) DEFAULT 1.00,
    search_boost_factor DECIMAL(3,2) DEFAULT 1.00,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- AI CONVERSATION SYSTEM
-- =============================================

-- AI Conversation Sessions
CREATE TABLE ai_conversations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Session Information
    title TEXT,
    conversation_type TEXT CHECK (conversation_type IN (
        'general_inquiry', 'theological_discussion', 'strategic_consultation',
        'leadership_coaching', 'church_planting_advice', 'organizational_development',
        'crisis_management', 'resource_recommendation', 'community_question'
    )) NOT NULL,
    conversation_context JSONB DEFAULT '{}',
    
    -- Content Classification
    primary_topic TEXT,
    theological_themes TEXT[] DEFAULT '{}',
    practical_applications TEXT[] DEFAULT '{}',
    ministry_focus_areas TEXT[] DEFAULT '{}',
    
    -- Personalization Context
    user_apest_profile JSONB DEFAULT '{}',
    cultural_context JSONB DEFAULT '{}',
    ministry_context JSONB DEFAULT '{}',
    
    -- Quality Metrics
    user_satisfaction_rating INTEGER CHECK (user_satisfaction_rating >= 1 AND user_satisfaction_rating <= 5),
    conversation_quality_score DECIMAL(3,2),
    theological_accuracy_verified BOOLEAN DEFAULT FALSE,
    
    -- Metadata
    total_messages INTEGER DEFAULT 0,
    total_tokens_used INTEGER DEFAULT 0,
    conversation_duration_minutes INTEGER,
    language TEXT DEFAULT 'en',
    
    -- Status
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed', 'archived')),
    archived_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Conversation Messages
CREATE TABLE ai_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    conversation_id UUID REFERENCES ai_conversations(id) ON DELETE CASCADE,
    
    -- Message Content
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    content_type TEXT DEFAULT 'text' CHECK (content_type IN ('text', 'markdown', 'structured')),
    message_order INTEGER NOT NULL,
    
    -- AI Processing Metadata
    tokens_used INTEGER,
    processing_time_ms INTEGER,
    model_version TEXT,
    
    -- Content Sources & References
    referenced_content_ids UUID[] DEFAULT '{}',
    referenced_concepts UUID[] DEFAULT '{}',
    biblical_references TEXT[] DEFAULT '{}',
    
    -- Quality & Classification
    theological_topics TEXT[] DEFAULT '{}',
    practical_elements TEXT[] DEFAULT '{}',
    
    -- Feedback
    user_feedback TEXT CHECK (user_feedback IN ('helpful', 'not_helpful', 'inaccurate', 'excellent')),
    flagged_for_review BOOLEAN DEFAULT FALSE,
    theological_review_status TEXT CHECK (theological_review_status IN ('pending', 'approved', 'needs_revision')),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- LEARNING PROGRESS & COMMUNITY
-- =============================================

-- User Content Interactions
CREATE TABLE user_content_interactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
    content_id UUID REFERENCES content_items(id) ON DELETE CASCADE NOT NULL,
    
    -- Interaction Details
    interaction_type TEXT NOT NULL CHECK (interaction_type IN (
        'view', 'download', 'bookmark', 'share', 'rate', 'comment', 'complete'
    )),
    progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    time_spent_minutes INTEGER DEFAULT 0,
    
    -- Engagement
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    bookmarked BOOLEAN DEFAULT FALSE,
    notes TEXT,
    
    -- Implementation Tracking
    action_items_completed TEXT[] DEFAULT '{}',
    implementation_status TEXT DEFAULT 'not_started' CHECK (implementation_status IN (
        'not_started', 'in_progress', 'implemented', 'adapted', 'abandoned'
    )),
    
    first_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Communities & Networking
CREATE TABLE communities (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    
    -- Basic Information
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    community_type TEXT NOT NULL CHECK (community_type IN (
        'general_discussion', 'denominational_network', 'regional_network',
        'church_planting_cohort', 'leadership_development', 'academic_research',
        'missionary_network', 'marketplace_ministry', 'special_interest'
    )),
    
    -- Organization
    visibility TEXT DEFAULT 'public' CHECK (visibility IN ('public', 'private', 'invitation_only')),
    join_policy TEXT DEFAULT 'open' CHECK (join_policy IN ('open', 'request', 'invitation_only', 'closed')),
    max_members INTEGER,
    current_member_count INTEGER DEFAULT 0,
    
    -- Geographic/Cultural Context
    geographic_focus TEXT[] DEFAULT '{}',
    language_primary TEXT DEFAULT 'en',
    languages_supported TEXT[] DEFAULT '{}',
    cultural_context TEXT[] DEFAULT '{}',
    
    -- Ministry Focus
    ministry_focus TEXT[] DEFAULT '{}',
    denominational_affiliation TEXT[] DEFAULT '{}',
    target_audience TEXT[] DEFAULT '{}',
    apest_focus JSONB DEFAULT '{}',
    
    -- Management
    created_by UUID REFERENCES user_profiles(id) NOT NULL,
    moderators UUID[] DEFAULT '{}',
    community_guidelines TEXT,
    discussion_guidelines TEXT,
    
    -- Engagement
    activity_level TEXT DEFAULT 'moderate' CHECK (activity_level IN ('low', 'moderate', 'high', 'very_high')),
    last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Features
    features_enabled JSONB DEFAULT '{"discussions": true, "events": false, "resources": true}',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Community Memberships
CREATE TABLE community_memberships (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    community_id UUID REFERENCES communities(id) ON DELETE CASCADE,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    
    -- Membership Details
    role TEXT DEFAULT 'member' CHECK (role IN ('member', 'contributor', 'moderator', 'admin', 'founder')),
    status TEXT DEFAULT 'active' CHECK (status IN ('pending', 'active', 'inactive', 'suspended', 'banned')),
    
    -- Engagement
    participation_score INTEGER DEFAULT 0,
    last_active_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    posts_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    
    -- Permissions
    can_post BOOLEAN DEFAULT TRUE,
    can_moderate BOOLEAN DEFAULT FALSE,
    can_invite BOOLEAN DEFAULT FALSE,
    
    -- Notification Preferences
    notification_settings JSONB DEFAULT '{}',
    
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(community_id, user_id)
);

-- Community Posts & Discussions
CREATE TABLE community_posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    community_id UUID REFERENCES communities(id) ON DELETE CASCADE,
    author_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    
    -- Content
    title TEXT,
    content TEXT NOT NULL,
    content_html TEXT,
    post_type TEXT DEFAULT 'discussion' CHECK (post_type IN (
        'discussion', 'question', 'resource_share', 'prayer_request',
        'announcement', 'event', 'testimony', 'case_study'
    )),
    
    -- Categorization
    tags TEXT[] DEFAULT '{}',
    theological_topics TEXT[] DEFAULT '{}',
    ministry_applications TEXT[] DEFAULT '{}',
    apest_relevance JSONB DEFAULT '{}',
    
    -- Engagement
    upvotes INTEGER DEFAULT 0,
    downvotes INTEGER DEFAULT 0,
    reply_count INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    
    -- Moderation
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'hidden', 'flagged', 'removed')),
    flagged_count INTEGER DEFAULT 0,
    moderated_by UUID REFERENCES user_profiles(id),
    moderation_notes TEXT,
    
    -- Threading
    parent_post_id UUID REFERENCES community_posts(id),
    thread_depth INTEGER DEFAULT 0,
    
    -- Features
    is_pinned BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    allows_replies BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- SUBSCRIPTION & FINANCIAL MANAGEMENT
-- =============================================

-- Subscription Plans
CREATE TABLE subscription_plans (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    
    -- Plan Details
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    plan_type TEXT NOT NULL CHECK (plan_type IN ('free', 'individual', 'organization', 'academic', 'enterprise')),
    
    -- Pricing
    price_monthly DECIMAL(10,2),
    price_annual DECIMAL(10,2),
    currency TEXT DEFAULT 'USD',
    
    -- Regional Pricing
    regional_pricing JSONB DEFAULT '{}',
    
    -- Features & Limits
    features JSONB NOT NULL DEFAULT '{}',
    user_limit INTEGER,
    content_access_level TEXT CHECK (content_access_level IN ('free', 'basic', 'premium', 'vip')) NOT NULL,
    ai_interactions_limit INTEGER,
    community_access_level TEXT DEFAULT 'basic',
    
    -- Business Rules
    trial_period_days INTEGER DEFAULT 0,
    setup_fee DECIMAL DEFAULT 0,
    cancellation_policy TEXT,
    
    -- Availability
    available_countries TEXT[] DEFAULT '{}',
    target_segments TEXT[] DEFAULT '{}',
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    stripe_price_id_monthly TEXT,
    stripe_price_id_yearly TEXT,
    sort_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Subscriptions
CREATE TABLE user_subscriptions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
    plan_id UUID REFERENCES subscription_plans(id) NOT NULL,
    
    -- For network tier: which leader they're subscribed to
    leader_profile_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    
    -- Subscription Details
    status TEXT NOT NULL CHECK (status IN (
        'trialing', 'active', 'past_due', 'cancelled', 'unpaid', 'incomplete', 'incomplete_expired'
    )),
    billing_cycle TEXT DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'annual')),
    
    -- Dates
    current_period_start TIMESTAMP WITH TIME ZONE NOT NULL,
    current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
    trial_start TIMESTAMP WITH TIME ZONE,
    trial_end TIMESTAMP WITH TIME ZONE,
    cancelled_at TIMESTAMP WITH TIME ZONE,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    
    -- Payment Information
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    payment_method JSONB DEFAULT '{}',
    
    -- Stripe Integration
    stripe_subscription_id TEXT UNIQUE,
    stripe_customer_id TEXT,
    
    -- Usage Tracking
    ai_interactions_used INTEGER DEFAULT 0,
    ai_interactions_limit INTEGER,
    
    -- Network Features
    allows_network_collaboration BOOLEAN DEFAULT FALSE,
    network_referral_code TEXT,
    
    -- Analytics
    total_revenue DECIMAL(12,2) DEFAULT 0.00,
    months_subscribed INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transaction History
CREATE TABLE transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
    subscription_id UUID REFERENCES user_subscriptions(id),
    
    -- Transaction Details
    transaction_type TEXT NOT NULL CHECK (transaction_type IN (
        'subscription', 'course_purchase', 'certification_fee', 'consulting', 'one_time', 'collaboration_share', 'referral_bonus'
    )),
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    
    -- Revenue Attribution (for network tier)
    leader_profile_id UUID REFERENCES user_profiles(id),
    collaboration_id UUID REFERENCES collaborations(id),
    
    -- Revenue Sharing (90% to creators, 10% to platform)
    gross_amount DECIMAL(10,2) NOT NULL,
    platform_fee DECIMAL(10,2) NOT NULL,
    leader_amount DECIMAL(10,2) NOT NULL,
    collaboration_revenue_split JSONB DEFAULT '{}',
    
    -- Payment Processing
    payment_method TEXT,
    payment_processor_id TEXT,
    stripe_payment_intent_id TEXT,
    payment_status TEXT CHECK (payment_status IN ('pending', 'succeeded', 'failed', 'canceled', 'refunded')),
    
    -- Business Context
    item_type TEXT,
    item_id UUID,
    description TEXT,
    
    -- Regional Information
    billing_country TEXT,
    tax_amount DECIMAL DEFAULT 0,
    tax_rate DECIMAL DEFAULT 0,
    
    -- Network Effects Tracking
    attributed_to_network_effect BOOLEAN DEFAULT FALSE,
    network_amplification_factor DECIMAL(5,2),
    
    -- Reconciliation
    invoice_number TEXT UNIQUE,
    receipt_url TEXT,
    
    processed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- ANALYTICS & BUSINESS INTELLIGENCE
-- =============================================

-- User Activity Analytics
CREATE TABLE user_analytics_events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    
    -- Event Details
    event_type TEXT NOT NULL,
    event_category TEXT,
    event_action TEXT,
    event_label TEXT,
    
    -- Context Data
    session_id TEXT,
    page_url TEXT,
    referrer_url TEXT,
    user_agent TEXT,
    device_type TEXT,
    
    -- Business Metrics
    content_id UUID,
    leader_profile_id UUID REFERENCES user_profiles(id),
    duration_seconds INTEGER,
    conversion_value DECIMAL,
    
    -- Personalization Data
    user_apest_profile JSONB DEFAULT '{}',
    content_recommendations JSONB DEFAULT '{}',
    
    -- Network Attribution
    came_via_network BOOLEAN DEFAULT FALSE,
    referring_leader_id UUID REFERENCES user_profiles(id),
    amplification_factor DECIMAL(5,2),
    
    -- Geographic & Temporal
    country_code TEXT,
    timezone TEXT,
    local_timestamp TIMESTAMP WITH TIME ZONE,
    
    -- UTM Tracking
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Learning Outcome Tracking
CREATE TABLE learning_outcomes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    
    -- Outcome Context
    outcome_type TEXT NOT NULL CHECK (outcome_type IN (
        'course_completion', 'behavior_change', 'ministry_impact', 'assessment_improvement'
    )),
    related_content_id UUID,
    measurement_method TEXT,
    
    -- Quantitative Metrics
    baseline_score DECIMAL,
    current_score DECIMAL,
    improvement_percentage DECIMAL,
    confidence_level DECIMAL,
    
    -- Qualitative Insights
    user_reported_changes TEXT,
    observed_behaviors JSONB DEFAULT '{}',
    ministry_applications TEXT[] DEFAULT '{}',
    
    -- Validation
    verified_by TEXT CHECK (verified_by IN ('self_reported', 'peer_validated', 'supervisor_confirmed')),
    evidence_provided JSONB DEFAULT '{}',
    
    -- Timeline
    measured_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    baseline_date TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Movement Impact Tracking
CREATE TABLE movement_metrics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    
    -- Geographic Scope
    region TEXT NOT NULL,
    geographic_identifier TEXT,
    
    -- Time Period
    measurement_period TEXT NOT NULL CHECK (measurement_period IN ('monthly', 'quarterly', 'annually')),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    
    -- User Engagement Metrics
    active_users INTEGER DEFAULT 0,
    new_users INTEGER DEFAULT 0,
    content_completions INTEGER DEFAULT 0,
    assessment_completions INTEGER DEFAULT 0,
    community_posts INTEGER DEFAULT 0,
    
    -- Transformation Indicators
    churches_planted INTEGER DEFAULT 0,
    ministries_launched INTEGER DEFAULT 0,
    leaders_trained INTEGER DEFAULT 0,
    cultural_bridges_built INTEGER DEFAULT 0,
    
    -- Network Growth
    referrals_generated INTEGER DEFAULT 0,
    partnerships_formed INTEGER DEFAULT 0,
    certification_recipients INTEGER DEFAULT 0,
    
    -- Financial Health
    revenue_generated DECIMAL DEFAULT 0,
    average_lifetime_value DECIMAL DEFAULT 0,
    subscription_retention_rate DECIMAL DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(region, geographic_identifier, measurement_period, period_start)
);

-- Performance Reports
CREATE TABLE performance_reports (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    
    -- Report Scope
    leader_profile_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    report_type TEXT CHECK (report_type IN ('daily', 'weekly', 'monthly', 'quarterly', 'annual')) NOT NULL,
    report_period_start DATE NOT NULL,
    report_period_end DATE NOT NULL,
    
    -- Content Performance
    content_published INTEGER DEFAULT 0,
    total_views INTEGER DEFAULT 0,
    unique_visitors INTEGER DEFAULT 0,
    average_reading_time DECIMAL(6,2),
    
    -- Audience Growth
    new_subscribers INTEGER DEFAULT 0,
    subscriber_churn INTEGER DEFAULT 0,
    net_subscriber_growth INTEGER DEFAULT 0,
    
    -- Revenue
    gross_revenue DECIMAL(12,2) DEFAULT 0.00,
    net_revenue DECIMAL(12,2) DEFAULT 0.00,
    new_subscriptions INTEGER DEFAULT 0,
    subscription_churn INTEGER DEFAULT 0,
    
    -- Network Amplification
    cross_references_received INTEGER DEFAULT 0,
    cross_references_given INTEGER DEFAULT 0,
    network_traffic_received INTEGER DEFAULT 0,
    network_conversion_rate DECIMAL(5,4),
    amplification_factor DECIMAL(6,2),
    
    -- Engagement Quality
    average_comment_count DECIMAL(6,2),
    bookmark_rate DECIMAL(5,4),
    share_rate DECIMAL(5,4),
    theological_engagement_score DECIMAL(3,2),
    
    -- AI Enhancement Impact
    ai_enhanced_content INTEGER DEFAULT 0,
    ai_performance_boost DECIMAL(5,4),
    
    -- Raw Data
    detailed_metrics JSONB DEFAULT '{}',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- SECURITY & AUDIT TRAIL
-- =============================================

-- Activity Audit Log
CREATE TABLE audit_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id),
    
    -- Action Details
    action TEXT NOT NULL,
    resource_type TEXT NOT NULL,
    resource_id UUID,
    
    -- Context
    ip_address INET,
    user_agent TEXT,
    session_id TEXT,
    request_id TEXT,
    
    -- Changes (for update actions)
    old_values JSONB DEFAULT '{}',
    new_values JSONB DEFAULT '{}',
    changed_fields TEXT[] DEFAULT '{}',
    
    -- Security Context
    risk_level TEXT DEFAULT 'low' CHECK (risk_level IN ('low', 'medium', 'high', 'critical')),
    security_flags TEXT[] DEFAULT '{}',
    
    -- Metadata
    description TEXT,
    additional_context JSONB DEFAULT '{}',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Feature Flags & Configuration
CREATE TABLE feature_flags (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    flag_name TEXT UNIQUE NOT NULL,
    description TEXT,
    
    -- Flag Configuration
    is_enabled BOOLEAN DEFAULT FALSE,
    rollout_percentage INTEGER DEFAULT 0 CHECK (rollout_percentage >= 0 AND rollout_percentage <= 100),
    target_audiences TEXT[] DEFAULT '{}',
    
    -- Conditions
    conditions JSONB DEFAULT '{}',
    
    -- Metadata
    created_by UUID REFERENCES user_profiles(id),
    environment TEXT DEFAULT 'production' CHECK (environment IN ('development', 'staging', 'production')),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Consent Management (GDPR Compliance)
CREATE TABLE user_consents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    
    -- Consent Details
    consent_type TEXT NOT NULL CHECK (consent_type IN (
        'data_processing', 'marketing_emails', 'analytics_tracking',
        'ai_learning', 'third_party_sharing', 'cookies'
    )),
    consent_given BOOLEAN NOT NULL,
    consent_version TEXT NOT NULL,
    
    -- Context
    consent_source TEXT,
    ip_address INET,
    user_agent TEXT,
    
    -- Metadata
    expires_at TIMESTAMP WITH TIME ZONE,
    withdrawn_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, consent_type, consent_version)
);

-- =============================================
-- AI ENHANCEMENT SYSTEM
-- =============================================

-- AI Content Processing Jobs
CREATE TABLE ai_content_jobs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    
    -- Job Details
    content_id UUID REFERENCES content_items(id) ON DELETE CASCADE NOT NULL,
    job_type TEXT CHECK (job_type IN (
        'summarize', 'generate_questions', 'find_cross_references', 'seo_optimize',
        'theological_analysis', 'quality_assessment', 'embedding_generation'
    )) NOT NULL,
    
    -- Status
    status TEXT CHECK (status IN ('queued', 'processing', 'completed', 'failed', 'cancelled')) NOT NULL DEFAULT 'queued',
    
    -- Processing Details
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    error_message TEXT,
    
    -- Input/Output
    input_data JSONB DEFAULT '{}',
    output_data JSONB DEFAULT '{}',
    
    -- Quality & Review
    human_reviewed BOOLEAN DEFAULT FALSE,
    human_approved BOOLEAN DEFAULT FALSE,
    review_notes TEXT,
    
    -- AI Model Info
    ai_model_used TEXT,
    processing_cost DECIMAL(8,4),
    confidence_score DECIMAL(3,2),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI-Generated Cross-Reference Suggestions
CREATE TABLE ai_cross_reference_suggestions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    
    -- Content
    source_content_id UUID REFERENCES content_items(id) ON DELETE CASCADE NOT NULL,
    target_content_id UUID REFERENCES content_items(id) ON DELETE CASCADE NOT NULL,
    
    -- AI Analysis
    connection_strength DECIMAL(3,2) NOT NULL CHECK (connection_strength >= 0.00 AND connection_strength <= 1.00),
    connection_reason TEXT,
    suggested_reference_type TEXT,
    
    -- Review Status
    status TEXT CHECK (status IN ('pending', 'approved', 'rejected', 'needs_review')) NOT NULL DEFAULT 'pending',
    reviewed_by UUID REFERENCES user_profiles(id),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    review_notes TEXT,
    
    -- Implementation
    implemented BOOLEAN DEFAULT FALSE,
    cross_reference_id UUID REFERENCES content_cross_references(id),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- PERFORMANCE INDEXES
-- =============================================

-- User profile indexes
CREATE INDEX idx_user_profiles_email ON user_profiles(email);
CREATE INDEX idx_user_profiles_ministry_role ON user_profiles(ministry_role);
CREATE INDEX idx_user_profiles_subscription_tier ON user_profiles(subscription_tier);
CREATE INDEX idx_user_profiles_leader_tier ON user_profiles(leader_tier);
CREATE INDEX idx_user_profiles_country_code ON user_profiles(country_code);
CREATE INDEX idx_user_profiles_last_active ON user_profiles(last_active_at DESC);
CREATE INDEX idx_user_profiles_assessment_total ON user_profiles(assessment_total DESC);

-- Content indexes
CREATE INDEX idx_content_items_author_id ON content_items(author_id);
CREATE INDEX idx_content_items_status_published ON content_items(status, published_at DESC);
CREATE INDEX idx_content_items_content_type ON content_items(content_type);
CREATE INDEX idx_content_items_visibility ON content_items(visibility);
CREATE INDEX idx_content_items_primary_category ON content_items(primary_category_id);
CREATE INDEX idx_content_items_theological_themes ON content_items USING GIN(theological_themes);
CREATE INDEX idx_content_items_keywords ON content_items USING GIN(keywords);
CREATE INDEX idx_content_items_slug_author ON content_items(slug, author_id);

-- Full-text search
CREATE INDEX idx_content_items_search ON content_items USING GIN(to_tsvector('english', title || ' ' || COALESCE(excerpt, '') || ' ' || content));

-- Vector similarity search (for AI embeddings)
CREATE INDEX idx_content_items_embedding ON content_items USING ivfflat(embedding_vector vector_cosine_ops) WITH (lists = 100);

-- AI conversation indexes
CREATE INDEX idx_ai_conversations_user_id ON ai_conversations(user_id);
CREATE INDEX idx_ai_conversations_status ON ai_conversations(status);
CREATE INDEX idx_ai_conversations_created_at ON ai_conversations(created_at DESC);
CREATE INDEX idx_ai_messages_conversation_id ON ai_messages(conversation_id);
CREATE INDEX idx_ai_messages_role ON ai_messages(role);

-- Community indexes
CREATE INDEX idx_communities_community_type ON communities(community_type);
CREATE INDEX idx_communities_visibility ON communities(visibility);
CREATE INDEX idx_community_memberships_user_id ON community_memberships(user_id);
CREATE INDEX idx_community_memberships_community_id ON community_memberships(community_id);
CREATE INDEX idx_community_posts_community_id ON community_posts(community_id);
CREATE INDEX idx_community_posts_author_id ON community_posts(author_id);
CREATE INDEX idx_community_posts_created_at ON community_posts(created_at DESC);

-- Cross-reference indexes
CREATE INDEX idx_content_cross_references_source ON content_cross_references(source_content_id);
CREATE INDEX idx_content_cross_references_target ON content_cross_references(target_content_id);
CREATE INDEX idx_content_cross_references_type ON content_cross_references(reference_type);

-- Subscription and payment indexes
CREATE INDEX idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX idx_user_subscriptions_leader_id ON user_subscriptions(leader_profile_id);
CREATE INDEX idx_user_subscriptions_status ON user_subscriptions(status);
CREATE INDEX idx_user_subscriptions_current_period_end ON user_subscriptions(current_period_end);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_leader_id ON transactions(leader_profile_id);
CREATE INDEX idx_transactions_status ON transactions(payment_status);
CREATE INDEX idx_transactions_processed_at ON transactions(processed_at DESC);

-- Analytics indexes
CREATE INDEX idx_user_analytics_events_user_id ON user_analytics_events(user_id);
CREATE INDEX idx_user_analytics_events_event_type ON user_analytics_events(event_type);
CREATE INDEX idx_user_analytics_events_created_at ON user_analytics_events(created_at DESC);
CREATE INDEX idx_user_analytics_events_leader_id ON user_analytics_events(leader_profile_id);

-- Audit indexes
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX idx_audit_logs_risk_level ON audit_logs(risk_level);

-- =============================================
-- ROW LEVEL SECURITY POLICIES
-- =============================================

-- Enable RLS on all sensitive tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_content_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_consents ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- User Profile Policies
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Public profiles are viewable" ON user_profiles
    FOR SELECT USING (
        account_status = 'active' 
        AND (privacy_settings->>'public_profile')::boolean = true
    );

-- Assessment Policies
CREATE POLICY "Users can only access their own assessments" ON user_assessments
    FOR ALL USING (auth.uid() = user_id);

-- AI Conversation Policies
CREATE POLICY "Users can access own conversations" ON ai_conversations
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can access own messages" ON ai_messages
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM ai_conversations 
            WHERE ai_conversations.id = ai_messages.conversation_id 
            AND ai_conversations.user_id = auth.uid()
        )
    );

-- Content Policies
CREATE POLICY "Published content is publicly readable" ON content_items
    FOR SELECT USING (status = 'published' AND visibility = 'public');

CREATE POLICY "Authors can manage their own content" ON content_items
    FOR ALL USING (auth.uid() = author_id);

CREATE POLICY "Premium content requires subscription" ON content_items
    FOR SELECT USING (
        visibility = 'public' 
        OR auth.uid() = author_id
        OR EXISTS (
            SELECT 1 FROM user_subscriptions us
            JOIN subscription_plans sp ON us.plan_id = sp.id
            WHERE us.user_id = auth.uid() 
            AND us.status = 'active'
            AND sp.content_access_level IN ('premium', 'vip')
        )
    );

-- Community Policies
CREATE POLICY "Community members can view posts" ON community_posts
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM community_memberships cm
            JOIN communities c ON c.id = cm.community_id
            WHERE cm.user_id = auth.uid() 
            AND cm.community_id = community_posts.community_id
            AND cm.status = 'active'
        )
        OR 
        EXISTS (
            SELECT 1 FROM communities
            WHERE id = community_posts.community_id
            AND visibility = 'public'
        )
    );

-- Subscription Policies
CREATE POLICY "Users can view own subscriptions" ON user_subscriptions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own transactions" ON transactions
    FOR SELECT USING (auth.uid() = user_id);

-- Content Interaction Policies
CREATE POLICY "Users can manage own interactions" ON user_content_interactions
    FOR ALL USING (auth.uid() = user_id);

-- Organization Policies
CREATE POLICY "Organization members can view org data" ON organizations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM organization_memberships
            WHERE organization_id = organizations.id
            AND user_id = auth.uid()
            AND status = 'active'
        )
    );

-- Consent Policies
CREATE POLICY "Users can manage own consents" ON user_consents
    FOR ALL USING (auth.uid() = user_id);

-- =============================================
-- TRIGGERS & FUNCTIONS
-- =============================================

-- Update timestamp function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply update timestamp triggers
CREATE TRIGGER update_user_profiles_updated_at 
    BEFORE UPDATE ON user_profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_items_updated_at 
    BEFORE UPDATE ON content_items 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_organizations_updated_at 
    BEFORE UPDATE ON organizations 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_conversations_updated_at 
    BEFORE UPDATE ON ai_conversations 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Calculate reading time and word count
CREATE OR REPLACE FUNCTION calculate_content_metrics()
RETURNS TRIGGER AS $$
BEGIN
    NEW.word_count = array_length(string_to_array(NEW.content, ' '), 1);
    NEW.estimated_reading_time = GREATEST(1, ROUND(NEW.word_count / 200.0)); -- 200 words per minute
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_content_metrics_trigger 
    BEFORE INSERT OR UPDATE ON content_items 
    FOR EACH ROW EXECUTE FUNCTION calculate_content_metrics();

-- Update comment counts
CREATE OR REPLACE FUNCTION update_content_comment_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE content_items SET comment_count = comment_count + 1 WHERE id = NEW.content_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE content_items SET comment_count = comment_count - 1 WHERE id = OLD.content_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Note: This would be applied to a comments table when implemented
-- CREATE TRIGGER update_comment_count 
--     AFTER INSERT OR DELETE ON comments 
--     FOR EACH ROW EXECUTE FUNCTION update_content_comment_count();

-- Network amplification calculation
CREATE OR REPLACE FUNCTION calculate_network_amplification()
RETURNS TRIGGER AS $$
DECLARE
    cross_ref_count INTEGER;
    collaboration_count INTEGER;
    base_amplification DECIMAL(5,2);
BEGIN
    -- Count cross-references to this content
    SELECT COUNT(*) INTO cross_ref_count 
    FROM content_cross_references 
    WHERE target_content_id = NEW.id;
    
    -- Count collaborations involving this content
    SELECT COUNT(*) INTO collaboration_count 
    FROM collaborations 
    WHERE NEW.id = ANY(content_items) AND status = 'completed';
    
    -- Calculate amplification (simplified algorithm)
    base_amplification = 1.0 + (cross_ref_count * 0.5) + (collaboration_count * 1.0);
    
    NEW.network_amplification_score = LEAST(10.0, base_amplification);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_amplification_trigger 
    BEFORE UPDATE ON content_items 
    FOR EACH ROW EXECUTE FUNCTION calculate_network_amplification();

-- =============================================
-- INITIAL DATA SETUP
-- =============================================

-- Default subscription plans
INSERT INTO subscription_plans (name, slug, description, plan_type, price_monthly, price_annual, content_access_level, features) VALUES
('Free Access', 'free', 'Basic access to public content and community', 'free', 0.00, 0.00, 'free', '{"content_limit": 5, "community_access": true, "ai_interactions": 0}'),
('Individual Subscriber', 'individual', 'Full access to premium content and AI features', 'individual', 29.00, 290.00, 'premium', '{"content_limit": null, "community_access": true, "ai_interactions": 50, "bookmarks": true}'),
('Professional', 'professional', 'Advanced features for ministry professionals', 'individual', 97.00, 970.00, 'vip', '{"content_limit": null, "community_access": true, "ai_interactions": 200, "collaboration_tools": true, "analytics": true}'),
('Organizational', 'organizational', 'Multi-user access for churches and organizations', 'organization', 297.00, 2970.00, 'vip', '{"users": 25, "content_limit": null, "community_access": true, "ai_interactions": 500, "admin_tools": true}'),
('Academic', 'academic', 'Special pricing for educational institutions', 'academic', 197.00, 1970.00, 'vip', '{"users": 100, "content_limit": null, "research_tools": true, "bulk_export": true}');

-- Core theological categories
INSERT INTO content_categories (name, slug, description, theological_discipline, movement_relevance_score, apest_relevance) VALUES
('Incarnational Theology', 'incarnational-theology', 'Christ''s pattern of mission and cultural engagement', 'systematic', 10, '{"apostolic": 9, "prophetic": 8, "evangelistic": 9, "shepherding": 6, "teaching": 8}'),
('APEST Framework', 'apest-framework', 'Five-fold ministry gifts for church health and mission', 'practical', 10, '{"apostolic": 10, "prophetic": 10, "evangelistic": 10, "shepherding": 10, "teaching": 10}'),
('Church Planting', 'church-planting', 'Multiplication of new faith communities', 'practical', 9, '{"apostolic": 10, "prophetic": 7, "evangelistic": 9, "shepherding": 8, "teaching": 6}'),
('Missional Ecclesiology', 'missional-ecclesiology', 'Understanding church as sent people', 'systematic', 9, '{"apostolic": 9, "prophetic": 8, "evangelistic": 8, "shepherding": 7, "teaching": 8}'),
('Movement Dynamics', 'movement-dynamics', 'How God creates world-changing movements', 'practical', 10, '{"apostolic": 10, "prophetic": 9, "evangelistic": 8, "shepherding": 6, "teaching": 7}'),
('Leadership Development', 'leadership-development', 'Forming leaders for movement multiplication', 'practical', 9, '{"apostolic": 8, "prophetic": 7, "evangelistic": 7, "shepherding": 9, "teaching": 9}'),
('Cultural Engagement', 'cultural-engagement', 'Gospel interaction with contemporary culture', 'practical', 8, '{"apostolic": 8, "prophetic": 9, "evangelistic": 9, "shepherding": 7, "teaching": 8}'),
('Discipleship & Formation', 'discipleship-formation', 'Spiritual growth and character development', 'practical', 8, '{"apostolic": 6, "prophetic": 7, "evangelistic": 7, "shepherding": 10, "teaching": 9}');

-- Core theological concepts for AI cross-referencing
INSERT INTO theological_concepts (name, slug, definition, concept_type, theological_discipline, key_scripture_references) VALUES
('Incarnational Mission', 'incarnational-mission', 'Following Christ''s pattern of entering culture without being absorbed by it', 'framework', 'practical', ARRAY['John 1:14', 'Philippians 2:5-11', '1 Corinthians 9:19-23']),
('APEST Gifts', 'apest-gifts', 'Five-fold ministry gifts of Apostle, Prophet, Evangelist, Shepherd, Teacher', 'framework', 'biblical', ARRAY['Ephesians 4:11-16', '1 Corinthians 12:28']),
('Missio Dei', 'missio-dei', 'Mission of God - understanding mission as God''s initiative', 'doctrine', 'systematic', ARRAY['John 20:21', 'Matthew 28:19-20', 'Acts 1:8']),
('Organic Church', 'organic-church', 'Simple, reproducible church structure focused on relationships and multiplication', 'practice', 'practical', ARRAY['Acts 2:42-47', '1 Corinthians 14:26', 'Hebrews 10:24-25']),
('Movement Multiplication', 'movement-multiplication', 'Exponential rather than additive growth patterns in ministry', 'methodology', 'practical', ARRAY['Acts 6:7', 'Acts 9:31', 'Acts 12:24']);

-- Core assessments
INSERT INTO assessments (name, slug, description, assessment_type, questions_count, estimated_duration, status) VALUES
('APEST Ministry Gifts Assessment', 'apest-assessment', 'Discover your primary and secondary ministry gifts according to Ephesians 4:11-16', 'apest', 50, 15, 'active'),
('Cultural Intelligence Assessment', 'cultural-intelligence', 'Evaluate your ability to engage effectively across cultural boundaries', 'cultural_context', 30, 10, 'active'),
('Leadership Readiness Assessment', 'leadership-readiness', 'Assess your readiness for various levels of ministry leadership', 'leadership_style', 40, 12, 'active');

-- Feature flags for gradual rollout
INSERT INTO feature_flags (flag_name, description, is_enabled, rollout_percentage, target_audiences, environment) VALUES
('ai_cross_referencing', 'AI-powered content cross-referencing suggestions', true, 100, ARRAY['premium', 'vip'], 'production'),
('network_collaboration', 'Multi-author collaboration features', true, 50, ARRAY['leader'], 'production'),
('advanced_analytics', 'Detailed performance analytics and reporting', false, 0, ARRAY['vip'], 'production'),
('theological_knowledge_graph', 'Semantic connections between theological concepts', true, 25, ARRAY['academic'], 'production');

-- =============================================
-- VIEWS FOR COMMON QUERIES
-- =============================================

-- Leader Dashboard View
CREATE VIEW leader_dashboard AS
SELECT 
    p.id,
    p.display_name,
    p.leader_tier,
    p.assessment_total,
    
    -- Content Stats
    COUNT(DISTINCT c.id) as total_content,
    COUNT(DISTINCT CASE WHEN c.status = 'published' THEN c.id END) as published_content,
    COALESCE(SUM(c.view_count), 0) as total_views,
    COALESCE(AVG(c.network_amplification_score), 1.0) as avg_amplification_factor,
    
    -- Subscriber Stats
    COUNT(DISTINCT s.id) as subscribers,
    COALESCE(SUM(t.leader_amount), 0) as total_revenue,
    
    -- Network Stats
    COUNT(DISTINCT cr.id) as cross_references_received,
    COUNT(DISTINCT cr2.id) as cross_references_given,
    COUNT(DISTINCT col.id) as active_collaborations

FROM user_profiles p
LEFT JOIN content_items c ON p.id = c.author_id
LEFT JOIN user_subscriptions s ON p.id = s.leader_profile_id AND s.status = 'active'
LEFT JOIN transactions t ON p.id = t.leader_profile_id AND t.payment_status = 'succeeded'
LEFT JOIN content_cross_references cr ON c.id = cr.target_content_id
LEFT JOIN content_cross_references cr2 ON c.id = cr2.source_content_id
LEFT JOIN collaborations col ON p.id = col.initiator_id AND col.status IN ('in_progress', 'completed')
WHERE p.account_status = 'active' AND p.leader_tier IS NOT NULL
GROUP BY p.id, p.display_name, p.leader_tier, p.assessment_total;

-- Popular Content View
CREATE VIEW popular_content AS
SELECT 
    c.id,
    c.title,
    c.slug,
    c.published_at,
    p.display_name as author_name,
    p.subdomain as author_subdomain,
    c.view_count,
    c.comment_count,
    c.bookmark_count,
    c.network_amplification_score,
    COUNT(cr.id) as times_referenced,
    cc.name as primary_category,
    (c.view_count * 1.0 + c.comment_count * 5.0 + c.bookmark_count * 3.0 + COUNT(cr.id) * 10.0) as engagement_score

FROM content_items c
JOIN user_profiles p ON c.author_id = p.id
LEFT JOIN content_categories cc ON c.primary_category_id = cc.id
LEFT JOIN content_cross_references cr ON c.id = cr.target_content_id
WHERE c.status = 'published' AND c.visibility = 'public'
GROUP BY c.id, c.title, c.slug, c.published_at, p.display_name, p.subdomain, 
         c.view_count, c.comment_count, c.bookmark_count, c.network_amplification_score, cc.name
ORDER BY engagement_score DESC;

-- =============================================
-- COMPLETION MESSAGE
-- =============================================

-- Schema creation completed successfully
-- This comprehensive schema supports:
-- 1. Individual platform excellence (Alan's flagship)
-- 2. Network amplification (Movement Leaders Collective)  
-- 3. Global movement multiplication (20,000+ practitioners)
-- 4. AI-enhanced content discovery and personalization
-- 5. Robust security, analytics, and business intelligence
-- 6. Scalable architecture for global deployment
