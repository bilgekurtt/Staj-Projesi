import { useRef } from "react";
import { View } from "react-native";
import { useSessionTimeout } from "react-native-session-timeout";
import { PanResponder } from "react-native";

export function ActivityDetector({ children }: {children: React.ReactNode}) {

    const { resetTimer } = useSessionTimeout();

    const panResponder = useRef(

        PanResponder.create({

            onStartShouldSetPanResponderCapture: () => {
                resetTimer();
                return false;
            },
            onMoveShouldSetPanResponderCapture: () => {
                resetTimer();
                return false;
            },
        })
    ).current;

    //spread panHandlers onto the view to attach the gesture event listeners
    return (
        <View style={{ flex: 1 }} {...panResponder.panHandlers}>
            {children}
        </View>
    );
}