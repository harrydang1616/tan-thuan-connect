
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
import Icon from './Icon';

export default function MapPlaceholder() {
  return (
    <View style={styles.container}>
      <Icon name="map-outline" size={48} color={colors.textLight} />
      <Text style={styles.title}>Interactive Map</Text>
      <Text style={styles.subtitle}>
        Maps are not supported in Natively right now
      </Text>
      <Text style={styles.description}>
        This would display feedback markers on a map of Tân Thuận Ward, 
        color-coded by status (pending/in progress/resolved).
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...commonStyles.card,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
    margin: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 12,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textLight,
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 18,
  },
});
