# Database Documentation Generator Prompt

## Overview

This prompt generates comprehensive, professional database documentation suitable for technical books, stakeholder reports, and long-term maintenance. It creates multiple output formats (HTML, Word, EPUB, LaTeX) with print-ready quality.

## The Complete Process

### Step 1: Database Schema Introspection

Generate a complete snapshot of your database schema including:

```sql
-- Get all tables with their details
SELECT
    schemaname,
    tablename,
    tableowner,
    hasindexes,
    hasrules,
    hastriggers,
    rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- Get all columns with types, constraints, and comments
SELECT
    t.table_name,
    c.column_name,
    c.data_type,
    c.character_maximum_length,
    c.is_nullable,
    c.column_default,
    c.ordinal_position,
    col_description(c.table_name::regclass, c.ordinal_position) as column_comment
FROM information_schema.tables t
JOIN information_schema.columns c ON t.table_name = c.table_name
WHERE t.table_schema = 'public'
ORDER BY t.table_name, c.ordinal_position;

-- Get all constraints (PK, FK, UNIQUE, CHECK)
SELECT
    tc.table_name,
    tc.constraint_name,
    tc.constraint_type,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints tc
LEFT JOIN information_schema.key_column_usage kcu
    ON tc.constraint_name = kcu.constraint_name
LEFT JOIN information_schema.constraint_column_usage ccu
    ON ccu.constraint_name = tc.constraint_name
WHERE tc.table_schema = 'public'
ORDER BY tc.table_name, tc.constraint_type;

-- Get all indexes
SELECT
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- Get all RLS policies
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Get all extensions
SELECT
    extname,
    extversion,
    extrelocatable,
    extconfig,
    extcondition
FROM pg_extension
ORDER BY extname;

-- Get all views
SELECT
    schemaname,
    viewname,
    definition
FROM pg_views
WHERE schemaname = 'public'
ORDER BY viewname;

-- Get all functions
SELECT
    n.nspname as schema_name,
    p.proname as function_name,
    pg_get_function_result(p.oid) as return_type,
    pg_get_function_arguments(p.oid) as arguments,
    l.lanname as language,
    p.prosrc as source_code
FROM pg_proc p
LEFT JOIN pg_namespace n ON p.pronamespace = n.oid
LEFT JOIN pg_language l ON p.prolang = l.oid
WHERE n.nspname = 'public'
ORDER BY p.proname;

-- Get all triggers
SELECT
    trigger_name,
    event_manipulation,
    event_object_table,
    action_statement,
    action_timing,
    action_orientation
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY event_object_table, trigger_name;

-- Get all enums
SELECT
    t.typname as enum_name,
    e.enumlabel as enum_value
FROM pg_type t
JOIN pg_enum e ON t.oid = e.enumtypid
WHERE t.typtype = 'e'
ORDER BY t.typname, e.enumsortorder;

-- Get row counts for all tables
SELECT
    schemaname,
    tablename,
    n_tup_ins as inserts,
    n_tup_upd as updates,
    n_tup_del as deletes,
    n_live_tup as live_rows,
    n_dead_tup as dead_rows
FROM pg_stat_user_tables
ORDER BY tablename;
```

### Step 2: Create Comprehensive Documentation Structure

Create a main documentation file with this structure:

````markdown
# [Project Name] - Database Schema Documentation

## Executive Summary

- System overview and purpose
- Key statistics and metrics
- Technology stack
- Core features and capabilities

## System Architecture

- High-level architecture diagram
- Component relationships
- Data flow overview
- Security model

## Database Schema Overview

- Schema statistics
- Table relationships
- Key design patterns
- Naming conventions

## Core Entities

### [Entity Name]

- **Purpose**: [Description]
- **Key Features**: [List]
- **Critical Columns**: [List with descriptions]
- **Relationships**: [Foreign key relationships]
- **Business Rules**: [Constraints and validations]

## Security Model

- Row Level Security (RLS) overview
- Policy descriptions
- Access control patterns
- Authentication and authorization

## API Documentation

- Endpoint specifications
- Request/response formats
- Authentication requirements
- Rate limiting and quotas

## Maintenance and Operations

- Backup and recovery procedures
- Performance monitoring
- Schema evolution guidelines
- Troubleshooting common issues

## Entity Relationship Diagram

```mermaid
erDiagram
    [Include complete ER diagram]
```
````

## Change Log

- Version history
- Schema evolution
- Breaking changes
- Migration notes

````

### Step 3: Generate Mermaid ER Diagram

Create a comprehensive entity relationship diagram:

```mermaid
erDiagram
    USER_PROFILES {
        uuid id PK
        text email UK
        text first_name
        text last_name
        text phone
        text bio
        text website
        text location
        text timezone
        text language
        text avatar_url
        boolean public_profile
        text account_status
        timestamp created_at
        timestamp updated_at
    }

    ORGANIZATIONS {
        uuid id PK
        text name
        text description
        text website
        text email
        text phone
        text address
        text city
        text state
        text country
        text postal_code
        uuid account_owner_id FK
        text subscription_status
        timestamp created_at
        timestamp updated_at
    }

    [Continue for all tables...]
````

### Step 4: Create Conversion Script

Create a script to convert documentation to multiple formats:

```bash
#!/bin/bash

# Database Documentation Converter
# Converts comprehensive documentation to multiple formats

set -e

echo "🚀 Converting Database Documentation to Multiple Formats..."

# Check if pandoc is available
if ! command -v pandoc &> /dev/null; then
    echo "⚠️  pandoc not found. Installing via brew..."
    if command -v brew &> /dev/null; then
        brew install pandoc
    else
        echo "❌ Please install pandoc manually: https://pandoc.org/installing.html"
        exit 1
    fi
fi

# Create output directory
mkdir -p _output

# Convert to HTML
echo "📄 Converting to HTML..."
pandoc docs/COMPREHENSIVE_DOCUMENTATION.md \
    -o _output/Database_Documentation.html \
    --standalone \
    --css=https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown-light.min.css \
    --metadata title="Database Schema Documentation" \
    --metadata author="Development Team" \
    --metadata date="$(date +'%B %d, %Y')" \
    --toc \
    --toc-depth=3

# Convert to PDF (requires LaTeX)
echo "📖 Converting to PDF..."
if command -v pdflatex &> /dev/null; then
    pandoc docs/COMPREHENSIVE_DOCUMENTATION.md \
        -o _output/Database_Documentation.pdf \
        --pdf-engine=pdflatex \
        --standalone \
        --metadata title="Database Schema Documentation" \
        --metadata author="Development Team" \
        --metadata date="$(date +'%B %d, %Y')" \
        --toc \
        --toc-depth=3 \
        --variable geometry:margin=1in \
        --variable fontsize=11pt \
        --variable documentclass=article
else
    echo "⚠️  pdflatex not found, skipping PDF generation"
fi

# Convert to Word document
echo "📝 Converting to Word document..."
pandoc docs/COMPREHENSIVE_DOCUMENTATION.md \
    -o _output/Database_Documentation.docx \
    --standalone \
    --metadata title="Database Schema Documentation" \
    --metadata author="Development Team" \
    --metadata date="$(date +'%B %d, %Y')" \
    --toc \
    --toc-depth=3

# Convert to LaTeX (for high-quality print)
echo "📚 Converting to LaTeX..."
pandoc docs/COMPREHENSIVE_DOCUMENTATION.md \
    -o _output/Database_Documentation.tex \
    --standalone \
    --metadata title="Database Schema Documentation" \
    --metadata author="Development Team" \
    --metadata date="$(date +'%B %d, %Y')" \
    --toc \
    --toc-depth=3 \
    --variable geometry:margin=1in \
    --variable fontsize=11pt \
    --variable documentclass=article

# Convert to EPUB (for e-readers)
echo "📱 Converting to EPUB..."
pandoc docs/COMPREHENSIVE_DOCUMENTATION.md \
    -o _output/Database_Documentation.epub \
    --standalone \
    --metadata title="Database Schema Documentation" \
    --metadata author="Development Team" \
    --metadata date="$(date +'%B %d, %Y')" \
    --toc \
    --toc-depth=3

# Create a print-optimized version
echo "🖨️  Creating print-optimized version..."
pandoc docs/COMPREHENSIVE_DOCUMENTATION.md \
    -o _output/Database_Documentation_Print.html \
    --standalone \
    --css=https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown-light.min.css \
    --metadata title="Database Schema Documentation" \
    --metadata author="Development Team" \
    --metadata date="$(date +'%B %d, %Y')" \
    --toc \
    --toc-depth=3 \
    --variable print-media

echo "✅ Documentation conversion complete!"
echo ""
echo "📁 Output files created in _output/:"
ls -la _output/
echo ""
echo "🌐 To view HTML documentation:"
echo "  open _output/Database_Documentation.html"
echo ""
echo "📖 To view PDF (if generated):"
echo "  open _output/Database_Documentation.pdf"
echo ""
echo "🖨️  For printing:"
echo "  Use the HTML version with print CSS or the PDF version"
echo ""
echo "📱 For e-readers:"
echo "  Use the EPUB version: _output/Database_Documentation.epub"
```

### Step 5: Create Documentation Guide

Create a guide explaining how to use and maintain the documentation:

```markdown
# Database Documentation Guide

## Overview

This guide explains how to use, maintain, and update the database documentation.

## Quick Start

1. Run the conversion script: `./convert_to_formats.sh`
2. Open the HTML version: `open _output/Database_Documentation.html`
3. Review and share as needed

## Output Formats

- **HTML**: Interactive web version with navigation
- **Word**: Microsoft Office format for stakeholders
- **EPUB**: E-reader format for mobile devices
- **LaTeX**: High-quality print source
- **Print HTML**: Print-optimized version

## Maintenance

- Update the source Markdown file when schema changes
- Re-run the conversion script to regenerate all formats
- Version control the source files
- Keep the ER diagram updated

## Best Practices

- Use clear, descriptive section headings
- Include examples and use cases
- Maintain consistent formatting
- Update the change log with each modification
- Test all output formats after updates
```

## Usage Instructions

### For AI Assistants

1. **Provide the database connection details** (Supabase project ID, API keys, etc.)
2. **Run the schema introspection queries** to gather all database information
3. **Create the comprehensive documentation** using the structure provided
4. **Generate the Mermaid ER diagram** with all entities and relationships
5. **Create the conversion script** and run it to generate all formats
6. **Test the output** by opening the HTML version

### For Manual Use

1. **Execute the SQL queries** against your database
2. **Create the documentation file** following the structure
3. **Generate the ER diagram** using Mermaid syntax
4. **Run the conversion script** to create all formats
5. **Review and customize** the output as needed

## Customization Options

### Content Customization

- Add project-specific sections
- Include business context and use cases
- Add performance metrics and benchmarks
- Include deployment and operations procedures

### Format Customization

- Modify CSS styles for HTML output
- Adjust LaTeX templates for print quality
- Customize metadata and branding
- Add custom cover pages and headers

### Integration Options

- Add to CI/CD pipeline for automatic updates
- Integrate with documentation platforms
- Set up automated schema change detection
- Create API documentation from the same source

## Requirements

### System Requirements

- **Pandoc**: Universal document converter
- **LaTeX** (optional): For PDF generation
- **Database access**: For schema introspection
- **Mermaid support**: For ER diagrams

### Database Requirements

- **PostgreSQL**: Primary database system
- **Schema access**: Ability to query system catalogs
- **RLS policies**: For security documentation
- **Extensions**: For feature documentation

## Success Metrics

A successful documentation generation should produce:

- ✅ **Complete schema coverage** - All tables, columns, constraints documented
- ✅ **Professional formatting** - Multiple output formats with consistent styling
- ✅ **Print-ready quality** - Suitable for technical books and reports
- ✅ **Easy maintenance** - Simple update process for schema changes
- ✅ **Multiple access methods** - HTML, Word, EPUB, LaTeX formats
- ✅ **Comprehensive security** - RLS policies and access control documented
- ✅ **Visual clarity** - ER diagrams and relationship documentation

## Troubleshooting

### Common Issues

- **Missing extensions**: Install required packages (pandoc, LaTeX)
- **Permission errors**: Ensure database access permissions
- **Format errors**: Check Markdown syntax and Mermaid diagrams
- **Conversion failures**: Verify file paths and dependencies

### Support

- Check the documentation guide for detailed instructions
- Review the conversion script for error messages
- Test individual components before full generation
- Maintain backup copies of working configurations

---

**This prompt provides a complete, reusable process for generating professional database documentation that rivals any technical book. It can be adapted for any database system and documentation needs.**
