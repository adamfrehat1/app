import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Switch, Alert } from 'react-native';
import { List, Avatar, Divider, Text, Button, useTheme } from 'react-native-paper';
import { auth } from '../config/firebase';
import { authService } from '../services/authService';

export default function ProfileScreen({ navigation }) {
  const theme = useTheme();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    if (auth.currentUser) {
      const result = await authService.getUserData(auth.currentUser.uid);
      if (result.success) {
        setUser(result.data);
      }
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'تسجيل الخروج',
      'هل أنت متأكد من تسجيل الخروج؟',
      [
        {
          text: 'إلغاء',
          style: 'cancel',
        },
        {
          text: 'تسجيل الخروج',
          onPress: async () => {
            await authService.logout();
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <Avatar.Text 
          size={80} 
          label={user?.name ? user.name[0] : 'م'}
          style={styles.avatar}
        />
        <Text variant="headlineSmall" style={styles.name}>
          {user?.name || 'مستخدم تجريبي'}
        </Text>
        <Text variant="bodyMedium" style={styles.email}>
          {user?.email || auth.currentUser?.email || 'demo@example.com'}
        </Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>⭐ {user?.rating || 0} تقييم</Text>
        </View>
      </View>

      <View style={styles.content}>
        <List.Section>
          <List.Subheader>معلومات الحساب</List.Subheader>
          
          <List.Item
            title="المنتجات المنشورة"
            description="عرض جميع منتجاتك"
            left={props => <List.Icon {...props} icon="package-variant" />}
            right={props => <List.Icon {...props} icon="chevron-left" />}
            onPress={() => {}}
          />
          
          <List.Item
            title="المفضلة"
            description="المنتجات المحفوظة"
            left={props => <List.Icon {...props} icon="heart" />}
            right={props => <List.Icon {...props} icon="chevron-left" />}
            onPress={() => {}}
          />
          
          <List.Item
            title="المواعيد"
            description="مواعيد الاستشارات"
            left={props => <List.Icon {...props} icon="calendar" />}
            right={props => <List.Icon {...props} icon="chevron-left" />}
            onPress={() => navigation.navigate('ExpertBooking')}
          />
        </List.Section>

        <Divider />

        <List.Section>
          <List.Subheader>الإعدادات</List.Subheader>
          
          <List.Item
            title="الوضع الليلي"
            left={props => <List.Icon {...props} icon="theme-light-dark" />}
            right={() => (
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                color={theme.colors.primary}
              />
            )}
          />
          
          <List.Item
            title="الإشعارات"
            left={props => <List.Icon {...props} icon="bell" />}
            right={() => (
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                color={theme.colors.primary}
              />
            )}
          />
          
          <List.Item
            title="اللغة"
            description="العربية"
            left={props => <List.Icon {...props} icon="translate" />}
            right={props => <List.Icon {...props} icon="chevron-left" />}
            onPress={() => {}}
          />
        </List.Section>

        <Divider />

        <List.Section>
          <List.Subheader>الدعم</List.Subheader>
          
          <List.Item
            title="الملاحظات والشكاوى"
            left={props => <List.Icon {...props} icon="message-alert" />}
            right={props => <List.Icon {...props} icon="chevron-left" />}
            onPress={() => navigation.navigate('Feedback')}
          />
          
          <List.Item
            title="حول التطبيق"
            description="الإصدار 1.0.0"
            left={props => <List.Icon {...props} icon="information" />}
            right={props => <List.Icon {...props} icon="chevron-left" />}
            onPress={() => {}}
          />
        </List.Section>

        <Button
          mode="outlined"
          onPress={handleLogout}
          style={styles.logoutButton}
          icon="logout"
          textColor={theme.colors.error}
        >
          تسجيل الخروج
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
  header: {
    padding: 32,
    alignItems: 'center',
    paddingTop: 60,
  },
  avatar: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  name: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 16,
  },
  email: {
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
  },
  ratingContainer: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
  },
  ratingText: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  logoutButton: {
    margin: 16,
    borderColor: '#D32F2F',
  },
});
