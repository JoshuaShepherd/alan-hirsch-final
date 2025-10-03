# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = 'Alan Hirsch Platform'
copyright = '2025, Alan Hirsch Platform Team'
author = 'Alan Hirsch Platform Team'

version = '1.0'
release = '1.0'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = [
    'myst_parser',
    'sphinx_design',
    'sphinx_copybutton',
    'sphinx.ext.autodoc',
    'sphinx.ext.viewcode',
    'sphinx.ext.napoleon',
    'sphinx.ext.intersphinx',
    'sphinx.ext.todo',
    'sphinx.ext.coverage',
    'sphinx.ext.mathjax',
    'sphinx.ext.ifconfig',
    'sphinx.ext.githubpages',
]

# MyST parser configuration
myst_enable_extensions = [
    "colon_fence",
    "deflist",
    "html_admonition",
    "html_image",
    "linkify",
    "replacements",
    "smartquotes",
    "substitution",
    "tasklist",
    "fieldlist",
    "dollarmath",
    "amsmath",
]

templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

# MyST configuration
myst_enable_extensions = [
    "colon_fence",
    "deflist",
    "html_admonition",
    "html_image",
    "linkify",
    "replacements",
    "smartquotes",
    "substitution",
    "tasklist",
    "fieldlist",
    "dollarmath",
    "amsmath",
]

# Source file extensions
source_suffix = {
    '.rst': None,
    '.md': 'myst_parser',
}

language = 'en'

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = 'sphinx_book_theme'
html_static_path = ['_static']

# Sphinx Book Theme options
html_theme_options = {
    "repository_url": "https://github.com/alan-hirsch/platform",
    "repository_branch": "main",
    "path_to_docs": "docs",
    "use_repository_button": True,
    "use_issues_button": True,
    "use_edit_page_button": True,
    "home_page_in_toc": True,
    "show_navbar_depth": 2,
    "show_toc_level": 3,
    "navigation_depth": 4,
    "search_bar_text": "Search documentation...",
    "sidebar_secondary": [],
    "sidebar_primary": ["page-toc", "sourcelink"],
    "footer_start": ["copyright", "sphinx-version"],
    "footer_end": ["theme-version"],
}

# -- Options for LaTeX output ------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-latex-output

latex_engine = 'xelatex'
latex_elements = {
    'papersize': 'a4paper',
    'pointsize': '11pt',
    'geometry': '\\usepackage[margin=1in]{geometry}',
    'fontpkg': '''
        \\usepackage{fontspec}
        \\setmainfont{Source Serif Pro}
        \\setsansfont{Source Sans Pro}
        \\setmonofont{Source Code Pro}
    ''',
    'maketitle': '''
        \\maketitle
        \\tableofcontents
        \\newpage
    ''',
    'fncychap': '\\usepackage[Bjornstrup]{fncychap}',
    'fontenc': '\\usepackage[utf8]{inputenc}',
    'extraclassoptions': 'openany,oneside',
}

# -- Options for PDF output --------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-pdf-output

pdf_documents = [
    ('index', 'Alan_Hirsch_Platform_Documentation', 'Alan Hirsch Platform Documentation', 'Alan Hirsch Platform Team'),
]

# -- Extension configuration -------------------------------------------------

# Napoleon settings
napoleon_google_docstring = True
napoleon_numpy_docstring = True
napoleon_include_init_with_doc = False
napoleon_include_private_with_doc = False
napoleon_include_special_with_doc = True
napoleon_use_admonition_for_examples = False
napoleon_use_admonition_for_notes = False
napoleon_use_admonition_for_references = False
napoleon_use_ivar = False
napoleon_use_param = True
napoleon_use_rtype = True
napoleon_preprocess_types = False
napoleon_type_aliases = None
napoleon_attr_annotations = True

# Intersphinx mapping
intersphinx_mapping = {
    'python': ('https://docs.python.org/3/', None),
    'sphinx': ('https://www.sphinx-doc.org/en/master/', None),
}

# Todo extension
todo_include_todos = True

# Numbering
numfig = True
numfig_format = {
    'figure': 'Figure %s',
    'table': 'Table %s',
    'code-block': 'Listing %s',
    'section': 'Section %s',
}
