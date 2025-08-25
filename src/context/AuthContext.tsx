import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'manager';
}

interface MockUserAccount {
  email: string;
  password: string;
  user: User;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: 'user' | 'manager') => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock users storage - in real app this would be in backend
  const [mockUsers, setMockUsers] = useState<MockUserAccount[]>([
    {
      email: 'manager@test.com',
      password: 'manager123',
      user: {
        id: '1',
        name: 'Sarah Johnson',
        email: 'manager@test.com',
        role: 'manager'
      }
    },
    {
      email: 'user@test.com', 
      password: 'user123',
      user: {
        id: '2',
        name: 'John Smith',
        email: 'user@test.com',
        role: 'user'
      }
    }
  ]);

  // Check for existing auth token on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        // TODO: Validate token with backend
        // For now, we'll simulate a user
        const userData = localStorage.getItem('userData');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Find matching user from mock users
      const foundUser = mockUsers.find(
        account => account.email === email && account.password === password
      );
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      const mockToken = `mock-jwt-token-${foundUser.user.role}`;
      
      // Store auth data
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('userData', JSON.stringify(foundUser.user));
      
      setUser(foundUser.user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, role: 'user' | 'manager') => {
    try {
      setIsLoading(true);
      
      // Check if user already exists
      const existingUser = mockUsers.find(account => account.email === email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user
      const newUser = {
        email,
        password,
        user: {
          id: (mockUsers.length + 1).toString(),
          name,
          email,
          role
        }
      };
      
      // Add to mock users
      setMockUsers(prev => [...prev, newUser]);
      
      // Create token and login the new user
      const mockToken = `mock-jwt-token-${role}`;
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('userData', JSON.stringify(newUser.user));
      
      setUser(newUser.user);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
    
    // Redirect to landing page
    window.location.href = '/';
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('userData', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
