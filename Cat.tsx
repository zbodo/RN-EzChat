import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

type CatProps = {
    name: string
    age: number;
    textColor: string;
    cardBackground: string;
}

const Cat = ({ name, age, textColor, cardBackground }: CatProps) => {
    const [isHungry, setIsHungry] = useState(true)
    const textStyle = { color: textColor }

    const handleToggleHungry = () => { setIsHungry(!isHungry) }

    return (
        <View
            style={[styles.card, {
                backgroundColor: cardBackground,
            }]}
        >
            <Text
                style={[styles.text, textStyle]}
            >我是CatRN组件</Text>
            <Text
                style={[styles.text, textStyle]}>名字是：{name}，年龄是{age}  </Text>
            <Text
                style={[styles.text, textStyle]}>{isHungry ? '我饿了' : '我吃饱了'}  </Text>
            <Button
                title='吃饭'
                onPress={handleToggleHungry}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    text: {

    },
    card: {
        paddingHorizontal: 10,
        borderRadius: 16,
        paddingVertical: 12,
        gap: 6
    }
})

export default Cat;