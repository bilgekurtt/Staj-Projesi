import { Text, TextInput, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { out } from "../api/axios";

export default function EditScreen({ route }) {

    //extract user object
    const { user } = route.params;

    const [name, setName] = useState(user.name);
    const [lastname, setLastname] = useState(user.lastname);
    const [email, setEmail] = useState(user.email);
    const [description, setDescription] = useState(user.description);

    const [message, setMessage] = useState("");

    async function saveUser() {
        try {
            await out.users.update(user._id, {
                name,
                lastname,
                email,
                description,
            });
            console.log(`User ${user._id} updated.`);
            setMessage("User updated successfully!");
        } catch (error) {
            console.error(error);
            setMessage("Please check the information.");
        }
        
    
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
        >
            <Text style={styles.header }>Edit Profile</Text>

            <Image 
                style={styles.picture}
                source={{ uri: user.avatarURL }}
            />

            <Text style={styles.label }>Name</Text>
            <TextInput
                value={name}
                style={styles.input}
                onChangeText={setName}
            />

            <Text style={styles.label}>Last Name</Text>
            <TextInput
                value={lastname}
                style={styles.input}
                onChangeText={setLastname}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                value={email}
                style={styles.input}
                onChangeText={setEmail}
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
                value={description}
                multiline={true}
                style={styles.input}
                onChangeText={setDescription}
            />

            <Pressable
                onPress={saveUser}
                style={styles.saveButton}
            >
                <Text style={{fontSize: 16, color: "white"} }> Save </Text>
            </Pressable>

            {message ? <Text style={{textAlign: 'center'} }>{message}</Text> : null}
        </ScrollView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#B6D0E2',
    },
    content: {
        padding: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 30
    },
    picture: {
        width: 100,
        height: 100,
        borderRadius: 40, 
        alignSelf: 'center',
        marginBottom: 30
    },
    label: {
        fontWeight: 500,
        padding: 5
    },
    input: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
    },
    saveButton: {
        alignSelf: 'center',
        margin: 20,
        backgroundColor: '#4989B6',
        borderRadius: 8,
        padding: 10,
        paddingHorizontal: 20
    }
})