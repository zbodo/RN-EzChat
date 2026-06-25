import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import type {Chat} from '../types';
import type {ThemeColors} from '../theme';

type Props = {
  chat: Chat;
  colors: ThemeColors;
  onPress: () => void;
};

function formatTime(ts: number): string {
  const now = new Date();
  const date = new Date(ts);
  const diffMs = now.getTime() - ts;
  const diffDays = Math.floor(diffMs / 86_400_000);

  if (diffDays === 0) {
    return date.toLocaleTimeString('zh-CN', {hour: '2-digit', minute: '2-digit', hour12: false});
  }
  if (diffDays === 1) {
    return '昨天';
  }
  if (diffDays < 7) {
    return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()];
  }
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

const ChatListItem = ({chat, colors: c, onPress}: Props) => (
  <Pressable
    style={({pressed}) => [
      styles.container,
      {backgroundColor: pressed ? c.inputBg : 'transparent'},
    ]}
    onPress={onPress}>
    <View style={styles.avatarWrap}>
      <View style={[styles.avatar, {backgroundColor: c.inputBg}]}>
        <Text style={styles.avatarText}>{chat.avatar}</Text>
      </View>
      {chat.online && (
        <View style={[styles.onlineDot, {backgroundColor: c.online, borderColor: c.background}]} />
      )}
    </View>

    <View style={[styles.content, {borderBottomColor: c.separator}]}>
      <View style={styles.topRow}>
        <Text style={[styles.name, {color: c.text}]} numberOfLines={1}>
          {chat.name}
        </Text>
        <Text style={[styles.time, {color: c.textSecondary}]}>
          {formatTime(chat.lastMessageTime)}
        </Text>
      </View>
      <View style={styles.bottomRow}>
        <Text style={[styles.lastMsg, {color: c.textSecondary}]} numberOfLines={1}>
          {chat.lastMessage}
        </Text>
        {chat.unreadCount > 0 && (
          <View style={[styles.badge, {backgroundColor: c.badge}]}>
            <Text style={[styles.badgeText, {color: c.badgeText}]}>
              {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
            </Text>
          </View>
        )}
      </View>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    height: 76,
  },
  avatarWrap: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 26,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
  },
  content: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    paddingRight: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 4,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  time: {
    fontSize: 13,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMsg: {
    fontSize: 15,
    flex: 1,
    marginRight: 8,
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
});

export default React.memo(ChatListItem);
