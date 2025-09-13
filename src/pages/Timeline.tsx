import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  BookOpen,
  FileText,
  GraduationCap,
  DollarSign,
  UserCheck,
  Trash2,
  Edit3
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Layout } from '../components/Layout/Layout';
import { timelineService } from '../services/timelineService';
import { TimelineEvent } from '../types';

export function Timeline() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    dueDate: '',
    category: 'application' as TimelineEvent['category'],
  });

  const categories = [
    { value: 'application', label: 'Application', icon: FileText, color: 'blue' },
    { value: 'exam', label: 'Exam', icon: BookOpen, color: 'purple' },
    { value: 'scholarship', label: 'Scholarship', icon: DollarSign, color: 'green' },
    { value: 'document', label: 'Document', icon: FileText, color: 'orange' },
    { value: 'interview', label: 'Interview', icon: UserCheck, color: 'red' },
  ];

  useEffect(() => {
    if (user) {
      loadEvents();
    }
  }, [user]);

  const loadEvents = async () => {
    if (!user) return;
    try {
      const userEvents = await timelineService.getTimelineEvents(user.id);
      setEvents(userEvents);
    } catch (error) {
      console.error('Failed to load events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const event = await timelineService.createEvent({
        ...newEvent,
        userId: user.id,
        status: 'pending',
      });
      setEvents(prev => [...prev, event].sort((a, b) => 
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      ));
      setNewEvent({
        title: '',
        description: '',
        dueDate: '',
        category: 'application',
      });
      setShowAddForm(false);
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  const handleToggleStatus = async (eventId: string, currentStatus: TimelineEvent['status']) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    try {
      const updatedEvent = await timelineService.updateEvent(eventId, { status: newStatus });
      setEvents(prev => prev.map(event => 
        event.id === eventId ? updatedEvent : event
      ));
    } catch (error) {
      console.error('Failed to update event:', error);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      await timelineService.deleteEvent(eventId);
      setEvents(prev => prev.filter(event => event.id !== eventId));
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  const getCategoryInfo = (category: TimelineEvent['category']) => {
    return categories.find(cat => cat.value === category) || categories[0];
  };

  const getStatusColor = (status: TimelineEvent['status'], dueDate: string) => {
    if (status === 'completed') return 'text-green-600 bg-green-100';
    
    const now = new Date();
    const due = new Date(dueDate);
    const daysUntilDue = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDue < 0) return 'text-red-600 bg-red-100';
    if (daysUntilDue <= 7) return 'text-orange-600 bg-orange-100';
    return 'text-blue-600 bg-blue-100';
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your timeline...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-pink-600 rounded-2xl shadow-xl text-white p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Your Timeline</h1>
              <p className="text-orange-100">
                Keep track of your applications, deadlines, and milestones
              </p>
            </div>
            <Calendar className="h-24 w-24 text-orange-200" />
          </div>
        </div>

        {/* Add Event Button */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Upcoming Events</h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            <Plus className="h-5 w-5" />
            <span>Add Event</span>
          </button>
        </div>

        {/* Add Event Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Event</h3>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Submit application to ABC College"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    value={newEvent.dueDate}
                    onChange={(e) => setNewEvent({ ...newEvent, dueDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value as TimelineEvent['category'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Additional details about this event..."
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Add Event
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Events List */}
        {events.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <Calendar className="h-24 w-24 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No events yet</h3>
            <p className="text-gray-600 mb-6">
              Add your first event to start tracking your progress
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              <Plus className="h-5 w-5" />
              <span>Add Your First Event</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => {
              const categoryInfo = getCategoryInfo(event.category);
              const CategoryIcon = categoryInfo.icon;
              const statusColor = getStatusColor(event.status, event.dueDate);
              
              return (
                <div
                  key={event.id}
                  className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${
                    event.status === 'completed' ? 'border-green-500' : 
                    `border-${categoryInfo.color}-500`
                  } hover:shadow-xl transition-shadow duration-200`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`p-3 rounded-full bg-${categoryInfo.color}-100`}>
                        <CategoryIcon className={`h-6 w-6 text-${categoryInfo.color}-600`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className={`text-lg font-semibold ${
                            event.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'
                          }`}>
                            {event.title}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                            {event.status === 'completed' ? 'Completed' : 
                             new Date(event.dueDate) < new Date() ? 'Overdue' : 'Pending'}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>Due: {formatDate(event.dueDate)}</span>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs bg-${categoryInfo.color}-100 text-${categoryInfo.color}-800`}>
                            {categoryInfo.label}
                          </span>
                        </div>
                        
                        {event.description && (
                          <p className="text-gray-600 text-sm">{event.description}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleToggleStatus(event.id, event.status)}
                        className={`p-2 rounded-full transition-colors ${
                          event.status === 'completed' 
                            ? 'text-green-600 bg-green-100 hover:bg-green-200' 
                            : 'text-gray-400 hover:text-green-600 hover:bg-green-100'
                        }`}
                      >
                        <CheckCircle2 className="h-5 w-5" />
                      </button>
                      
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="p-2 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}