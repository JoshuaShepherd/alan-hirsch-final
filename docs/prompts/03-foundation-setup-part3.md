# Phase 1: Monorepo Transformation - Part 3 (Days 2-3)

## Step 1.3: Configure TypeScript and Tooling Across Workspace

**Cursor Prompt:**

```
Configure TypeScript and development tooling across our new monorepo workspace:

1. **Enhance TypeScript configuration:**
   - Update existing `apps/safety/tsconfig.json` with staged strictness
   - Keep strict: true but keep exactOptionalPropertyTypes and noUncheckedIndexedAccess OFF initially
   - Add path mapping for future package imports (@platform/*)
   - Create shared `tsconfig.base.json` at workspace root

2. **Set up package TypeScript configs:**
   - Create tsconfig.json for each package in `packages/`
   - Configure each package to extend the base config
   - Set up proper module resolution for monorepo imports

3. **Configure development tooling:**
   - Set up shared ESLint config that works across workspace
   - Configure Prettier for consistent formatting
   - Test that turbo build pipeline works across all packages
   - Ensure hot reload still works in development

4. **Prepare for package extraction:**
   - Configure import paths so we can gradually move code to packages
   - Set up build scripts that prepare packages for consumption by apps
   - Test that workspace dependencies resolve correctly

**Goal:** Maintain all existing functionality while preparing the foundation for gradual extraction of code into shared packages.
```

**Expected Output:**

- Staged TypeScript configuration (strict but not overly restrictive)
- Proper path mapping setup
- Type definitions for all dependencies
- Build configuration optimized for production
- Shared TypeScript config for monorepo packages

**Expected Output:**

- Staged TypeScript configuration promoting development velocity
- Shared tooling configurations across monorepo
- Path mapping ready for package imports
- Build pipeline working across workspace
- All existing functionality preserved

**Definition of Done:**

- ✅ **Existing Next.js + Supabase app still works perfectly**
- ✅ Monorepo TypeScript configuration working across workspace
- ✅ All tooling (ESLint, Prettier, Turbo) configured and working
- ✅ Package build system ready for gradual code extraction
- ✅ Import paths configured for future package usage
- ✅ shadcn/ui components ready for use in Safety development

---

**Next Step:** Proceed to `04-drizzle-setup.md`