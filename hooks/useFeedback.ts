
import { useState, useEffect } from 'react';
import { FeedbackItem } from '../types';
import { mockFeedback } from '../data/mockData';

export const useFeedback = () => {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFeedback(mockFeedback);
      setLoading(false);
    }, 1000);
  }, []);

  const addFeedback = (newFeedback: Omit<FeedbackItem, 'id' | 'createdAt' | 'updatedAt' | 'timeline'>) => {
    const feedbackItem: FeedbackItem = {
      ...newFeedback,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      timeline: [
        {
          id: Date.now().toString(),
          status: 'pending',
          message: 'Feedback submitted and under review',
          timestamp: new Date(),
          updatedBy: 'System'
        }
      ]
    };
    
    setFeedback(prev => [feedbackItem, ...prev]);
    console.log('New feedback added:', feedbackItem);
    return feedbackItem;
  };

  const getFeedbackById = (id: string) => {
    return feedback.find(item => item.id === id);
  };

  const getFeedbackByStatus = (status: 'pending' | 'inProgress' | 'resolved') => {
    return feedback.filter(item => item.status === status);
  };

  return {
    feedback,
    loading,
    addFeedback,
    getFeedbackById,
    getFeedbackByStatus
  };
};
