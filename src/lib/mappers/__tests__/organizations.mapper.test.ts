// Auto-generated tests for Organizations mapper
// Generated at: 2025-01-27T10:00:00.000Z

import type {
  OrganizationCreate,
  OrganizationUpdate,
} from '@/lib/contracts';
import type { OrganizationsSelect } from '@/lib/types';
import { describe, expect, it } from 'vitest';
import { fromCreate, fromUpdate, toDTO } from '../organizations.mapper';

describe('Organizations Mapper', () => {
  const mockOrganizationSelect: OrganizationsSelect = {
    id: 'test-org-id',
    name: 'Test Church',
    slug: 'test-church',
    description: 'A test church organization',
    website: 'https://testchurch.com',
    logoUrl: 'https://testchurch.com/logo.jpg',
    organizationType: 'church',
    sizeCategory: 'medium',
    contactEmail: 'contact@testchurch.com',
    contactPhone: '+1-555-0123',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      country: 'USA',
      postalCode: '12345',
    },
    licenseType: 'team',
    maxUsers: 50,
    billingEmail: 'billing@testchurch.com',
    accountOwnerId: 'owner-id',
    stripeCustomerId: 'cus_test123',
    stripeProductId: 'prod_test123',
    status: 'active',
    createdAt: new Date('2023-01-01T00:00:00Z'),
    updatedAt: new Date('2023-01-02T00:00:00Z'),
  };

  const mockOrganizationCreate: OrganizationCreate = {
    name: 'Test Church',
    slug: 'test-church',
    description: 'A test church organization',
    website: 'https://testchurch.com',
    logoUrl: 'https://testchurch.com/logo.jpg',
    organizationType: 'church',
    sizeCategory: 'medium',
    contactEmail: 'contact@testchurch.com',
    contactPhone: '+1-555-0123',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      country: 'USA',
      postalCode: '12345',
    },
    licenseType: 'team',
    maxUsers: 50,
    billingEmail: 'billing@testchurch.com',
    accountOwnerId: 'owner-id',
    stripeCustomerId: 'cus_test123',
    stripeProductId: 'prod_test123',
    status: 'active',
  };

  describe('fromCreate', () => {
    it('should transform OrganizationCreate to OrganizationsInsert', () => {
      const result = fromCreate(mockOrganizationCreate);

      expect(result).toEqual({
        name: 'Test Church',
        slug: 'test-church',
        description: 'A test church organization',
        website: 'https://testchurch.com',
        logoUrl: 'https://testchurch.com/logo.jpg',
        organizationType: 'church',
        sizeCategory: 'medium',
        contactEmail: 'contact@testchurch.com',
        contactPhone: '+1-555-0123',
        address: {
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          country: 'USA',
          postalCode: '12345',
        },
        licenseType: 'team',
        maxUsers: 50,
        billingEmail: 'billing@testchurch.com',
        accountOwnerId: 'owner-id',
        stripeCustomerId: 'cus_test123',
        stripeProductId: 'prod_test123',
        status: 'active',
      });
    });
  });

  describe('fromUpdate', () => {
    it('should transform OrganizationUpdate to OrganizationsUpdate with id', () => {
      const updateInput: OrganizationUpdate = {
        id: 'test-org-id',
        name: 'Updated Church Name',
        description: 'Updated description',
      };

      const result = fromUpdate(updateInput);

      expect(result).toEqual({
        id: 'test-org-id',
        changes: {
          name: 'Updated Church Name',
          description: 'Updated description',
          slug: undefined,
          website: undefined,
          logoUrl: undefined,
          organizationType: undefined,
          sizeCategory: undefined,
          contactEmail: undefined,
          contactPhone: undefined,
          address: undefined,
          licenseType: undefined,
          maxUsers: undefined,
          billingEmail: undefined,
          accountOwnerId: undefined,
          stripeCustomerId: undefined,
          stripeProductId: undefined,
          status: undefined,
          updatedAt: undefined,
        },
      });
    });
  });

  describe('toDTO', () => {
    it('should transform OrganizationsSelect to OrganizationResponse', () => {
      const result = toDTO(mockOrganizationSelect);

      expect(result).toEqual({
        id: 'test-org-id',
        name: 'Test Church',
        slug: 'test-church',
        description: 'A test church organization',
        website: 'https://testchurch.com',
        logoUrl: 'https://testchurch.com/logo.jpg',
        organizationType: 'church',
        sizeCategory: 'medium',
        contactEmail: 'contact@testchurch.com',
        contactPhone: '+1-555-0123',
        address: {
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          country: 'USA',
          postalCode: '12345',
        },
        licenseType: 'team',
        maxUsers: 50,
        billingEmail: 'billing@testchurch.com',
        accountOwnerId: 'owner-id',
        stripeCustomerId: 'cus_test123',
        stripeProductId: 'prod_test123',
        status: 'active',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-02T00:00:00.000Z',
      });
    });

    it('should normalize dates to ISO strings', () => {
      const result = toDTO(mockOrganizationSelect);

      expect(result.createdAt).toBe('2023-01-01T00:00:00.000Z');
      expect(result.updatedAt).toBe('2023-01-02T00:00:00.000Z');
    });
  });
});
