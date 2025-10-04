// Test file to verify @platform/* imports work correctly
// This file will be deleted after testing

// Test contracts package imports
import { validateSchema } from '@platform/contracts';
import { UserEntitySchema } from '@platform/contracts/entities';

// Test UI package imports
import { placeholder as uiPlaceholder } from '@platform/ui';

// Test database package imports
import { placeholder as dbPlaceholder } from '@platform/database';

// Test shared package imports
import { placeholder as sharedPlaceholder } from '@platform/shared';

// Test that we can use the imported schemas
const testUser = {
  id: '123',
  email: 'test@example.com',
  first_name: 'Test',
  last_name: 'User',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

// Test schema validation
const validation = validateSchema(UserEntitySchema, testUser);
console.log('Validation result:', validation);

// Test that placeholders exist (they should be strings)
console.log('UI placeholder:', uiPlaceholder);
console.log('DB placeholder:', dbPlaceholder);
console.log('Shared placeholder:', sharedPlaceholder);

export { testUser, validation };
