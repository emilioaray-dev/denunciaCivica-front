export type UserRole = 'admin' | 'moderator' | 'communicator';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  roles: UserRole[];
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
