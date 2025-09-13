import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Star, 
  BookOpen, 
  Briefcase, 
  GraduationCap,
  ArrowRight,
  Target,
  Award,
  Loader
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Layout } from '../components/Layout/Layout';
import { recommendationService } from '../services/recommendationService';
import { StreamRecommendation } from '../types';

export function Results() {
  const { profile } = useAuth();
  const { t } = useLanguage();
  const [recommendations, setRecommendations] = useState<StreamRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile?.quizScores) {
      loadRecommendations();
    }
  }, [profile]);

  const loadRecommendations = async () => {
    if (!profile?.quizScores) return;
    
    try {
      const recs = await recommendationService.getRecommendations(profile.quizScores);
      setRecommendations(recs);
    } catch (error) {
      console.error('Failed to load recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!profile?.completedQuiz) {
    return (
      <Layout>
        <div className="text-center py-12">
          <Brain className="h-24 w-24 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Assessment</h1>
          <p className="text-gray-600 mb-6">Take the quiz to see your personalized recommendations</p>
          <Link
            to="/quiz"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            <Brain className="h-5 w-5" />
            <span>Start Quiz</span>
          </Link>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-12">
          <Loader className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-600">Generating your recommendations...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl shadow-xl text-white p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Your Results Are Ready!</h1>
              <p className="text-green-100 mb-4">
                Based on your assessment, here are your personalized career recommendations
              </p>
              <div className="flex items-center space-x-4">
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <div className="text-2xl font-bold">{profile.quizScores?.totalScore?.toFixed(0)}%</div>
                  <div className="text-sm">Overall Score</div>
                </div>
              </div>
            </div>
            <Award className="h-24 w-24 text-green-200" />
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
            Your Aptitude Breakdown
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {profile.quizScores && Object.entries(profile.quizScores)
              .filter(([key]) => key !== 'totalScore')
              .map(([domain, score]) => (
                <div key={domain} className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{Math.round(score)}%</div>
                  <div className="text-sm text-gray-600 capitalize">{domain}</div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Stream Recommendations */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Star className="h-7 w-7 text-yellow-500 mr-2" />
            Recommended Streams
          </h2>
          
          {recommendations.map((rec, index) => (
            <div key={rec.stream} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="bg-white bg-opacity-20 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                        #{index + 1}
                      </span>
                      <h3 className="text-2xl font-bold">{rec.stream}</h3>
                    </div>
                    <div className="text-xl font-semibold text-blue-100">
                      {rec.score}% Match
                    </div>
                  </div>
                  <Target className="h-16 w-16 text-blue-200" />
                </div>
                
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Why this is perfect for you:</h4>
                  <ul className="list-disc list-inside space-y-1 text-blue-100">
                    {rec.reasons.map((reason, idx) => (
                      <li key={idx}>{reason}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <BookOpen className="h-6 w-6 text-blue-600 mr-2" />
                  Recommended Courses
                </h4>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {rec.courses.map((course, courseIndex) => (
                    <div key={courseIndex} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h5 className="font-semibold text-gray-900 mb-2">{course.name}</h5>
                      <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Duration:</span>
                          <span className="font-medium text-gray-700">{course.duration}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Avg. Salary:</span>
                          <span className="font-medium text-green-600">{course.averageSalary}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="text-xs text-gray-500 mb-2">Eligibility:</div>
                        <div className="text-sm text-gray-700">{course.eligibility}</div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="text-xs text-gray-500 mb-2">Career Paths:</div>
                        <div className="flex flex-wrap gap-1">
                          {course.careerPaths.slice(0, 3).map((career, careerIndex) => (
                            <span key={careerIndex} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                              {career}
                            </span>
                          ))}
                          {course.careerPaths.length > 3 && (
                            <span className="text-gray-500 text-xs">+{course.careerPaths.length - 3} more</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg text-white p-6">
          <h2 className="text-xl font-bold mb-4">Ready for the Next Step?</h2>
          <p className="mb-6">Explore colleges that offer your recommended courses and create your application timeline.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/colleges"
              className="flex items-center justify-center space-x-2 bg-white text-orange-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              <GraduationCap className="h-5 w-5" />
              <span>Find Colleges</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/timeline"
              className="flex items-center justify-center space-x-2 bg-white bg-opacity-20 text-white border-2 border-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-orange-600 transition-all duration-200"
            >
              <Briefcase className="h-5 w-5" />
              <span>Plan Your Timeline</span>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}