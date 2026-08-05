//purpose: handles navigation after unlock

import HomeScreen from "../screens/HomeScreen";
import EditScreen from '../screens/EditScreen';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

interface AppNavigatorProps {
    onLock: () => void;
}
export default function AppNavigator({ onLock }: AppNavigatorProps) {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Home"
            >
                {() => (
                    <HomeScreen onLock={onLock} />
                )}
            </Stack.Screen>
            <Stack.Screen
                name="EditUser"
                component={EditScreen}
            />
        </Stack.Navigator>
    );
}