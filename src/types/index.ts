
export interface Hackathon {
  id: string;
  title: string;
  date: string; // The event date
  lastDateToApply: string; // The deadline
  city: string;
  mode: 'Online' | 'Offline';
  image: string;
  tags: string[];
  description?: string;
  prizePool?: string;
}

export type ViewType = 'grid' | 'calendar';

export interface AIRecommendation {
  reason: string;
  suggestedRole: string;
}
