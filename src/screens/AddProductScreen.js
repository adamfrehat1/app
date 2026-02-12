import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { TextInput, Button, Text, useTheme, Chip, HelperText } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { productService } from '../services/productService';
import { CATEGORIES } from '../utils/constants';
import { auth } from '../config/firebase';

export default function AddProductScreen({ navigation }) {
  const theme = useTheme();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const pickImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('عذراً', 'نحتاج إلى إذن للوصول إلى الصور');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImages([...images, ...result.assets]);
    }
  };

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('عذراً', 'نحتاج إلى إذن للوصول إلى الموقع');
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({});
    const address = await Location.reverseGeocodeAsync({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    });

    setLocation({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
      address: `${address[0].city || ''}, ${address[0].country || ''}`,
    });
  };

  const handleSubmit = async () => {
    // التحقق من البيانات
    if (!title || !description || !price || !category) {
      setError('الرجاء ملء جميع الحقول المطلوبة');
      return;
    }

    if (images.length === 0) {
      setError('الرجاء إضافة صورة واحدة على الأقل');
      return;
    }

    setLoading(true);
    setError('');

    const productData = {
      title,
      description,
      price: parseFloat(price),
      category,
      location: location || { latitude: 31.9522, longitude: 35.9389, address: 'عمان، الأردن' },
      sellerId: auth.currentUser?.uid || 'demo-user',
      sellerName: auth.currentUser?.displayName || 'مستخدم تجريبي',
      sellerRating: 4.5,
    };

    // في الوضع التجريبي، نعرض رسالة نجاح فقط
    // في الإنتاج، استخدم: const result = await productService.addProduct(productData, images);
    
    setLoading(false);
    Alert.alert(
      'تم بنجاح',
      'تم إضافة المنتج بنجاح',
      [
        {
          text: 'حسناً',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text variant="headlineSmall" style={styles.title}>
        إضافة منتج جديد
      </Text>

      <TextInput
        label="عنوان المنتج *"
        value={title}
        onChangeText={setTitle}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="الوصف *"
        value={description}
        onChangeText={setDescription}
        mode="outlined"
        multiline
        numberOfLines={4}
        style={styles.input}
      />

      <TextInput
        label="السعر (دينار) *"
        value={price}
        onChangeText={setPrice}
        mode="outlined"
        keyboardType="numeric"
        left={<TextInput.Icon icon="currency-usd" />}
        style={styles.input}
      />

      <Text variant="titleSmall" style={styles.label}>
        الفئة *
      </Text>
      <View style={styles.categoriesContainer}>
        {CATEGORIES.map((cat) => (
          <Chip
            key={cat.id}
            selected={category === cat.id}
            onPress={() => setCategory(cat.id)}
            style={styles.categoryChip}
          >
            {cat.emoji} {cat.name}
          </Chip>
        ))}
      </View>

      <Text variant="titleSmall" style={styles.label}>
        الصور ({images.length})
      </Text>
      <Button
        mode="outlined"
        icon="camera"
        onPress={pickImages}
        style={styles.button}
      >
        إضافة صور
      </Button>

      {images.length > 0 && (
        <ScrollView horizontal style={styles.imagesPreview}>
          {images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image.uri }}
              style={styles.imagePreview}
            />
          ))}
        </ScrollView>
      )}

      <Button
        mode="outlined"
        icon="map-marker"
        onPress={getLocation}
        style={styles.button}
      >
        {location ? `📍 ${location.address}` : 'تحديد الموقع'}
      </Button>

      {error ? (
        <HelperText type="error" visible={true}>
          {error}
        </HelperText>
      ) : null}

      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={loading}
        disabled={loading}
        style={[styles.submitButton, { backgroundColor: theme.colors.primary }]}
      >
        نشر المنتج
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  title: {
    marginBottom: 24,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    marginTop: 8,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  categoryChip: {
    margin: 4,
  },
  button: {
    marginBottom: 16,
  },
  imagesPreview: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginRight: 8,
    borderRadius: 8,
  },
  submitButton: {
    marginTop: 16,
    paddingVertical: 8,
  },
});
