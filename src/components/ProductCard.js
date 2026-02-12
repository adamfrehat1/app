import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Button, useTheme } from 'react-native-paper';

export default function ProductCard({ product, onPress, onAddToCart }) {
  const theme = useTheme();

  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Cover source={{ uri: product.image }} />
      <Card.Content>
        <Text variant="titleMedium" style={styles.name}>{product.name}</Text>
        <Text variant="bodySmall" style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>
        <View style={styles.priceRow}>
          <Text variant="titleLarge" style={{ color: theme.colors.primary }}>
            {product.price} ريال
          </Text>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button mode="outlined" onPress={onPress}>
          التفاصيل
        </Button>
        <Button mode="contained" onPress={onAddToCart}>
          أضف للسلة
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    elevation: 3,
  },
  name: {
    marginTop: 8,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 4,
    color: '#666',
  },
  priceRow: {
    marginTop: 8,
  },
});
