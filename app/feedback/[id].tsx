
import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { colors, commonStyles } from '../../styles/commonStyles';
import { useFeedback } from '../../hooks/useFeedback';
import Icon from '../../components/Icon';

export default function FeedbackDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getFeedbackById } = useFeedback();
  
  const feedback = getFeedbackById(id!);

  if (!feedback) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={commonStyles.centerContent}>
          <Text style={commonStyles.text}>Feedback not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return colors.pending;
      case 'inProgress': return colors.inProgress;
      case 'resolved': return colors.resolved;
      default: return colors.textLight;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pending Review';
      case 'inProgress': return 'In Progress';
      case 'resolved': return 'Resolved';
      default: return status;
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Feedback Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statusSection}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(feedback.status) }]}>
            <Text style={styles.statusText}>{getStatusText(feedback.status)}</Text>
          </View>
          <Text style={styles.feedbackId}>ID: {feedback.id}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>{feedback.title}</Text>
          <Text style={styles.category}>{feedback.category}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{feedback.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.locationContainer}>
            <Icon name="location-outline" size={20} color={colors.textLight} />
            <Text style={styles.location}>{feedback.location.address}</Text>
          </View>
        </View>

        {feedback.images.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Photos</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
              {feedback.images.map((uri, index) => (
                <Image key={index} source={{ uri }} style={styles.image} />
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Timeline</Text>
          <View style={styles.timeline}>
            {feedback.timeline.map((item, index) => (
              <View key={item.id} style={styles.timelineItem}>
                <View style={styles.timelineIndicator}>
                  <View style={[
                    styles.timelineDot,
                    { backgroundColor: getStatusColor(item.status) }
                  ]} />
                  {index < feedback.timeline.length - 1 && (
                    <View style={styles.timelineLine} />
                  )}
                </View>
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineMessage}>{item.message}</Text>
                  <Text style={styles.timelineDate}>
                    {item.timestamp.toLocaleDateString()} • {item.updatedBy}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Submission Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Submitted:</Text>
            <Text style={styles.detailValue}>
              {feedback.createdAt.toLocaleDateString()} at {feedback.createdAt.toLocaleTimeString()}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Last Updated:</Text>
            <Text style={styles.detailValue}>
              {feedback.updatedAt.toLocaleDateString()} at {feedback.updatedAt.toLocaleTimeString()}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Public Status:</Text>
            <Text style={styles.detailValue}>
              {feedback.isPublic ? 'Public' : 'Under Review'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.backgroundAlt,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statusSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textWhite,
  },
  feedbackId: {
    fontSize: 12,
    color: colors.textLight,
    fontFamily: 'monospace',
  },
  section: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 8,
    flex: 1,
  },
  imageScroll: {
    marginTop: 8,
  },
  image: {
    width: 200,
    height: 150,
    borderRadius: 8,
    marginRight: 12,
  },
  timeline: {
    paddingLeft: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineIndicator: {
    alignItems: 'center',
    marginRight: 16,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  timelineLine: {
    width: 2,
    height: 24,
    backgroundColor: colors.border,
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
  },
  timelineMessage: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
    marginBottom: 4,
  },
  timelineDate: {
    fontSize: 12,
    color: colors.textLight,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.textLight,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
});
