import React, { useCallback, useState } from "react";
import { View, FlatList, Text, Alert, StyleSheet, Pressable } from "react-native";

import { Tag } from "../types/tag.types";

import { getTagColor } from "../utils/tagColors";

import { deleteTag, getTags, updateTag, addTag } from "../api/tags.api";

import { useFocusEffect } from "@react-navigation/native";
import { TagModal } from "../components/TagModal";



export default function TagScreen() {

    const [tags, setTags] = useState<Tag[]>([]);

    const [visible, setVisible] = useState(false);
    const [selectedTag, setSelectedTag] = useState<Tag | null>(null);


    async function loadTags() {

        const response = await getTags();
        setTags(response.data);
    }

    async function deleteTagById() {
        try {
            await deleteTag(selectedTag?._id);
 
            setTags(previous => previous.filter(tag => tag._id !== selectedTag._id));

            closeTagModal();

        } catch (error) {
            console.error(error);
            Alert.alert("Etiket silinirken bir sorun oluştu.");
        }
    }

    async function saveTag(name: string) {

        if (selectedTag) {
            await updateTag(selectedTag._id, name);
        } else {
            await addTag(name);
        }

        await loadTags();
        closeTagModal();
    }
    function openNewTagModal() {
        setSelectedTag(null);
        setVisible(true);
    }

    function openEditTagModal(tag: Tag) {
        setSelectedTag(tag);
        setVisible(true);
    }

    function closeTagModal() {
        setVisible(false);
    }


    useFocusEffect(
        useCallback(() => {
            loadTags();
        }, [])
    );

    return (
        <View style={{flex: 1}}>
            <FlatList

                data={tags}
                keyExtractor={(item) => item._id}
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}

                renderItem={({ item }) => (

                    <Pressable
                        style={styles.card}
                        onPress={() => openEditTagModal(item)}
                    >

                        <View
                            style={[
                                styles.tagPill,
                                { backgroundColor: getTagColor(item.name) }
                            ]}
                        >
                            <Text>{item.name}</Text>
                        </View>

                    </Pressable>

                )}

                ListHeaderComponent={
                    <View style={styles.header}>

                        <Text style={styles.title}>Etiketler</Text>

                        <Pressable
                            style={styles.button}
                            onPress={openNewTagModal}
                        >
                            <Text style={[styles.title, styles.buttonText]}>+</Text>
                        </Pressable>

                    </View>
                }

                style={styles.container}
                contentContainerStyle={styles.itemContainer}
                numColumns={2}

            />

            <TagModal
                visible={visible}
                tag={selectedTag ?? undefined}
                onSave={saveTag}
                onDelete={selectedTag ? deleteTagById : undefined}
                onCancel={closeTagModal}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B6D0E2',
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    itemContainer: {
        padding: 10,
        marginTop: 50,
    },
    title: {
        fontWeight: 500,
        fontSize: 22,
        padding: 5,
    },
    card: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "space-between",
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        elevation: 2,
        marginRight: 5,

    },
    button: {
        backgroundColor: "#8ad096",
        borderRadius: 8,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 24,

    },
    tagPill: {
        alignSelf: "flex-start",
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 999,
        marginRight: 3,
    },
})