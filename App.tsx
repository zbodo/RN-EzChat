import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatListScreen from './src/screens/ChatListScreen';
import ChatDetailScreen from './src/screens/ChatDetailScreen';
import {colors} from './src/theme';
import type {RootStackParamList} from './src/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const LightNavTheme = {
  ...DefaultTheme,
  colors: {...DefaultTheme.colors, background: colors.light.background},
};
const DarkNavTheme = {
  ...DarkTheme,
  colors: {...DarkTheme.colors, background: colors.dark.background},
};

function App() {
  const isDark = useColorScheme() === 'dark';
  const c = isDark ? colors.dark : colors.light;

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={c.headerBg}
      />
      <NavigationContainer theme={isDark ? DarkNavTheme : LightNavTheme}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {backgroundColor: c.headerBg},
            headerTintColor: c.headerText,
            headerTitleStyle: {fontWeight: '600'},
            headerShadowVisible: false,
            headerBackTitle: '返回',
          }}>
          <Stack.Screen
            name="ChatList"
            component={ChatListScreen}
            options={{title: 'EzChat', headerLargeTitle: true}}
          />
          <Stack.Screen
            name="ChatDetail"
            component={ChatDetailScreen}
            options={({route}) => ({title: route.params.chatName})}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
