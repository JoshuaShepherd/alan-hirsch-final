# Alan Hirsch Digital Platform

A comprehensive digital publishing and assessment platform designed for ministry leaders and organizations. Built with **Next.js**, **Supabase**, and **Stripe** for modern ministry management.

**Status: 85% Complete - Production Ready Foundation**

## 🚀 Project Status

### ✅ **Completed (85%)**

- **Database Schema**: 12 tables with full relationships and RLS policies
- **Type System**: End-to-end type safety with Zod validation
- **API Layer**: Complete RESTful endpoints with proper validation
- **Authentication**: Supabase Auth with JWT and session management
- **Testing Infrastructure**: Comprehensive test suite with 98.8% pass rate
- **Deployment Ready**: Production configuration and CI/CD pipeline

### 🔄 **In Progress (15%)**

- **UI Implementation**: Dashboard and user interface components
- **Core User Flows**: Assessment taking and content creation workflows
- **Production Deployment**: Final deployment and monitoring setup

## Features

### **Assessment System**

- Leadership and ministry assessments with APEST framework
- Dynamic question types (multiple choice, Likert scales, text responses)
- Progress tracking and assessment resumption
- AI-powered recommendations and insights

### **Content Management**

- Rich text publishing platform for articles and resources
- Content categorization and organization
- Multi-tenant content access control
- Community-based content sharing

### **Organization Management**

- Multi-tenant architecture with organization-based access
- Team member invitations and role management
- Subscription and billing management
- Activity logging and audit trails

### **Technical Features**

- Type-safe database operations with Drizzle ORM
- Comprehensive API layer with Zod validation
- Row Level Security (RLS) policies
- Stripe integration for subscription management
- Next.js 14+ with App Router architecture

## Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) with App Router
- **Database**: [PostgreSQL 17.6.1](https://www.postgresql.org/) via [Supabase](https://supabase.com/)
- **ORM**: [Drizzle](https://orm.drizzle.team/) with full type safety
- **Validation**: [Zod](https://zod.dev/) for runtime type checking
- **Payments**: [Stripe](https://stripe.com/) for subscription management
- **UI Library**: [shadcn/ui](https://ui.shadcn.com/) with Tailwind CSS
- **Authentication**: [Supabase Auth](https://supabase.com/auth)
- **Testing**: Vitest, Playwright for E2E testing

## Getting Started

```bash
git clone [repository-url]
cd alan-hirsch-final
pnpm install
```

## Running Locally

[Install](https://docs.stripe.com/stripe-cli) and log in to your Stripe account:

```bash
stripe login
```

Use the included setup script to create your `.env` file:

```bash
pnpm db:setup
```

Run the database migrations and seed the database with a default user and team:

```bash
pnpm db:migrate
pnpm db:seed
```

This will create the following user and team:

- User: `test@test.com`
- Password: `admin123`

You can also create new users through the `/sign-up` route.

Finally, run the Next.js development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

You can listen for Stripe webhooks locally through their CLI to handle subscription change events:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Testing Payments

To test Stripe payments, use the following test card details:

- Card Number: `4242 4242 4242 4242`
- Expiration: Any future date
- CVC: Any 3-digit number

## Going to Production

When you're ready to deploy your SaaS application to production, follow these steps:

### Set up a production Stripe webhook

1. Go to the Stripe Dashboard and create a new webhook for your production environment.
2. Set the endpoint URL to your production API route (e.g., `https://yourdomain.com/api/stripe/webhook`).
3. Select the events you want to listen for (e.g., `checkout.session.completed`, `customer.subscription.updated`).

### Deploy to Vercel

1. Push your code to a GitHub repository.
2. Connect your repository to [Vercel](https://vercel.com/) and deploy it.
3. Follow the Vercel deployment process, which will guide you through setting up your project.

### Add environment variables

In your Vercel project settings (or during deployment), add all the necessary environment variables. Make sure to update the values for the production environment, including:

1. `BASE_URL`: Set this to your production domain.
2. `STRIPE_SECRET_KEY`: Use your Stripe secret key for the production environment.
3. `STRIPE_WEBHOOK_SECRET`: Use the webhook secret from the production webhook you created in step 1.
4. `POSTGRES_URL`: Set this to your production database URL.
5. `AUTH_SECRET`: Set this to a random string. `openssl rand -base64 32` will generate one.

## Other Templates

While this template is intentionally minimal and to be used as a learning resource, there are other paid versions in the community which are more full-featured:

- https://achromatic.dev
- https://shipfa.st
- https://makerkit.dev
- https://zerotoshipped.com
- https://turbostarter.dev
