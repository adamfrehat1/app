import React from 'react';
import { View, StyleSheet, ScrollView, Image, Linking } from 'react-native';
import { Card, Text, Button, Chip, useTheme, Divider } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;
  const theme = useTheme();

  const handleContact = () => {
    navigation.navigate('Chat', { 
      sellerId: product.sellerId,
      sellerName: product.sellerName 
    });
  };

  const handleCall = () => {
    // في التطبيق الفعلي، استخدم رقم الهاتف الحقيقي
    Linking.openURL('tel:+962791234567');
  };

  return (
    <ScrollView style={styles.container}>
      <ScrollView 
        horizontal 
        pagingEnabled 
        showsHorizontalScrollIndicator={false}
        style={styles.imagesContainer}
      >
        {product.images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={styles.image}
          />
        ))}
      </ScrollView>

      <View style={styles.content}>
        <Text variant="headlineSmall" style={styles.title}>
          {product.title}
        </Text>

        <Text variant="displaySmall" style={[styles.price, { color: theme.colors.primary }]}>
          {product.price} دينار
        </Text>

        <Divider style={styles.divider} />

        <Text variant="titleMedium" style={styles.sectionTitle}>
          الوصف
        </Text>
        <Text variant="bodyMedium" style={styles.description}>
          {product.description}
        </Text>

        <Divider style={styles.divider} />

        <Text variant="titleMedium" style={styles.sectionTitle}>
          معلومات البائع
        </Text>
        <Card style={styles.sellerCard}>
          <Card.Content>
            <View style={styles.sellerInfo}>
              <View>
                <Text variant="titleMedium">{product.sellerName}</Text>
                <View style={styles.ratingContainer}>
                  <Text>⭐ {product.sellerRating}</Text>
                  <Text style={styles.ratingText}> (تقييم ممتاز)</Text>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Divider style={styles.divider} />

        <Text variant="titleMedium" style={styles.sectionTitle}>
          الموقع
        </Text>
        <Text variant="bodyMedium" style={styles.locationText}>
          📍 {product.location.address}
        </Text>
        
        {product.location?.latitude && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: product.location.latitude,
              longitude: product.location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: product.location.latitude,
                longitude: product.location.longitude,
              }}
              title={product.title}
            />
          </MapView>
        )}

        <Divider style={styles.divider} />

        <View style={styles.stats}>
          <Chip icon="eye">👁️ {product.views} مشاهدة</Chip>
          <Chip icon="heart">❤️ {product.favorites} إعجاب</Chip>
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={handleContact}
          style={[styles.contactButton, { backgroundColor: theme.colors.primary }]}
          icon="message"
        >
          تواصل مع البائع
        </Button>
        <Button
          mode="outlined"
          onPress={handleCall}
          style={styles.callButton}
          icon="phone"
        >
          اتصل الآن
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imagesContainer: {
    height: 300,
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  divider: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    lineHeight: 24,
    opacity: 0.8,
  },
  sellerCard: {
    marginTop: 8,
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    opacity: 0.6,
  },
  locationText: {
    marginBottom: 12,
  },
  map: {
    height: 200,
    borderRadius: 8,
    marginTop: 8,
  },
  stats: {
    flexDirection: 'row',
    gap: 8,
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  contactButton: {
    marginBottom: 8,
    paddingVertical: 8,
  },
  callButton: {
    paddingVertical: 8,
  },
});
