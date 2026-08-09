import { useEffect, useState } from "react";
import { Modal, View, Button, StyleSheet, TextInput, Text } from "react-native";
import { Tag } from "../types/tag.types";

interface TagModalProps {
    visible: boolean;
    tag?: Tag;

    onSave: (name: string) => void;
    onDelete?: () => void;
    onCancel: () => void;
}

export function TagModal({visible, tag, onSave, onDelete, onCancel}: TagModalProps) {

    const [name, setName] = useState("");

    useEffect(() => {
        setName(tag?.name ?? "");
    }, [tag, visible]);

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>

                    <Text style={styles.title}>Düzenle / Oluştur</Text>

                    <TextInput
                        value={name}
                        style={styles.inputBox}
                        placeholder="Etiket Adı"
                        placeholderTextColor="#999999"
                        onChangeText={setName}
                    />

                    <View style={styles.buttonRow}>

                        <Button title="İptal" onPress={onCancel} color="#999696" />

                        {tag && onDelete && (
                            <Button title="Sİl" onPress={onDelete} color="#d08a8a" />
                        )}

                        <Button title="Kaydet" onPress={() => onSave(name)} color="#8aabd0" />

                    </View>

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
        fontWeight: 500,
        marginBottom: 15
    },
    inputBox: {
        width: "100%",
        alignItems: "center",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "gray",
        borderRadius: 4,
        marginBottom: 15
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 40,
    }
})