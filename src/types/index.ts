export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'student' | 'admin';
  locale: 'en' | 'hi';
  district: string;
  createdAt: string;
}

export interface Profile {
  userId: string;
  class: string;
  board: string;
  interests: string[];
  marks?: number;
  stream?: string;
  completedQuiz: boolean;
  quizScores?: QuizScores;
}

export interface QuizItem {
  id: string;
  domain: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  language: 'en' | 'hi';
}

export interface QuizScores {
  science: number;
  mathematics: number;
  commerce: number;
  arts: number;
  technical: number;
  creative: number;
  social: number;
  totalScore: number;
}

export interface StreamRecommendation {
  stream: string;
  score: number;
  reasons: string[];
  courses: CourseRecommendation[];
}

export interface CourseRecommendation {
  name: string;
  description: string;
  duration: string;
  eligibility: string;
  careerPaths: string[];
  averageSalary: string;
}

export interface College {
  id: string;
  name: string;
  district: string;
  type: 'government' | 'private' | 'autonomous';
  affiliation: string;
  programs: string[];
  intake: { [course: string]: number };
  cutoff?: { [course: string]: number };
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  facilities: string[];
  ranking?: number;
  established: number;
}

export interface TimelineEvent {
  id: string;
  userId: string;
  title: string;
  description?: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
  category: 'application' | 'exam' | 'scholarship' | 'document' | 'interview';
  attachments?: string[];
  createdAt: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: string;
}

export interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (profile: Partial<Profile>) => Promise<void>;
  loading: boolean;
}

export type Language = 'en' | 'hi';

export interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}