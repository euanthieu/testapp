import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (messages.length === 0) return;
    const t = setTimeout(() => listRef.current?.scrollToEnd?.({ animated: true }), 50);
    return () => clearTimeout(t);
  }, [messages.length]);

  const sendMessage = async (textOverride) => {
    const text = (textOverride || input).trim();
    if (!text) return;

    const userMsg = { id: String(Date.now()), from: 'me', text };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const botMsg = {
        id: String(Date.now() + 1),
        from: 'chumme',
        text: `Echo: ${text}`,
      };
      setMessages((m) => [...m, botMsg]);
      setLoading(false);
    }, 800);
  };

  const handleVoiceRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      setIsTranscribing(true);
      const mockTranscribedText = 'Mock voice transcription';
      setTimeout(() => {
        setIsTranscribing(false);
        setInput(mockTranscribedText);
        sendMessage(mockTranscribedText);
      }, 600);
    } else {
      setIsRecording(true);
    }
  };

  const renderItem = ({ item }) => {
    const isMe = item.from === 'me';
    return (
      <View style={[styles.row, isMe ? styles.rowMe : styles.rowBot]}>
        <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleBot]}>
          <Text style={isMe ? styles.textMe : styles.textBot}>{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.title}>Chumme Chat</Text>
          <Text style={styles.subtitle}>Ask the assistant anything</Text>
        </View>

        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(i) => i.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />

        <View style={styles.composer}>
          <TextInput
            placeholder={
              isRecording ? 'Recording...' : isTranscribing ? 'Transcribing...' : 'Type a message'
            }
            value={input}
            onChangeText={setInput}
            onSubmitEditing={() => sendMessage()}
            style={styles.input}
            multiline
            editable={!isRecording && !isTranscribing}
          />
          <TouchableOpacity onPress={handleVoiceRecord} style={styles.micButton} disabled={loading}>
            <Text style={{ color: isRecording ? '#ff4444' : '#2196F3' }}>
              {isRecording ? 'Stop' : '🎤'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => sendMessage()}
            style={[styles.sendButton, { opacity: loading ? 0.7 : 1 }]}
            disabled={loading || isRecording || isTranscribing}
          >
            {loading || isTranscribing ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={{ color: '#fff', fontWeight: '600' }}>Send</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 16, alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  subtitle: { fontSize: 14, color: '#666' },
  list: { paddingHorizontal: 12, paddingBottom: 12 },
  row: { flexDirection: 'row', marginVertical: 6, paddingHorizontal: 8 },
  rowMe: { justifyContent: 'flex-end' },
  rowBot: { justifyContent: 'flex-start' },
  bubble: { maxWidth: '80%', borderRadius: 12, paddingVertical: 8, paddingHorizontal: 12 },
  bubbleMe: { backgroundColor: '#1976d2' },
  bubbleBot: { backgroundColor: '#f0f0f0', borderWidth: 1, borderColor: '#e0e0e0' },
  textMe: { color: '#fff', fontSize: 16 },
  textBot: { color: '#000', fontSize: 16 },
  composer: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fafafa',
  },
  input: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  micButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
    backgroundColor: '#fff',
  },
  sendButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#2196F3',
  },
});