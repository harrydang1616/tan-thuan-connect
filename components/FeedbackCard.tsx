
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FeedbackItem } from '../types';
import { colors, commonStyles } from '../styles/commonStyles';
import Icon from './Icon';
import { router } from 'expo-router';

interface FeedbackCardProps {
  feedback: FeedbackItem;
}

export default function FeedbackCard({ feedback }: FeedbackCardProps) {
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
      case 'pending': return 'Pending';
      case 'inProgress': return 'In Progress';
      case 'resolved': return 'Resolved';
      default: return status;
    }
  };

  const handlePress = () => {
    router.push(`/feedback/${feedback.id}`);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2}>{feedback.title}</Text>
          <Text style={styles.category}>{feedback.category}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(feedback.status) }]}>
          <Text style={styles.statusText}>{getStatusText(feedback.status)}</Text>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {feedback.description}
      </Text>

      <View style={styles.locationContainer}>
        <Icon name="location-outline" size={16} color={colors.textLight} />
        <Text style={styles.location} numberOfLines={1}>
          {feedback.location.address}
        </Text>
      </View>

      {feedback.images.length > 0 && (
        <Image source={{ uri: feedback.images[0] }} style={styles.image} />
      )}

      <View style={styles.footer}>
        <Text style={styles.date}>
          {feedback.createdAt.toLocaleDateString()}
        </Text>
        <View style={styles.imageCount}>
          {feedback.images.length > 0 && (
            <>
              <Icon name="camera-outline" size={14} color={colors.textLight} />
              <Text style={styles.imageCountText}>{feedback.images.length}</Text>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    ...commonStyles.card,
    marginHorizontal: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    color: colors.textLight,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textWhite,
  },
  description: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  location: {
    fontSize: 12,
    color: colors.textLight,
    marginLeft: 4,
    flex: 1,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: colors.textLight,
  },
  imageCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageCountText: {
    fontSize: 12,
    color: colors.textLight,
    marginLeft: 4,
  },
});
