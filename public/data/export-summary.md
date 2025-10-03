# Alan Hirsch Database Export Summary

**Export Date:** October 2, 2025  
**Source:** Supabase project `alan-hirsch` (nepvfebkqvuqbxthttao)

## Exported Data

### Books (`books.json`)
- **2 records** exported
- Contains Alan Hirsch's book data including titles, slugs, publication info
- Fields: id, tenant_id, title, slug, author, description, keywords, cover_image_url, publication_year, isbn, total_chapters, status, timestamps

### Posts (`posts.json`)
- **2 records** exported  
- Blog posts/articles content
- Fields: id, tenant_id, author_id, title, slug, excerpt, body, status, published_at, seo, timestamps

### Profiles (`profiles.json`)
- **2 records** exported
- User profile information
- Fields: id, tenant_id, display_name, role, avatar_url, timestamps

### Tenants (`tenants.json`)
- **2 records** exported
- Organization/tenant configuration
- Fields: id, name, slug, brand, billing_provider_account_id, timestamps

## Tables Not Exported

The following tables were found but contained no data (0 rows):
- `chapters` - Book chapters (linked to books)
- `orders` - Purchase orders
- `products` - Products for sale
- `tags` - Content tags
- `assets` - File assets
- `jobs` - Background jobs
- Various analytics and event tables

## Notes

- No `legacy.articles` table was found (as requested to exclude)
- All exported data appears to be test/sample data based on naming patterns
- The database uses a multi-tenant architecture with tenant_id references
- All tables have Row Level Security (RLS) enabled
- Data is in JSON format for easy import/processing

## Next Steps

The exported data is now available in `public/data/` and ready for further processing or migration to the new comprehensive schema.
