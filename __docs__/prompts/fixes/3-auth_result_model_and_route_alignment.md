3. Auth Result model + route alignment (build-blocker)

Prompt:
Standardize Auth result types and consumers.

1. In `src/lib/types/result.ts` add:

   ```ts
   import { z } from "zod";
   export type Result<T, E = { code: string; message: string }> =
     | { ok: true; data: T }
     | { ok: false; error: E };

   export const ApiErrorSchema = z.object({
     code: z.string(),
     message: z.string(),
     details: z.any().optional(),
   });

   	2.	In src/lib/contracts/auth.contract.ts (or equivalent), ensure:
   •	LoginRequestSchema, LoginResponseSchema (egress)
   •	RegisterRequestSchema, RegisterResponseSchema
   •	Export via contracts index (Step 2).
   3.	In src/lib/services/auth.service.ts:
   •	Methods return Result<z.infer<typeof LoginResponseSchema>> etc.
   •	On failure, return { ok: false, error: { code, message } }
   •	On success, return { ok: true, data }
   •	No throwing for expected validation/auth failures (only truly exceptional).
   4.	Update all auth API routes under src/app/api/(auth)/**/route.ts to:
   ```

const res = await authService.login(ctx, input);
if (!res.ok) return NextResponse.json({ error: res.error }, { status: 400 });
return NextResponse.json(res.data, { status: 200 });

    •	Validate ingress via Zod
    •	Validate egress via e.g. LoginResponseSchema.parse(res.data) before sending

    5.	Run: pnpm type-check. Report any remaining auth-specific type errors by file.

---
