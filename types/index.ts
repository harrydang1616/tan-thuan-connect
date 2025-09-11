
export interface FeedbackItem {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'inProgress' | 'resolved';
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  citizenId: string;
  isPublic: boolean;
  timeline: TimelineItem[];
}

export interface TimelineItem {
  id: string;
  status: 'pending' | 'inProgress' | 'resolved';
  message: string;
  timestamp: Date;
  updatedBy: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'citizen' | 'admin' | 'staff';
  avatar?: string;
}

export interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}
