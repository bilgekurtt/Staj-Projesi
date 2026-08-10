//purpose: handles navigation before unlock

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LockScreen from "../screens/LockScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Lock">
                {() => (
                    <LockScreen />
                )}
            </Stack.Screen>
        </Stack.Navigator>
    );
}

