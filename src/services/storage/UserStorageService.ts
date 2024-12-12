import { SecureStorage } from '../encryption/SecureStorage';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  createdAt: number;
  lastLogin: number;
}

export class UserStorageService {
  private static instance: UserStorageService;
  private readonly USER_KEY = 'user_profile';
  private readonly SESSION_KEY = 'user_session';
  private secureStorage: SecureStorage;

  private constructor() {
    this.secureStorage = SecureStorage.getInstance();
    this.initializeFromLocalStorage();
  }

  public static getInstance(): UserStorageService {
    if (!UserStorageService.instance) {
      UserStorageService.instance = new UserStorageService();
    }
    return UserStorageService.instance;
  }

  private initializeFromLocalStorage(): void {
    try {
      const storedUser = localStorage.getItem(this.USER_KEY);
      if (storedUser) {
        const user = JSON.parse(storedUser);
        this.secureStorage.setItem(this.USER_KEY, user);
      }
    } catch (error) {
      console.error('Failed to initialize from localStorage:', error);
    }
  }

  public saveUser(user: UserProfile): void {
    try {
      // Store in secure storage
      this.secureStorage.setItem(this.USER_KEY, user);
      
      // Store in localStorage for persistence
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      
      // Store minimal session info
      const sessionData = {
        id: user.id,
        name: user.name,
        email: user.email
      };
      sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));
    } catch (error) {
      console.error('Failed to save user:', error);
      throw new Error('Failed to save user data');
    }
  }

  public getUser(): UserProfile | null {
    try {
      // Try secure storage first
      const user = this.secureStorage.getItem<UserProfile>(this.USER_KEY);
      if (user) return user;

      // Fall back to localStorage
      const storedUser = localStorage.getItem(this.USER_KEY);
      if (storedUser) {
        const user = JSON.parse(storedUser);
        // Sync with secure storage
        this.secureStorage.setItem(this.USER_KEY, user);
        return user;
      }

      return null;
    } catch (error) {
      console.error('Failed to get user:', error);
      return null;
    }
  }

  public updateUser(updates: Partial<UserProfile>): void {
    const currentUser = this.getUser();
    if (!currentUser) {
      throw new Error('No user found to update');
    }

    const updatedUser = { ...currentUser, ...updates };
    this.saveUser(updatedUser);
  }

  public clearUser(): void {
    try {
      this.secureStorage.removeItem(this.USER_KEY);
      localStorage.removeItem(this.USER_KEY);
      sessionStorage.removeItem(this.SESSION_KEY);
    } catch (error) {
      console.error('Failed to clear user:', error);
    }
  }

  public isAuthenticated(): boolean {
    return this.getUser() !== null;
  }
}