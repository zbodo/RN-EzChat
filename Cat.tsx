import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

type CatProps = {
  textColor: string;
  cardBackground: string;
  name: string;
  age: number;
  favoriteFood: string;
};

const Cat = ({
  name,
  age,
  textColor,
  cardBackground,
  favoriteFood,
}: CatProps) => {
  const [isHungry, setIsHungry] = useState(true);
  const textStyle = { color: textColor };

  const handleToggleHungry = () => {
    setIsHungry(!isHungry);
  };

  const hungryText = isHungry ? '我饿了' : '我吃饱了';
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: cardBackground,
        },
      ]}
    >
      <Text style={[styles.text, textStyle]}>我是CatRN组件</Text>
      <Text style={[styles.text, textStyle]}>
        名字是：{name}，年龄是{age}{' '}
      </Text>
      <Text style={[styles.text, textStyle]}>最爱的是：{favoriteFood} </Text>
      <Text style={[styles.text, textStyle]}>{hungryText} </Text>
      {isHungry && <Text style={[styles.text, textStyle]}>让我吃些零食 </Text>}
      <Button title="吃饭" onPress={handleToggleHungry} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    lineHeight: 16,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    gap: 6,
  },
});

export default Cat;
