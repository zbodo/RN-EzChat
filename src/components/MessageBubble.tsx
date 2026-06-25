import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import type {Message} from '../types';
import type {ThemeColors} from '../theme';

type Props = {
  message: Message;
  colors: ThemeColors;
};

function formatMsgTime(ts: number): string {
  return new Date(ts).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

const MessageBubble = ({message, colors: c}: Props) => {
  const isMe = message.isMe;

  return (
    <View style={[styles.row, isMe && styles.rowMe]}>
      <View
        style={[
          styles.bubble,
          isMe
            ? {backgroundColor: c.bubbleMe, borderBottomRightRadius: 4}
            : {backgroundColor: c.bubbleOther, borderBottomLeftRadius: 4},
        ]}>
        <Text
          style={[
            styles.text,
            {color: isMe ? c.bubbleMeText : c.bubbleOtherText},
          ]}>
          {message.text}
        </Text>
        <Text
          style={[
            styles.time,
            {color: isMe ? c.bubbleMeText : c.textSecondary, opacity: isMe ? 0.7 : 1},
          ]}>
          {formatMsgTime(message.timestamp)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 4,
    paddingHorizontal: 12,
  },
  rowMe: {
    justifyContent: 'flex-end',
  },
  bubble: {
    maxWidth: '75%',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 6,
    borderRadius: 18,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
  },
  time: {
    fontSize: 11,
    marginTop: 2,
    alignSelf: 'flex-end',
  },
});

export default React.memo(MessageBubble);
