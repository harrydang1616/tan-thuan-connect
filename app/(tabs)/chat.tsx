
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles } from '../../styles/commonStyles';
import ChatBot from '../../components/ChatBot';

export default function ChatScreen() {
  return (
    <SafeAreaView style={commonStyles.container}>
      <ChatBot />
    </SafeAreaView>
  );
}
