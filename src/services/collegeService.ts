import { College } from '../types';

class CollegeService {
  private colleges: College[] = [
    {
      id: '1',
      name: 'Government Degree College Pulwama',
      district: 'Pulwama',
      type: 'government',
      affiliation: 'University of Kashmir',
      programs: ['B.A', 'B.Sc', 'B.Com', 'BCA'],
      intake: { 'B.A': 120, 'B.Sc': 80, 'B.Com': 100, 'BCA': 40 },
      cutoff: { 'B.A': 45, 'B.Sc': 55, 'B.Com': 50, 'BCA': 65 },
      location: {
        lat: 33.8734,
        lng: 74.8917,
        address: 'Pulwama, Jammu and Kashmir 192301',
      },
      contact: {
        phone: '+91-1931-260123',
        email: 'gdcpulwama@kashmiruniversity.ac.in',
        website: 'https://gdcpulwama.edu.in',
      },
      facilities: ['Library', 'Computer Lab', 'Science Labs', 'Sports Ground', 'Hostel'],
      ranking: 85,
      established: 1987,
    },
    {
      id: '2',
      name: 'Government Degree College Shopian',
      district: 'Shopian',
      type: 'government',
      affiliation: 'University of Kashmir',
      programs: ['B.A', 'B.Sc', 'B.Com'],
      intake: { 'B.A': 100, 'B.Sc': 60, 'B.Com': 80 },
      cutoff: { 'B.A': 42, 'B.Sc': 52, 'B.Com': 48 },
      location: {
        lat: 33.7081,
        lng: 74.8308,
        address: 'Shopian, Jammu and Kashmir 192303',
      },
      contact: {
        phone: '+91-1933-270456',
        email: 'gdcshopian@kashmiruniversity.ac.in',
      },
      facilities: ['Library', 'Computer Lab', 'Science Labs', 'Canteen'],
      ranking: 78,
      established: 1992,
    },
    {
      id: '3',
      name: 'Government College for Women Srinagar',
      district: 'Srinagar',
      type: 'government',
      affiliation: 'University of Kashmir',
      programs: ['B.A', 'B.Sc', 'B.Com', 'BCA', 'B.Tech'],
      intake: { 'B.A': 200, 'B.Sc': 150, 'B.Com': 180, 'BCA': 60, 'B.Tech': 120 },
      cutoff: { 'B.A': 50, 'B.Sc': 60, 'B.Com': 55, 'BCA': 70, 'B.Tech': 75 },
      location: {
        lat: 34.0837,
        lng: 74.7973,
        address: 'M A Road, Srinagar, Jammu and Kashmir 190001',
      },
      contact: {
        phone: '+91-194-2452789',
        email: 'gcwsrinagar@kashmiruniversity.ac.in',
        website: 'https://gcwsrinagar.edu.in',
      },
      facilities: ['Library', 'Computer Lab', 'Science Labs', 'Auditorium', 'Hostel', 'Cafeteria'],
      ranking: 92,
      established: 1950,
    },
    {
      id: '4',
      name: 'Government Degree College Anantnag',
      district: 'Anantnag',
      type: 'government',
      affiliation: 'University of Kashmir',
      programs: ['B.A', 'B.Sc', 'B.Com', 'BBA'],
      intake: { 'B.A': 150, 'B.Sc': 100, 'B.Com': 120, 'BBA': 50 },
      cutoff: { 'B.A': 48, 'B.Sc': 58, 'B.Com': 52, 'BBA': 68 },
      location: {
        lat: 33.7311,
        lng: 75.1482,
        address: 'Anantnag, Jammu and Kashmir 192101',
      },
      contact: {
        phone: '+91-1932-227890',
        email: 'gdcanantnag@kashmiruniversity.ac.in',
      },
      facilities: ['Library', 'Computer Lab', 'Science Labs', 'Sports Complex'],
      ranking: 81,
      established: 1975,
    },
    {
      id: '5',
      name: 'Islamic University of Science & Technology',
      district: 'Pulwama',
      type: 'autonomous',
      affiliation: 'Autonomous University',
      programs: ['B.Tech', 'BBA', 'B.Sc', 'MBA', 'M.Tech'],
      intake: { 'B.Tech': 300, 'BBA': 60, 'B.Sc': 120, 'MBA': 100, 'M.Tech': 150 },
      cutoff: { 'B.Tech': 80, 'BBA': 65, 'B.Sc': 60, 'MBA': 70, 'M.Tech': 75 },
      location: {
        lat: 33.9197,
        lng: 75.0181,
        address: 'Awantipora, Pulwama, Jammu and Kashmir 192122',
      },
      contact: {
        phone: '+91-1933-247955',
        email: 'info@islamicuniversity.edu.in',
        website: 'https://islamicuniversity.edu.in',
      },
      facilities: ['Central Library', 'Research Labs', 'Computer Centers', 'Hostels', 'Sports Complex', 'Medical Center'],
      ranking: 95,
      established: 2005,
    },
  ];

  async searchColleges(filters: {
    district?: string;
    course?: string;
    type?: string;
  }): Promise<College[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));

    let filtered = [...this.colleges];

    if (filters.district) {
      filtered = filtered.filter(college => 
        college.district.toLowerCase().includes(filters.district!.toLowerCase())
      );
    }

    if (filters.course) {
      filtered = filtered.filter(college =>
        college.programs.some(program =>
          program.toLowerCase().includes(filters.course!.toLowerCase())
        )
      );
    }

    if (filters.type) {
      filtered = filtered.filter(college => college.type === filters.type);
    }

    // Sort by ranking (higher first)
    return filtered.sort((a, b) => (b.ranking || 0) - (a.ranking || 0));
  }

  async getCollegeById(id: string): Promise<College | null> {
    return this.colleges.find(college => college.id === id) || null;
  }
}

export const collegeService = new CollegeService();