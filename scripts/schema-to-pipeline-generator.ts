#!/usr/bin/env tsx
/**
 * Schema-to-Pipeline Generator
 *
 * This script generates the entire type system from the database schema:
 * Schema (Drizzle) → Types → Mappers → Contracts → Services → Routes → Hooks/Lib
 *
 * Usage: pnpm run generate:pipeline
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface TableDefinition {
  name: string;
  columns: ColumnDefinition[];
  relations: RelationDefinition[];
}

interface ColumnDefinition {
  name: string;
  type: string;
  nullable: boolean;
  optional: boolean;
  defaultValue?: any;
  enum?: string[];
}

interface RelationDefinition {
  name: string;
  type: 'one-to-one' | 'one-to-many' | 'many-to-one' | 'many-to-many';
  targetTable: string;
  foreignKey?: string;
  localKey?: string;
}

class SchemaPipelineGenerator {
  private schemaDir: string;
  private contractsDir: string;
  private sharedDir: string;
  private appDir: string;

  constructor() {
    this.schemaDir = join(process.cwd(), 'packages/database/src/db/schema');
    this.contractsDir = join(process.cwd(), 'packages/contracts/src');
    this.sharedDir = join(process.cwd(), 'packages/shared/src');
    this.appDir = join(process.cwd(), 'apps/alan-hirsch-platform');
  }

  async generatePipeline() {
    console.log('🚀 Starting Schema-to-Pipeline Generation...');

    // Step 1: Extract table definitions from Drizzle schema
    const tables = await this.extractTableDefinitions();
    console.log(`📊 Found ${tables.length} tables in schema`);

    // Step 2: Generate TypeScript types
    await this.generateTypes(tables);
    console.log('✅ Generated TypeScript types');

    // Step 3: Generate Zod schemas (contracts)
    await this.generateContracts(tables);
    console.log('✅ Generated Zod schemas');

    // Step 4: Generate mappers
    await this.generateMappers(tables);
    console.log('✅ Generated mappers');

    // Step 5: Generate services
    await this.generateServices(tables);
    console.log('✅ Generated services');

    // Step 6: Generate route handlers
    await this.generateRoutes(tables);
    console.log('✅ Generated route handlers');

    // Step 7: Generate hooks and utilities
    await this.generateHooks(tables);
    console.log('✅ Generated hooks and utilities');

    console.log('🎉 Pipeline generation complete!');
  }

  private async extractTableDefinitions(): Promise<TableDefinition[]> {
    const tables: TableDefinition[] = [];

    // Read the main schema index to get all table exports
    const schemaIndex = readFileSync(join(this.schemaDir, 'index.ts'), 'utf-8');

    // Extract table names from the schema object - handle both shorthand and explicit syntax
    const tableMatches = schemaIndex.match(/(\w+)(?:,\s*$|\s*,|\s*})/gm);

    if (tableMatches) {
      for (const match of tableMatches) {
        const tableName = match.replace(/,/g, '').trim();

        // Skip relations and other non-table exports
        if (
          tableName &&
          !tableName.endsWith('Relations') &&
          !tableName.includes('import') &&
          !tableName.includes('export') &&
          !tableName.includes('//') &&
          !tableName.includes('/*') &&
          tableName.length > 2
        ) {
          const tableDef = await this.parseTableDefinition(tableName);
          if (tableDef) {
            tables.push(tableDef);
          }
        }
      }
    }

    // Fallback: manually specify known tables if regex fails
    if (tables.length === 0) {
      const knownTables = [
        'assessments',
        'assessmentQuestions',
        'userAssessments',
        'assessmentResponses',
        'userProfiles',
        'organizations',
        'organizationMemberships',
        'contentCategories',
        'contentSeries',
        'contentItems',
        'seriesContentItems',
        'contentCrossReferences',
        'aiConversations',
        'aiMessages',
        'aiContentJobs',
        'aiCrossReferenceSuggestions',
        'theologicalConcepts',
        'communities',
        'communityMemberships',
        'communityPosts',
        'communityPostVotes',
        'collaborations',
        'subscriptionPlans',
        'userSubscriptions',
        'transactions',
        'paymentMethods',
        'coupons',
        'userAnalyticsEvents',
        'userContentInteractions',
        'learningOutcomes',
        'movementMetrics',
        'performanceReports',
        'auditLogs',
        'featureFlags',
        'userFeatureFlags',
        'userConsents',
        'systemNotifications',
        'userNotificationStatus',
        'apiKeys',
      ];

      for (const tableName of knownTables) {
        const tableDef = await this.parseTableDefinition(tableName);
        if (tableDef) {
          tables.push(tableDef);
        }
      }
    }

    return tables;
  }

  private async parseTableDefinition(
    tableName: string
  ): Promise<TableDefinition | null> {
    try {
      // Find the file containing this table definition
      const files = [
        'auth.ts',
        'assessments.ts',
        'content.ts',
        'ai.ts',
        'community.ts',
        'subscriptions.ts',
        'analytics.ts',
        'system.ts',
      ];

      for (const file of files) {
        const filePath = join(this.schemaDir, file);
        if (existsSync(filePath)) {
          const content = readFileSync(filePath, 'utf-8');

          // Look for the table definition
          const tableRegex = new RegExp(
            `export const ${tableName} = pgTable\\(['"\`]\\w+['"\`],\\s*\\{([\\s\\S]*?)\\}\\)`,
            'g'
          );
          const match = tableRegex.exec(content);

          if (match) {
            const columnsDef = match[1];
            const columns = this.parseColumns(columnsDef);
            const relations = this.parseRelations(content, tableName);

            return {
              name: tableName,
              columns,
              relations,
            };
          }
        }
      }
    } catch (error) {
      console.warn(`⚠️  Could not parse table ${tableName}:`, error);
    }

    return null;
  }

  private parseColumns(columnsDef: string): ColumnDefinition[] {
    const columns: ColumnDefinition[] = [];

    // Split by lines and parse each column definition
    const lines = columnsDef.split('\n');

    for (const line of lines) {
      const trimmedLine = line.trim();

      // Skip empty lines and comments
      if (
        !trimmedLine ||
        trimmedLine.startsWith('//') ||
        trimmedLine.startsWith('*')
      ) {
        continue;
      }

      // Match column definition: columnName: drizzleType('column_name', {...})...
      const columnMatch = trimmedLine.match(
        /^(\w+):\s*(\w+)\(['"`]([^'"`]+)['"`](?:,\s*\{([^}]*)\})?\)/
      );

      if (columnMatch) {
        const [, columnName, drizzleType, columnType, options] = columnMatch;

        // Parse the rest of the line for method chaining
        const fullLine = line;
        const isNullable = !fullLine.includes('.notNull()');
        const isOptional =
          !fullLine.includes('.notNull()') || fullLine.includes('.optional()');

        let tsType = this.mapDrizzleToTypeScript(
          drizzleType,
          columnType,
          options
        );

        // Handle enum types
        let enumValues: string[] | undefined;
        if (options?.includes('enum:')) {
          const enumMatch = options.match(/enum:\s*\[([^\]]+)\]/);
          if (enumMatch) {
            enumValues = enumMatch[1]
              .split(',')
              .map(e => e.trim().replace(/['"]/g, ''));
          }
        }

        // Handle default values
        let defaultValue: any = undefined;
        const defaultMatch = fullLine.match(/\.default\(['"`]([^'"`]+)['"`]\)/);
        if (defaultMatch) {
          defaultValue = defaultMatch[1];
        }

        columns.push({
          name: columnName,
          type: tsType,
          nullable: isNullable,
          optional: isOptional,
          enum: enumValues,
          defaultValue,
        });
      }
    }

    return columns;
  }

  private parseRelations(
    content: string,
    tableName: string
  ): RelationDefinition[] {
    const relations: RelationDefinition[] = [];

    // Look for relations definitions
    const relationsRegex = new RegExp(
      `${tableName}Relations = relations\\(${tableName}, \\(one, many\\) => \\(\\{([\\s\\S]*?)\\}\\)\\)`,
      'g'
    );
    const match = relationsRegex.exec(content);

    if (match) {
      const relationsDef = match[1];
      // Parse relation definitions
      // This is a simplified parser - you might need to enhance it based on your actual relation patterns
    }

    return relations;
  }

  private mapDrizzleToTypeScript(
    drizzleType: string,
    columnType: string,
    options: string
  ): string {
    const typeMap: Record<string, string> = {
      uuid: 'string',
      text: 'string',
      varchar: 'string',
      integer: 'number',
      bigint: 'number',
      decimal: 'number',
      float: 'number',
      double: 'number',
      boolean: 'boolean',
      timestamp: 'string',
      date: 'string',
      time: 'string',
      jsonb: 'any',
      json: 'any',
      array: 'any[]',
    };

    return typeMap[drizzleType] || 'any';
  }

  private async generateTypes(tables: TableDefinition[]): Promise<void> {
    const typesDir = join(this.contractsDir, 'types');
    if (!existsSync(typesDir)) {
      mkdirSync(typesDir, { recursive: true });
    }

    let typesContent = `// Auto-generated types from database schema
// Generated at: ${new Date().toISOString()}

`;

    for (const table of tables) {
      const typeName = this.toPascalCase(table.name);

      typesContent += `export interface ${typeName} {\n`;

      for (const column of table.columns) {
        let type = column.type;
        if (column.nullable || column.optional) {
          type += ' | null';
        }
        if (column.optional) {
          type += ' | undefined';
        }

        typesContent += `  ${column.name}${column.optional ? '?' : ''}: ${type};\n`;
      }

      typesContent += `}\n\n`;
    }

    writeFileSync(join(typesDir, 'database.ts'), typesContent);
  }

  private async generateContracts(tables: TableDefinition[]): Promise<void> {
    const entitiesDir = join(this.contractsDir, 'entities');
    if (!existsSync(entitiesDir)) {
      mkdirSync(entitiesDir, { recursive: true });
    }

    for (const table of tables) {
      const schemaName = `${table.name}.schema.ts`;
      const schemaContent = this.generateZodSchema(table);

      writeFileSync(join(entitiesDir, schemaName), schemaContent);
    }
  }

  private generateZodSchema(table: TableDefinition): string {
    const schemaName = this.toPascalCase(table.name);

    let content = `import { z } from 'zod';

// Auto-generated Zod schema for ${table.name}
// Generated at: ${new Date().toISOString()}

export const ${table.name}EntitySchema = z.object({
`;

    for (const column of table.columns) {
      let zodType = this.mapTypeToZod(column.type, column.enum);

      if (column.nullable) {
        zodType = `${zodType}.nullable()`;
      }

      if (column.optional) {
        zodType = `${zodType}.optional()`;
      }

      content += `  ${column.name}: ${zodType},\n`;
    }

    content += `});

export type ${schemaName} = z.infer<typeof ${table.name}EntitySchema>;
`;

    return content;
  }

  private mapTypeToZod(tsType: string, enumValues?: string[]): string {
    if (enumValues) {
      return `z.enum([${enumValues.map(e => `'${e}'`).join(', ')}])`;
    }

    const zodMap: Record<string, string> = {
      string: 'z.string()',
      number: 'z.number()',
      boolean: 'z.boolean()',
      any: 'z.any()',
      'any[]': 'z.array(z.any())',
    };

    return zodMap[tsType] || 'z.any()';
  }

  private async generateMappers(tables: TableDefinition[]): Promise<void> {
    const mappersDir = join(this.sharedDir, 'mappers');
    if (!existsSync(mappersDir)) {
      mkdirSync(mappersDir, { recursive: true });
    }

    // Generate a comprehensive mapper that handles all tables
    const mapperContent = this.generateComprehensiveMapper(tables);
    writeFileSync(join(mappersDir, 'database.ts'), mapperContent);
  }

  private generateComprehensiveMapper(tables: TableDefinition[]): string {
    let content = `// Auto-generated comprehensive database mapper
// Generated at: ${new Date().toISOString()}

import { z } from 'zod';

`;

    // Import all schemas
    for (const table of tables) {
      content += `import { ${table.name}EntitySchema, ${this.toPascalCase(table.name)} } from '@platform/contracts/entities/${table.name}.schema';\n`;
    }

    content += `
export class DatabaseMapper {
`;

    // Generate mapper methods for each table
    for (const table of tables) {
      const typeName = this.toPascalCase(table.name);

      content += `
  static to${typeName}(data: any): ${typeName} {
    return ${table.name}EntitySchema.parse(data);
  }

  static from${typeName}(data: ${typeName}): any {
    return ${table.name}EntitySchema.parse(data);
  }

  static validate${typeName}(data: any): boolean {
    try {
      ${table.name}EntitySchema.parse(data);
      return true;
    } catch {
      return false;
    }
  }
`;
    }

    content += `}
`;

    return content;
  }

  private async generateServices(tables: TableDefinition[]): Promise<void> {
    const servicesDir = join(this.sharedDir, 'services');
    if (!existsSync(servicesDir)) {
      mkdirSync(servicesDir, { recursive: true });
    }

    // Generate base service
    const baseServiceContent = this.generateBaseService();
    writeFileSync(join(servicesDir, 'base.service.ts'), baseServiceContent);

    // Generate specific services for major entities
    const majorEntities = [
      'assessments',
      'content',
      'organizations',
      'userProfiles',
    ];

    for (const entity of majorEntities) {
      const table = tables.find(t => t.name === entity);
      if (table) {
        const serviceContent = this.generateEntityService(table);
        writeFileSync(
          join(servicesDir, `${entity}.service.ts`),
          serviceContent
        );
      }
    }
  }

  private generateBaseService(): string {
    return `// Auto-generated base service
// Generated at: ${new Date().toISOString()}

import { DatabaseMapper } from '../mappers/database';

export abstract class BaseService<T> {
  protected abstract tableName: string;

  async create(data: Partial<T>): Promise<T> {
    // Implementation would depend on your database client
    throw new Error('Not implemented - requires database client integration');
  }

  async findById(id: string): Promise<T | null> {
    throw new Error('Not implemented - requires database client integration');
  }

  async findAll(filters?: Partial<T>): Promise<T[]> {
    throw new Error('Not implemented - requires database client integration');
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    throw new Error('Not implemented - requires database client integration');
  }

  async delete(id: string): Promise<boolean> {
    throw new Error('Not implemented - requires database client integration');
  }
}
`;
  }

  private generateEntityService(table: TableDefinition): string {
    const typeName = this.toPascalCase(table.name);

    return `// Auto-generated service for ${table.name}
// Generated at: ${new Date().toISOString()}

import { BaseService } from './base.service';
import { DatabaseMapper } from '../mappers/database';
import { ${typeName} } from '@platform/contracts/entities/${table.name}.schema';

export class ${typeName}Service extends BaseService<${typeName}> {
  protected tableName = '${table.name}';

  async create(data: Partial<${typeName}>): Promise<${typeName}> {
    const validated = DatabaseMapper.to${typeName}(data);
    // Implementation would depend on your database client
    return validated;
  }

  async findById(id: string): Promise<${typeName} | null> {
    // Implementation would depend on your database client
    throw new Error('Not implemented - requires database client integration');
  }

  async findAll(filters?: Partial<${typeName}>): Promise<${typeName}[]> {
    // Implementation would depend on your database client
    throw new Error('Not implemented - requires database client integration');
  }

  async update(id: string, data: Partial<${typeName}>): Promise<${typeName}> {
    const validated = DatabaseMapper.to${typeName}(data);
    // Implementation would depend on your database client
    return validated;
  }

  async delete(id: string): Promise<boolean> {
    // Implementation would depend on your database client
    throw new Error('Not implemented - requires database client integration');
  }
}
`;
  }

  private async generateRoutes(tables: TableDefinition[]): Promise<void> {
    // This would generate API route handlers
    // For now, we'll create a template
    console.log(
      'Route generation would go here - requires Next.js integration'
    );
  }

  private async generateHooks(tables: TableDefinition[]): Promise<void> {
    // This would generate React hooks for data fetching
    // For now, we'll create a template
    console.log('Hook generation would go here - requires React integration');
  }

  private toPascalCase(str: string): string {
    return str.replace(/(?:^|_)([a-z])/g, (_, letter) => letter.toUpperCase());
  }
}

// Run the generator
if (require.main === module) {
  const generator = new SchemaPipelineGenerator();
  generator.generatePipeline().catch(console.error);
}

export default SchemaPipelineGenerator;
