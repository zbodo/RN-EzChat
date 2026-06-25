import React, {useCallback} from 'react';
import {FlatList, StyleSheet, View, useColorScheme} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ChatListItem from '../components/ChatListItem';
import HolidayCountdown from '../../HolidayCountdown';
import {mockChats} from '../data/mockChats';
import {colors} from '../theme';
import type {Chat} from '../types';

type Props = {
  onNavigate: (chatId: string, chatName: string) => void;
};

const ChatListScreen = ({onNavigate}: Props) => {
  const isDark = useColorScheme() === 'dark';
  const c = isDark ? colors.dark : colors.light;
  const insets = useSafeAreaInsets();

  const handlePress = useCallback(
    (chat: Chat) => {
      onNavigate(chat.id, chat.name);
    },
    [onNavigate],
  );

  const renderItem = useCallback(
    ({item}: {item: Chat}) => (
      <ChatListItem chat={item} colors={c} onPress={() => handlePress(item)} />
    ),
    [c, handlePress],
  );

  const keyExtractor = useCallback((item: Chat) => item.id, []);

  return (
    <View style={[styles.container, {backgroundColor: c.background}]}>
      <FlatList
        data={mockChats}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={
          <View style={styles.header}>
            <HolidayCountdown textColor={c.text} cardBackground={c.inputBg} />
          </View>
        }
        contentContainerStyle={{paddingBottom: insets.bottom}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default ChatListScreen;
