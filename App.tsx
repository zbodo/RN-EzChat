import React, {useCallback, useState} from 'react';
import {Pressable, StatusBar, StyleSheet, Text, View, useColorScheme} from 'react-native';
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import ChatListScreen from './src/screens/ChatListScreen';
import ChatDetailScreen from './src/screens/ChatDetailScreen';
import {colors} from './src/theme';

type Route =
  | {screen: 'ChatList'}
  | {screen: 'ChatDetail'; chatId: string; chatName: string};

function AppContent() {
  const isDark = useColorScheme() === 'dark';
  const c = isDark ? colors.dark : colors.light;
  const insets = useSafeAreaInsets();
  const [route, setRoute] = useState<Route>({screen: 'ChatList'});

  const navigateToChat = useCallback((chatId: string, chatName: string) => {
    setRoute({screen: 'ChatDetail', chatId, chatName});
  }, []);

  const goBack = useCallback(() => {
    setRoute({screen: 'ChatList'});
  }, []);

  const title = route.screen === 'ChatList' ? 'EzChat' : route.chatName;

  return (
    <View style={[styles.container, {backgroundColor: c.background}]}>
      <View
        style={[
          styles.header,
          {backgroundColor: c.headerBg, paddingTop: insets.top},
        ]}>
        <View style={styles.headerInner}>
          {route.screen === 'ChatDetail' ? (
            <Pressable onPress={goBack} hitSlop={12} style={styles.backBtn}>
              <Text style={[styles.backText, {color: c.badge}]}>{'‹ 返回'}</Text>
            </Pressable>
          ) : (
            <View style={styles.backBtn} />
          )}
          <Text
            style={[styles.headerTitle, {color: c.headerText}]}
            numberOfLines={1}>
            {title}
          </Text>
          <View style={styles.backBtn} />
        </View>
      </View>

      {route.screen === 'ChatList' ? (
        <ChatListScreen onNavigate={navigateToChat} />
      ) : (
        <ChatDetailScreen chatId={route.chatId} chatName={route.chatName} />
      )}
    </View>
  );
}

function App() {
  const isDark = useColorScheme() === 'dark';
  const c = isDark ? colors.dark : colors.light;

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={c.headerBg}
      />
      <AppContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerInner: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  backBtn: {
    width: 60,
  },
  backText: {
    fontSize: 17,
  },
  headerTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default App;
