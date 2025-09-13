import { QuizScores, StreamRecommendation, CourseRecommendation } from '../types';

class RecommendationService {
  private streamMappings = {
    science: {
      courses: [
        {
          name: 'B.Tech Computer Science',
          description: 'Software development, algorithms, and system design',
          duration: '4 years',
          eligibility: '12th with Physics, Chemistry, Mathematics',
          careerPaths: ['Software Engineer', 'Data Scientist', 'System Administrator'],
          averageSalary: '₹6-15 LPA',
        },
        {
          name: 'MBBS',
          description: 'Medical degree for becoming a doctor',
          duration: '5.5 years',
          eligibility: '12th with Physics, Chemistry, Biology',
          careerPaths: ['Doctor', 'Surgeon', 'Medical Researcher'],
          averageSalary: '₹8-25 LPA',
        },
        {
          name: 'B.Sc Physics',
          description: 'Study of matter, energy, and their interactions',
          duration: '3 years',
          eligibility: '12th with Physics, Chemistry, Mathematics',
          careerPaths: ['Research Scientist', 'Lab Technician', 'Teacher'],
          averageSalary: '₹4-10 LPA',
        },
      ],
    },
    mathematics: {
      courses: [
        {
          name: 'B.Tech Engineering',
          description: 'Applied mathematics in engineering fields',
          duration: '4 years',
          eligibility: '12th with Physics, Chemistry, Mathematics',
          careerPaths: ['Engineer', 'Data Analyst', 'Research Scientist'],
          averageSalary: '₹5-12 LPA',
        },
        {
          name: 'B.Sc Mathematics',
          description: 'Pure and applied mathematics',
          duration: '3 years',
          eligibility: '12th with Mathematics',
          careerPaths: ['Mathematician', 'Statistician', 'Actuary'],
          averageSalary: '₹4-8 LPA',
        },
        {
          name: 'BCA',
          description: 'Computer applications with mathematical foundation',
          duration: '3 years',
          eligibility: '12th with Mathematics',
          careerPaths: ['Software Developer', 'System Analyst', 'Web Developer'],
          averageSalary: '₹3-8 LPA',
        },
      ],
    },
    commerce: {
      courses: [
        {
          name: 'B.Com',
          description: 'Commerce, accounting, and business studies',
          duration: '3 years',
          eligibility: '12th in any stream',
          careerPaths: ['Accountant', 'Financial Analyst', 'Business Manager'],
          averageSalary: '₹3-8 LPA',
        },
        {
          name: 'BBA',
          description: 'Business administration and management',
          duration: '3 years',
          eligibility: '12th in any stream',
          careerPaths: ['Business Analyst', 'Marketing Manager', 'HR Executive'],
          averageSalary: '₹4-10 LPA',
        },
        {
          name: 'CA',
          description: 'Chartered Accountancy professional course',
          duration: '4-5 years',
          eligibility: '12th in any stream',
          careerPaths: ['Chartered Accountant', 'Tax Consultant', 'Auditor'],
          averageSalary: '₹8-25 LPA',
        },
      ],
    },
    arts: {
      courses: [
        {
          name: 'BA English Literature',
          description: 'Study of literature, language, and communication',
          duration: '3 years',
          eligibility: '12th in any stream',
          careerPaths: ['Writer', 'Journalist', 'Teacher', 'Content Creator'],
          averageSalary: '₹3-8 LPA',
        },
        {
          name: 'BA Political Science',
          description: 'Study of government, politics, and public policy',
          duration: '3 years',
          eligibility: '12th in any stream',
          careerPaths: ['Civil Servant', 'Political Analyst', 'Diplomat'],
          averageSalary: '₹4-12 LPA',
        },
        {
          name: 'BA Psychology',
          description: 'Study of human behavior and mental processes',
          duration: '3 years',
          eligibility: '12th in any stream',
          careerPaths: ['Psychologist', 'Counselor', 'HR Specialist'],
          averageSalary: '₹3-10 LPA',
        },
      ],
    },
  };

  async getRecommendations(scores: QuizScores): Promise<StreamRecommendation[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const recommendations: StreamRecommendation[] = [];

    // Calculate stream scores and generate recommendations
    const streams = [
      {
        stream: 'Science',
        score: (scores.science + scores.mathematics + scores.technical) / 3,
        key: 'science' as const,
      },
      {
        stream: 'Mathematics',
        score: (scores.mathematics + scores.technical + scores.science * 0.5) / 2.5,
        key: 'mathematics' as const,
      },
      {
        stream: 'Commerce',
        score: (scores.commerce + scores.mathematics * 0.5 + scores.social * 0.5) / 2,
        key: 'commerce' as const,
      },
      {
        stream: 'Arts',
        score: (scores.arts + scores.social + scores.creative) / 3,
        key: 'arts' as const,
      },
    ];

    // Sort by score and take top 3
    const topStreams = streams
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    for (const streamData of topStreams) {
      const courses = this.streamMappings[streamData.key]?.courses || [];
      const reasons = this.generateReasons(streamData.key, scores);
      
      recommendations.push({
        stream: streamData.stream,
        score: Math.round(streamData.score),
        reasons,
        courses,
      });
    }

    return recommendations;
  }

  private generateReasons(stream: string, scores: QuizScores): string[] {
    const reasons: string[] = [];
    
    switch (stream) {
      case 'science':
        if (scores.science >= 70) reasons.push('Strong science aptitude');
        if (scores.mathematics >= 70) reasons.push('Excellent mathematical skills');
        if (scores.technical >= 60) reasons.push('Good technical understanding');
        break;
      case 'mathematics':
        if (scores.mathematics >= 80) reasons.push('Outstanding mathematical ability');
        if (scores.technical >= 60) reasons.push('Technical problem-solving skills');
        break;
      case 'commerce':
        if (scores.commerce >= 60) reasons.push('Business and economic understanding');
        if (scores.mathematics >= 50) reasons.push('Numerical and analytical skills');
        break;
      case 'arts':
        if (scores.arts >= 60) reasons.push('Creative and artistic abilities');
        if (scores.social >= 60) reasons.push('Social awareness and communication');
        break;
    }

    return reasons.length > 0 ? reasons : ['Based on your overall performance'];
  }
}

export const recommendationService = new RecommendationService();