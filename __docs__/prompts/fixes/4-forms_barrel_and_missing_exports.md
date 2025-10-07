## 4) Forms barrel + missing exports (unblock components)

**Prompt:**

```md
Fix form module exports.

1. Create `src/lib/forms/index.ts` exporting all used primitives:
   - `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`, `FormDescription`
   - `BaseForm`, `ZodFormResolver`, `useZodForm` (wrap RHF+Zod)
   - Any shared `FieldAdapters` (Select, DatePicker, RichText)

2. Replace broken imports across repo:
   - Any `@/lib/forms/<something>` → `@/lib/forms`
   - Ensure components under `src/components/forms/**` compile against these exports.

3. Run: `pnpm type-check` and show remaining “Cannot find module '@/lib/forms/…'” errors if any.
```
