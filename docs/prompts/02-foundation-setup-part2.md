# Phase 1: Monorepo Transformation - Part 2 (Days 2-3)

## Step 1.2: Enhance Existing App with Core Dependencies

**Cursor Prompt:**

```
Add the missing core dependencies to our existing Next.js + Supabase app:

1. **Add shadcn/ui to the existing app:**
   - Run `npx shadcn@latest init` in the `apps/safety/` directory
   - Configure components.json with proper paths
   - Install core shadcn components: button, form, input, label, card, dialog
   - Ensure Tailwind CSS integration works properly

2. **Add Database & ORM tools:**
   - Install drizzle-orm and drizzle-kit in `apps/safety/`
   - Keep existing @supabase/supabase-js (already installed)
   - Set up basic drizzle.config.ts to work with existing Supabase connection

3. **Add Validation & Form handling:**
   - Install zod, @hookform/resolvers, react-hook-form in `apps/safety/`
   - Create basic form validation setup that works with shadcn forms

4. **Add missing UI dependencies:**
   - Install @radix-ui/react-* packages (for shadcn components)
   - Install lucide-react, class-variance-authority, clsx, tailwind-merge
   - Ensure all shadcn/ui components work properly

5. **Enhance Development Tools:**
   - Add turbo to root for monorepo builds
   - Keep existing TypeScript and ESLint configurations
   - Test that existing app still works with all new dependencies

**Key Principle:** Enhance the existing working app, don't replace it. All existing auth and functionality should continue working.
```

**Expected Output:**

- shadcn/ui fully integrated and working in existing app
- Core shadcn components available and properly themed
- Drizzle ORM ready to work alongside existing Supabase setup
- Zod + react-hook-form ready for type-safe form building
- All new dependencies compatible with existing app structure

**Definition of Done:**

- ✅ shadcn/ui components render properly in existing app
- ✅ All core dependencies installed without breaking existing functionality
- ✅ Existing Supabase auth and pages still work perfectly
- ✅ Development server runs without errors
- ✅ TypeScript compilation successful with new dependencies

---

**Next Step:** Proceed to `03-typescript-and-tooling.md`