import { QuizItem, QuizScores } from '../types';

class QuizService {
  private quizItems: QuizItem[] = [
    {
      id: '1',
      domain: 'science',
      question: 'Which of the following is the chemical formula for water?',
      options: ['H2O', 'CO2', 'NaCl', 'CH4'],
      correctAnswer: 0,
      difficulty: 'easy',
      language: 'en',
    },
    {
      id: '2',
      domain: 'mathematics',
      question: 'What is the value of π (pi) approximately?',
      options: ['3.14', '2.14', '4.14', '1.14'],
      correctAnswer: 0,
      difficulty: 'easy',
      language: 'en',
    },
    {
      id: '3',
      domain: 'commerce',
      question: 'What does GDP stand for?',
      options: ['Gross Domestic Product', 'General Development Plan', 'Global Distribution Process', 'Government Data Portal'],
      correctAnswer: 0,
      difficulty: 'medium',
      language: 'en',
    },
    {
      id: '4',
      domain: 'arts',
      question: 'Who painted the Mona Lisa?',
      options: ['Leonardo da Vinci', 'Pablo Picasso', 'Vincent van Gogh', 'Michelangelo'],
      correctAnswer: 0,
      difficulty: 'easy',
      language: 'en',
    },
    {
      id: '5',
      domain: 'technical',
      question: 'What does CPU stand for in computers?',
      options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Program Utility', 'Computer Processing Unit'],
      correctAnswer: 0,
      difficulty: 'easy',
      language: 'en',
    },
    {
      id: '6',
      domain: 'creative',
      question: 'Which color is created by mixing red and blue?',
      options: ['Purple', 'Green', 'Orange', 'Yellow'],
      correctAnswer: 0,
      difficulty: 'easy',
      language: 'en',
    },
    {
      id: '7',
      domain: 'social',
      question: 'Who was the first Prime Minister of India?',
      options: ['Jawaharlal Nehru', 'Mahatma Gandhi', 'Sardar Patel', 'Dr. Rajendra Prasad'],
      correctAnswer: 0,
      difficulty: 'easy',
      language: 'en',
    },
    {
      id: '8',
      domain: 'science',
      question: 'What is the speed of light in vacuum?',
      options: ['3 × 10⁸ m/s', '3 × 10⁶ m/s', '3 × 10¹⁰ m/s', '3 × 10⁴ m/s'],
      correctAnswer: 0,
      difficulty: 'medium',
      language: 'en',
    },
    {
      id: '9',
      domain: 'mathematics',
      question: 'What is the derivative of x²?',
      options: ['2x', 'x²', '2x²', 'x'],
      correctAnswer: 0,
      difficulty: 'medium',
      language: 'en',
    },
    {
      id: '10',
      domain: 'commerce',
      question: 'What is inflation?',
      options: ['Rise in general price levels', 'Fall in prices', 'Stable prices', 'Fixed prices'],
      correctAnswer: 0,
      difficulty: 'medium',
      language: 'en',
    },
  ];

  async getQuizItems(): Promise<QuizItem[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...this.quizItems];
  }

  async submitQuiz(answers: number[]): Promise<QuizScores> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const domainScores = {
      science: 0,
      mathematics: 0,
      commerce: 0,
      arts: 0,
      technical: 0,
      creative: 0,
      social: 0,
    };

    let totalCorrect = 0;
    
    answers.forEach((answer, index) => {
      const item = this.quizItems[index];
      if (item && answer === item.correctAnswer) {
        domainScores[item.domain as keyof typeof domainScores]++;
        totalCorrect++;
      }
    });

    // Convert to percentages
    const scores: QuizScores = {
      science: (domainScores.science / 2) * 100,
      mathematics: (domainScores.mathematics / 2) * 100,
      commerce: (domainScores.commerce / 2) * 100,
      arts: domainScores.arts * 100,
      technical: domainScores.technical * 100,
      creative: domainScores.creative * 100,
      social: domainScores.social * 100,
      totalScore: (totalCorrect / this.quizItems.length) * 100,
    };

    return scores;
  }
}

export const quizService = new QuizService();