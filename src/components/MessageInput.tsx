import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type {ThemeColors} from '../theme';

type Props = {
  colors: ThemeColors;
  onSend: (text: string) => void;
};

const MessageInput = ({colors: c, onSend}: Props) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }
    onSend(trimmed);
    setText('');
  };

  const canSend = text.trim().length > 0;

  return (
    <View style={[styles.container, {backgroundColor: c.surface, borderTopColor: c.separator}]}>
      <TextInput
        style={[styles.input, {backgroundColor: c.inputBg, color: c.text}]}
        placeholder="输入消息..."
        placeholderTextColor={c.textSecondary}
        value={text}
        onChangeText={setText}
        multiline
        maxLength={2000}
        onSubmitEditing={handleSend}
        blurOnSubmit={false}
      />
      <Pressable
        style={[styles.sendBtn, !canSend && {opacity: 0.4}]}
        onPress={handleSend}
        disabled={!canSend}>
        <Text style={[styles.sendText, {color: c.badge}]}>发送</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderTopWidth: StyleSheet.hairlineWidth,
    gap: 8,
  },
  input: {
    flex: 1,
    minHeight: 36,
    maxHeight: 100,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 16,
  },
  sendBtn: {
    height: 36,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  sendText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default React.memo(MessageInput);
