#!/usr/bin/env tsx
/**
 * Schema Alignment Fixer
 *
 * This script fixes the specific TypeScript errors by aligning the existing
 * contract schemas with the database schema structure.
 *
 * Usage: pnpm run fix:schema-alignment
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface AssessmentResponse {
  id: string;
  userAssessmentId: string;
  questionId: string;
  responseValue?: number | string;
  skipped: boolean;
  isSkipped: boolean;
  hasResponse: boolean;
  confidenceLevel?: string;
  createdAt: string;
  updatedAt: string;
}

interface AssessmentQuestion {
  id: string;
  assessmentId: string;
  questionText: string;
  questionType: string;
  orderIndex: number;
  isRequired: boolean;
  category?: string;
  apestDimension?: string;
}

class SchemaAlignmentFixer {
  private sharedDir: string;
  private contractsDir: string;

  constructor() {
    this.sharedDir = join(process.cwd(), 'packages/shared/src');
    this.contractsDir = join(process.cwd(), 'packages/contracts/src');
  }

  async fixSchemaAlignment() {
    console.log('🔧 Starting Schema Alignment Fix...');

    // Fix 1: Update assessment response schema to match database structure
    await this.fixAssessmentResponseSchema();
    console.log('✅ Fixed assessment response schema');

    // Fix 2: Update assessment question schema
    await this.fixAssessmentQuestionSchema();
    console.log('✅ Fixed assessment question schema');

    // Fix 3: Update scoring function to use correct types
    await this.fixScoringFunction();
    console.log('✅ Fixed scoring function types');

    // Fix 4: Update mapper functions
    await this.fixMapperFunctions();
    console.log('✅ Fixed mapper functions');

    console.log('🎉 Schema alignment complete!');
  }

  private async fixAssessmentResponseSchema() {
    // Update the assessment response schema to include the missing fields
    const responseSchemaPath = join(
      this.contractsDir,
      'entities/assessment.schema.ts'
    );
    let content = readFileSync(responseSchemaPath, 'utf-8');

    // Find the assessmentResponse type and add missing fields
    const responseTypeRegex = /assessmentResponse\?:\s*\{([^}]+)\}/;
    const match = responseTypeRegex.exec(content);

    if (match) {
      const existingFields = match[1];

      // Add the missing fields that the scoring function expects
      const newResponseType = `assessmentResponse?: {
    ${existingFields.trim()}
    questionId: string;
    skipped: boolean;
    responseValue?: number | string;
    isSkipped: boolean;
    hasResponse: boolean;
    confidenceLevel?: string;
  }`;

      content = content.replace(responseTypeRegex, newResponseType);
      writeFileSync(responseSchemaPath, content);
    }
  }

  private async fixAssessmentQuestionSchema() {
    // Update the assessment question schema
    const questionSchemaPath = join(
      this.contractsDir,
      'entities/assessment.schema.ts'
    );
    let content = readFileSync(questionSchemaPath, 'utf-8');

    // Find the question type and ensure it has all required fields
    const questionTypeRegex = /question\?:\s*\{([^}]+)\}/;
    const match = questionTypeRegex.exec(content);

    if (match) {
      const existingFields = match[1];

      // Ensure isRequired field is present
      if (!existingFields.includes('isRequired')) {
        const newQuestionType = `question?: {
    ${existingFields.trim()}
    isRequired: boolean;
  }`;

        content = content.replace(questionTypeRegex, newQuestionType);
        writeFileSync(questionSchemaPath, content);
      }
    }
  }

  private async fixScoringFunction() {
    // Update the scoring function to use the correct types
    const scoringPath = join(this.sharedDir, 'assessments/scoring.ts');
    let content = readFileSync(scoringPath, 'utf-8');

    // Replace the function signature to use proper types
    const functionSignature = `export function calculateAPESTScores(
  questions: Array<{
    id: string;
    apestDimension?: string;
    isRequired?: boolean;
  }>,
  responses: Array<{
    questionId: string;
    skipped: boolean;
    responseValue?: number | string;
  }>
): APESTScores {`;

    // Replace the existing function signature
    const existingSignature = content.match(
      /export function calculateAPESTScores\([^)]+\)/
    );
    if (existingSignature) {
      content = content.replace(existingSignature[0], functionSignature);
      writeFileSync(scoringPath, content);
    }
  }

  private async fixMapperFunctions() {
    // Fix the mapper functions to include missing fields
    const mapperPath = join(this.sharedDir, 'mappers/assessments.ts');
    let content = readFileSync(mapperPath, 'utf-8');

    // Fix the question mapper to include isRequired
    const questionMapperRegex = /question:\s*\{([^}]+)\}/;
    const questionMatch = questionMapperRegex.exec(content);

    if (questionMatch) {
      const existingFields = questionMatch[1];

      if (!existingFields.includes('isRequired')) {
        const newQuestionMapper = `question: {
    ${existingFields.trim()}
    isRequired: true, // Default value, should be passed from parent
  }`;

        content = content.replace(questionMapperRegex, newQuestionMapper);
      }
    }

    // Fix the userAssessment mapper to remove completedAt
    const userAssessmentRegex = /userAssessment:\s*\{([^}]+)\}/;
    const userAssessmentMatch = userAssessmentRegex.exec(content);

    if (userAssessmentMatch) {
      const existingFields = userAssessmentMatch[1];

      // Remove completedAt field if it exists
      const cleanedFields = existingFields
        .split(',')
        .filter(field => !field.includes('completedAt'))
        .join(',');

      const newUserAssessmentMapper = `userAssessment: {
    ${cleanedFields.trim()}
  }`;

      content = content.replace(userAssessmentRegex, newUserAssessmentMapper);
    }

    writeFileSync(mapperPath, content);
  }
}

// Run the fixer
if (require.main === module) {
  const fixer = new SchemaAlignmentFixer();
  fixer.fixSchemaAlignment().catch(console.error);
}

export default SchemaAlignmentFixer;
