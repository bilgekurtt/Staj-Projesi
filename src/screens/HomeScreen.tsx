import React, { useCallback, useState, useRef} from 'react';
import { View, Text, FlatList, StyleSheet, Image, Pressable } from 'react-native';
import { out } from "../api/axios";
import { getTagColor } from "../services/tagColors";
import { useNavigation, useFocusEffect } from "@react-navigation/native";


export default function HomeScreen() {

    const [users, setUsers] = useState<any[]>([]);

    const pageRef = useRef(1);
    const isFetchingRef = useRef(false);

    const navigation = useNavigation();

    async function loadUsers(pageNumber : number) {

        if (isFetchingRef.current) return;

        isFetchingRef.current = true;

        try {
            const response = await out.users.get(pageNumber);

            setUsers(previous => {
                const map = new Map();

                //append the new elements to the already existing ones
                [...previous, ...response.data].forEach(user => {
                    map.set(user._id, user);
                });

                return Array.from(map.values());
            });

            pageRef.current = pageNumber;

            if (pageNumber >= response.pagination.totalPages) return;
        } finally {
            isFetchingRef.current = false;
        }
    }

    //call everytime the screen renders
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
        <FlatList
            data={users}
            keyExtractor={(item) => item._id}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            style={styles.container}
            contentContainerStyle={styles.itemContainer}

            ListHeaderComponent={
                <View>
                    <Pressable
                        onPress={() => navigation.navigate("EditUser")}
                        style={styles.button }
                    >
                        <Text style={{color: "white"} }>ADD USER</Text>
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
                            style={{ fontWeight: "bold", fontSize: 16}}>
                            {item.name} {item.lastname}
                        </Text>
                    </View>

                    <Text style={{color: "gray"}}>{item.description}</Text>

                    <View style={styles.tagBox}>
                        {item.tags.map((tag: any) => (
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
        backgroundColor: '#90D08A',
        width: 150,
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'center'
    }
})