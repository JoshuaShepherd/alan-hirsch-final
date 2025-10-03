# Alan Hirsch Platform Documentation

This directory contains comprehensive documentation for the Alan Hirsch Platform database schema and system architecture, built with **Jupyter Book** for professional, print-ready output.

## 🎯 Overview

This documentation system provides:

- **Professional Layout** - Clean, academic-style documentation
- **Print-Ready Output** - High-quality PDF and LaTeX generation
- **Interactive Features** - Search, navigation, and cross-references
- **Multiple Formats** - HTML, PDF, and LaTeX output
- **Version Control** - Git-based documentation management

## 📚 Documentation Structure

```
docs/
├── _config.yml          # Jupyter Book configuration
├── _toc.yml            # Table of contents structure
├── index.md            # Main documentation page
├── schema/             # Database schema documentation
│   ├── DB_SCHEMA.md    # Schema overview
│   ├── SNAPSHOT_*.md   # Schema snapshots
│   ├── tables/         # Individual table documentation
│   └── security/       # Security and RLS policies
├── api/                # API documentation
├── development/        # Development guides
├── deployment/         # Deployment guides
└── build.sh           # Build script
```

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Virtual environment (already set up in `docs-env/`)

### Building Documentation

1. **Activate the virtual environment:**

   ```bash
   source docs-env/bin/activate
   ```

2. **Build all formats:**

   ```bash
   cd docs
   ./build.sh
   ```

3. **View the documentation:**

   ```bash
   # HTML version (interactive)
   open _build/html/index.html

   # PDF version (print-ready)
   open _build/pdfhtml/index.pdf
   ```

### Individual Build Commands

```bash
# HTML only
jupyter-book build . --all

# PDF only
jupyter-book build . --builder pdfhtml

# LaTeX only (highest quality for print)
jupyter-book build . --builder latex
```

## 📖 Output Formats

### 1. HTML Documentation

- **Interactive** - Search, navigation, cross-references
- **Responsive** - Works on desktop and mobile
- **Modern** - Clean, professional design
- **Location**: `_build/html/`

### 2. PDF Documentation

- **Print-Ready** - Optimized for printing
- **Portable** - Single file distribution
- **Professional** - Academic-style layout
- **Location**: `_build/pdfhtml/`

### 3. LaTeX Documentation

- **Highest Quality** - Professional typesetting
- **Customizable** - Full LaTeX control
- **Print-Optimized** - Perfect for physical books
- **Location**: `_build/latex/`

## 🎨 Customization

### Theme and Styling

The documentation uses the **Sphinx Book Theme** with customizations in `_config.yml`:

- **Navigation**: Multi-level table of contents
- **Branding**: Custom logo and colors
- **Typography**: Professional fonts
- **Layout**: Clean, academic style

### Adding Content

1. **New Pages**: Add `.md` files to appropriate directories
2. **Table of Contents**: Update `_toc.yml`
3. **Cross-References**: Use Jupyter Book syntax
4. **Images**: Place in `_static/` directory

### LaTeX Customization

For print optimization, customize LaTeX settings in `_config.yml`:

```yaml
latex_elements:
  papersize: 'a4paper'
  fontpkg: |
    \usepackage{fontspec}
    \setmainfont{Source Serif Pro}
  geometry: |
    \usepackage[margin=1in]{geometry}
```

## 🔧 Advanced Features

### Interactive Elements

- **Search**: Full-text search across all content
- **Navigation**: Multi-level table of contents
- **Cross-References**: Automatic linking between sections
- **Code Blocks**: Syntax highlighting and copy buttons
- **Admonitions**: Callout boxes for tips, warnings, etc.

### Print Optimization

- **Page Breaks**: Automatic section breaks
- **Margins**: Professional 1-inch margins
- **Fonts**: High-quality serif fonts for readability
- **Tables**: Optimized table layouts
- **Diagrams**: Vector-based Mermaid diagrams

### Version Control

- **Git Integration**: Full version control support
- **Change Tracking**: Track documentation changes
- **Collaboration**: Multiple author support
- **History**: Complete change history

## 📊 Content Guidelines

### Writing Style

- **Professional**: Academic, technical writing style
- **Clear**: Concise, well-structured content
- **Comprehensive**: Complete coverage of topics
- **Consistent**: Uniform formatting and terminology

### Markdown Features

````markdown
# Headers

## Subheaders

### Sub-subheaders

**Bold text**
_Italic text_
`Code snippets`

- Bullet points
- Nested items

1. Numbered lists
2. Sequential items

> Blockquotes for important information

`code blocks with syntax highlighting`

[Links to other pages](path/to/page.md)
````

### Special Elements

````markdown
```{admonition} Important
:class: warning
This is an important warning box.
```
````

```{list-table} Table Title
:header-rows: 1
:name: table-id

* - Column 1
  - Column 2
* - Row 1, Col 1
  - Row 1, Col 2
```

````

## 🚀 Deployment

### Local Development

1. Make changes to `.md` files
2. Run `./build.sh` to rebuild
3. View changes in `_build/html/`

### Production Deployment

1. **GitHub Pages**: Automatic deployment from main branch
2. **Netlify**: Continuous deployment with previews
3. **Custom Server**: Upload `_build/html/` contents

### CI/CD Integration

```yaml
# Example GitHub Actions workflow
name: Build Documentation
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: 3.8
      - name: Install dependencies
        run: |
          pip install jupyter-book sphinx-book-theme
      - name: Build documentation
        run: |
          cd docs
          jupyter-book build . --all
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs/_build/html
````

## 🔍 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Python version (3.8+ required)
   - Verify virtual environment activation
   - Check for syntax errors in `.md` files

2. **Missing Content**
   - Verify `_toc.yml` includes all files
   - Check file paths and extensions
   - Ensure proper Markdown syntax

3. **LaTeX Errors**
   - Install required LaTeX packages
   - Check for special characters in content
   - Verify font availability

### Getting Help

- **Documentation**: [Jupyter Book Documentation](https://jupyterbook.org/)
- **Issues**: Create GitHub issues for bugs
- **Community**: Jupyter Book community forums

## 📈 Best Practices

### Content Organization

- **Logical Structure**: Group related content together
- **Clear Navigation**: Use descriptive titles and headers
- **Cross-References**: Link related sections
- **Examples**: Include practical examples and code

### Maintenance

- **Regular Updates**: Keep content current with code changes
- **Version Control**: Commit changes frequently
- **Testing**: Test builds before deployment
- **Review**: Regular content reviews and updates

### Performance

- **Optimize Images**: Use appropriate image sizes
- **Minimize Dependencies**: Keep build requirements minimal
- **Cache Results**: Use build caching when possible
- **Monitor Size**: Keep documentation size reasonable

---

```{admonition} Contributing
:class: tip
To contribute to this documentation:
1. Make changes to the relevant `.md` files
2. Test the build with `./build.sh`
3. Submit a pull request with your changes
4. Ensure all content follows the established style guide
```
