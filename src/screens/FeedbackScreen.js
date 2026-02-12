import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Text, useTheme, RadioButton, HelperText } from 'react-native-paper';

export default function FeedbackScreen({ navigation }) {
  const theme = useTheme();
  const [feedbackType, setFeedbackType] = useState('feedback');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!subject || !message || !email) {
      setError('الرجاء ملء جميع الحقول');
      return;
    }

    setLoading(true);
    setError('');

    // في التطبيق الفعلي، أرسل البيانات إلى الخادم
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'شكراً لك',
        'تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.',
        [
          {
            text: 'حسناً',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }, 1000);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text variant="headlineSmall" style={styles.title}>
        الملاحظات والشكاوى
      </Text>

      <Text variant="titleSmall" style={styles.label}>
        نوع الرسالة
      </Text>
      <RadioButton.Group onValueChange={setFeedbackType} value={feedbackType}>
        <View style={styles.radioItem}>
          <RadioButton value="feedback" />
          <Text>ملاحظة أو اقتراح</Text>
        </View>
        <View style={styles.radioItem}>
          <RadioButton value="complaint" />
          <Text>شكوى</Text>
        </View>
        <View style={styles.radioItem}>
          <RadioButton value="support" />
          <Text>طلب دعم فني</Text>
        </View>
      </RadioButton.Group>

      <TextInput
        label="الموضوع *"
        value={subject}
        onChangeText={setSubject}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="البريد الإلكتروني *"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        left={<TextInput.Icon icon="email" />}
        style={styles.input}
      />

      <TextInput
        label="الرسالة *"
        value={message}
        onChangeText={setMessage}
        mode="outlined"
        multiline
        numberOfLines={6}
        style={styles.input}
      />

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
        إرسال
      </Button>

      <View style={styles.infoBox}>
        <Text variant="bodySmall" style={styles.infoText}>
          💡 نحن نهتم برأيك! ملاحظاتك تساعدنا على تحسين خدماتنا.
        </Text>
      </View>
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
  label: {
    marginBottom: 8,
    marginTop: 8,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 16,
    paddingVertical: 8,
  },
  infoBox: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
  },
  infoText: {
    textAlign: 'center',
    opacity: 0.8,
  },
});
