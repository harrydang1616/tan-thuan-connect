
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles } from '../../styles/commonStyles';
import { useFeedback } from '../../hooks/useFeedback';
import FeedbackCard from '../../components/FeedbackCard';
import StatusFilter from '../../components/StatusFilter';
import Icon from '../../components/Icon';
import { router } from 'expo-router';

export default function HomeScreen() {
  const { feedback, loading } = useFeedback();
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'inProgress' | 'resolved'>('all');

  const filteredFeedback = selectedStatus === 'all' 
    ? feedback 
    : feedback.filter(item => item.status === selectedStatus);

  const counts = {
    all: feedback.length,
    pending: feedback.filter(item => item.status === 'pending').length,
    inProgress: feedback.filter(item => item.status === 'inProgress').length,
    resolved: feedback.filter(item => item.status === 'resolved').length,
  };

  const handleSubmitFeedback = () => {
    router.push('/(tabs)/submit');
  };

  if (loading) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={commonStyles.centerContent}>
          <Text style={commonStyles.text}>Loading feedback...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.header}>
        <View>
          <Text style={commonStyles.title}>Tân Thuận Ward</Text>
          <Text style={commonStyles.textLight}>Citizen Feedback System</Text>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitFeedback}>
          <Icon name="add" size={24} color={colors.textWhite} />
        </TouchableOpacity>
      </View>

      <StatusFilter
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        counts={counts}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{counts.pending}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{counts.inProgress}</Text>
            <Text style={styles.statLabel}>In Progress</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{counts.resolved}</Text>
            <Text style={styles.statLabel}>Resolved</Text>
          </View>
        </View>

        <View style={styles.feedbackSection}>
          <Text style={styles.sectionTitle}>
            {selectedStatus === 'all' ? 'Recent Feedback' : `${selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)} Feedback`}
          </Text>
          
          {filteredFeedback.length === 0 ? (
            <View style={styles.emptyState}>
              <Icon name="document-outline" size={48} color={colors.textLight} />
              <Text style={styles.emptyTitle}>No feedback found</Text>
              <Text style={styles.emptyText}>
                {selectedStatus === 'all' 
                  ? 'Be the first to submit feedback to help improve our community!'
                  : `No ${selectedStatus} feedback at the moment.`
                }
              </Text>
            </View>
          ) : (
            filteredFeedback.map((item) => (
              <FeedbackCard key={item.id} feedback={item} />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.backgroundAlt,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  submitButton: {
    backgroundColor: colors.primary,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.backgroundAlt,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
    fontWeight: '500',
  },
  feedbackSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
});
