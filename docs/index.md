# Alan Hirsch Platform - Database Schema Documentation

```{admonition} Welcome
:class: tip
This comprehensive documentation provides a complete overview of the Alan Hirsch ministry platform's database schema, security model, and API architecture.
```

## 🎯 Overview

The Alan Hirsch Platform is a comprehensive ministry management system built on modern web technologies, featuring:

- **Multi-tenant Architecture** - Organization-based access control
- **APEST Integration** - Built-in support for Apostolic, Prophetic, Evangelistic, Shepherding, Teaching dimensions
- **AI Enhancement** - Content and assessment AI features
- **Cultural Context** - Support for global ministry contexts
- **Stripe Integration** - Subscription and billing management

## 📊 Database Architecture

Our database is built on **PostgreSQL 17.6.1** with **Supabase** as the backend-as-a-service platform, featuring:

- **12 Core Tables** with comprehensive relationships
- **Row Level Security (RLS)** enabled on all tables
- **25 Security Policies** ensuring data protection
- **32 Indexes** for optimal performance
- **Multi-schema Architecture** with public, extensions, and vault schemas

## 🔐 Security Model

All data access is controlled through **Row Level Security (RLS)** policies that ensure:

- Users can only access their own data
- Public content is appropriately filtered
- Organization members can access organization data
- Authenticated users can access assessment content

## 🚀 Quick Start

### For Developers

1. Review the [Database Schema Overview](schema/DB_SCHEMA.md)
2. Check the [Latest Schema Snapshot](schema/SNAPSHOT_2025-08-03.md)
3. Understand [RLS Policies](schema/security/rls_policies.md)

### For System Administrators

1. Review [Deployment Guide](deployment/environment.md)
2. Check [Monitoring Setup](deployment/monitoring.md)
3. Understand [Backup Procedures](deployment/backup.md)

## 📚 Documentation Structure

This documentation is organized into several key sections:

### Core Schema

- **Tables** - Detailed documentation of each database table
- **Relationships** - Foreign key relationships and data flow
- **Indexes** - Performance optimization strategies

### Security

- **RLS Policies** - Row-level security implementation
- **Access Control** - User and organization permissions

### API Reference

- **Endpoints** - REST API documentation
- **Authentication** - Auth flow and token management
- **Rate Limiting** - API usage policies

### Development

- **Setup** - Local development environment
- **Migrations** - Database schema changes
- **Testing** - Test suite and coverage

## 🛠 Technology Stack

```{list-table} Technology Stack
:header-rows: 1
:name: tech-stack

* - Component
  - Technology
  - Version
* - Database
  - PostgreSQL
  - 17.6.1
* - Backend
  - Supabase
  - Latest
* - Frontend
  - Next.js
  - 14+
* - Styling
  - Tailwind CSS
  - Latest
* - ORM
  - Drizzle
  - Latest
* - Validation
  - Zod
  - Latest
* - Payments
  - Stripe
  - Latest
```

## 📈 Key Metrics

```{list-table} Database Statistics
:header-rows: 1
:name: db-stats

* - Metric
  - Value
* - Total Tables
  - 12
* - RLS Policies
  - 25
* - Indexes
  - 32
* - Foreign Keys
  - 17
* - Check Constraints
  - 15
* - Extensions
  - 5
```

## 🔗 External Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM](https://orm.drizzle.team/)

## 📞 Support

For questions or issues with this documentation:

- **GitHub Issues**: [Create an issue](https://github.com/alan-hirsch/platform/issues)
- **Email**: [Contact the team](mailto:dev@alanhirsch.com)
- **Documentation**: [Update this doc](https://github.com/alan-hirsch/platform/docs)

---

```{admonition} Last Updated
:class: info
This documentation was last updated on **August 3, 2025** and reflects the current state of the database schema.
```
