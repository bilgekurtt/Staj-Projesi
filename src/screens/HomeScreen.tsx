//purpose: ui for the home screen

import React, { useCallback, useState, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Pressable, Alert } from 'react-native';

import { getUsers,deleteUser } from "../api/users.api";

import { getTagColor } from "../utils/tagColors";
import { mergeUsers } from "../utils/mergeUsers";

import { Tag } from "../types/tag.types";
import { User } from '../types/user.types';

import { useNavigation, useFocusEffect } from "@react-navigation/native";
import SwipeableFlatList from "rn-gesture-swipeable-flatlist/reanimated";



interface HomeScreenProps {
    onLock: () => void;
}

export default function HomeScreen({ onLock }: HomeScreenProps) {

    const [users, setUsers] = useState<User[]>([]);

    const pageRef = useRef(1);
    const isFetchingRef = useRef(false);

    const navigation = useNavigation();


    async function loadUsers(pageNumber : number) {

        if (isFetchingRef.current) return;

        isFetchingRef.current = true;

        try {
            const response = await getUsers(pageNumber);

            //merge the lists without duplicates
            setUsers(previous => mergeUsers(previous, response.data));

            pageRef.current = pageNumber;

            //reached the end of pages?
            if (pageNumber >= response.pagination.totalPages) return;
        } finally {
            isFetchingRef.current = false;
        }
    }

    async function deleteUserById(userId: string) {
        try {
            await deleteUser(userId);

            setUsers(previous => previous.filter(user => user._id !== userId));
        } catch (error) {
            console.error(error);
            Alert.alert("Kullanıcı silinirken bir sorun oluştu.");
        }
    }

    async function confirmDelete(user: User) {

        Alert.alert(
            "Kullanıcı Sil",
            "Bu kullanıcıyı silmek istediğinize emin misiniz?",
            [
                {
                    text: "İptal",
                    style: "cancel",
                },
                {
                    text: "Sil",
                    style: "destructive",
                    onPress: () => deleteUserById(user._id),
                },
            ],
            { cancelable: true }
        );
         
    };

    //call everytime the screen renders (refresh when focused)
    useFocusEffect(
        useCallback(() => {
            //perform side effect
            pageRef.current = 1;
            loadUsers(1);
            return () => {
                //do something when the screen is unfocused
            };
        }, [])
    );

    return (
        <SwipeableFlatList
            data={users}
            keyExtractor={(item) => item._id}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            style={styles.container}
            contentContainerStyle={styles.itemContainer}

            renderRightActions={(item: User) => (
                <Pressable
                    onPress={() => confirmDelete(item)}
                    style={[styles.button, styles.exitButton]}
                >
                    <Text style={styles.buttonText}>Sil</Text>
                </Pressable>
            ) }

            ListHeaderComponent={
                <View style={styles.header}>

                    <Pressable
                        onPress={() => navigation.navigate("EditUser")}
                        style={styles.button }
                    >
                        <Text style={styles.buttonText}>Kullanıcı Ekle</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.button, styles.tagButton] }
                    >
                        <Text style={styles.buttonText}>Etiketler</Text>
                    </Pressable>

                    <Pressable
                        onPress={onLock}
                        style={[styles.button, styles.exitButton] }
                    >
                        <Text style={styles.buttonText}>Çıkış</Text>
                    </Pressable>

                </View>
            }

            renderItem={({ item }) => (

                <Pressable
                    style={styles.card}

                    //send user object to edit screen inside route.params
                    onPress={() => navigation.navigate("EditUser", {user: item})}
                >

                    <View style={styles.title}>
                        <Image
                        style={styles.picture}
                        source={{uri: item.avatarURL }}
                        />
                        <Text
                            style={styles.titleText}>
                            {item.name} {item.lastname}
                        </Text>
                    </View>

                    <Text style={styles.descriptionText}>{item.description}</Text>

                    <View style={styles.tagBox}>
                        {item.tags.map((tag: Tag) => (
                            <View
                                key={tag._id}
                                style={[
                                    styles.tag,
                                    { backgroundColor: getTagColor(tag.name) }
                                ]}
                            >
                                <Text>{tag.name}</Text>
                            </View>
                        ))}
                    </View>
                </Pressable>
            )}
            onEndReached={() => {loadUsers(pageRef.current + 1); }}
            onEndReachedThreshold={0.5}
        />
    );
   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B6D0E2',
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    itemContainer: {
        padding: 10,
        marginTop: 50,
    },
    tagBox: {
        flexDirection: 'row',
        marginTop: 5,
    },
    tag: {
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 999,
        marginRight: 3,

    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 6,
        shadowColor: '#000',
        elevation: 2,
    },
    title: {
        borderRadius: 8,
        padding: 7,
        flexDirection: 'row',
        alignItems: 'center',
    },
    picture: {
        width: 50,
        height: 50,
        borderRadius: 20,
        marginRight: 15,
    },
    button: {
        backgroundColor: "#8ad096",
        width: 120,
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        marginRight: 10,
        elevation: 2,
        textAlign: "center"
    },
    tagButton: {
        backgroundColor: "#8aabd0",
    },
    exitButton: {
        backgroundColor: "#d08a8a",
        width: 60,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
    },
    descriptionText: {
        color: "gray"
    },
    titleText: {
        fontWeight: "bold",
        fontSize: 16
    },
})