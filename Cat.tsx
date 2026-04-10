import React, { useState } from 'react';
import { Button, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type CatProps = {
    name: string
    age: number
}

const Cat = ({ name, age }: CatProps) => {
    const [isHungry, setIsHungry] = useState(true)

    return (
        <View>
            <Text>我是CatRN组件</Text>
            <Text>名字是：{name}，年龄是{age}  </Text>
            <Text>{isHungry ? '我饿了' : '我吃饱了'}  </Text>
            <Button
                title='吃饭'
                onPress={() => { setIsHungry(!isHungry) }}
            />
        </View>
    );
};

export default Cat;