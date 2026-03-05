import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole =
  | 'super-admin'
  | 'company-admin'
  | 'company-user'
  | 'college-admin'
  | 'college-user';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password?: string;
  organization?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
}

const mockUsers: Record<string, User> = {
  'superadmin@gotek.com': { id: '1', name: 'Alex Super', email: 'superadmin@gotek.com', password: '123456', role: 'super-admin' },
  'companyadmin@gotek.com': { id: '2', name: 'Sarah Tech', email: 'companyadmin@gotek.com', password: '123456', role: 'company-admin', organization: 'TechCorp' },
  'companyuser@gotek.com': { id: '3', name: 'John Doe', email: 'companyuser@gotek.com', password: '123456', role: 'company-user', organization: 'TechCorp' },
  'collegeadmin@gotek.com': { id: '4', name: 'Prof. Smith', email: 'collegeadmin@gotek.com', password: '123456', role: 'college-admin', organization: 'State College' },
  'collegeuser@gotek.com': { id: '5', name: 'Jane Student', email: 'collegeuser@gotek.com', password: '123456', role: 'college-user', organization: 'State College' },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const foundUser = mockUsers[email.toLowerCase()];
    if (foundUser && foundUser.password === password) {
      setUser(foundUser);
      return foundUser;
    }
    return null;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, role: user?.role || null, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
