//show an alert to confirm an action

import { Alert } from "react-native";

interface ConfirmActionProps {
    title: string;
    message: string;
    onConfirm: () => void;
}

export function confirmAction({
    title,
    message,
    onConfirm,
}: ConfirmActionProps) {

    Alert.alert(
        title,
        message,
        [
            {
                text: "İptal",
                style: "cancel",
            },
            {
                text: " OK ",
                style: "destructive",
                onPress: onConfirm,
            },
        ],
        { cancelable: true }

    );
}