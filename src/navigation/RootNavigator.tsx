//purpose: choose which navigation to go to

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";
import { useAppLock } from '../hooks/useAppLock';
import { SessionTimeoutProvider } from "react-native-session-timeout";

import { TimeoutWarning } from "../components/TimeoutWarning";
import { ActivityDetector } from "../components/ActivityDetector";
import { Loading } from "../components/Loading";

import { ThemeProvider } from "../context/ThemeContext";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";




export default function RootNavigator() {

    const unlocked = useSelector(
        (state: { auth: { isAuthenticated: boolean } }) =>
            state.auth.isAuthenticated
    );

    const dispatch = useDispatch();

    function lockApp() {
        dispatch(logout());
    }

    useAppLock(lockApp);

    return (

        <ThemeProvider>
        
            <SessionTimeoutProvider
                enabled={unlocked? true : false}
                timeout={30000}
                warningDuration={5000}
                onTimeout={lockApp}
            >
                <ActivityDetector>

                    <NavigationContainer>

                    {unlocked ?
                
                            <AppNavigator onLock={lockApp} />
                            :
                            <AuthNavigator/>
                        }

                        <Loading />

                    </NavigationContainer>

                </ActivityDetector>

                {unlocked && <TimeoutWarning />}

            </SessionTimeoutProvider>

        </ThemeProvider>
        
    );
}

