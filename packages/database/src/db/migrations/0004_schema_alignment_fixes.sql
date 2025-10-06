-- Schema Alignment Fixes
-- Date: 2025-01-27
-- Purpose: Fix database schema misalignments identified in type error resolution plan

BEGIN;

-- ============================================================================
-- COMMUNITIES TABLE FIXES
-- ============================================================================

-- Add missing status column to communities table
ALTER TABLE communities ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active'
  CHECK (status IN ('active', 'inactive', 'archived'));

-- Add missing focus column to communities table
ALTER TABLE communities ADD COLUMN IF NOT EXISTS focus TEXT;

-- Update existing records to have default status
UPDATE communities SET status = 'active' WHERE status IS NULL;

-- ============================================================================
-- ORGANIZATIONS TABLE FIXES
-- ============================================================================

-- Update organization size category enum to match contract schema
-- First, update existing data to map old values to new values
UPDATE organizations SET size_category = 'startup' WHERE size_category = 'small' AND id IN (
  SELECT id FROM organizations WHERE size_category = 'small' LIMIT 1
);

-- Drop and recreate the constraint with new enum values
ALTER TABLE organizations DROP CONSTRAINT IF EXISTS organizations_size_category_check;
ALTER TABLE organizations ADD CONSTRAINT organizations_size_category_check
  CHECK (size_category IN ('startup', 'small', 'medium', 'large', 'enterprise'));

-- Update organization license type enum to match contract schema
-- Map institutional -> team
UPDATE organizations SET license_type = 'team' WHERE license_type = 'institutional';

-- Drop and recreate the constraint with new enum values
ALTER TABLE organizations DROP CONSTRAINT IF EXISTS organizations_license_type_check;
ALTER TABLE organizations ADD CONSTRAINT organizations_license_type_check
  CHECK (license_type IN ('individual', 'team', 'enterprise'));

-- Update organization status enum to match contract schema
-- Map inactive -> cancelled
UPDATE organizations SET status = 'cancelled' WHERE status = 'inactive';

-- Drop and recreate the constraint with new enum values
ALTER TABLE organizations DROP CONSTRAINT IF EXISTS organizations_status_check;
ALTER TABLE organizations ADD CONSTRAINT organizations_status_check
  CHECK (status IN ('trial', 'active', 'suspended', 'cancelled'));

-- ============================================================================
-- ORGANIZATION MEMBERSHIPS TABLE FIXES
-- ============================================================================

-- Update organization membership status enum to match contract schema
-- Map invited -> pending (invited is now handled by invitation system)
UPDATE organization_memberships SET status = 'pending' WHERE status = 'invited';

-- Drop and recreate the constraint with new enum values
ALTER TABLE organization_memberships DROP CONSTRAINT IF EXISTS organization_memberships_status_check;
ALTER TABLE organization_memberships ADD CONSTRAINT organization_memberships_status_check
  CHECK (status IN ('pending', 'active', 'inactive', 'cancelled'));

-- ============================================================================
-- USER PROFILES TABLE FIXES
-- ============================================================================

-- Add password hash column for local auth support
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS password_hash TEXT;

-- Note: Ministry role enum is already aligned between database and contract schemas
-- No changes needed for ministry_role enum

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Add indexes for new columns
CREATE INDEX IF NOT EXISTS idx_communities_status ON communities(status);
CREATE INDEX IF NOT EXISTS idx_communities_focus ON communities(focus) WHERE focus IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_user_profiles_password_hash ON user_profiles(password_hash) WHERE password_hash IS NOT NULL;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Verify communities table has required columns
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'communities' AND column_name = 'status'
  ) THEN
    RAISE EXCEPTION 'Communities status column not found';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'communities' AND column_name = 'focus'
  ) THEN
    RAISE EXCEPTION 'Communities focus column not found';
  END IF;
END $$;

-- Verify user_profiles table has password_hash column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'password_hash'
  ) THEN
    RAISE EXCEPTION 'User profiles password_hash column not found';
  END IF;
END $$;

-- Verify organization enum constraints are correct
DO $$
BEGIN
  -- Check size_category constraint
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.check_constraints
    WHERE constraint_name = 'organizations_size_category_check'
    AND check_clause LIKE '%startup%'
  ) THEN
    RAISE EXCEPTION 'Organization size_category constraint not updated correctly';
  END IF;

  -- Check license_type constraint
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.check_constraints
    WHERE constraint_name = 'organizations_license_type_check'
    AND check_clause LIKE '%team%'
  ) THEN
    RAISE EXCEPTION 'Organization license_type constraint not updated correctly';
  END IF;

  -- Check status constraint
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.check_constraints
    WHERE constraint_name = 'organizations_status_check'
    AND check_clause LIKE '%cancelled%'
  ) THEN
    RAISE EXCEPTION 'Organization status constraint not updated correctly';
  END IF;
END $$;

COMMIT;
