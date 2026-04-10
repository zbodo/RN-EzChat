import { useState } from 'react';
import { Button, StatusBar, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Cat from './Cat';

function App() {

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  const isDarkMode = useColorScheme() === 'dark';

  const themeColors = {
    background: isDarkMode ? '#101214' : '#ffffff',
    text: isDarkMode ? '#f5f5f5' : '#111111',
    inputBackground: isDarkMode ? '#1b1d21' : '#ffffff',
    inputBorder: isDarkMode ? '#3a3f47' : '#6fc',
    placeholder: isDarkMode ? '#9aa0aa' : '#666666',
  };

  const [inputA, setInputA] = useState('')

  const cats = [
    { name: 'Tom', age: 12 },
    { name: 'Bob', age: 16 },
  ];


  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: safeAreaInsets.top, paddingBottom: safeAreaInsets.bottom,
          backgroundColor: themeColors.background
        },
      ]}
    >

      {cats.map((cat) => (
        <Cat
          key={cat.name}
          name={cat.name} age={cat.age} textColor={themeColors.text} cardBackground={themeColors.inputBackground} />))}
      <Text
        style={{
          color: themeColors.text,
          textAlignVertical: 'center', alignSelf: 'center', minHeight: 40
        }}
      >
        {inputA || '先输入一些文本'}
      </Text>
      <TextInput
        style={[styles.input, {
          color: themeColors.text,
          borderColor: themeColors.inputBorder,
          backgroundColor: themeColors.inputBackground
        }]}
        placeholderTextColor={themeColors.placeholder}
        value={inputA}
        onChangeText={setInputA}
        placeholder='在这里输入内容'
      />
      <Button
        title='清空'
        onPress={() => { setInputA('') }}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 12, 
  },
  input: {
    borderWidth: 1,
    borderColor: '#6fc',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    minHeight: 70,
    textAlignVertical: 'top'
  }
});

export default App;
