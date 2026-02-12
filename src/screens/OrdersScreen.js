import React, { useState } from 'react';
import { View, StyleSheet, FlatList, I18nManager } from 'react-native';
import { Text, Card, Chip, Button, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// تفعيل RTL
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function OrdersScreen({ navigation }) {
  const theme = useTheme();
  const [orders, setOrders] = useState([
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      date: '2024-01-20',
      status: 'delivered',
      total: 425,
      items: [
        { name: 'شجرة زيتون', quantity: 2, price: 150 },
        { name: 'سماد عضوي', quantity: 1, price: 80 },
      ],
      seller: 'محمد أحمد',
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      date: '2024-01-22',
      status: 'shipping',
      total: 125,
      items: [
        { name: 'بذور طماطم', quantity: 5, price: 25 },
      ],
      seller: 'فاطمة علي',
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-003',
      date: '2024-01-25',
      status: 'pending',
      total: 240,
      items: [
        { name: 'أدوات زراعية', quantity: 2, price: 120 },
      ],
      seller: 'أحمد خالد',
    },
  ]);

  const getStatusInfo = (status) => {
    const statusMap = {
      pending: { label: 'قيد الانتظار', color: '#FF9800', icon: 'clock-outline' },
      processing: { label: 'قيد المعالجة', color: '#2196F3', icon: 'cog-outline' },
      shipping: { label: 'قيد الشحن', color: '#9C27B0', icon: 'truck-delivery-outline' },
      delivered: { label: 'تم التوصيل', color: '#4CAF50', icon: 'check-circle-outline' },
      cancelled: { label: 'ملغي', color: '#F44336', icon: 'close-circle-outline' },
    };
    return statusMap[status] || statusMap.pending;
  };

  const renderOrder = ({ item }) => {
    const statusInfo = getStatusInfo(item.status);
    
    return (
      <Card style={styles.orderCard}>
        <Card.Content>
          <View style={styles.orderHeader}>
            <View>
              <Text variant="titleMedium" style={styles.orderNumber}>
                {item.orderNumber}
              </Text>
              <Text variant="bodySmall" style={styles.orderDate}>
                {item.date}
              </Text>
            </View>
            <Chip
              icon={statusInfo.icon}
              textStyle={{ color: 'white' }}
              style={{ backgroundColor: statusInfo.color }}
            >
              {statusInfo.label}
            </Chip>
          </View>

          <View style={styles.divider} />

          <Text variant="bodyMedium" style={styles.sectionTitle}>المنتجات:</Text>
          {item.items.map((product, index) => (
            <View key={index} style={styles.productRow}>
              <Text variant="bodyMedium">
                {product.name} × {product.quantity}
              </Text>
              <Text variant="bodyMedium" style={{ color: theme.colors.primary }}>
                {product.price * product.quantity} ريال
              </Text>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.sellerRow}>
            <Text variant="bodySmall" style={styles.sellerLabel}>البائع:</Text>
            <Text variant="bodyMedium">{item.seller}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text variant="titleMedium" style={styles.totalLabel}>المجموع:</Text>
            <Text variant="titleLarge" style={{ color: theme.colors.primary }}>
              {item.total} ريال
            </Text>
          </View>
        </Card.Content>

        <Card.Actions>
          <Button
            mode="outlined"
            onPress={() => {
              console.log('View order details:', item.id);
              // TODO: Navigate to order details screen
            }}
          >
            عرض التفاصيل
          </Button>
          {item.status === 'delivered' && (
            <Button
              mode="contained"
              onPress={() => {
                console.log('Reorder:', item.id);
                // TODO: Implement reorder functionality
              }}
            >
              إعادة الطلب
            </Button>
          )}
          {item.status === 'pending' && (
            <Button
              mode="text"
              textColor={theme.colors.error}
              onPress={() => {
                console.log('Cancel order:', item.id);
                // TODO: Implement cancel order
                setOrders(prevOrders =>
                  prevOrders.map(order =>
                    order.id === item.id ? { ...order, status: 'cancelled' } : order
                  )
                );
              }}
            >
              إلغاء الطلب
            </Button>
          )}
        </Card.Actions>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      {orders.length === 0 ? (
        <View style={styles.emptyState}>
          <MaterialCommunityIcons name="package-variant" size={80} color="#CCC" />
          <Text variant="headlineSmall" style={styles.emptyText}>
            لا توجد طلبات
          </Text>
          <Text variant="bodyMedium" style={styles.emptySubtext}>
            ابدأ التسوق لإنشاء طلبك الأول
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
        <FlatList
          data={orders}
          renderItem={renderOrder}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.ordersList}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  ordersList: {
    padding: 16,
  },
  orderCard: {
    marginBottom: 16,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderNumber: {
    fontWeight: 'bold',
  },
  orderDate: {
    color: '#666',
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 12,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  sellerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sellerLabel: {
    color: '#666',
    marginRight: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  totalLabel: {
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    marginTop: 16,
    marginBottom: 8,
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
});
