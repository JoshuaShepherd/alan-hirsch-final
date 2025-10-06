// Contract Utilities Tests
// Tests for contract validation and transformation utilities

import { z } from 'zod';
import {
  createContractValidator,
  createDevValidator,
  createOmitSchema,
  createPaginatedContractValidator,
  createPartialSchema,
  createPickSchema,
  createSafeValidator,
  createStrictValidator,
  createTypeGuard,
  formatValidationErrors,
  getFirstValidationError,
  isValidationError,
  logValidationErrors,
  safeValidateApiResponse,
  validateApiRequest,
  validateApiResponse,
} from '../../apps/alan-hirsch-platform/lib/contracts';

// ============================================================================
// MOCK DATA
// ============================================================================

const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  age: z.number().int().min(0).max(150).optional(),
  isActive: z.boolean().default(true),
  tags: z.array(z.string()).default([]),
});

const paginatedUserSchema = z.object({
  data: z.array(userSchema),
  meta: z.object({
    pagination: z.object({
      page: z.number(),
      limit: z.number(),
      total: z.number(),
      total_pages: z.number(),
      has_next: z.boolean(),
      has_prev: z.boolean(),
    }),
  }),
});

const validUser = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  email: 'test@example.com',
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  isActive: true,
  tags: ['admin', 'user'],
};

const invalidUser = {
  id: 'invalid-uuid',
  email: 'invalid-email',
  firstName: '',
  lastName: 'Doe',
  age: -5,
  isActive: 'not-boolean',
  tags: 'not-array',
};

// ============================================================================
// TESTS
// ============================================================================

describe('Contract Utilities', () => {
  describe('createSafeValidator', () => {
    it('should return success result for valid data', () => {
      const validator = createSafeValidator(userSchema);
      const result = validator(validUser);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validUser);
      }
    });

    it('should return error result for invalid data', () => {
      const validator = createSafeValidator(userSchema);
      const result = validator(invalidUser);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(z.ZodError);
      }
    });
  });

  describe('createStrictValidator', () => {
    it('should return data for valid input', () => {
      const validator = createStrictValidator(userSchema);
      const result = validator(validUser);

      expect(result).toEqual(validUser);
    });

    it('should throw error for invalid input', () => {
      const validator = createStrictValidator(userSchema);

      expect(() => validator(invalidUser)).toThrow(z.ZodError);
    });
  });

  describe('createTypeGuard', () => {
    it('should return true for valid data', () => {
      const typeGuard = createTypeGuard(userSchema);
      const result = typeGuard(validUser);

      expect(result).toBe(true);
    });

    it('should return false for invalid data', () => {
      const typeGuard = createTypeGuard(userSchema);
      const result = typeGuard(invalidUser);

      expect(result).toBe(false);
    });
  });

  describe('validateApiRequest', () => {
    it('should return validated data for valid request', () => {
      const result = validateApiRequest(userSchema, validUser);

      expect(result).toEqual(validUser);
    });

    it('should throw error for invalid request', () => {
      expect(() => validateApiRequest(userSchema, invalidUser)).toThrow();
    });
  });

  describe('validateApiResponse', () => {
    it('should return validated data for valid response', () => {
      const result = validateApiResponse(userSchema, validUser);

      expect(result).toEqual(validUser);
    });

    it('should throw error for invalid response', () => {
      expect(() => validateApiResponse(userSchema, invalidUser)).toThrow();
    });
  });

  describe('safeValidateApiResponse', () => {
    it('should return success result for valid response', () => {
      const result = safeValidateApiResponse(userSchema, validUser);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validUser);
      }
    });

    it('should return error result for invalid response', () => {
      const result = safeValidateApiResponse(userSchema, invalidUser);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(z.ZodError);
      }
    });
  });

  describe('createPartialSchema', () => {
    it('should create partial schema from full schema', () => {
      const partialSchema = createPartialSchema(userSchema);
      const partialUser = {
        firstName: 'Jane',
        lastName: 'Smith',
      };

      expect(() => partialSchema.parse(partialUser)).not.toThrow();
    });

    it('should allow optional fields', () => {
      const partialSchema = createPartialSchema(userSchema);
      const emptyUser = {};

      expect(() => partialSchema.parse(emptyUser)).not.toThrow();
    });
  });

  describe('createPickSchema', () => {
    it('should create pick schema with selected fields', () => {
      const pickSchema = createPickSchema(userSchema, [
        'firstName',
        'lastName',
      ]);
      const pickedUser = {
        firstName: 'Jane',
        lastName: 'Smith',
      };

      expect(() => pickSchema.parse(pickedUser)).not.toThrow();
    });

    it('should reject data with extra fields', () => {
      const pickSchema = createPickSchema(userSchema, [
        'firstName',
        'lastName',
      ]);
      const extraUser = {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com', // Not picked
      };

      expect(() => pickSchema.parse(extraUser)).toThrow();
    });
  });

  describe('createOmitSchema', () => {
    it('should create omit schema without specified fields', () => {
      const omitSchema = createOmitSchema(userSchema, ['id', 'email']);
      const omittedUser = {
        firstName: 'Jane',
        lastName: 'Smith',
        age: 25,
        isActive: true,
        tags: ['user'],
      };

      expect(() => omitSchema.parse(omittedUser)).not.toThrow();
    });

    it('should reject data with omitted fields', () => {
      const omitSchema = createOmitSchema(userSchema, ['id', 'email']);
      const withOmittedUser = {
        id: '123e4567-e89b-12d3-a456-426614174000', // Should be omitted
        firstName: 'Jane',
        lastName: 'Smith',
      };

      expect(() => omitSchema.parse(withOmittedUser)).toThrow();
    });
  });

  describe('createContractValidator', () => {
    it('should create contract validator with request and response schemas', () => {
      const contractValidator = createContractValidator(userSchema, userSchema);

      // Test request validation
      expect(() => contractValidator.validateRequest(validUser)).not.toThrow();
      expect(() => contractValidator.validateRequest(invalidUser)).toThrow();

      // Test response validation
      expect(() => contractValidator.validateResponse(validUser)).not.toThrow();
      expect(() => contractValidator.validateResponse(invalidUser)).toThrow();

      // Test safe validation
      const safeRequestResult =
        contractValidator.safeValidateRequest(validUser);
      expect(safeRequestResult.success).toBe(true);

      const safeResponseResult =
        contractValidator.safeValidateResponse(validUser);
      expect(safeResponseResult.success).toBe(true);
    });
  });

  describe('createPaginatedContractValidator', () => {
    it('should create paginated contract validator', () => {
      const paginatedValidator = createPaginatedContractValidator(userSchema);

      const validPaginatedData = {
        data: [validUser],
        meta: {
          pagination: {
            page: 1,
            limit: 10,
            total: 1,
            total_pages: 1,
            has_next: false,
            has_prev: false,
          },
        },
      };

      expect(() =>
        paginatedValidator.validatePaginatedResponse(validPaginatedData)
      ).not.toThrow();

      const safeResult =
        paginatedValidator.safeValidatePaginatedResponse(validPaginatedData);
      expect(safeResult.success).toBe(true);
    });

    it('should reject invalid paginated data', () => {
      const paginatedValidator = createPaginatedContractValidator(userSchema);

      const invalidPaginatedData = {
        data: [invalidUser], // Invalid user data
        meta: {
          pagination: {
            page: 1,
            limit: 10,
            total: 1,
            total_pages: 1,
            has_next: false,
            has_prev: false,
          },
        },
      };

      expect(() =>
        paginatedValidator.validatePaginatedResponse(invalidPaginatedData)
      ).toThrow();
    });
  });

  describe('formatValidationErrors', () => {
    it('should format validation errors correctly', () => {
      const result = userSchema.safeParse(invalidUser);
      if (!result.success) {
        const formattedErrors = formatValidationErrors(result.error);

        expect(formattedErrors).toHaveLength(7); // 7 validation errors
        expect(formattedErrors[0]).toContain('id');
        expect(formattedErrors[1]).toContain('email');
        expect(formattedErrors[2]).toContain('firstName');
      }
    });

    it('should handle nested path errors', () => {
      const nestedSchema = z.object({
        user: z.object({
          profile: z.object({
            name: z.string().min(1),
          }),
        }),
      });

      const invalidNestedData = {
        user: {
          profile: {
            name: '',
          },
        },
      };

      const result = nestedSchema.safeParse(invalidNestedData);
      if (!result.success) {
        const formattedErrors = formatValidationErrors(result.error);

        expect(formattedErrors[0]).toContain('user.profile.name');
      }
    });
  });

  describe('getFirstValidationError', () => {
    it('should return first validation error message', () => {
      const result = userSchema.safeParse(invalidUser);
      if (!result.success) {
        const firstError = getFirstValidationError(result.error);

        expect(firstError).toContain('id');
        expect(typeof firstError).toBe('string');
      }
    });
  });

  describe('isValidationError', () => {
    it('should return true for ZodError', () => {
      const result = userSchema.safeParse(invalidUser);
      if (!result.success) {
        expect(isValidationError(result.error)).toBe(true);
      }
    });

    it('should return false for other errors', () => {
      const regularError = new Error('Regular error');
      expect(isValidationError(regularError)).toBe(false);
    });
  });

  describe('logValidationErrors', () => {
    it('should log validation errors in development', () => {
      const consoleSpy = jest.spyOn(console, 'group').mockImplementation();
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
      const consoleGroupEndSpy = jest
        .spyOn(console, 'groupEnd')
        .mockImplementation();

      // Set NODE_ENV to development
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      const result = userSchema.safeParse(invalidUser);
      if (!result.success) {
        logValidationErrors('Test Context', result.error, invalidUser);

        expect(consoleSpy).toHaveBeenCalledWith(
          '❌ Validation Error: Test Context'
        );
        expect(consoleErrorSpy).toHaveBeenCalled();
        expect(consoleLogSpy).toHaveBeenCalledWith('Data:', invalidUser);
        expect(consoleGroupEndSpy).toHaveBeenCalled();
      }

      // Restore NODE_ENV
      process.env.NODE_ENV = originalEnv;

      consoleSpy.mockRestore();
      consoleErrorSpy.mockRestore();
      consoleLogSpy.mockRestore();
      consoleGroupEndSpy.mockRestore();
    });

    it('should not log in production', () => {
      const consoleSpy = jest.spyOn(console, 'group').mockImplementation();

      // Set NODE_ENV to production
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      const result = userSchema.safeParse(invalidUser);
      if (!result.success) {
        logValidationErrors('Test Context', result.error, invalidUser);

        expect(consoleSpy).not.toHaveBeenCalled();
      }

      // Restore NODE_ENV
      process.env.NODE_ENV = originalEnv;

      consoleSpy.mockRestore();
    });
  });

  describe('createDevValidator', () => {
    it('should create development validator that logs errors', () => {
      const consoleSpy = jest.spyOn(console, 'group').mockImplementation();
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
      const consoleGroupEndSpy = jest
        .spyOn(console, 'groupEnd')
        .mockImplementation();

      // Set NODE_ENV to development
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      const devValidator = createDevValidator(userSchema, 'Test Context');

      expect(() => devValidator(validUser)).not.toThrow();

      expect(() => devValidator(invalidUser)).toThrow();

      // Restore NODE_ENV
      process.env.NODE_ENV = originalEnv;

      consoleSpy.mockRestore();
      consoleErrorSpy.mockRestore();
      consoleLogSpy.mockRestore();
      consoleGroupEndSpy.mockRestore();
    });
  });
});

// ============================================================================
// INTEGRATION TESTS
// ============================================================================

describe('Contract Utilities Integration', () => {
  it('should handle complete validation workflow', () => {
    // 1. Create type guard
    const typeGuard = createTypeGuard(userSchema);
    expect(typeGuard(validUser)).toBe(true);

    // 2. Create safe validator
    const safeValidator = createSafeValidator(userSchema);
    const safeResult = safeValidator(validUser);
    expect(safeResult.success).toBe(true);

    // 3. Create strict validator
    const strictValidator = createStrictValidator(userSchema);
    const strictResult = strictValidator(validUser);
    expect(strictResult).toEqual(validUser);

    // 4. Create contract validator
    const contractValidator = createContractValidator(userSchema, userSchema);
    expect(() => contractValidator.validateRequest(validUser)).not.toThrow();
    expect(() => contractValidator.validateResponse(validUser)).not.toThrow();

    // 5. Create paginated validator
    const paginatedValidator = createPaginatedContractValidator(userSchema);
    const paginatedData = {
      data: [validUser],
      meta: {
        pagination: {
          page: 1,
          limit: 10,
          total: 1,
          total_pages: 1,
          has_next: false,
          has_prev: false,
        },
      },
    };
    expect(() =>
      paginatedValidator.validatePaginatedResponse(paginatedData)
    ).not.toThrow();
  });

  it('should handle error scenarios', () => {
    // 1. Type guard should return false
    const typeGuard = createTypeGuard(userSchema);
    expect(typeGuard(invalidUser)).toBe(false);

    // 2. Safe validator should return error
    const safeValidator = createSafeValidator(userSchema);
    const safeResult = safeValidator(invalidUser);
    expect(safeResult.success).toBe(false);

    // 3. Strict validator should throw
    const strictValidator = createStrictValidator(userSchema);
    expect(() => strictValidator(invalidUser)).toThrow();

    // 4. Contract validator should throw
    const contractValidator = createContractValidator(userSchema, userSchema);
    expect(() => contractValidator.validateRequest(invalidUser)).toThrow();
    expect(() => contractValidator.validateResponse(invalidUser)).toThrow();

    // 5. Error formatting should work
    const result = userSchema.safeParse(invalidUser);
    if (!result.success) {
      const formattedErrors = formatValidationErrors(result.error);
      expect(formattedErrors.length).toBeGreaterThan(0);

      const firstError = getFirstValidationError(result.error);
      expect(typeof firstError).toBe('string');

      expect(isValidationError(result.error)).toBe(true);
    }
  });
});
