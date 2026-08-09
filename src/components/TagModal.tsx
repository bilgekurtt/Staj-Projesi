import { useContext, useEffect, useState } from "react";
import { Modal, View, Button, StyleSheet, TextInput, Text } from "react-native";
import { Tag } from "../types/tag.types";

import { ThemeContext } from "../context/ThemeContext";
import { getThemeColors } from "../utils/themeColors";

interface TagModalProps {
    visible: boolean;
    tag?: Tag;

    onSave: (name: string) => void;
    onDelete?: () => void;
    onCancel: () => void;
}

export function TagModal({visible, tag, onSave, onDelete, onCancel}: TagModalProps) {

    const [name, setName] = useState("");

    const { theme } = useContext(ThemeContext)!;
    const colors = getThemeColors(theme);

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
                <View style={[
                    styles.modal,
                    {
                        backgroundColor: colors.card,
                        borderColor: colors.border,
                    }
                ]}>

                    <Text style={[
                        styles.title,
                        { color: colors.text }
                    ]}>
                        Düzenle / Oluştur
                    </Text>

                    <TextInput
                        value={name}
                        style={[
                            styles.inputBox,
                            {
                                backgroundColor: colors.input,
                                color: colors.text,
                                borderColor: colors.border,
                            }
                        ]}
                        placeholder="Etiket Adı"
                        placeholderTextColor={colors.secondaryText}
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
    },
    modal: {
        width: 300,
        padding: 20,
        borderRadius: 8,
        alignItems: "center",
        borderWidth: 1,
        borderStyle: "solid",
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
        borderRadius: 4,
        marginBottom: 15
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 40,
    }
})