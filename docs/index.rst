Alan Hirsch Platform Documentation
==================================

.. toctree::
   :maxdepth: 2
   :caption: Overview

   schema/DB_SCHEMA
   schema/SNAPSHOT_2025-08-03

.. toctree::
   :maxdepth: 2
   :caption: Database Schema

   schema/tables/user_profiles

.. toctree::
   :maxdepth: 2
   :caption: Security & Policies

   schema/security/rls_policies

.. toctree::
   :maxdepth: 2
   :caption: Development

   README

Welcome to the Alan Hirsch Platform Documentation!
==================================================

This comprehensive documentation provides a complete overview of the Alan Hirsch ministry platform's database schema, security model, and system architecture.

Overview
--------

The Alan Hirsch Platform is a comprehensive ministry management system built on modern web technologies, featuring:

* **Multi-tenant Architecture** - Organization-based access control
* **APEST Integration** - Built-in support for Apostolic, Prophetic, Evangelistic, Shepherding, Teaching dimensions
* **AI Enhancement** - Content and assessment AI features
* **Cultural Context** - Support for global ministry contexts
* **Stripe Integration** - Subscription and billing management

Database Architecture
---------------------

Our database is built on **PostgreSQL 17.6.1** with **Supabase** as the backend-as-a-service platform, featuring:

* **12 Core Tables** with comprehensive relationships
* **Row Level Security (RLS)** enabled on all tables
* **25 Security Policies** ensuring data protection
* **32 Indexes** for optimal performance
* **Multi-schema Architecture** with public, extensions, and vault schemas

Security Model
--------------

All data access is controlled through **Row Level Security (RLS)** policies that ensure:

* Users can only access their own data
* Public content is appropriately filtered
* Organization members can access organization data
* Authenticated users can access assessment content

Technology Stack
----------------

.. list-table:: Technology Stack
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

Key Metrics
-----------

.. list-table:: Database Statistics
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

External Resources
------------------

* `Supabase Documentation <https://supabase.com/docs>`_
* `PostgreSQL Documentation <https://www.postgresql.org/docs/>`_
* `Next.js Documentation <https://nextjs.org/docs>`_
* `Drizzle ORM <https://orm.drizzle.team/>`_

Support
-------

For questions or issues with this documentation:

* **GitHub Issues**: `Create an issue <https://github.com/alan-hirsch/platform/issues>`_
* **Email**: `Contact the team <mailto:dev@alanhirsch.com>`_
* **Documentation**: `Update this doc <https://github.com/alan-hirsch/platform/docs>`_

.. note::
   This documentation was last updated on **August 3, 2025** and reflects the current state of the database schema.

Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`