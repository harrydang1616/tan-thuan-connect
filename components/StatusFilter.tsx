
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../styles/commonStyles';

interface StatusFilterProps {
  selectedStatus: 'all' | 'pending' | 'inProgress' | 'resolved';
  onStatusChange: (status: 'all' | 'pending' | 'inProgress' | 'resolved') => void;
  counts: {
    all: number;
    pending: number;
    inProgress: number;
    resolved: number;
  };
}

export default function StatusFilter({ selectedStatus, onStatusChange, counts }: StatusFilterProps) {
  const filters = [
    { key: 'all', label: 'All', count: counts.all },
    { key: 'pending', label: 'Pending', count: counts.pending },
    { key: 'inProgress', label: 'In Progress', count: counts.inProgress },
    { key: 'resolved', label: 'Resolved', count: counts.resolved },
  ] as const;

  return (
    <View style={styles.container}>
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter.key}
          style={[
            styles.filterButton,
            selectedStatus === filter.key && styles.activeFilter
          ]}
          onPress={() => onStatusChange(filter.key)}
          activeOpacity={0.7}
        >
          <Text style={[
            styles.filterText,
            selectedStatus === filter.key && styles.activeFilterText
          ]}>
            {filter.label}
          </Text>
          <Text style={[
            styles.countText,
            selectedStatus === filter.key && styles.activeCountText
          ]}>
            {filter.count}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: colors.backgroundAlt,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: colors.background,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeFilter: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  activeFilterText: {
    color: colors.textWhite,
  },
  countText: {
    fontSize: 10,
    fontWeight: '500',
    color: colors.textLight,
    marginTop: 2,
  },
  activeCountText: {
    color: colors.textWhite,
  },
});
