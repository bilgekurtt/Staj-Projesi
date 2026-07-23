import React, { useEffect, useState, useRef} from 'react';
import { View, Text, FlatList } from 'react-native';
import { out } from "../api/axios";


export default function HomeScreen() {

    const [users, setUsers] = useState<any[]>([]);

    const pageRef = useRef(1);
    const isFetchingRef = useRef(false);

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

    //call once when the components mounts on the screen
    useEffect(() => {
        loadUsers(1);
    }, []);

    return (
        <FlatList
            data={users}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
                <View>
                    <Text>{item.name} {item.lastname}</Text>
                    <Text>{item.email}</Text>
                    <Text>{item.description}</Text>
                    <Text>{item.tags.map((tag:any) => tag.name).join(", ")}</Text>
                </View>
            )}
            onEndReached={() => {loadUsers(pageRef.current + 1); }}
            onEndReachedThreshold={0.5}
        />
    );
   
}