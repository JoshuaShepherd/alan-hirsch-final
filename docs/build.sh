#!/bin/bash

# Build script for Alan Hirsch Platform Documentation
# This script builds the Jupyter Book documentation in multiple formats

set -e

echo "🚀 Building Alan Hirsch Platform Documentation..."

# Activate virtual environment
source ../docs-env/bin/activate

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf _build/
rm -rf _site/

# Build HTML version
echo "📚 Building HTML documentation..."
jupyter-book build . --all

# Build PDF version
echo "📄 Building PDF documentation..."
jupyter-book build . --builder pdfhtml

# Build LaTeX version (for high-quality print)
echo "📖 Building LaTeX documentation..."
jupyter-book build . --builder latex

echo "✅ Documentation build complete!"
echo ""
echo "📁 Output files:"
echo "  - HTML: _build/html/index.html"
echo "  - PDF: _build/pdfhtml/index.pdf"
echo "  - LaTeX: _build/latex/"
echo ""
echo "🌐 To view HTML documentation:"
echo "  open _build/html/index.html"
echo ""
echo "🖨️  For high-quality printing:"
echo "  Use the LaTeX files in _build/latex/"
echo "  or the PDF in _build/pdfhtml/"
