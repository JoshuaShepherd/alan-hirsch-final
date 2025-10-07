import * as Q from '@/lib/database/db/queries/user.queries';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError } from '../../api/error-handler';
import {
  fromCreateUserDTO,
  fromUpdateUserDTO,
  toUserDTO,
} from '../../mappers/user';
import { UserService } from '../user.service';

// Mock the query module
vi.mock('@/lib/database/db/queries/user.queries', () => ({
  getUserById: vi.fn(),
  listUsers: vi.fn(),
  createUser: vi.fn(),
  updateUser: vi.fn(),
  removeUser: vi.fn(),
  getUserByEmail: vi.fn(),
  getUserBySubdomain: vi.fn(),
  updateUserLastActive: vi.fn(),
}));

// Mock the mapper
vi.mock('../../mappers/user', () => ({
  toUserDTO: vi.fn(row => ({ ...row, id: row.id || 'mock-id' })),
  fromCreateUserDTO: vi.fn(dto => ({ ...dto, id: 'mock-id' })),
  fromUpdateUserDTO: vi.fn(dto => dto),
}));

describe('UserService', () => {
  let userService: UserService;
  const mockCtx = {};
  const mockUser = {
    id: 'user-123',
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  };

  beforeEach(() => {
    userService = new UserService();
    vi.clearAllMocks();
  });

  describe('get', () => {
    it('should get user by ID successfully', async () => {
      vi.mocked(Q.getUserById).mockResolvedValue(mockUser);
      vi.mocked(toUserDTO).mockReturnValue(mockUser);

      const result = await userService.get(mockCtx, 'user-123');

      expect(Q.getUserById).toHaveBeenCalledWith(mockCtx, 'user-123');
      expect(toUserDTO).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockUser);
    });

    it('should throw error when user not found', async () => {
      vi.mocked(Q.getUserById).mockResolvedValue(null);

      await expect(userService.get(mockCtx, 'nonexistent')).rejects.toThrow(
        'USER_NOT_FOUND'
      );
    });

    it('should handle database errors', async () => {
      const dbError = { code: '23503', constraint: 'fk_user' };
      vi.mocked(Q.getUserById).mockRejectedValue(dbError);

      await expect(userService.get(mockCtx, 'user-123')).rejects.toThrow(
        ApiError
      );
    });
  });

  describe('list', () => {
    it('should list users successfully', async () => {
      const mockListResult = {
        rows: [mockUser],
        total: 1,
        page: 1,
        limit: 10,
      };
      vi.mocked(Q.listUsers).mockResolvedValue(mockListResult);
      vi.mocked(toUserDTO).mockReturnValue(mockUser);

      const result = await userService.list(mockCtx, { page: 1, limit: 10 });

      expect(Q.listUsers).toHaveBeenCalledWith(mockCtx, { page: 1, limit: 10 });
      expect(result.data).toHaveLength(1);
      expect(result.pagination.total).toBe(1);
    });

    it('should handle empty list', async () => {
      const mockListResult = {
        rows: [],
        total: 0,
        page: 1,
        limit: 10,
      };
      vi.mocked(Q.listUsers).mockResolvedValue(mockListResult);

      const result = await userService.list(mockCtx);

      expect(result.data).toHaveLength(0);
      expect(result.pagination.total).toBe(0);
    });
  });

  describe('create', () => {
    it('should create user successfully', async () => {
      const createInput = {
        email: 'new@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
      };
      vi.mocked(Q.createUser).mockResolvedValue(mockUser);
      vi.mocked(toUserDTO).mockReturnValue(mockUser);
      vi.mocked(fromCreateUserDTO).mockReturnValue(createInput);

      const result = await userService.create(mockCtx, createInput);

      expect(fromCreateUserDTO).toHaveBeenCalledWith(createInput);
      expect(Q.createUser).toHaveBeenCalledWith(mockCtx, createInput);
      expect(result).toEqual(mockUser);
    });

    it('should validate input before creating', async () => {
      const invalidInput = { email: 'invalid-email' };

      await expect(userService.create(mockCtx, invalidInput)).rejects.toThrow();
      expect(Q.createUser).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update user successfully', async () => {
      const updateInput = { firstName: 'Updated Name' };
      const updatedUser = { ...mockUser, firstName: 'Updated Name' };
      vi.mocked(Q.updateUser).mockResolvedValue(updatedUser);
      vi.mocked(toUserDTO).mockReturnValue(updatedUser);
      vi.mocked(fromUpdateUserDTO).mockReturnValue(updateInput);

      const result = await userService.update(mockCtx, 'user-123', updateInput);

      expect(fromUpdateUserDTO).toHaveBeenCalledWith(updateInput);
      expect(Q.updateUser).toHaveBeenCalledWith(
        mockCtx,
        'user-123',
        updateInput
      );
      expect(result.firstName).toBe('Updated Name');
    });

    it('should throw error when user not found for update', async () => {
      const updateInput = { firstName: 'Updated Name' };
      vi.mocked(Q.updateUser).mockResolvedValue(null);

      await expect(
        userService.update(mockCtx, 'nonexistent', updateInput)
      ).rejects.toThrow('USER_NOT_FOUND');
    });
  });

  describe('delete', () => {
    it('should delete user successfully', async () => {
      vi.mocked(Q.removeUser).mockResolvedValue(true);

      const result = await userService.delete(mockCtx, 'user-123');

      expect(Q.removeUser).toHaveBeenCalledWith(mockCtx, 'user-123');
      expect(result).toEqual({ success: true });
    });

    it('should throw error when user not found for deletion', async () => {
      vi.mocked(Q.removeUser).mockResolvedValue(false);

      await expect(userService.delete(mockCtx, 'nonexistent')).rejects.toThrow(
        'USER_NOT_FOUND'
      );
    });
  });

  describe('getByEmail', () => {
    it('should get user by email successfully', async () => {
      vi.mocked(Q.getUserByEmail).mockResolvedValue(mockUser);
      vi.mocked(toUserDTO).mockReturnValue(mockUser);

      const result = await userService.getByEmail(mockCtx, 'test@example.com');

      expect(Q.getUserByEmail).toHaveBeenCalledWith(
        mockCtx,
        'test@example.com'
      );
      expect(result).toEqual(mockUser);
    });

    it('should return null when user not found by email', async () => {
      vi.mocked(Q.getUserByEmail).mockResolvedValue(null);

      const result = await userService.getByEmail(
        mockCtx,
        'nonexistent@example.com'
      );

      expect(result).toBeNull();
    });
  });

  describe('getBySubdomain', () => {
    it('should get user by subdomain successfully', async () => {
      vi.mocked(Q.getUserBySubdomain).mockResolvedValue(mockUser);
      vi.mocked(toUserDTO).mockReturnValue(mockUser);

      const result = await userService.getBySubdomain('test-subdomain');

      expect(Q.getUserBySubdomain).toHaveBeenCalledWith('test-subdomain');
      expect(result).toEqual(mockUser);
    });

    it('should return null when user not found by subdomain', async () => {
      vi.mocked(Q.getUserBySubdomain).mockResolvedValue(null);

      const result = await userService.getBySubdomain('nonexistent');

      expect(result).toBeNull();
    });
  });

  describe('updateLastActive', () => {
    it('should update last active successfully', async () => {
      const updatedUser = { ...mockUser, lastActiveAt: '2023-01-02T00:00:00Z' };
      vi.mocked(Q.updateUserLastActive).mockResolvedValue(updatedUser);
      vi.mocked(toUserDTO).mockReturnValue(updatedUser);

      const result = await userService.updateLastActive(mockCtx, 'user-123');

      expect(Q.updateUserLastActive).toHaveBeenCalledWith(mockCtx, 'user-123');
      expect(result).toEqual(updatedUser);
    });

    it('should throw error when user not found for last active update', async () => {
      vi.mocked(Q.updateUserLastActive).mockResolvedValue(null);

      await expect(
        userService.updateLastActive(mockCtx, 'nonexistent')
      ).rejects.toThrow('USER_NOT_FOUND');
    });
  });
});
