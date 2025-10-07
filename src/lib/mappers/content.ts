// Content mapper with service-compatible function names
// This file provides the mapper functions expected by the ContentService

// Content Item mappers
export {
  fromCreate as fromCreateContentItemDTO,
  fromUpdate as fromUpdateContentItemDTO,
  toDTO as toContentItemDTO,
} from './contentitems.mapper';

// Generic Content mappers (aliases for ContentItem)
export {
  fromCreateContentItemDTO as fromCreateContentDTO,
  fromUpdateContentItemDTO as fromUpdateContentDTO,
  toContentItemDTO as toContentDTO,
} from './contentitems.mapper';

// Content Series mappers
export {
  fromCreate as fromCreateContentSeriesDTO,
  fromUpdate as fromUpdateContentSeriesDTO,
  toDTO as toContentSeriesDTO,
} from './contentseries.mapper';

// Series Content Item mappers
export {
  fromCreate as fromCreateSeriesContentItemDTO,
  fromUpdate as fromUpdateSeriesContentItemDTO,
  toDTO as toSeriesContentItemDTO,
} from './seriescontentitems.mapper';

// Content Cross Reference mappers
export {
  fromCreate as fromCreateContentCrossReferenceDTO,
  fromUpdate as fromUpdateContentCrossReferenceDTO,
  toDTO as toContentCrossReferenceDTO,
} from './contentcrossreferences.mapper';

// Content Category mappers
export {
  fromCreate as fromCreateContentCategoryDTO,
  fromUpdate as fromUpdateContentCategoryDTO,
  toDTO as toContentCategoryDTO,
} from './contentcategories.mapper';

// Type exports for service compatibility
export type {
  ContentCrossReferenceCreateDTO,
  ContentCrossReferenceResponseDTO,
  ContentCrossReferenceUpdateDTO,
  ContentItemCreateDTO,
  ContentItemResponseDTO,
  ContentItemUpdateDTO,
  ContentSeriesCreateDTO,
  ContentSeriesResponseDTO,
  ContentSeriesUpdateDTO,
  SeriesContentItemCreateDTO,
  SeriesContentItemResponseDTO,
  SeriesContentItemUpdateDTO,
} from '@/lib/contracts';
