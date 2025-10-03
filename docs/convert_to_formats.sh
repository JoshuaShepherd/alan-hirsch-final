#!/bin/bash

# Convert comprehensive documentation to different formats
# This script provides multiple output formats for the documentation

set -e

echo "🚀 Converting Alan Hirsch Platform Documentation to Multiple Formats..."

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
    -o _output/Alan_Hirsch_Platform_Documentation.html \
    --standalone \
    --css=https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown-light.min.css \
    --metadata title="Alan Hirsch Platform - Database Documentation" \
    --metadata author="Alan Hirsch Platform Team" \
    --metadata date="$(date +'%B %d, %Y')" \
    --toc \
    --toc-depth=3

# Convert to PDF (requires LaTeX)
echo "📖 Converting to PDF..."
if command -v pdflatex &> /dev/null; then
    pandoc docs/COMPREHENSIVE_DOCUMENTATION.md \
        -o _output/Alan_Hirsch_Platform_Documentation.pdf \
        --pdf-engine=pdflatex \
        --standalone \
        --metadata title="Alan Hirsch Platform - Database Documentation" \
        --metadata author="Alan Hirsch Platform Team" \
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
    -o _output/Alan_Hirsch_Platform_Documentation.docx \
    --standalone \
    --metadata title="Alan Hirsch Platform - Database Documentation" \
    --metadata author="Alan Hirsch Platform Team" \
    --metadata date="$(date +'%B %d, %Y')" \
    --toc \
    --toc-depth=3

# Convert to LaTeX (for high-quality print)
echo "📚 Converting to LaTeX..."
pandoc docs/COMPREHENSIVE_DOCUMENTATION.md \
    -o _output/Alan_Hirsch_Platform_Documentation.tex \
    --standalone \
    --metadata title="Alan Hirsch Platform - Database Documentation" \
    --metadata author="Alan Hirsch Platform Team" \
    --metadata date="$(date +'%B %d, %Y')" \
    --toc \
    --toc-depth=3 \
    --variable geometry:margin=1in \
    --variable fontsize=11pt \
    --variable documentclass=article

# Convert to EPUB (for e-readers)
echo "📱 Converting to EPUB..."
pandoc docs/COMPREHENSIVE_DOCUMENTATION.md \
    -o _output/Alan_Hirsch_Platform_Documentation.epub \
    --standalone \
    --metadata title="Alan Hirsch Platform - Database Documentation" \
    --metadata author="Alan Hirsch Platform Team" \
    --metadata date="$(date +'%B %d, %Y')" \
    --toc \
    --toc-depth=3

# Create a print-optimized version
echo "🖨️  Creating print-optimized version..."
pandoc docs/COMPREHENSIVE_DOCUMENTATION.md \
    -o _output/Alan_Hirsch_Platform_Documentation_Print.html \
    --standalone \
    --css=https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown-light.min.css \
    --metadata title="Alan Hirsch Platform - Database Documentation" \
    --metadata author="Alan Hirsch Platform Team" \
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
echo "  open _output/Alan_Hirsch_Platform_Documentation.html"
echo ""
echo "📖 To view PDF (if generated):"
echo "  open _output/Alan_Hirsch_Platform_Documentation.pdf"
echo ""
echo "🖨️  For printing:"
echo "  Use the HTML version with print CSS or the PDF version"
echo ""
echo "📱 For e-readers:"
echo "  Use the EPUB version: _output/Alan_Hirsch_Platform_Documentation.epub"
