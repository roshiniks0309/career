import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Phone, 
  Mail, 
  Globe,
  Star,
  Users,
  Calendar,
  Filter,
  Heart,
  ExternalLink,
  Loader
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Layout } from '../components/Layout/Layout';
import { collegeService } from '../services/collegeService';
import { College } from '../types';

export function Colleges() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchFilters, setSearchFilters] = useState({
    district: user?.district || '',
    course: '',
    type: '',
  });

  useEffect(() => {
    loadColleges();
  }, [searchFilters]);

  const loadColleges = async () => {
    setLoading(true);
    try {
      const results = await collegeService.searchColleges(searchFilters);
      setColleges(results);
    } catch (error) {
      console.error('Failed to load colleges:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setSearchFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-xl text-white p-8">
          <h1 className="text-3xl font-bold mb-2">Explore Colleges</h1>
          <p className="text-purple-100">
            Discover the best colleges in your area that offer your preferred courses
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="h-4 w-4 inline mr-1" />
                District
              </label>
              <select
                value={searchFilters.district}
                onChange={(e) => handleFilterChange('district', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Districts</option>
                {[
                  'Anantnag', 'Baramulla', 'Budgam', 'Bandipora', 'Ganderbal',
                  'Kupwara', 'Kulgam', 'Pulwama', 'Shopian', 'Srinagar',
                ].map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Search className="h-4 w-4 inline mr-1" />
                Course
              </label>
              <input
                type="text"
                placeholder="Search courses..."
                value={searchFilters.course}
                onChange={(e) => handleFilterChange('course', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="h-4 w-4 inline mr-1" />
                Type
              </label>
              <select
                value={searchFilters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="government">Government</option>
                <option value="private">Private</option>
                <option value="autonomous">Autonomous</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={loadColleges}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-12">
            <Loader className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-lg text-gray-600">Loading colleges...</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <p className="text-gray-600">
                Found <span className="font-semibold">{colleges.length}</span> colleges
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {colleges.map((college) => (
                <div key={college.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden">
                  {/* College Header */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{college.name}</h3>
                      <button className="text-gray-400 hover:text-red-500 transition-colors">
                        <Heart className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        college.type === 'government' ? 'bg-green-100 text-green-800' :
                        college.type === 'private' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {college.type.charAt(0).toUpperCase() + college.type.slice(1)}
                      </span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span>{college.ranking}/100</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                        <span>Est. {college.established}</span>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{college.location.address}</span>
                    </div>
                  </div>

                  {/* College Body */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Programs Offered</h4>
                      <div className="flex flex-wrap gap-2">
                        {college.programs.map((program) => (
                          <span
                            key={program}
                            className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm"
                          >
                            {program}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Intake Capacity</h4>
                        <div className="space-y-1">
                          {Object.entries(college.intake).slice(0, 3).map(([course, capacity]) => (
                            <div key={course} className="flex justify-between text-sm">
                              <span className="text-gray-600">{course}:</span>
                              <span className="font-medium">{capacity}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {college.cutoff && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Cutoff Marks</h4>
                          <div className="space-y-1">
                            {Object.entries(college.cutoff).slice(0, 3).map(([course, cutoff]) => (
                              <div key={course} className="flex justify-between text-sm">
                                <span className="text-gray-600">{course}:</span>
                                <span className="font-medium">{cutoff}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Facilities</h4>
                      <div className="flex flex-wrap gap-1">
                        {college.facilities.slice(0, 5).map((facility) => (
                          <span
                            key={facility}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                          >
                            {facility}
                          </span>
                        ))}
                        {college.facilities.length > 5 && (
                          <span className="text-gray-500 text-xs">+{college.facilities.length - 5} more</span>
                        )}
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="border-t border-gray-100 pt-4">
                      <div className="flex flex-wrap gap-4 text-sm">
                        {college.contact.phone && (
                          <a
                            href={`tel:${college.contact.phone}`}
                            className="flex items-center text-blue-600 hover:text-blue-700"
                          >
                            <Phone className="h-4 w-4 mr-1" />
                            Call
                          </a>
                        )}
                        {college.contact.email && (
                          <a
                            href={`mailto:${college.contact.email}`}
                            className="flex items-center text-blue-600 hover:text-blue-700"
                          >
                            <Mail className="h-4 w-4 mr-1" />
                            Email
                          </a>
                        )}
                        {college.contact.website && (
                          <a
                            href={college.contact.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-blue-600 hover:text-blue-700"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Website
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {colleges.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-24 w-24 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No colleges found</h3>
                <p className="text-gray-600">Try adjusting your search criteria</p>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}