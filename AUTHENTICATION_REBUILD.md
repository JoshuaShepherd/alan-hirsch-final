# Authentication System Rebuild

## Overview
The login system has been completely rebuilt to align with the custom contracts, validations, and migrations defined in this codebase. The old team-based authentication system has been replaced with a user profile and organization-based system.

## Changes Made

### 1. Database Schema Updates
- **Added `passwordHash` field** to `userProfiles` table in `/lib/db/schema/auth.ts`
- **Generated migration** `0002_common_karen_page.sql` to add the password field
- **Note**: This is temporary - the system should eventually use Supabase Auth

### 2. Authentication Actions (`/app/(login)/actions.ts`)
- **Replaced old imports**: Removed `users`, `teams`, `teamMembers` imports
- **Added new imports**: Using `userProfiles`, `organizations`, `organizationMemberships`
- **Updated validation schemas**:
  - `signInSchema`: Email and password validation with proper error messages
  - `signUpSchema`: Extended with firstName, lastName, ministryRole, organizationName
- **Rebuilt signIn function**:
  - Uses `getUserByEmail()` to find users
  - Checks account status (must be 'active')
  - Verifies password using `comparePasswords()`
  - Updates `lastActiveAt` timestamp
- **Rebuilt signUp function**:
  - Creates user profile with UUID
  - Handles organization creation or joining
  - Creates organization memberships with proper roles
- **Updated signOut function**: Simplified and uses user profiles

### 3. Session Management (`/lib/auth/session.ts`)
- **Updated imports**: Now uses `UserProfile` and `NewUserProfile` types
- **Changed session data**: User ID is now string (UUID) instead of number
- **Updated setSession**: Accepts UserProfile or NewUserProfile types

### 4. Middleware (`/lib/auth/middleware.ts`)
- **Updated imports**: Removed team-related imports
- **Updated types**: `ValidatedActionWithUserFunction` now uses `UserProfile`
- **Removed team functions**: Removed `withTeam` and related team-based logic

### 5. Login Component (`/app/(login)/login.tsx`)
- **Added signup fields**: firstName, lastName, ministryRole, organizationName
- **Updated form structure**: Conditional rendering based on mode (signin/signup)
- **Added ministry role dropdown**: All ministry roles from validation schema
- **Updated hidden fields**: Changed `inviteId` to `organizationId`

### 6. Validation Schema (`/lib/validations/auth.ts`)
- **Added passwordHash field** to `userProfileSchema` (temporary)

## Key Features

### Sign In Flow
1. User enters email and password
2. System validates input using Zod schema
3. Looks up user by email in `userProfiles` table
4. Verifies account is active
5. Compares password hash
6. Updates last active timestamp
7. Sets session with UUID-based user ID
8. Redirects to dashboard

### Sign Up Flow
1. User enters personal info (name, email, password, ministry role, organization)
2. System validates all inputs using Zod schema
3. Checks if user already exists
4. Hashes password using bcrypt
5. Creates user profile with UUID
6. Optionally creates or joins organization
7. Creates organization membership
8. Sets session and redirects

### Organization Support
- Users can create new organizations during signup
- Users can join existing organizations via `organizationId` parameter
- Organization memberships track roles (owner, admin, member, viewer)
- Organization owners have full control, members have limited access

## Migration Required

To apply the database changes, run:
```bash
npm run db:migrate
```

**Note**: Ensure your database is running and `POSTGRES_URL` environment variable is set.

## Future Improvements

1. **Migrate to Supabase Auth**: Replace custom password handling with Supabase Auth
2. **Add email verification**: Implement email confirmation for new accounts
3. **Add password reset**: Implement forgot password functionality
4. **Add MFA support**: Multi-factor authentication for enhanced security
5. **Add social login**: OAuth providers (Google, GitHub, etc.)
6. **Add account management**: Update profile, change password, delete account

## Security Considerations

- Passwords are hashed using bcrypt with 10 salt rounds
- Sessions use JWT with HS256 algorithm and 24-hour expiry
- User account status must be 'active' to sign in
- All inputs are validated using Zod schemas
- UUIDs are used for user IDs to prevent enumeration attacks

## Testing

To test the authentication system:
1. Start the development server: `npm run dev`
2. Navigate to `/sign-up` to create a new account
3. Fill in all required fields and submit
4. Navigate to `/sign-in` to test login
5. Verify session persistence and dashboard access

## Files Modified

- `/app/(login)/actions.ts` - Complete rebuild of authentication actions
- `/app/(login)/login.tsx` - Added signup fields and improved UX
- `/lib/auth/session.ts` - Updated for UUID-based user IDs
- `/lib/auth/middleware.ts` - Removed team logic, updated types
- `/lib/db/schema/auth.ts` - Added passwordHash field
- `/lib/validations/auth.ts` - Added passwordHash to schema
- `/lib/db/migrations/0002_common_karen_page.sql` - New migration file
