import React, {useCallback, useRef, useState} from 'react';
import {FlatList, KeyboardAvoidingView, Platform, StyleSheet, View, useColorScheme} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import MessageBubble from '../components/MessageBubble';
import MessageInput from '../components/MessageInput';
import {mockChats} from '../data/mockChats';
import {colors} from '../theme';
import type {Message, RootStackParamList} from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'ChatDetail'>;

const ChatDetailScreen = ({route}: Props) => {
  const {chatId} = route.params;
  const isDark = useColorScheme() === 'dark';
  const c = isDark ? colors.dark : colors.light;
  const insets = useSafeAreaInsets();
  const listRef = useRef<FlatList<Message>>(null);

  const chat = mockChats.find(ch => ch.id === chatId);
  const [messages, setMessages] = useState<Message[]>(chat?.messages ?? []);

  const handleSend = useCallback((text: string) => {
    const newMsg: Message = {
      id: `m${Date.now()}`,
      text,
      timestamp: Date.now(),
      isMe: true,
    };
    setMessages(prev => [...prev, newMsg]);
    setTimeout(() => {
      listRef.current?.scrollToEnd({animated: true});
    }, 100);
  }, []);

  const renderItem = useCallback(
    ({item}: {item: Message}) => <MessageBubble message={item} colors={c} />,
    [c],
  );

  const keyExtractor = useCallback((item: Message) => item.id, []);

  return (
    <KeyboardAvoidingView
      style={[styles.container, {backgroundColor: c.background}]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
      <FlatList
        ref={listRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={[styles.list, {paddingBottom: 8}]}
        onContentSizeChange={() => listRef.current?.scrollToEnd({animated: false})}
      />
      <View style={{paddingBottom: insets.bottom}}>
        <MessageInput colors={c} onSend={handleSend} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingTop: 8,
  },
});

export default ChatDetailScreen;
