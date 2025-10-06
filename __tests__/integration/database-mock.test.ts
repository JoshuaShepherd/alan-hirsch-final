import { describe, expect, it } from 'vitest';
import {
  createMockDatabase,
  createMockSupabaseClient,
} from '../utils/test-imports';

describe('Database Integration Tests', () => {
  it('should create mock database with chained methods', () => {
    const mockDb = createMockDatabase();

    // Test chaining
    const result = mockDb
      .select()
      .from('users')
      .where('id', '=', '123')
      .limit(10)
      .offset(0);

    expect(result).toBe(mockDb); // Should return itself for chaining
    expect(mockDb.select).toHaveBeenCalled();
    expect(mockDb.from).toHaveBeenCalledWith('users');
    expect(mockDb.where).toHaveBeenCalledWith('id', '=', '123');
    expect(mockDb.limit).toHaveBeenCalledWith(10);
    expect(mockDb.offset).toHaveBeenCalledWith(0);
  });

  it('should mock database insert operations', async () => {
    const mockDb = createMockDatabase();
    const mockData = { name: 'Test User', email: 'test@example.com' };

    const result = await mockDb.insert('users').values(mockData).returning();

    expect(mockDb.insert).toHaveBeenCalledWith('users');
    expect(result).toEqual([]); // Mock returns empty array
  });

  it('should create mock Supabase client', () => {
    const mockSupabase = createMockSupabaseClient();

    expect(mockSupabase.auth).toBeDefined();
    expect(mockSupabase.auth.signInWithPassword).toBeDefined();
    expect(mockSupabase.auth.signUp).toBeDefined();
    expect(mockSupabase.auth.signOut).toBeDefined();
    expect(mockSupabase.from).toBeDefined();
  });

  it('should mock Supabase auth operations', async () => {
    const mockSupabase = createMockSupabaseClient();

    const signInResult = await mockSupabase.auth.signInWithPassword({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(signInResult).toEqual({ data: { user: null }, error: null });
    expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('should mock Supabase query operations', () => {
    const mockSupabase = createMockSupabaseClient();

    const query = mockSupabase
      .from('users')
      .select('*')
      .eq('status', 'active')
      .limit(10);

    expect(mockSupabase.from).toHaveBeenCalledWith('users');
    expect(query).toBe(mockSupabase); // Should return itself for chaining
  });
});
