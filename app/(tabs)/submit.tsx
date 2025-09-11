
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { colors, commonStyles } from '../../styles/commonStyles';
import { categories } from '../../data/mockData';
import { useFeedback } from '../../hooks/useFeedback';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import { router } from 'expo-router';

export default function SubmitScreen() {
  const { addFeedback } = useFeedback();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions to add images.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setImages(prev => [...prev, result.assets[0].uri]);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera permissions to take photos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setImages(prev => [...prev, result.assets[0].uri]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim() || !selectedCategory) {
      Alert.alert('Missing Information', 'Please fill in all required fields and select a category.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newFeedback = addFeedback({
        title: title.trim(),
        description: description.trim(),
        category: selectedCategory,
        status: 'pending',
        location: {
          latitude: 10.7329,
          longitude: 106.7172,
          address: 'Tân Thuận Ward, District 7, Ho Chi Minh City'
        },
        images,
        citizenId: 'current-user',
        isPublic: false, // Will be set to true after admin approval
      });

      Alert.alert(
        'Feedback Submitted!',
        'Thank you for your feedback. It will be reviewed by our team within 24-48 hours.',
        [
          {
            text: 'View Feedback',
            onPress: () => router.push(`/feedback/${newFeedback.id}`)
          },
          {
            text: 'Submit Another',
            onPress: () => {
              setTitle('');
              setDescription('');
              setSelectedCategory('');
              setImages([]);
            }
          }
        ]
      );

    } catch (error) {
      console.error('Error submitting feedback:', error);
      Alert.alert('Error', 'Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={commonStyles.title}>Submit Feedback</Text>
          <Text style={commonStyles.textLight}>
            Help us improve Tân Thuận Ward by reporting issues or suggestions.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Title *</Text>
          <TextInput
            style={commonStyles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Brief description of the issue"
            placeholderTextColor={colors.textLight}
            maxLength={100}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Category *</Text>
          <View style={styles.categoryGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  selectedCategory === category.name && styles.selectedCategory
                ]}
                onPress={() => setSelectedCategory(category.name)}
                activeOpacity={0.7}
              >
                <Icon 
                  name={category.icon as any} 
                  size={24} 
                  color={selectedCategory === category.name ? colors.textWhite : category.color} 
                />
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.name && styles.selectedCategoryText
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Description *</Text>
          <TextInput
            style={commonStyles.textArea}
            value={description}
            onChangeText={setDescription}
            placeholder="Provide detailed information about the issue, including location and any relevant details..."
            placeholderTextColor={colors.textLight}
            multiline
            maxLength={500}
          />
          <Text style={styles.charCount}>{description.length}/500</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Photos (Optional)</Text>
          <Text style={styles.sublabel}>
            Add photos to help us better understand the issue
          </Text>
          
          <View style={styles.imageActions}>
            <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
              <Icon name="camera-outline" size={20} color={colors.primary} />
              <Text style={styles.imageButtonText}>Take Photo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
              <Icon name="image-outline" size={20} color={colors.primary} />
              <Text style={styles.imageButtonText}>Choose from Gallery</Text>
            </TouchableOpacity>
          </View>

          {images.length > 0 && (
            <View style={styles.imageGrid}>
              {images.map((uri, index) => (
                <View key={index} style={styles.imageContainer}>
                  <Image source={{ uri }} style={styles.image} />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeImage(index)}
                  >
                    <Icon name="close" size={16} color={colors.textWhite} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.submitSection}>
          <Button
            text={isSubmitting ? "Submitting..." : "Submit Feedback"}
            onPress={handleSubmit}
            style={[
              buttonStyles.primary,
              isSubmitting && styles.disabledButton
            ]}
            textStyle={{ color: colors.textWhite }}
          />
          
          <Text style={styles.disclaimer}>
            By submitting this feedback, you agree that it may be shared publicly 
            after review by ward administrators to help improve community services.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 20,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  sublabel: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 12,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.backgroundAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  selectedCategory: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text,
    textAlign: 'center',
  },
  selectedCategoryText: {
    color: colors.textWhite,
  },
  charCount: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: 'right',
    marginTop: 4,
  },
  imageActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  imageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundAlt,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  imageButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  imageContainer: {
    position: 'relative',
    width: 100,
    height: 100,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: colors.pending,
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitSection: {
    paddingVertical: 20,
  },
  disabledButton: {
    opacity: 0.6,
  },
  disclaimer: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 16,
    paddingHorizontal: 20,
  },
});

// Import buttonStyles from commonStyles
import { buttonStyles } from '../../styles/commonStyles';
