import { useState } from 'react';
import {
  Button,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Cat from './Cat';
import HolidayCountdown from './HolidayCountdown';

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
    background: isDarkMode ? '#101214' : '#fdb',
    text: isDarkMode ? '#f5f5f5' : '#111111',
    inputBackground: isDarkMode ? '#1b1d21' : '#ffffff',
    inputBorder: isDarkMode ? '#3a3f47' : '#6fc',
    placeholder: isDarkMode ? '#9aa0aa' : '#666666',
  };

  const [catForm, setCatForm] = useState({
    name: '',
    age: '',
    favoriteFood: '',
  });

  const [cats, setCats] = useState([
    {
      name: 'Tom',
      age: 12,
      favoriteFood: '小鱼干',
    },
    {
      name: 'Bob',
      age: 16,
      favoriteFood: '猫薄荷',
    },
  ]);

  const handleAddCat = () => {
    if (
      catForm.name === '' ||
      catForm.favoriteFood === '' ||
      catForm.age === ''
    ) {
      return;
    }

    const catAgeNumber = Number(catForm.age);

    if (Number.isNaN(catAgeNumber) || catAgeNumber < 0) {
      return;
    }

    setCats([
      ...cats,
      {
        name: catForm.name,
        age: catAgeNumber,
        favoriteFood: catForm.favoriteFood,
      },
    ]);
    setCatForm({
      name: '',
      age: '',
      favoriteFood: '',
    });
  };

  const handleChangeCatForm = (
    key: 'name' | 'age' | 'favoriteFood',
    value: string,
  ) => {
    setCatForm({
      ...catForm,
      [key]: value,
    });
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: safeAreaInsets.top,
          paddingBottom: safeAreaInsets.bottom,
          backgroundColor: themeColors.background,
        },
      ]}
    >
      <HolidayCountdown
        textColor={themeColors.text}
        cardBackground={themeColors.inputBackground}
      />

      <Button title="添加猫🐱" onPress={handleAddCat}></Button>

      {cats.map(cat => (
        <Cat
          textColor={themeColors.text}
          cardBackground={themeColors.inputBackground}
          key={cat.name}
          name={cat.name}
          age={cat.age}
          favoriteFood={cat.favoriteFood}
        />
      ))}
      <View>
        <View>
          <Text style={[styles.textShow, { color: themeColors.text }]}>
            {catForm.name ? '猫的名字是：' + catForm.name : '输入名字'}
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                color: themeColors.text,
                borderColor: themeColors.inputBorder,
                backgroundColor: themeColors.inputBackground,
              },
            ]}
            placeholderTextColor={themeColors.placeholder}
            value={catForm.name}
            onChangeText={text => handleChangeCatForm('name', text)}
            placeholder="在这里输入名字"
          />
        </View>
        <View>
          <Text style={[styles.textShow, { color: themeColors.text }]}>
            {catForm.age ? '猫的年龄是：' + catForm.age : '输入年龄'}
          </Text>
          <TextInput
            keyboardType="numeric"
            style={[
              styles.input,
              {
                color: themeColors.text,
                borderColor: themeColors.inputBorder,
                backgroundColor: themeColors.inputBackground,
              },
            ]}
            placeholderTextColor={themeColors.placeholder}
            value={catForm.age}
            onChangeText={text => handleChangeCatForm('age', text)}
            placeholder="在这里输入年龄"
          />
        </View>
        <View>
          <Text style={[styles.textShow, { color: themeColors.text }]}>
            {catForm.favoriteFood
              ? '猫的爱好是：' + catForm.favoriteFood
              : '输入爱好'}
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                color: themeColors.text,
                borderColor: themeColors.inputBorder,
                backgroundColor: themeColors.inputBackground,
              },
            ]}
            placeholderTextColor={themeColors.placeholder}
            value={catForm.favoriteFood}
            onChangeText={text => handleChangeCatForm('favoriteFood', text)}
            placeholder="在这里输入爱好"
          />
        </View>
      </View>
      <Button
        title="清空"
        onPress={() => {
          setCatForm({
            name: '',
            age: '',
            favoriteFood: '',
          });
        }}
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
  textShow: {
    textAlignVertical: 'center',
    alignSelf: 'center',
    minHeight: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#6fc',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    minHeight: 50,
    textAlignVertical: 'top',
  },
});

export default App;
