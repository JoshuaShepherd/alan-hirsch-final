// Auto-generated API contracts for content
// Generated at: 2025-10-06T20:01:40.349Z

import { z } from 'zod';
import {
  contentSeriesEntitySchema,
  createcontentSeriesSchema,
  updatecontentSeriesSchema,
  contentSeriesQuerySchema,
  contentItemsEntitySchema,
  createcontentItemsSchema,
  updatecontentItemsSchema,
  contentItemsQuerySchema,
  seriesContentItemsEntitySchema,
  createseriesContentItemsSchema,
  updateseriesContentItemsSchema,
  seriesContentItemsQuerySchema,
  contentCrossReferencesEntitySchema,
  createcontentCrossReferencesSchema,
  updatecontentCrossReferencesSchema,
  contentCrossReferencesQuerySchema,
} from '../schemas/content';

// API schemas for content
// API request/response schemas for contentSeries
export const contentSeriesApiRequestSchema = createcontentSeriesSchema;
export const contentSeriesApiResponseSchema = contentSeriesEntitySchema;
export const contentSeriesApiUpdateSchema = updatecontentSeriesSchema;
export const contentSeriesApiQuerySchema = contentSeriesQuerySchema;

// API request/response schemas for contentItems
export const contentItemsApiRequestSchema = createcontentItemsSchema;
export const contentItemsApiResponseSchema = contentItemsEntitySchema;
export const contentItemsApiUpdateSchema = updatecontentItemsSchema;
export const contentItemsApiQuerySchema = contentItemsQuerySchema;

// API request/response schemas for seriesContentItems
export const seriesContentItemsApiRequestSchema = createseriesContentItemsSchema;
export const seriesContentItemsApiResponseSchema = seriesContentItemsEntitySchema;
export const seriesContentItemsApiUpdateSchema = updateseriesContentItemsSchema;
export const seriesContentItemsApiQuerySchema = seriesContentItemsQuerySchema;

// API request/response schemas for contentCrossReferences
export const contentCrossReferencesApiRequestSchema = createcontentCrossReferencesSchema;
export const contentCrossReferencesApiResponseSchema = contentCrossReferencesEntitySchema;
export const contentCrossReferencesApiUpdateSchema = updatecontentCrossReferencesSchema;
export const contentCrossReferencesApiQuerySchema = contentCrossReferencesQuerySchema;

