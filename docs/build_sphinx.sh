#!/bin/bash

# Build script for Alan Hirsch Platform Documentation using Sphinx
# This script builds the documentation in multiple formats

set -e

echo "🚀 Building Alan Hirsch Platform Documentation with Sphinx..."

# Activate virtual environment
source ../docs-env/bin/activate

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf _build/

# Build HTML version
echo "📚 Building HTML documentation..."
sphinx-build -b html . _build/html

# Build LaTeX version (for high-quality print)
echo "📖 Building LaTeX documentation..."
sphinx-build -b latex . _build/latex

# Build PDF version (if pdflatex is available)
if command -v pdflatex &> /dev/null; then
    echo "📄 Building PDF documentation..."
    cd _build/latex
    pdflatex -interaction=nonstopmode Alan_Hirsch_Platform.tex
    pdflatex -interaction=nonstopmode Alan_Hirsch_Platform.tex
    cd ../..
else
    echo "⚠️  pdflatex not found, skipping PDF generation"
fi

echo "✅ Documentation build complete!"
echo ""
echo "📁 Output files:"
echo "  - HTML: _build/html/index.html"
echo "  - LaTeX: _build/latex/"
if [ -f "_build/latex/Alan_Hirsch_Platform.pdf" ]; then
    echo "  - PDF: _build/latex/Alan_Hirsch_Platform.pdf"
fi
echo ""
echo "🌐 To view HTML documentation:"
echo "  open _build/html/index.html"
echo ""
echo "🖨️  For high-quality printing:"
echo "  Use the LaTeX files in _build/latex/"
echo "  or the PDF if generated"
