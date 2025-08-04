
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { User, UserProgress } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password_raw: string) => boolean;
  logout: () => void;
  register: (email: string, password_raw: string) => boolean;
  updatePaymentStatus: () => void;
  updateUserProgress: (unitId: string, score: number) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

// A simple hashing function for demonstration. 
// In a real app, use a robust library like bcrypt.
const simpleHash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return h.toString();
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('currentUser');
    }
  }, []);

  const getUsersFromStorage = (): User[] => {
    try {
      const users = localStorage.getItem('users');
      return users ? JSON.parse(users) : [];
    } catch {
      return [];
    }
  };

  const login = (email: string, password_raw: string): boolean => {
    const users = getUsersFromStorage();
    const passwordHash = simpleHash(password_raw);
    const foundUser = users.find(u => u.email === email && u.passwordHash === passwordHash);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };
  
  const register = (email: string, password_raw: string): boolean => {
    const users = getUsersFromStorage();
    if (users.some(u => u.email === email)) {
      alert('El correo ya está registrado.');
      return false;
    }
    
    const newUser: User = {
      id: new Date().toISOString(),
      email,
      passwordHash: simpleHash(password_raw),
      hasPaid: false,
      progress: {}
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Automatically log in after registration
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return true;
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const updatePaymentStatus = useCallback(() => {
    if (!user) return;
    const updatedUser = { ...user, hasPaid: true };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    const users = getUsersFromStorage();
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [user]);

  const updateUserProgress = useCallback((unitId: string, score: number) => {
    if (!user) return;

    const newProgress: UserProgress = {
        ...user.progress,
        [unitId]: { completed: true, score }
    };

    const updatedUser = { ...user, progress: newProgress };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    const users = getUsersFromStorage();
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, register, updatePaymentStatus, updateUserProgress }}>
      {children}
    </AuthContext.Provider>
  );
};
