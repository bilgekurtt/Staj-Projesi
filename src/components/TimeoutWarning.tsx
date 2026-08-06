import { useEffect } from "react";
import { Modal, View, Text, Button, StyleSheet } from "react-native";
import { useSessionTimeout } from "react-native-session-timeout";

export function TimeoutWarning() {
    const { isWarning, remainingTime, resetTimer } = useSessionTimeout();

    useEffect(() => {
        console.log(remainingTime);
    }, [remainingTime]);

    if (!isWarning) return null;

    return (
        <Modal visible={isWarning} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>Oturumunuz kapanmak üzere</Text>
                    <Text style={styles.message}>
                        İşlem yapmadığınız için uygulama {' '}
                        {Math.floor(remainingTime / 1000)} saniye sonra kilitlenecektir.
                    </Text>
                    <Button title="Devam Et" onPress={resetTimer} />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00000080"
    },
    modal: {
        width: 300,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 8,
        alignItems: "center"
    },
    title: {
        fontWeight: 500
    },
    message: {
        padding: 10
    }
})