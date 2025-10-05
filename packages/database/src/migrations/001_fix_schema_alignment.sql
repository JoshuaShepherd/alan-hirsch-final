-- Migration: Fix Schema Alignment Issues
-- Date: 2025-01-27
-- Purpose: Add missing columns and fix schema alignment with queries

BEGIN;

-- Add missing columns to user_subscriptions table
ALTER TABLE user_subscriptions ADD COLUMN IF NOT EXISTS cancellation_reason TEXT;

-- Add missing columns to transactions table
ALTER TABLE transactions ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';
ALTER TABLE transactions ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW();

-- Add missing columns to payment_methods table
ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW();

-- Add missing columns to communities table (from the plan)
ALTER TABLE communities ADD COLUMN IF NOT EXISTS member_count INTEGER DEFAULT 0;
ALTER TABLE communities ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived'));
ALTER TABLE communities ADD COLUMN IF NOT EXISTS focus TEXT;

-- Update user_profiles table to add missing password_hash column
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS password_hash TEXT;

-- Update organization enum values to match contract schema
ALTER TABLE organizations DROP CONSTRAINT IF EXISTS organizations_organization_type_check;
ALTER TABLE organizations ADD CONSTRAINT organizations_organization_type_check
  CHECK (organization_type IN ('other', 'denomination', 'church', 'seminary', 'nonprofit', 'business', 'ministry_network'));

-- Update user_profiles ministry_role enum to match contract
ALTER TABLE user_profiles DROP CONSTRAINT IF EXISTS user_profiles_ministry_role_check;
ALTER TABLE user_profiles ADD CONSTRAINT user_profiles_ministry_role_check
  CHECK (ministry_role IN ('senior_pastor', 'associate_pastor', 'church_planter', 'denominational_leader', 'seminary_professor', 'seminary_student', 'ministry_staff', 'missionary', 'marketplace_minister', 'nonprofit_leader', 'consultant', 'academic_researcher', 'emerging_leader', 'other'));

COMMIT;
