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
  organization?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  loginAs: (role: UserRole) => void;
  logout: () => void;
}

const mockUsers: Record<UserRole, User> = {
  'super-admin': { id: '1', name: 'Alex Super', email: 'alex@gotek.com', role: 'super-admin' },
  'company-admin': { id: '2', name: 'Sarah Tech', email: 'sarah@techcorp.com', role: 'company-admin', organization: 'TechCorp' },
  'company-user': { id: '3', name: 'John Doe', email: 'john@techcorp.com', role: 'company-user', organization: 'TechCorp' },
  'college-admin': { id: '4', name: 'Prof. Smith', email: 'smith@statecollege.edu', role: 'college-admin', organization: 'State College' },
  'college-user': { id: '5', name: 'Jane Student', email: 'jane@statecollege.edu', role: 'college-user', organization: 'State College' },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Start with super-admin for demo purposes
  const [user, setUser] = useState<User | null>(mockUsers['super-admin']);

  const loginAs = (role: UserRole) => {
    setUser(mockUsers[role]);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, role: user?.role || null, loginAs, logout }}>
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
