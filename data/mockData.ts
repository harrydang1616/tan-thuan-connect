
import { FeedbackItem, Category, ChatMessage } from '../types';

export const categories: Category[] = [
  { id: '1', name: 'Infrastructure', icon: 'construct-outline', color: '#FF9800' },
  { id: '2', name: 'Environment', icon: 'leaf-outline', color: '#4CAF50' },
  { id: '3', name: 'Security', icon: 'shield-outline', color: '#F44336' },
  { id: '4', name: 'Public Services', icon: 'people-outline', color: '#2196F3' },
  { id: '5', name: 'Transportation', icon: 'car-outline', color: '#9C27B0' },
  { id: '6', name: 'Other', icon: 'ellipsis-horizontal-outline', color: '#607D8B' },
];

export const mockFeedback: FeedbackItem[] = [
  {
    id: '1',
    title: 'Broken streetlight on Nguyen Van Cu',
    description: 'The streetlight has been broken for 3 days, making the area unsafe at night.',
    category: 'Infrastructure',
    status: 'inProgress',
    location: {
      latitude: 10.7329,
      longitude: 106.7172,
      address: 'Nguyen Van Cu Street, Tan Thuan Ward'
    },
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-16'),
    citizenId: 'citizen1',
    isPublic: true,
    timeline: [
      {
        id: '1',
        status: 'pending',
        message: 'Feedback submitted',
        timestamp: new Date('2024-01-15'),
        updatedBy: 'System'
      },
      {
        id: '2',
        status: 'inProgress',
        message: 'Assigned to maintenance team',
        timestamp: new Date('2024-01-16'),
        updatedBy: 'Admin'
      }
    ]
  },
  {
    id: '2',
    title: 'Illegal dumping near park',
    description: 'Large amount of construction waste dumped illegally near the community park.',
    category: 'Environment',
    status: 'pending',
    location: {
      latitude: 10.7350,
      longitude: 106.7190,
      address: 'Community Park, Tan Thuan Ward'
    },
    images: ['https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400'],
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17'),
    citizenId: 'citizen2',
    isPublic: true,
    timeline: [
      {
        id: '3',
        status: 'pending',
        message: 'Feedback submitted and under review',
        timestamp: new Date('2024-01-17'),
        updatedBy: 'System'
      }
    ]
  },
  {
    id: '3',
    title: 'Pothole repair completed',
    description: 'Large pothole on main road has been successfully repaired.',
    category: 'Infrastructure',
    status: 'resolved',
    location: {
      latitude: 10.7310,
      longitude: 106.7150,
      address: 'Main Road, Tan Thuan Ward'
    },
    images: ['https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400'],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-14'),
    citizenId: 'citizen3',
    isPublic: true,
    timeline: [
      {
        id: '4',
        status: 'pending',
        message: 'Feedback submitted',
        timestamp: new Date('2024-01-10'),
        updatedBy: 'System'
      },
      {
        id: '5',
        status: 'inProgress',
        message: 'Road maintenance team assigned',
        timestamp: new Date('2024-01-12'),
        updatedBy: 'Admin'
      },
      {
        id: '6',
        status: 'resolved',
        message: 'Pothole repair completed',
        timestamp: new Date('2024-01-14'),
        updatedBy: 'Maintenance Team'
      }
    ]
  }
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    message: 'Hello! I&apos;m AI Tân Thuận, your virtual assistant. How can I help you today?',
    isUser: false,
    timestamp: new Date()
  }
];

export const faqData = [
  {
    question: 'How do I submit feedback?',
    answer: 'You can submit feedback by tapping the "+" button on the main screen, taking photos, adding a description, and selecting the appropriate category.'
  },
  {
    question: 'How long does it take to process feedback?',
    answer: 'Feedback is typically reviewed within 24-48 hours. Processing time depends on the complexity and category of the issue.'
  },
  {
    question: 'Can I track my feedback status?',
    answer: 'Yes! You can track your feedback status in real-time through the app. You&apos;ll see updates as your feedback moves through different stages.'
  },
  {
    question: 'What types of issues can I report?',
    answer: 'You can report infrastructure problems, environmental issues, security concerns, public service issues, transportation problems, and more.'
  },
  {
    question: 'Is my personal information safe?',
    answer: 'Yes, we take privacy seriously. Your personal information is protected and only used for processing your feedback.'
  }
];
