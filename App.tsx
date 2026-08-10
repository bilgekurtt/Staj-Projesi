import React from 'react';
import RootNavigator from "./src/navigation/RootNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Provider } from "react-redux";
import { store } from "./src/store/store";
export default function App() {

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Provider store={store}>
                < RootNavigator />
            </Provider>
        </GestureHandlerRootView>
    ); 
}
