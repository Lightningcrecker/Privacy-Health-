import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { UserStorageService, UserProfile } from '../services/storage/UserStorageService';
import { SecureStorage } from '../services/encryption/SecureStorage';

interface AuthContextType {
  user: UserProfile | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  isAuthenticated: boolean;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const userStorage = UserStorageService.getInstance();
  const secureStorage = SecureStorage.getInstance();

  useEffect(() => {
    // Check for existing session
    const storedUser = userStorage.getUser();
    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const storedHash = secureStorage.getItem<string>(`password_${email}`);
      if (!storedHash) throw new Error('Invalid credentials');

      const isValid = await secureStorage.verifyPassword(password, storedHash);
      if (!isValid) throw new Error('Invalid credentials');

      const storedUser = userStorage.getUser();
      if (!storedUser) throw new Error('User data not found');

      const updatedUser = {
        ...storedUser,
        lastLogin: Date.now()
      };

      userStorage.saveUser(updatedUser);
      setUser(updatedUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      userStorage.clearUser();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }, []);

  const signup = useCallback(async (email: string, password: string, name: string) => {
    try {
      const hashedPassword = await secureStorage.hashPassword(password);
      const newUser: UserProfile = {
        id: crypto.randomUUID(),
        email,
        name,
        createdAt: Date.now(),
        lastLogin: Date.now()
      };

      secureStorage.setItem(`password_${email}`, hashedPassword);
      userStorage.saveUser(newUser);
      setUser(newUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  }, []);

  const updateProfile = useCallback(async (updates: Partial<UserProfile>) => {
    if (!user) throw new Error('No user logged in');
    
    try {
      userStorage.updateUser(updates);
      setUser(prev => prev ? { ...prev, ...updates } : null);
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      signup,
      isAuthenticated,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};