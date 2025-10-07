import { z } from "zod";

// Shared enums
export const ReportTypeEnum = z.enum([
  "leader_dashboard",
  "content_performance",
  "network_analytics",
  "revenue_summary",
  "engagement_report",
  "assessment_insights",
]);

export const ReportStatusEnum = z.enum([
  "generating",
  "completed",
  "failed",
]);

// Ingress (Create/Update DTOs)
export const PerformanceReportCreateSchema = z.object({
  userId: z.string().uuid().optional(),
  reportType: ReportTypeEnum,
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
  data: z.record(z.unknown()),
  keyMetrics: z.object({
    totalViews: z.number(),
    uniqueUsers: z.number(),
    engagementRate: z.number(),
    revenue: z.number(),
    networkGrowth: z.number(),
  }).optional(),
  insights: z.array(z.string()).default([]),
  recommendations: z.array(z.string()).default([]),
  status: ReportStatusEnum.default("generating"),
});

export const PerformanceReportUpdateSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().optional(),
  reportType: ReportTypeEnum.optional(),
  periodStart: z.string().datetime().optional(),
  periodEnd: z.string().datetime().optional(),
  data: z.record(z.unknown()).optional(),
  keyMetrics: z.object({
    totalViews: z.number(),
    uniqueUsers: z.number(),
    engagementRate: z.number(),
    revenue: z.number(),
    networkGrowth: z.number(),
  }).optional(),
  insights: z.array(z.string()).optional(),
  recommendations: z.array(z.string()).optional(),
  status: ReportStatusEnum.optional(),
});

// Egress (API Response DTO)
export const PerformanceReportResponseSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().nullable(),
  reportType: ReportTypeEnum,
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
  data: z.record(z.unknown()),
  keyMetrics: z.object({
    totalViews: z.number(),
    uniqueUsers: z.number(),
    engagementRate: z.number(),
    revenue: z.number(),
    networkGrowth: z.number(),
  }).nullable(),
  insights: z.array(z.string()),
  recommendations: z.array(z.string()),
  status: ReportStatusEnum,
  generatedAt: z.string().datetime(),
  createdAt: z.string().datetime(),
});

// List envelope (standardized)
export const PerformanceReportListResponseSchema = z.object({
  data: z.array(PerformanceReportResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type PerformanceReportCreate = z.infer<typeof PerformanceReportCreateSchema>;
export type PerformanceReportUpdate = z.infer<typeof PerformanceReportUpdateSchema>;
export type PerformanceReportResponse = z.infer<typeof PerformanceReportResponseSchema>;
export type PerformanceReportListResponse = z.infer<typeof PerformanceReportListResponseSchema>;

