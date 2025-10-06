module.exports = {
  // TypeScript and JavaScript files
  '*.{ts,tsx,js,jsx}': [
    'eslint --cache --fix',
    'prettier --write',
    'bash -c "npx tsc --noEmit"',
  ],

  // JSON files
  '*.json': ['prettier --write'],

  // Markdown files
  '*.md': ['prettier --write'],

  // CSS, SCSS, and PostCSS files
  '*.{css,scss,postcss}': ['prettier --write'],

  // HTML files
  '*.html': ['prettier --write'],

  // YAML files
  '*.{yml,yaml}': ['prettier --write'],

  // SQL files
  '*.sql': ['prettier --write'],

  // Configuration files
  '*.{toml,ini,cfg,conf}': ['prettier --write'],

  // Mapper files - run schema validation
  '**/lib/mappers/**/*.ts': [
    'eslint --cache --fix',
    'prettier --write',
    'bash -c "npx tsc --noEmit"',
    'bash -c "npm run validate:schemas"',
  ],
};
