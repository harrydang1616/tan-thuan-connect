
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles } from '../../styles/commonStyles';
import MapPlaceholder from '../../components/MapPlaceholder';

export default function MapScreen() {
  return (
    <SafeAreaView style={commonStyles.container}>
      <MapPlaceholder />
    </SafeAreaView>
  );
}
