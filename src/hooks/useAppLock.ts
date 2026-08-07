//purpose: tell the caller when the app is locked

import { useEffect} from "react";
import { AppState } from "react-native";
import { appStateFlag } from "../flags/appStateFlag";

export function useAppLock(onLock: () => void) {

    useEffect(() => {

        const subscription = AppState.addEventListener(
            "change",
            nextAppState => {

                if (nextAppState === 'background') {
                    if (appStateFlag.isPickerOpen) {
                        console.log("Ignoring background state caused by image picker");
                        return;
                    }

                    onLock();
                }                
            }
        );

        //clean up the event listener
        return () => subscription.remove();

    }, [onLock]);
}