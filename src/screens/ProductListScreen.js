import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, I18nManager } from 'react-native';
import { Text, Card, Button, Searchbar, Chip, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// تفعيل RTL
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function ProductListScreen({ navigation, route }) {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'شجرة زيتون',
      price: 150,
      category: 'trees',
      image: 'https://via.placeholder.com/150',
      seller: 'محمد أحمد',
      rating: 4.5,
      date: new Date('2024-01-15'),
    },
    {
      id: '2',
      name: 'بذور طماطم',
      price: 25,
      category: 'seeds',
      image: 'https://via.placeholder.com/150',
      seller: 'فاطمة علي',
      rating: 4.8,
      date: new Date('2024-01-20'),
    },
    {
      id: '3',
      name: 'سماد عضوي',
      price: 80,
      category: 'fertilizers',
      image: 'https://via.placeholder.com/150',
      seller: 'أحمد خالد',
      rating: 4.2,
      date: new Date('2024-01-18'),
    },
    {
      id: '4',
      name: 'أدوات زراعية',
      price: 120,
      category: 'tools',
      image: 'https://via.placeholder.com/150',
      seller: 'سارة محمود',
      rating: 4.6,
      date: new Date('2024-01-22'),
    },
  ]);

  const categories = [
    { id: 'all', name: 'الكل', icon: 'view-grid' },
    { id: 'trees', name: 'أشجار', icon: 'tree' },
    { id: 'seeds', name: 'بذور', icon: 'seed' },
    { id: 'fertilizers', name: 'أسمدة', icon: 'flask' },
    { id: 'tools', name: 'أدوات', icon: 'tools' },
  ];

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.date - a.date; // default: newest first
    });

  const renderProduct = ({ item }) => (
    <Card style={styles.productCard} onPress={() => navigation.navigate('ProductDetails', { product: item })}>
      <Card.Cover source={{ uri: item.image }} />
      <Card.Content>
        <Text variant="titleMedium" style={styles.productName}>{item.name}</Text>
        <View style={styles.priceRow}>
          <Text variant="titleLarge" style={{ color: theme.colors.primary }}>
            {item.price} ريال
          </Text>
          <View style={styles.rating}>
            <MaterialCommunityIcons name="star" size={20} color="#FFD700" />
            <Text>{item.rating}</Text>
          </View>
        </View>
        <Text variant="bodySmall" style={styles.seller}>البائع: {item.seller}</Text>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="contained"
          icon="cart-plus"
          onPress={() => console.log('Add to cart:', item.id)}
        >
          أضف إلى السلة
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="ابحث عن منتج..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />
      
      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          data={categories}
          renderItem={({ item }) => (
            <Chip
              selected={selectedCategory === item.id}
              onPress={() => setSelectedCategory(item.id)}
              style={styles.categoryChip}
              icon={item.icon}
            >
              {item.name}
            </Chip>
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.sortContainer}>
        <Text variant="bodyMedium">ترتيب حسب: </Text>
        <Chip
          selected={sortBy === 'date'}
          onPress={() => setSortBy('date')}
          style={styles.sortChip}
        >
          الأحدث
        </Chip>
        <Chip
          selected={sortBy === 'price'}
          onPress={() => setSortBy('price')}
          style={styles.sortChip}
        >
          السعر
        </Chip>
        <Chip
          selected={sortBy === 'rating'}
          onPress={() => setSortBy('rating')}
          style={styles.sortChip}
        >
          التقييم
        </Chip>
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchBar: {
    margin: 16,
    elevation: 2,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  categoryChip: {
    marginRight: 8,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sortChip: {
    marginLeft: 8,
  },
  productList: {
    padding: 16,
  },
  productCard: {
    marginBottom: 16,
    elevation: 3,
  },
  productName: {
    marginTop: 8,
    fontWeight: 'bold',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seller: {
    marginTop: 4,
    color: '#666',
  },
});
