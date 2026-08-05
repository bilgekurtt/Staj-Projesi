//purpose: choose which navigation to go to

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";
import { useAppLock } from '../hooks/useAppLock';
export default function RootNavigator() {

    const [unlocked, setUnlocked] = useState(false);

    useAppLock(() => setUnlocked(false));

    return (
        <NavigationContainer>
            {unlocked ?
                <AppNavigator onLock={() => setUnlocked(false)} />
                :
                <AuthNavigator onUnlock={() => setUnlocked(true)} />
            }
        </NavigationContainer>
    );
}

