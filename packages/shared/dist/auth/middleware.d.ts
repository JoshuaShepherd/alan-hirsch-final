import { UserProfile } from '@/lib/contracts';
import { z } from 'zod';
export type ActionState = {
    error?: string;
    success?: string;
    [key: string]: unknown;
};
type ValidatedActionFunction<S extends z.ZodType<any, any>, T> = (data: z.infer<S>, formData: FormData) => Promise<T>;
export declare function validatedAction<S extends z.ZodType<any, any>, T>(schema: S, action: ValidatedActionFunction<S, T>): (prevState: ActionState, formData: FormData) => Promise<T | {
    error: string;
}>;
type ValidatedActionWithUserFunction<S extends z.ZodType<any, any>, T> = (data: z.infer<S>, formData: FormData, user: UserProfile) => Promise<T>;
export declare function validatedActionWithUser<S extends z.ZodType<any, any>, T>(schema: S, action: ValidatedActionWithUserFunction<S, T>): (prevState: ActionState, formData: FormData) => Promise<T | {
    error: string;
}>;
type WithTeamFunction<T> = (formData: FormData, organization: any) => Promise<T>;
export declare function withTeam<T>(action: WithTeamFunction<T>): (formData: FormData) => Promise<T>;
export {};
//# sourceMappingURL=middleware.d.ts.map