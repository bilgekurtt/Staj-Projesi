import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LockScreen from "../screens/LockScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {

    const [unlocked, setUnlocked] = useState(false);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                {!unlocked ? (
                    <Stack.Screen name="Lock">
                        {() => (

                            //create a func and send it to lockscreen
                            <LockScreen onUnlock={() => setUnlocked(true)}/>
                        )}
                    </Stack.Screen>
                ) : (
                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                        />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}