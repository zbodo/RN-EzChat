import { useState } from 'react';
import { Button, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Cat from './Cat';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  const [inputA, setInputA] = useState('')

  return (
    <View style={[styles.container, { paddingTop: safeAreaInsets.top, paddingBottom: safeAreaInsets.bottom, }]}>

      <Cat name='Tom' age={12} />
      <Cat name='Bob' age={16} />
      <Cat name='Sub' age={15} />
      <Cat name='Hel' age={43} />
      <Text>{inputA || '还没有输入内容'} </Text>
      <TextInput
        value={inputA}
        onChangeText={setInputA}
        placeholder='还没有输入内容'
      />
      <Button
        title='清空'
        onPress={(first) => { setInputA('') }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 12
  },
});

export default App;
