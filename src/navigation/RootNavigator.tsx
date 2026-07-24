import React, { useState, useEffect } from 'react';
import { AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LockScreen from "../screens/LockScreen";
import HomeScreen from "../screens/HomeScreen";
import EditScreen from '../screens/EditScreen';

const Stack = createNativeStackNavigator();

function AppStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
            />
            <Stack.Screen
                name="EditUser"
                component={EditScreen}
            />
        </Stack.Navigator>
    );
}

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
            {unlocked ? (
                <AppStack />
            ) : (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Lock">
                        {() => (
                            <LockScreen
                                onUnlock={() => setUnlocked(true)}
                            />
                        )}
                    </Stack.Screen>
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
}

