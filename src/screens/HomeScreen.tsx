import React, { useEffect, useState} from 'react';
import { View, Text, FlatList } from 'react-native';
import { getUsers, getTags } from "../api/axios";


export default function HomeScreen() {

    const [users, setUsers] = useState<any[]>([]);
    const [tags, setTags] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    async function loadUsers(pageNumber : number) {

        if (loading || !hasMore) return;

        setLoading(true);

        try {
            const response = await getUsers(pageNumber);

            setUsers(previous => [
                ...previous,
                ...response.data
            ]);

            setPage(pageNumber);

            if (pageNumber >= response.pagination.totalPages) {
                setHasMore(false);
            }
        } finally {
            setLoading(false);
        }
    }

    async function loadTags(pageNumber: number) {

        if (loading || !hasMore) return;

        setLoading(true);

        try {
            const response = await getTags(pageNumber);

            setTags(previous => [
                ...previous,
                ...response.data
            ]);

            setPage(pageNumber);

            if (pageNumber >= response.pagination.totalPages) {
                setHasMore(false);
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadUsers(1);
        loadTags(1);
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
            onEndReached={() => { console.log("onEndReached"); loadUsers(page + 1); }}
            onEndReachedThreshold={0.5}
        />
    );
   
}