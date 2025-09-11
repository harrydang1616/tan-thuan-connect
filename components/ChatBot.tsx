
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
import { ChatMessage } from '../types';
import { mockChatMessages, faqData } from '../data/mockData';
import Icon from './Icon';

export default function ChatBot() {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check FAQ data for relevant responses
    for (const faq of faqData) {
      if (lowerMessage.includes(faq.question.toLowerCase().split(' ')[0]) || 
          lowerMessage.includes(faq.question.toLowerCase().split(' ')[1])) {
        return faq.answer;
      }
    }

    // Keyword-based responses
    if (lowerMessage.includes('submit') || lowerMessage.includes('report')) {
      return 'To submit feedback, tap the "+" button on the main screen, take photos of the issue, add a description, and select the appropriate category. Your feedback will be reviewed within 24-48 hours.';
    }
    
    if (lowerMessage.includes('status') || lowerMessage.includes('track')) {
      return 'You can track your feedback status in real-time through the app. Go to "My Feedback" to see all your submissions and their current status.';
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('phone')) {
      return 'You can contact Tân Thuận Ward office at: Phone: (028) 3742-1234, Email: contact@tanthuanward.gov.vn, Address: 123 Nguyen Van Cu, Tan Thuan Ward, District 7, Ho Chi Minh City.';
    }
    
    if (lowerMessage.includes('emergency')) {
      return 'For emergencies, please call: Police: 113, Fire Department: 114, Medical Emergency: 115. For non-emergency issues, you can submit feedback through this app.';
    }

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return 'Hello! I&apos;m here to help you with any questions about Tân Thuận Ward services. You can ask me about submitting feedback, tracking status, contact information, or general ward services.';
    }

    // Default response
    return 'I&apos;m here to help! You can ask me about submitting feedback, tracking your reports, contact information, emergency numbers, or general ward services. What would you like to know?';
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: generateBotResponse(userMessage.message),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const renderMessage = (message: ChatMessage) => (
    <View
      key={message.id}
      style={[
        styles.messageContainer,
        message.isUser ? styles.userMessage : styles.botMessage
      ]}
    >
      <View style={[
        styles.messageBubble,
        message.isUser ? styles.userBubble : styles.botBubble
      ]}>
        <Text style={[
          styles.messageText,
          message.isUser ? styles.userText : styles.botText
        ]}>
          {message.message}
        </Text>
      </View>
      <Text style={styles.timestamp}>
        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Icon name="chatbubble-ellipses-outline" size={24} color={colors.primary} />
        <Text style={styles.headerTitle}>AI Tân Thuận</Text>
        <View style={styles.onlineIndicator} />
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
      >
        {messages.map(renderMessage)}
        
        {isTyping && (
          <View style={[styles.messageContainer, styles.botMessage]}>
            <View style={[styles.messageBubble, styles.botBubble]}>
              <Text style={styles.typingText}>AI Tân Thuận is typing...</Text>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
          placeholderTextColor={colors.textLight}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={!inputText.trim()}
          activeOpacity={0.7}
        >
          <Icon name="send" size={20} color={colors.textWhite} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.backgroundAlt,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 12,
    flex: 1,
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.resolved,
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  botMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: colors.backgroundAlt,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: colors.textWhite,
  },
  botText: {
    color: colors.text,
  },
  timestamp: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 4,
  },
  typingText: {
    fontSize: 14,
    color: colors.textLight,
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    backgroundColor: colors.backgroundAlt,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  textInput: {
    flex: 1,
    ...commonStyles.input,
    marginRight: 12,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: colors.primary,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: colors.textLight,
  },
});
