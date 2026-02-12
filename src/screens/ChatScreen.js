import React, { useState } from 'react';
import { View, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, Card, Avatar, useTheme } from 'react-native-paper';

export default function ChatScreen({ route }) {
  const { sellerName } = route.params;
  const theme = useTheme();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'مرحباً، هل المنتج متوفر؟',
      sender: 'me',
      time: '10:30'
    },
    {
      id: '2',
      text: 'نعم متوفر، تفضل',
      sender: 'other',
      time: '10:32'
    },
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: message,
        sender: 'me',
        time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const renderMessage = ({ item }) => {
    const isMe = item.sender === 'me';
    
    return (
      <View style={[styles.messageContainer, isMe ? styles.myMessage : styles.otherMessage]}>
        {!isMe && (
          <Avatar.Text size={32} label={sellerName[0]} style={styles.avatar} />
        )}
        <View style={[
          styles.messageBubble,
          { backgroundColor: isMe ? theme.colors.primary : '#e0e0e0' }
        ]}>
          <Text style={[styles.messageText, { color: isMe ? '#fff' : '#000' }]}>
            {item.text}
          </Text>
          <Text style={[styles.timeText, { color: isMe ? '#fff' : '#666' }]}>
            {item.time}
          </Text>
        </View>
        {isMe && (
          <Avatar.Text size={32} label="أ" style={styles.avatar} />
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="اكتب رسالة..."
          mode="outlined"
          style={styles.input}
          right={
            <TextInput.Icon 
              icon="send" 
              onPress={sendMessage}
              disabled={!message.trim()}
            />
          }
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messagesList: {
    padding: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-end',
  },
  myMessage: {
    justifyContent: 'flex-end',
  },
  otherMessage: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '70%',
    padding: 12,
    borderRadius: 16,
    marginHorizontal: 8,
  },
  messageText: {
    fontSize: 16,
  },
  timeText: {
    fontSize: 10,
    marginTop: 4,
    textAlign: 'left',
  },
  avatar: {
    backgroundColor: '#4CAF50',
  },
  inputContainer: {
    padding: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  input: {
    backgroundColor: '#fff',
  },
});
