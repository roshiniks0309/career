import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  GraduationCap, 
  Calendar, 
  Trophy, 
  TrendingUp,
  BookOpen,
  Target,
  Zap,
  Award,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Layout } from '../components/Layout/Layout';

export function Dashboard() {
  const { user, profile } = useAuth();
  const { t } = useLanguage();
  const [achievements, setAchievements] = useState([
    { id: '1', name: 'Profile Complete', description: 'Completed your profile setup', icon: 'CheckCircle', earned: !!profile?.class },
    { id: '2', name: 'Quiz Master', description: 'Completed the aptitude assessment', icon: 'Brain', earned: !!profile?.completedQuiz },
    { id: '3', name: 'Explorer', description: 'Viewed college recommendations', icon: 'GraduationCap', earned: false },
    { id: '4', name: 'Planner', description: 'Created your first timeline event', icon: 'Calendar', earned: false },
  ]);

  const getNextStep = () => {
    if (!profile?.class) return { text: 'Complete your profile', link: '/profile-setup', icon: Target };
    if (!profile?.completedQuiz) return { text: 'Take the aptitude quiz', link: '/quiz', icon: Brain };
    return { text: 'Explore colleges', link: '/colleges', icon: GraduationCap };
  };

  const nextStep = getNextStep();
  const completionPercentage = Math.round(((profile?.class ? 25 : 0) + (profile?.completedQuiz ? 50 : 0) + 25));

  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl text-white p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-blue-100 mb-4">
                Continue your journey to find the perfect career path
              </p>
              <Link
                to={nextStep.link}
                className="inline-flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                <nextStep.icon className="h-5 w-5" />
                <span>{nextStep.text}</span>
              </Link>
            </div>
            <div className="hidden md:block">
              <Trophy className="h-24 w-24 text-blue-200" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Overview */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Progress</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Profile Completion</span>
                  <span className="text-sm font-medium text-blue-600">{completionPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className={`p-4 rounded-lg border-2 ${profile?.class ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className={`h-6 w-6 ${profile?.class ? 'text-green-600' : 'text-gray-400'}`} />
                    <div>
                      <h3 className="font-medium text-gray-900">Profile Setup</h3>
                      <p className="text-sm text-gray-600">Basic information completed</p>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-lg border-2 ${profile?.completedQuiz ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex items-center space-x-3">
                    <Brain className={`h-6 w-6 ${profile?.completedQuiz ? 'text-green-600' : 'text-gray-400'}`} />
                    <div>
                      <h3 className="font-medium text-gray-900">Aptitude Assessment</h3>
                      <p className="text-sm text-gray-600">Discover your strengths</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  to="/quiz"
                  className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                >
                  <Brain className="h-8 w-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-medium text-gray-900">Take Quiz</h3>
                  <p className="text-sm text-gray-600">Assess your aptitude</p>
                </Link>

                <Link
                  to="/colleges"
                  className="p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group"
                >
                  <GraduationCap className="h-8 w-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-medium text-gray-900">Find Colleges</h3>
                  <p className="text-sm text-gray-600">Explore options nearby</p>
                </Link>

                <Link
                  to="/timeline"
                  className="p-4 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 group"
                >
                  <Calendar className="h-8 w-8 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-medium text-gray-900">Plan Timeline</h3>
                  <p className="text-sm text-gray-600">Track your progress</p>
                </Link>
              </div>
            </div>

            {/* Results Preview */}
            {profile?.completedQuiz && profile?.quizScores && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Your Strengths</h2>
                  <Link to="/results" className="text-blue-600 hover:text-blue-700 font-medium">
                    View Details →
                  </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(profile.quizScores)
                    .filter(([key]) => key !== 'totalScore')
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 4)
                    .map(([domain, score]) => (
                      <div key={domain} className="text-center p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{Math.round(score)}%</div>
                        <div className="text-sm text-gray-600 capitalize">{domain}</div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Achievements Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="h-6 w-6 text-yellow-500 mr-2" />
                Achievements
              </h2>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-3 rounded-lg border ${
                      achievement.earned
                        ? 'border-yellow-200 bg-yellow-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        achievement.earned ? 'bg-yellow-100' : 'bg-gray-100'
                      }`}>
                        {achievement.earned ? (
                          <CheckCircle className="h-5 w-5 text-yellow-600" />
                        ) : (
                          <Trophy className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <h3 className={`font-medium ${
                          achievement.earned ? 'text-yellow-800' : 'text-gray-600'
                        }`}>
                          {achievement.name}
                        </h3>
                        <p className={`text-xs ${
                          achievement.earned ? 'text-yellow-600' : 'text-gray-500'
                        }`}>
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-6 w-6 text-blue-500 mr-2" />
                Recent Activity
              </h2>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Profile updated</span>
                </div>
                {profile?.completedQuiz && (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Quiz completed</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Account created</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}