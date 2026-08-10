import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export function Loading() {
    const requestCount = useSelector(
        (state: any) => state.loading.requestCount
    );

    if (requestCount === 0) {
        return null;
    }

    return (
        <View style={styles.overlay}>
            <ActivityIndicator size="large" />
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
    },
});