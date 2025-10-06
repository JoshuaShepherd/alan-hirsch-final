import { z } from 'zod';
export declare const organizationTypeSchema: z.ZodEnum<["church", "denomination", "seminary", "ministry_network", "nonprofit", "business", "other"]>;
export declare const membershipRoleSchema: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
export declare const ministryRoleSchema: z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>;
export declare const subscriptionStatusSchema: z.ZodEnum<["active", "cancelled", "past_due", "unpaid", "trialing", "paused"]>;
export declare const visibilitySchema: z.ZodEnum<["public", "private", "unlisted"]>;
export declare const culturalContextSchema: z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>;
export declare const attachmentSchema: z.ZodObject<{
    name: z.ZodString;
    url: z.ZodString;
    type: z.ZodString;
    size: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    url: string;
    type: string;
    size: number;
}, {
    name: string;
    url: string;
    type: string;
    size: number;
}>;
export type OrganizationType = z.infer<typeof organizationTypeSchema>;
export type MembershipRole = z.infer<typeof membershipRoleSchema>;
export type MinistryRole = z.infer<typeof ministryRoleSchema>;
export type SubscriptionStatus = z.infer<typeof subscriptionStatusSchema>;
export type Visibility = z.infer<typeof visibilitySchema>;
export type CulturalContext = z.infer<typeof culturalContextSchema>;
export type Attachment = z.infer<typeof attachmentSchema>;
//# sourceMappingURL=common.schema.d.ts.map