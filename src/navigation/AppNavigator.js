import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// Import các màn hình
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Trang chủ' }} />
                <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Chi tiết bài viết' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
