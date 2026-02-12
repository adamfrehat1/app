import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Card, Text, Button, Avatar, useTheme, Chip } from 'react-native-paper';
import { SAMPLE_EXPERTS } from '../utils/constants';
import { Calendar } from 'react-native-calendars';

export default function ExpertBookingScreen({ navigation }) {
  const theme = useTheme();
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

  const renderExpert = ({ item }) => (
    <Card 
      style={[
        styles.expertCard,
        selectedExpert?.id === item.id && { borderColor: theme.colors.primary, borderWidth: 2 }
      ]}
      onPress={() => setSelectedExpert(item)}
    >
      <Card.Content>
        <View style={styles.expertHeader}>
          <Avatar.Image size={60} source={{ uri: item.image }} />
          <View style={styles.expertInfo}>
            <Text variant="titleMedium">{item.name}</Text>
            <Text variant="bodySmall" style={styles.specialty}>
              {item.specialty}
            </Text>
            <View style={styles.expertMeta}>
              <Text>⭐ {item.rating}</Text>
              <Text> • </Text>
              <Text>{item.experience}</Text>
            </View>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
            {item.price} دينار / استشارة
          </Text>
          {item.available && (
            <Chip icon="check" style={styles.availableChip}>متاح</Chip>
          )}
        </View>
      </Card.Content>
    </Card>
  );

  const handleBooking = () => {
    if (selectedExpert && selectedDate && selectedTime) {
      // في التطبيق الفعلي، أرسل البيانات إلى الخادم
      navigation.navigate('Home');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.title}>
          حجز موعد مع خبير زراعي
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          اختر خبير واحجز موعد للاستشارة
        </Text>
      </View>

      <Text variant="titleMedium" style={styles.sectionTitle}>
        الخبراء المتاحون
      </Text>
      <FlatList
        data={SAMPLE_EXPERTS}
        renderItem={renderExpert}
        keyExtractor={item => item.id}
        scrollEnabled={false}
      />

      {selectedExpert && (
        <>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            اختر التاريخ
          </Text>
          <Calendar
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: theme.colors.primary }
            }}
            minDate={new Date().toISOString().split('T')[0]}
            theme={{
              selectedDayBackgroundColor: theme.colors.primary,
              todayTextColor: theme.colors.primary,
              arrowColor: theme.colors.primary,
            }}
          />

          {selectedDate && (
            <>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                اختر الوقت
              </Text>
              <View style={styles.timeSlotsContainer}>
                {timeSlots.map((time) => (
                  <Chip
                    key={time}
                    selected={selectedTime === time}
                    onPress={() => setSelectedTime(time)}
                    style={styles.timeChip}
                  >
                    {time}
                  </Chip>
                ))}
              </View>
            </>
          )}

          {selectedDate && selectedTime && (
            <Button
              mode="contained"
              onPress={handleBooking}
              style={[styles.bookButton, { backgroundColor: theme.colors.primary }]}
            >
              تأكيد الحجز
            </Button>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    opacity: 0.7,
  },
  sectionTitle: {
    padding: 16,
    fontWeight: 'bold',
  },
  expertCard: {
    margin: 16,
    marginTop: 0,
  },
  expertHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  expertInfo: {
    marginRight: 12,
    flex: 1,
  },
  specialty: {
    opacity: 0.7,
    marginTop: 4,
  },
  expertMeta: {
    flexDirection: 'row',
    marginTop: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  availableChip: {
    backgroundColor: '#E8F5E9',
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    paddingTop: 0,
  },
  timeChip: {
    margin: 4,
  },
  bookButton: {
    margin: 16,
    paddingVertical: 8,
  },
});
