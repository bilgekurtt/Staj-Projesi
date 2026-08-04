//purpose: handles navigation after unlock

import HomeScreen from "../screens/HomeScreen";
import EditScreen from '../screens/EditScreen';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
export default function AppNavigator() {
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