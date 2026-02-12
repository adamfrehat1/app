import React, { useState } from 'react';
import { View, StyleSheet, FlatList, I18nManager } from 'react-native';
import { Text, Card, Button, IconButton, Divider, useTheme } from 'react-native-paper';
import { useCart } from '../contexts/CartContext';

// تفعيل RTL
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function CartScreen({ navigation }) {
  const theme = useTheme();
  const { cartItems, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();

  const handleUpdateQuantity = (id, delta) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + delta);
    }
  };

  const handleCheckout = () => {
    // Navigate to orders or create order
    navigation.navigate('Orders');
    clearCart();
  };

  const totalPrice = getTotalPrice();

  const renderCartItem = ({ item }) => (
    <Card style={styles.cartItem}>
      <View style={styles.itemContent}>
        <Card.Cover source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text variant="titleMedium" style={styles.itemName}>{item.name}</Text>
          <Text variant="bodySmall" style={styles.seller}>البائع: {item.seller}</Text>
          <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
            {item.price} ريال
          </Text>
          
          <View style={styles.quantityContainer}>
            <IconButton
              icon="minus"
              size={20}
              onPress={() => handleUpdateQuantity(item.id, -1)}
              disabled={item.quantity <= 1}
            />
            <Text variant="titleMedium" style={styles.quantity}>{item.quantity}</Text>
            <IconButton
              icon="plus"
              size={20}
              onPress={() => handleUpdateQuantity(item.id, 1)}
            />
          </View>
        </View>
        
        <IconButton
          icon="delete"
          size={24}
          iconColor={theme.colors.error}
          onPress={() => removeFromCart(item.id)}
          style={styles.deleteButton}
        />
      </View>
      
      <Divider style={styles.divider} />
      
      <View style={styles.subtotalRow}>
        <Text variant="bodyMedium">المجموع الفرعي:</Text>
        <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
          {item.price * item.quantity} ريال
        </Text>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <Text variant="headlineMedium" style={styles.emptyText}>
            السلة فارغة
          </Text>
          <Text variant="bodyLarge" style={styles.emptySubtext}>
            أضف منتجات لتبدأ التسوق
          </Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('HomeTab')}
            style={styles.shopButton}
          >
            تصفح المنتجات
          </Button>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.cartList}
          />
          
          <View style={styles.summaryContainer}>
            <Divider />
            <View style={styles.totalRow}>
              <Text variant="headlineSmall">المجموع الكلي:</Text>
              <Text variant="headlineSmall" style={{ color: theme.colors.primary }}>
                {totalPrice} ريال
              </Text>
            </View>
            
            <Button
              mode="contained"
              icon="cart-check"
              onPress={handleCheckout}
              style={styles.checkoutButton}
            >
              إتمام الطلب
            </Button>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  cartList: {
    padding: 16,
  },
  cartItem: {
    marginBottom: 16,
    padding: 12,
    elevation: 2,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  seller: {
    color: '#666',
    marginBottom: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantity: {
    marginHorizontal: 12,
    minWidth: 30,
    textAlign: 'center',
  },
  deleteButton: {
    position: 'absolute',
    top: -8,
    left: -8,
  },
  divider: {
    marginVertical: 12,
  },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    marginBottom: 16,
    color: '#666',
  },
  emptySubtext: {
    marginBottom: 32,
    color: '#999',
    textAlign: 'center',
  },
  shopButton: {
    minWidth: 200,
  },
  summaryContainer: {
    backgroundColor: 'white',
    padding: 16,
    elevation: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  checkoutButton: {
    marginTop: 8,
  },
});
