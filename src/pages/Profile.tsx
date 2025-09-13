import React, { useState } from 'react';
import { Save, User, Mail, MapPin, Calendar, Award, BookOpen, Loader } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Layout } from '../components/Layout/Layout';

const CLASSES = ['10th', '11th', '12th', 'Graduate', 'Post Graduate'];
const BOARDS = ['JKBOSE', 'CBSE', 'ICSE', 'University', 'Other'];
const DISTRICTS = [
  'Anantnag', 'Baramulla', 'Budgam', 'Bandipora', 'Ganderbal',
  'Kupwara', 'Kulgam', 'Pulwama', 'Shopian', 'Srinagar',
  'Doda', 'Jammu', 'Kathua', 'Kishtwar', 'Poonch',
  'Rajouri', 'Ramban', 'Reasi', 'Samba', 'Udhampur'
];

const INTERESTS = [
  'Science & Research', 'Technology & Programming', 'Mathematics & Analytics',
  'Business & Commerce', 'Arts & Literature', 'Social Sciences',
  'Healthcare & Medicine', 'Engineering', 'Teaching & Education',
  'Sports & Fitness', 'Music & Entertainment', 'Design & Creativity'
];

export function Profile() {
  const { user, profile, updateProfile } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    class: profile?.class || '',
    board: profile?.board || '',
    district: user?.district || '',
    interests: profile?.interests || [],
    marks: profile?.marks?.toString() || '',
  });

  const handleInterestToggle = (interest: string) => {
    const newInterests = formData.interests.includes(interest)
      ? formData.interests.filter(i => i !== interest)
      : [...formData.interests, interest];
    
    setFormData({ ...formData, interests: newInterests });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      await updateProfile({
        ...formData,
        marks: formData.marks ? parseInt(formData.marks) : undefined,
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Profile update failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl shadow-xl text-white p-8">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-white bg-opacity-20 rounded-full">
              <User className="h-12 w-12" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
              <p className="text-indigo-100">
                Manage your personal information and preferences
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
              
              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                  Profile updated successfully!
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="h-4 w-4 inline mr-1" />
                      Email
                    </label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="h-4 w-4 inline mr-1" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={user?.name || ''}
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>
                </div>

                {/* Academic Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <BookOpen className="h-4 w-4 inline mr-1" />
                      {t('profile.class')}
                    </label>
                    <select
                      value={formData.class}
                      onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select your class</option>
                      {CLASSES.map(cls => (
                        <option key={cls} value={cls}>{cls}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="h-4 w-4 inline mr-1" />
                      {t('profile.board')}
                    </label>
                    <select
                      value={formData.board}
                      onChange={(e) => setFormData({ ...formData, board: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select your board</option>
                      {BOARDS.map(board => (
                        <option key={board} value={board}>{board}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Latest Marks (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.marks}
                      onChange={(e) => setFormData({ ...formData, marks: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter marks"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    {t('profile.district')}
                  </label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select your district</option>
                    {DISTRICTS.map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>

                {/* Interests */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    {t('profile.interests')} (Select at least 3)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {INTERESTS.map(interest => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => handleInterestToggle(interest)}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                          formData.interests.includes(interest)
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                >
                  {loading ? (
                    <Loader className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <Save className="h-5 w-5 mr-2" />
                      {t('common.save')}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Language Preference */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Language Preference</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setLanguage('en')}
                  className={`w-full p-3 rounded-lg text-left transition-colors ${
                    language === 'en' 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('hi')}
                  className={`w-full p-3 rounded-lg text-left transition-colors ${
                    language === 'hi' 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  हिन्दी (Hindi)
                </button>
              </div>
            </div>

            {/* Quiz Status */}
            {profile && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Award className="h-5 w-5 text-blue-600 mr-2" />
                  Assessment Status
                </h3>
                <div className="space-y-3">
                  <div className={`p-3 rounded-lg ${
                    profile.completedQuiz ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-600'
                  }`}>
                    <div className="font-medium">Aptitude Quiz</div>
                    <div className="text-sm">
                      {profile.completedQuiz ? 'Completed ✓' : 'Not completed'}
                    </div>
                  </div>
                  
                  {profile.completedQuiz && profile.quizScores && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium text-blue-700">Overall Score</div>
                      <div className="text-2xl font-bold text-blue-600">
                        {Math.round(profile.quizScores.totalScore)}%
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Account Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Member since:</span>
                  <div>{new Date(user?.createdAt || '').toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="font-medium">Account type:</span>
                  <div className="capitalize">{user?.role}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}