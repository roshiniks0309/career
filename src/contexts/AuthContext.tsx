import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Profile, AuthContextType } from '../types';
import { authService } from '../services/authService';
import { profileService } from '../services/profileService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          const userProfile = await profileService.getProfile(currentUser.id);
          setProfile(userProfile);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const user = await authService.login(email, password);
    setUser(user);
    const userProfile = await profileService.getProfile(user.id);
    setProfile(userProfile);
  };

  const register = async (email: string, password: string, name: string) => {
    const user = await authService.register(email, password, name);
    setUser(user);
    // Create initial profile
    const newProfile = await profileService.createProfile(user.id, {
      userId: user.id,
      class: '',
      board: '',
      interests: [],
      completedQuiz: false,
    });
    setProfile(newProfile);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setProfile(null);
  };

  const updateProfile = async (profileUpdate: Partial<Profile>) => {
    if (!user || !profile) return;
    const updatedProfile = await profileService.updateProfile(user.id, profileUpdate);
    setProfile(updatedProfile);
  };

  const value: AuthContextType = {
    user,
    profile,
    login,
    register,
    logout,
    updateProfile,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}