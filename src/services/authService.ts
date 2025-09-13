import { User } from '../types';

class AuthService {
  private users: User[] = [];
  private currentUser: User | null = null;

  async getCurrentUser(): Promise<User | null> {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
      return this.currentUser;
    }
    return null;
  }

  async login(email: string, password: string): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = this.users.find(u => u.email === email);
    if (user) {
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    }
    
    throw new Error('Invalid credentials');
  }

  async register(email: string, password: string, name: string): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const existingUser = this.users.find(u => u.email === email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role: 'student',
      locale: 'en',
      district: '',
      createdAt: new Date().toISOString(),
    };

    this.users.push(newUser);
    this.currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return newUser;
  }

  async logout(): Promise<void> {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }
}

export const authService = new AuthService();