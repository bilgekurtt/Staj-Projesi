//purpose: handles navigation before unlock

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LockScreen from "../screens/LockScreen";

const Stack = createNativeStackNavigator();

interface AuthNavigatorProps {
    onUnlock: () => void;
}

export default function AuthNavigator({ onUnlock }: AuthNavigatorProps) {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Lock">
                {() => (
                    <LockScreen onUnlock={onUnlock} />
                )}
            </Stack.Screen>
        </Stack.Navigator>
    );
}

