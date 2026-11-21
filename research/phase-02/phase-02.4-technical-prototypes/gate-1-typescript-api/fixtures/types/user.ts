/**
 * Core User entity interface definition.
 * Preserves JSDoc comments during AST surgery.
 */
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  avatarUrl?: string;
  createdAt: number;
}

export type UserRole = UserProfile['role'];
