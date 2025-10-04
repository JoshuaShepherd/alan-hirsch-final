# Database Schema Documentation

This directory contains comprehensive documentation for the Alan Hirsch platform database schema, generated directly from the live Supabase database.

## Documentation Files

### Core Documentation

- **[DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)** - Main schema overview with ER diagram
- **[RLS_POLICIES.md](./RLS_POLICIES.md)** - Detailed Row Level Security policies
- **[TABLE_DETAILS.md](./TABLE_DETAILS.md)** - Comprehensive table documentation

### Quick Reference

| File                 | Purpose                                     | Last Updated |
| -------------------- | ------------------------------------------- | ------------ |
| `DATABASE_SCHEMA.md` | Schema overview, statistics, and ER diagram | 2025-01-27   |
| `RLS_POLICIES.md`    | All RLS policies with SQL and explanations  | 2025-01-27   |
| `TABLE_DETAILS.md`   | Detailed column definitions and constraints | 2025-01-27   |

## Database Overview

**Project:** alan-hirsch (nepvfebkqvuqbxthttao)
**Database:** PostgreSQL 17.6.1.005
**Region:** us-east-1
**Total Tables:** 12
**Total RLS Policies:** 25
**Total Extensions:** 4

### Key Features

- **Multi-tenant Architecture** - Organization-based access control
- **APEST Integration** - Built-in support for ministry leadership dimensions
- **Assessment System** - Cultural context-aware assessments
- **Content Management** - AI-enhanced content with network amplification
- **Subscription Billing** - Stripe integration with usage tracking
- **Community Features** - Global cultural context support

### Core Entities

1. **User Management**
   - `user_profiles` - Extended profiles with ministry context
   - `organizations` - Multi-tenant organization structure
   - `organization_memberships` - User-organization relationships

2. **Content System**
   - `content_categories` - Hierarchical categorization
   - `content_items` - AI-enhanced content repository
   - `communities` - Discussion groups and networking

3. **Assessment System**
   - `assessments` - Assessment definitions
   - `assessment_questions` - Individual questions
   - `user_assessments` - User results with AI insights
   - `assessment_responses` - Individual responses

4. **Subscription & Billing**
   - `subscription_plans` - Tiered access plans
   - `user_subscriptions` - User subscription records

## Security Model

All tables implement Row Level Security (RLS) with comprehensive policies:

- **User Data Isolation** - Users can only access their own data
- **Public Content Filtering** - Only published/active content is publicly accessible
- **Organization Access** - Members can access organization data
- **Assessment Privacy** - Assessment results are private to users
- **Content Authorship** - Authors have full control over their content

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

## Migrations

Applied migrations:

1. `20251002` - comprehensive_alan_hirsch_schema
2. `20251002070340` - enable_rls_user_profiles_only
3. `20251002070403` - enable_rls_existing_tables
4. `20251002090616` - create_assessment_system
5. `20251003121947` - fix_missing_rls_policies

## Usage

### For Developers

1. **Schema Reference** - Use `DATABASE_SCHEMA.md` for quick overview
2. **Security Implementation** - Reference `RLS_POLICIES.md` for access control
3. **Detailed Queries** - Use `TABLE_DETAILS.md` for column specifications

### For Database Administrators

1. **Policy Management** - All RLS policies documented with SQL
2. **Index Information** - Complete index listings for performance tuning
3. **Constraint Details** - Check constraints and foreign key relationships

### For Product Managers

1. **Feature Overview** - Core entities and their relationships
2. **User Flows** - How data flows through the system
3. **Access Patterns** - What users can access and when

## Maintenance

This documentation is generated directly from the live Supabase database using the Supabase MCP tools. To update:

1. Connect to the Supabase project
2. Run introspection queries
3. Update documentation files
4. Verify accuracy against live schema

## Related Documentation

- [RLS Playbook](../../rls-playbook.md) - Implementation guidelines
- [API Documentation](../../MASTER/API_DOCUMENTATION.md) - API endpoints
- [Type System Guide](../../MASTER/TYPE_SYSTEM_GUIDE.md) - TypeScript types

---

**Generated:** 2025-01-27
**Source:** Direct Supabase MCP introspection
**Method:** Automated schema extraction and documentation generation
