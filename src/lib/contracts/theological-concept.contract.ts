import { z } from "zod";

// Shared enums
export const ConceptTypeEnum = z.enum([
  "doctrine",
  "practice",
  "tradition",
  "movement",
  "person",
  "event",
  "text",
]);

// Ingress (Create/Update DTOs)
export const TheologicalConceptCreateSchema = z.object({
  name: z.string(),
  slug: z.string(),
  definition: z.string().optional(),
  conceptType: ConceptTypeEnum,
  theologicalTradition: z.array(z.string()).default([]),
  biblicalReferences: z.array(z.string()).default([]),
  historicalPeriod: z.string().optional(),
  relatedConcepts: z.array(z.string()).default([]),
  synonyms: z.array(z.string()).default([]),
  apestRelevance: z.object({
    apostolic: z.number().min(1).max(10),
    prophetic: z.number().min(1).max(10),
    evangelistic: z.number().min(1).max(10),
    shepherding: z.number().min(1).max(10),
    teaching: z.number().min(1).max(10),
  }).default({
    apostolic: 5,
    prophetic: 5,
    evangelistic: 5,
    shepherding: 5,
    teaching: 5,
  }),
  contentReferences: z.number().int().min(0).default(0),
  searchCount: z.number().int().min(0).default(0),
});

export const TheologicalConceptUpdateSchema = z.object({
  id: z.string().uuid(),
  name: z.string().optional(),
  slug: z.string().optional(),
  definition: z.string().optional(),
  conceptType: ConceptTypeEnum.optional(),
  theologicalTradition: z.array(z.string()).optional(),
  biblicalReferences: z.array(z.string()).optional(),
  historicalPeriod: z.string().optional(),
  relatedConcepts: z.array(z.string()).optional(),
  synonyms: z.array(z.string()).optional(),
  apestRelevance: z.object({
    apostolic: z.number().min(1).max(10),
    prophetic: z.number().min(1).max(10),
    evangelistic: z.number().min(1).max(10),
    shepherding: z.number().min(1).max(10),
    teaching: z.number().min(1).max(10),
  }).optional(),
  contentReferences: z.number().int().min(0).optional(),
  searchCount: z.number().int().min(0).optional(),
});

// Egress (API Response DTO)
export const TheologicalConceptResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  definition: z.string().nullable(),
  conceptType: ConceptTypeEnum,
  theologicalTradition: z.array(z.string()),
  biblicalReferences: z.array(z.string()),
  historicalPeriod: z.string().nullable(),
  relatedConcepts: z.array(z.string()),
  synonyms: z.array(z.string()),
  apestRelevance: z.object({
    apostolic: z.number(),
    prophetic: z.number(),
    evangelistic: z.number(),
    shepherding: z.number(),
    teaching: z.number(),
  }),
  contentReferences: z.number().int(),
  searchCount: z.number().int(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// List envelope (standardized)
export const TheologicalConceptListResponseSchema = z.object({
  data: z.array(TheologicalConceptResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type TheologicalConceptCreate = z.infer<typeof TheologicalConceptCreateSchema>;
export type TheologicalConceptUpdate = z.infer<typeof TheologicalConceptUpdateSchema>;
export type TheologicalConceptResponse = z.infer<typeof TheologicalConceptResponseSchema>;
export type TheologicalConceptListResponse = z.infer<typeof TheologicalConceptListResponseSchema>;

