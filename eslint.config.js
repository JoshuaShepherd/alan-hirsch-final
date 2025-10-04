const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  ...compat.extends('next/core-web-vitals', {
    settings: {
      next: {
        rootDir: __dirname,
      },
    },
  }),
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'dist/**',
      'build/**',
      'coverage/**',
      'docs-env/**',
      'docs/_build/**',
      'docs/_static/**',
      'docs/_templates/**',
      '**/*.d.ts',
      '*.config.js',
      '*.config.mjs',
      '*.config.ts',
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: [
      '**/*.test.ts',
      '**/*.test.tsx',
      '**/*.spec.ts',
      '**/*.spec.tsx',
      '__tests__/**/*',
    ],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/prefer-optional-chain': 'warn',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/await-thenable': 'warn',
      '@typescript-eslint/no-misused-promises': 'warn',
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/return-await': 'warn',
      'no-console': 'warn',
      'prefer-const': 'warn',
      'no-var': 'warn',
      'no-debugger': 'warn',
      'no-alert': 'warn',
      'no-duplicate-imports': 'warn',
      'no-unused-expressions': 'warn',
      'prefer-template': 'warn',
      'object-shorthand': 'warn',
      'prefer-destructuring': ['warn', { object: true, array: false }],
    },
  },
  {
    files: ['app/api/**/*.ts'],
    rules: {
      'no-console': 'warn',
    },
  },
  {
    files: [
      '**/*.test.ts',
      '**/*.test.tsx',
      '**/*.spec.ts',
      '**/*.spec.tsx',
      '__tests__/**/*',
    ],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        project: './tsconfig.test.json',
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/prefer-optional-chain': 'warn',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/await-thenable': 'warn',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/return-await': 'warn',
      'prefer-const': 'warn',
      'no-var': 'warn',
      'no-debugger': 'warn',
      'no-alert': 'warn',
      'no-duplicate-imports': 'warn',
      'no-unused-expressions': 'warn',
      'prefer-template': 'warn',
      'object-shorthand': 'warn',
      'prefer-destructuring': ['warn', { object: true, array: false }],
    },
  },
];
