import { Profile } from '../types';

class ProfileService {
  private profiles: Profile[] = [];

  async getProfile(userId: string): Promise<Profile | null> {
    const profile = this.profiles.find(p => p.userId === userId);
    return profile || null;
  }

  async createProfile(userId: string, profileData: Partial<Profile>): Promise<Profile> {
    const profile: Profile = {
      userId,
      class: '',
      board: '',
      interests: [],
      completedQuiz: false,
      ...profileData,
    };

    this.profiles.push(profile);
    return profile;
  }

  async updateProfile(userId: string, updates: Partial<Profile>): Promise<Profile> {
    const index = this.profiles.findIndex(p => p.userId === userId);
    if (index === -1) {
      throw new Error('Profile not found');
    }

    this.profiles[index] = { ...this.profiles[index], ...updates };
    return this.profiles[index];
  }
}

export const profileService = new ProfileService();