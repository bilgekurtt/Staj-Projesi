//purpose: choose which navigation to go to

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";
import { useAppLock } from '../hooks/useAppLock';
import { SessionTimeoutProvider } from "react-native-session-timeout";

import { TimeoutWarning } from "../components/TimeoutWarning";
import { ActivityDetector } from "../components/ActivityDetector";
export default function RootNavigator() {

    const [unlocked, setUnlocked] = useState(false);

    useAppLock(() => setUnlocked(false));

    return (
        
        <SessionTimeoutProvider
            enabled={unlocked? true : false}
            timeout={30000}
            warningDuration={5000}
            onTimeout={() => setUnlocked(false)}
        >
            <ActivityDetector>

                <NavigationContainer>

                {unlocked ?
                
                        <AppNavigator onLock={() => setUnlocked(false)} />
                        :
                        <AuthNavigator onUnlock={() => setUnlocked(true)} />
                    }

                </NavigationContainer>

            </ActivityDetector>

            {unlocked && <TimeoutWarning />}

        </SessionTimeoutProvider>
        
    );
}

