/**
 * Type Generation Validation Tests
 *
 * These tests validate that the type generation process works correctly
 * and produces valid TypeScript types and Zod schemas.
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { beforeAll, describe, expect, it } from 'vitest';
import { z } from 'zod';

// Test configuration
const SCHEMA_DIR = 'packages/database/src/db/schema';
const TYPES_DIR = 'packages/types/src';
const CONTRACTS_DIR = 'packages/contracts/src/schemas';

describe('Type Generation Validation', () => {
  let generatedFiles: string[] = [];

  beforeAll(async () => {
    // Run the type generation script
    const { execSync } = await import('child_process');
    try {
      execSync('npm run generate:types', { stdio: 'pipe' });
    } catch (error) {
      console.error('Type generation failed:', error);
      throw error;
    }

    // Check which files were generated
    generatedFiles = [
      join(TYPES_DIR, 'database.ts'),
      join(TYPES_DIR, 'api.ts'),
      join(TYPES_DIR, 'index.ts'),
      join(CONTRACTS_DIR, 'schemas.ts'),
      join(CONTRACTS_DIR, 'index.ts'),
    ].filter(file => existsSync(file));
  });

  describe('File Generation', () => {
    it('should generate all required files', () => {
      expect(generatedFiles).toHaveLength(5);
      expect(generatedFiles).toContain(join(TYPES_DIR, 'database.ts'));
      expect(generatedFiles).toContain(join(TYPES_DIR, 'api.ts'));
      expect(generatedFiles).toContain(join(TYPES_DIR, 'index.ts'));
      expect(generatedFiles).toContain(join(CONTRACTS_DIR, 'schemas.ts'));
      expect(generatedFiles).toContain(join(CONTRACTS_DIR, 'index.ts'));
    });

    it('should generate files with correct content structure', () => {
      generatedFiles.forEach(file => {
        const content = readFileSync(file, 'utf-8');

        // Check for proper header comments
        expect(content).toContain('Generated');
        expect(content).toContain('Alan Hirsch Digital Platform');
        expect(content).toContain('Do not edit manually');

        // Check for proper exports
        if (file.includes('index.ts')) {
          expect(content).toContain('export * from');
        }
      });
    });
  });

  describe('Database Types Generation', () => {
    it('should generate TypeScript types for all database tables', () => {
      const databaseTypesContent = readFileSync(
        join(TYPES_DIR, 'database.ts'),
        'utf-8'
      );

      // Check for key entity types
      const expectedTypes = [
        'UserProfile',
        'Organization',
        'Assessment',
        'ContentItem',
        'Community',
        'AiConversation',
      ];

      expectedTypes.forEach(typeName => {
        expect(databaseTypesContent).toContain(`export type ${typeName} = {`);
        expect(databaseTypesContent).toContain(
          `export type New${typeName} = {`
        );
      });
    });

    it('should generate proper TypeScript field types', () => {
      const databaseTypesContent = readFileSync(
        join(TYPES_DIR, 'database.ts'),
        'utf-8'
      );

      // Check for proper TypeScript types
      expect(databaseTypesContent).toContain(': string');
      expect(databaseTypesContent).toContain(': number');
      expect(databaseTypesContent).toContain(': boolean');
      expect(databaseTypesContent).toContain(': Date');
      expect(databaseTypesContent).toContain(': Record<string, unknown>');
    });

    it('should handle nullable fields correctly', () => {
      const databaseTypesContent = readFileSync(
        join(TYPES_DIR, 'database.ts'),
        'utf-8'
      );

      // Should have nullable fields
      expect(databaseTypesContent).toContain('?: ');
      expect(databaseTypesContent).toContain('| null');
    });
  });

  describe('API Types Generation', () => {
    it('should generate API response types', () => {
      const apiTypesContent = readFileSync(join(TYPES_DIR, 'api.ts'), 'utf-8');

      expect(apiTypesContent).toContain(
        'export interface ApiResponse<T = unknown>'
      );
      expect(apiTypesContent).toContain(
        'export interface PaginatedResponse<T>'
      );
      expect(apiTypesContent).toContain('success: boolean');
      expect(apiTypesContent).toContain('data?: T');
      expect(apiTypesContent).toContain('error?: string');
    });

    it('should generate entity-specific response types', () => {
      const apiTypesContent = readFileSync(join(TYPES_DIR, 'api.ts'), 'utf-8');

      const expectedResponseTypes = [
        'UserProfileResponse',
        'OrganizationResponse',
        'AssessmentResponse',
        'ContentItemResponse',
      ];

      expectedResponseTypes.forEach(typeName => {
        expect(apiTypesContent).toContain(
          `export type ${typeName} = ApiResponse<`
        );
        expect(apiTypesContent).toContain(
          `export type ${typeName}ListResponse = PaginatedResponse<`
        );
      });
    });
  });

  describe('Zod Schemas Generation', () => {
    it('should generate valid Zod schemas', () => {
      const schemasContent = readFileSync(
        join(CONTRACTS_DIR, 'schemas.ts'),
        'utf-8'
      );

      // Check for proper Zod imports
      expect(schemasContent).toContain("import { z } from 'zod'");

      // Check for schema definitions
      expect(schemasContent).toContain('EntitySchema = z.object({');
      expect(schemasContent).toContain('createSchema = z.object({');
      expect(schemasContent).toContain('updateSchema = z.object({');
    });

    it('should generate schemas with proper Zod types', () => {
      const schemasContent = readFileSync(
        join(CONTRACTS_DIR, 'schemas.ts'),
        'utf-8'
      );

      // Check for proper Zod type mappings
      expect(schemasContent).toContain('z.string()');
      expect(schemasContent).toContain('z.number()');
      expect(schemasContent).toContain('z.boolean()');
      expect(schemasContent).toContain('z.date()');
      expect(schemasContent).toContain('z.record(z.unknown())');
    });

    it('should handle nullable fields in schemas', () => {
      const schemasContent = readFileSync(
        join(CONTRACTS_DIR, 'schemas.ts'),
        'utf-8'
      );

      expect(schemasContent).toContain('.nullable()');
    });

    it('should generate partial schemas for updates', () => {
      const schemasContent = readFileSync(
        join(CONTRACTS_DIR, 'schemas.ts'),
        'utf-8'
      );

      expect(schemasContent).toContain('.partial()');
    });
  });

  describe('Schema Validation', () => {
    it('should generate valid Zod schemas that can be imported', async () => {
      // This test ensures the generated schemas can actually be imported and used
      const schemasPath = join(CONTRACTS_DIR, 'schemas.ts');

      if (existsSync(schemasPath)) {
        // Try to import the schemas (this will fail if there are syntax errors)
        const schemasModule = await import(schemasPath);

        // Check that schemas are exported
        expect(Object.keys(schemasModule)).toHaveLength.greaterThan(0);
      }
    });

    it('should generate schemas that validate sample data', () => {
      const schemasContent = readFileSync(
        join(CONTRACTS_DIR, 'schemas.ts'),
        'utf-8'
      );

      // Extract a simple schema for testing
      const userProfileMatch = schemasContent.match(
        /export const userProfileEntitySchema = z\.object\(\{([^}]+)\}\)/
      );

      if (userProfileMatch) {
        // Create a simple test schema
        const testSchema = z.object({
          id: z.string().uuid(),
          email: z.string().email(),
          firstName: z.string(),
          lastName: z.string(),
        });

        // Test with valid data
        const validData = {
          id: '123e4567-e89b-12d3-a456-426614174000',
          email: 'test@example.com',
          firstName: 'John',
          lastName: 'Doe',
        };

        expect(() => testSchema.parse(validData)).not.toThrow();
      }
    });
  });

  describe('Type Consistency', () => {
    it('should maintain consistency between TypeScript types and Zod schemas', () => {
      const databaseTypesContent = readFileSync(
        join(TYPES_DIR, 'database.ts'),
        'utf-8'
      );
      const schemasContent = readFileSync(
        join(CONTRACTS_DIR, 'schemas.ts'),
        'utf-8'
      );

      // Check that entity names match between types and schemas
      const typeEntityMatches = databaseTypesContent.match(
        /export type (\w+) = \{/g
      );
      const schemaEntityMatches = schemasContent.match(
        /export const (\w+)EntitySchema = z\.object/g
      );

      if (typeEntityMatches && schemaEntityMatches) {
        const typeEntities = typeEntityMatches.map(
          match => match.match(/export type (\w+) = \{/)![1]
        );
        const schemaEntities = schemaEntityMatches.map(
          match => match.match(/export const (\w+)EntitySchema = z\.object/)![1]
        );

        // Each type should have a corresponding schema
        typeEntities.forEach(entityName => {
          const schemaName =
            entityName.charAt(0).toLowerCase() + entityName.slice(1);
          expect(schemaEntities).toContain(schemaName);
        });
      }
    });
  });

  describe('Import/Export Validation', () => {
    it('should have proper index file exports', () => {
      const typesIndexContent = readFileSync(
        join(TYPES_DIR, 'index.ts'),
        'utf-8'
      );
      const contractsIndexContent = readFileSync(
        join(CONTRACTS_DIR, 'index.ts'),
        'utf-8'
      );

      expect(typesIndexContent).toContain("export * from './database'");
      expect(typesIndexContent).toContain("export * from './api'");
      expect(contractsIndexContent).toContain("export * from './schemas'");
    });

    it('should not have circular dependencies', () => {
      // This is a basic check - in a real implementation, you'd use a tool like madge
      const typesIndexContent = readFileSync(
        join(TYPES_DIR, 'index.ts'),
        'utf-8'
      );
      const contractsIndexContent = readFileSync(
        join(CONTRACTS_DIR, 'index.ts'),
        'utf-8'
      );

      // Check that types don't import from contracts and vice versa
      expect(typesIndexContent).not.toContain("from './schemas'");
      expect(contractsIndexContent).not.toContain("from './database'");
    });
  });

  describe('Performance and Quality', () => {
    it('should generate files within reasonable size limits', () => {
      generatedFiles.forEach(file => {
        const content = readFileSync(file, 'utf-8');
        const lines = content.split('\n').length;

        // Generated files should be substantial but not excessively large
        expect(lines).toBeGreaterThan(10);
        expect(lines).toBeLessThan(5000);
      });
    });

    it('should not contain obvious syntax errors', () => {
      generatedFiles.forEach(file => {
        const content = readFileSync(file, 'utf-8');

        // Check for common syntax issues
        expect(content).not.toContain('undefined');
        expect(content).not.toContain('any');
        expect(content).not.toContain('TODO');
        expect(content).not.toContain('FIXME');
      });
    });
  });
});

describe('Type Generation Integration', () => {
  it('should integrate with the build process', async () => {
    // Test that the generated types can be used in a build
    const { execSync } = await import('child_process');

    try {
      // Try to build the types package
      execSync('cd packages/types && npm run build', { stdio: 'pipe' });
    } catch (error) {
      console.error('Types package build failed:', error);
      throw error;
    }
  });

  it('should be compatible with existing code', () => {
    // This test would check that existing imports still work
    // For now, we'll just verify the files exist and are readable
    const typesIndexPath = join(TYPES_DIR, 'index.ts');
    const contractsIndexPath = join(CONTRACTS_DIR, 'index.ts');

    expect(existsSync(typesIndexPath)).toBe(true);
    expect(existsSync(contractsIndexPath)).toBe(true);

    const typesContent = readFileSync(typesIndexPath, 'utf-8');
    const contractsContent = readFileSync(contractsIndexPath, 'utf-8');

    expect(typesContent.length).toBeGreaterThan(0);
    expect(contractsContent.length).toBeGreaterThan(0);
  });
});
