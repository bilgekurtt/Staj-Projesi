import React, { useState, useEffect } from 'react';
import { AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LockScreen from "../screens/LockScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {

    const [unlocked, setUnlocked] = useState(false);

    //lock when the app goes to the background
    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (nextAppState === 'background') {
                setUnlocked(false);
            }
        });
        return () => subscription.remove();
    }, []);

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