import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity, I18nManager } from 'react-native';
import { Searchbar, Card, Chip, Text, FAB, useTheme } from 'react-native-paper';
import { productService } from '../services/productService';
import { CATEGORIES, SAMPLE_PRODUCTS } from '../utils/constants';

// تفعيل RTL
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  const [products, setProducts] = useState(SAMPLE_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    // في الوضع التجريبي نستخدم البيانات النموذجية
    // في الإنتاج، استخدم: const result = await productService.getAllProducts();
    setProducts(SAMPLE_PRODUCTS);
    setLoading(false);
  };

  const filterProducts = () => {
    let filtered = SAMPLE_PRODUCTS;

    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setProducts(filtered);
  };

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, searchQuery]);

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
      style={styles.productCard}
    >
      <Card>
        <Card.Cover source={{ uri: item.images[0] }} style={styles.productImage} />
        <Card.Content style={styles.productContent}>
          <Text variant="titleMedium" numberOfLines={1}>{item.title}</Text>
          <Text variant="bodySmall" numberOfLines={2} style={styles.description}>
            {item.description}
          </Text>
          <View style={styles.priceRow}>
            <Text variant="titleLarge" style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
              {item.price} دينار
            </Text>
            <View style={styles.ratingContainer}>
              <Text>⭐ {item.sellerRating}</Text>
            </View>
          </View>
          <Text variant="bodySmall" style={styles.location}>
            📍 {item.location.address}
          </Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={[styles.headerTitle, { color: theme.colors.primary }]}>
          🌳 مشتل
        </Text>
        <Searchbar
          placeholder="ابحث عن منتجات..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
        
        <View style={styles.categoriesContainer}>
          <FlatList
            horizontal
            data={CATEGORIES}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Chip
                selected={selectedCategory === item.id}
                onPress={() => setSelectedCategory(selectedCategory === item.id ? null : item.id)}
                style={styles.categoryChip}
              >
                {item.emoji} {item.name}
              </Chip>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.productsList}
        numColumns={2}
        onRefresh={loadProducts}
        refreshing={loading}
      />

      <FAB
        icon="plus"
        label="إضافة منتج"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate('AddProduct')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 50,
  },
  headerTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  searchBar: {
    marginBottom: 12,
    elevation: 2,
  },
  categoriesContainer: {
    marginTop: 8,
  },
  categoryChip: {
    marginRight: 8,
  },
  productsList: {
    padding: 8,
  },
  productCard: {
    flex: 1,
    margin: 8,
    maxWidth: '45%',
  },
  productImage: {
    height: 150,
  },
  productContent: {
    padding: 12,
  },
  description: {
    marginTop: 4,
    opacity: 0.7,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    marginTop: 4,
    opacity: 0.6,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    left: 0,
    bottom: 0,
  },
});
