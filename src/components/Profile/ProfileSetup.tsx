import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Loader } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

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

export function ProfileSetup() {
  const { profile, updateProfile, user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    class: profile?.class || '',
    board: profile?.board || '',
    district: user?.district || '',
    interests: profile?.interests || [],
    marks: profile?.marks || '',
  });
  const [loading, setLoading] = useState(false);

  const handleInterestToggle = (interest: string) => {
    const newInterests = formData.interests.includes(interest)
      ? formData.interests.filter(i => i !== interest)
      : [...formData.interests, interest];
    
    setFormData({ ...formData, interests: newInterests });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile({
        ...formData,
        marks: formData.marks ? parseInt(formData.marks) : undefined,
      });
      navigate('/quiz');
    } catch (error) {
      console.error('Profile update failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
            <p className="text-gray-600">Help us personalize your career guidance experience</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('profile.class')}
                </label>
                <select
                  value={formData.class}
                  onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                >
                  <option value="">Select your class</option>
                  {CLASSES.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('profile.board')}
                </label>
                <select
                  value={formData.board}
                  onChange={(e) => setFormData({ ...formData, board: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                >
                  <option value="">Select your board</option>
                  {BOARDS.map(board => (
                    <option key={board} value={board}>{board}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('profile.district')}
                </label>
                <select
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                >
                  <option value="">Select your district</option>
                  {DISTRICTS.map(district => (
                    <option key={district} value={district}>{district}</option>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter your latest marks"
                />
              </div>
            </div>

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
              disabled={loading || formData.interests.length < 3}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
            >
              {loading ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Save className="h-5 w-5 mr-2" />
                  Continue to Quiz
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}