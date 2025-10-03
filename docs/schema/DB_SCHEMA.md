# Database Schema Documentation

This is the canonical database schema documentation for the Alan Hirsch project.

**Latest Snapshot:** [SNAPSHOT_2025-01-27.md](./SNAPSHOT_2025-01-27.md)

## Quick Reference

- **Project:** alan-hirsch (nepvfebkqvuqbxthttao)
- **Region:** us-east-1
- **Database:** PostgreSQL 17.6.1.005
- **Total Tables:** 12
- **RLS Enabled:** All tables
- **Total Policies:** 25

## Core Entities

### User Management

- `user_profiles` - Extended user profiles with ministry context and APEST integration
- `organizations` - Multi-tenant organization structure
- `organization_memberships` - User-organization relationships

### Content System

- `content_categories` - Hierarchical content categorization
- `content_items` - Main content repository with AI enhancement
- `communities` - Discussion groups and networking spaces

### Assessment System

- `assessments` - Assessment definitions and metadata
- `assessment_questions` - Individual questions within assessments
- `user_assessments` - User assessment attempts and results
- `assessment_responses` - Individual question responses

### Subscription & Billing

- `subscription_plans` - Tiered access plans with feature matrices
- `user_subscriptions` - User subscription records and billing

## Key Features

- **Row Level Security (RLS)** enabled on all tables
- **APEST Integration** - Built-in support for Apostolic, Prophetic, Evangelistic, Shepherding, Teaching dimensions
- **Multi-tenant Architecture** - Organization-based access control
- **AI Enhancement** - Content and assessment AI features
- **Cultural Context** - Support for global ministry contexts
- **Stripe Integration** - Subscription and billing management

## Security Model

All tables implement Row Level Security (RLS) with policies that ensure:

- Users can only access their own data
- Public content is appropriately filtered
- Organization members can access organization data
- Authenticated users can access assessment content

For detailed policy information, see the [latest snapshot](./SNAPSHOT_2025-01-27.md#rls-summary).

## API Access

- **Project URL:** https://nepvfebkqvuqbxthttao.supabase.co
- **GraphQL:** Available via pg_graphql extension
- **REST API:** Auto-generated from schema
- **Real-time:** Available for all tables

## Storage

- **blog-images** bucket for content media (public, 10MB limit)

## Extensions

- `pgcrypto` - Cryptographic functions
- `uuid-ossp` - UUID generation
- `pg_graphql` - GraphQL API
- `pg_stat_statements` - Query performance monitoring
- `supabase_vault` - Secure storage

---

_This documentation is automatically generated from the database schema. For the most up-to-date information, refer to the latest snapshot._
