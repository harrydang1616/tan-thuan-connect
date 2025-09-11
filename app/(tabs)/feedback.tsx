
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles } from '../../styles/commonStyles';
import { useFeedback } from '../../hooks/useFeedback';
import FeedbackCard from '../../components/FeedbackCard';
import StatusFilter from '../../components/StatusFilter';
import Icon from '../../components/Icon';

export default function MyFeedbackScreen() {
  const { feedback, loading } = useFeedback();
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'inProgress' | 'resolved'>('all');

  // Filter feedback for current user (in a real app, this would be based on user ID)
  const userFeedback = feedback; // For demo purposes, showing all feedback

  const filteredFeedback = selectedStatus === 'all' 
    ? userFeedback 
    : userFeedback.filter(item => item.status === selectedStatus);

  const counts = {
    all: userFeedback.length,
    pending: userFeedback.filter(item => item.status === 'pending').length,
    inProgress: userFeedback.filter(item => item.status === 'inProgress').length,
    resolved: userFeedback.filter(item => item.status === 'resolved').length,
  };

  if (loading) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={commonStyles.centerContent}>
          <Text style={commonStyles.text}>Loading your feedback...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.header}>
        <Text style={commonStyles.title}>My Feedback</Text>
        <Text style={commonStyles.textLight}>
          Track the status of your submitted feedback
        </Text>
      </View>

      <StatusFilter
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        counts={counts}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredFeedback.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="document-text-outline" size={64} color={colors.textLight} />
            <Text style={styles.emptyTitle}>
              {selectedStatus === 'all' ? 'No feedback submitted yet' : `No ${selectedStatus} feedback`}
            </Text>
            <Text style={styles.emptyText}>
              {selectedStatus === 'all' 
                ? 'Submit your first feedback to help improve our community services.'
                : `You don't have any ${selectedStatus} feedback at the moment.`
              }
            </Text>
          </View>
        ) : (
          <View style={styles.feedbackList}>
            {filteredFeedback.map((item) => (
              <FeedbackCard key={item.id} feedback={item} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.backgroundAlt,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  content: {
    flex: 1,
  },
  feedbackList: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginTop: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 24,
  },
});
