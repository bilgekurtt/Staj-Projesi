//purpose: tell the caller when the app is locked

import { useEffect, useRef } from "react";
import { AppState } from "react-native";

export function useAppLock(onLock: () => void) {

    const backgroundTime = useRef<number | null>(null);

    useEffect(() => {

        const subscription = AppState.addEventListener(
            "change",
            nextAppState => {

                if (nextAppState === "background") {
                    backgroundTime.current = Date.now();
                }

                if (
                    nextAppState === "active" &&
                    backgroundTime.current
                ) {
                    const elapsed = Date.now() - backgroundTime.current;

                    if (elapsed > 5000) {
                        onLock();
                    }

                    backgroundTime.current = null;
                }
            }
        );

        //clean up the event listener
        return () => subscription.remove();

    }, [onLock]);
}