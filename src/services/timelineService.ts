import { TimelineEvent } from '../types';

class TimelineService {
  private events: TimelineEvent[] = [];

  async getTimelineEvents(userId: string): Promise<TimelineEvent[]> {
    return this.events
      .filter(event => event.userId === userId)
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }

  async createEvent(event: Omit<TimelineEvent, 'id' | 'createdAt'>): Promise<TimelineEvent> {
    const newEvent: TimelineEvent = {
      ...event,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    this.events.push(newEvent);
    return newEvent;
  }

  async updateEvent(id: string, updates: Partial<TimelineEvent>): Promise<TimelineEvent> {
    const index = this.events.findIndex(event => event.id === id);
    if (index === -1) {
      throw new Error('Event not found');
    }

    this.events[index] = { ...this.events[index], ...updates };
    return this.events[index];
  }

  async deleteEvent(id: string): Promise<void> {
    const index = this.events.findIndex(event => event.id === id);
    if (index !== -1) {
      this.events.splice(index, 1);
    }
  }
}

export const timelineService = new TimelineService();