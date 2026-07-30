import { View, Text, TextInput, StyleSheet, Pressable, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { launchImageLibrary } from 'react-native-image-picker';
import { getTagColor } from "../services/tagColors";
import { MultiSelect } from 'react-native-element-dropdown';
import { Tag } from '../types/tag.types';
import { addUser, updateUser } from '../api/users.api';
import { getTags } from '../api/tags.api';

export default function EditScreen({ route }) {

    //extract user object (if parameters were passed)
    const user = route.params?.user;

    //required fields
    const [name, setName] = useState(user?.name ?? "");
    const [lastname, setLastname] = useState(user?.lastname ?? "");
    const [email, setEmail] = useState(user?.email ?? "");
    const [password, setPassword] = useState(user?.password ?? "");

    //non-required fields
    const [description, setDescription] = useState(user?.description ?? "");
    const [avatarURL, setAvatarURL] = useState(user?.avatarURL ?? "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y");
    const [location, setLocation] = useState(user?.location ?? "");
    const [tags, setTags] = useState<any[]>([]);
    
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState("");
    const [selectedTags, setSelectedTags] = useState(
            user?.tags?.map(( tag: Tag) => tag._id) ?? []
    );

    const isEditing = !!user;

    async function editUser() {
        try {
            await updateUser(user._id, {
                name,
                lastname,
                email,
                description,
                avatarURL,
                location,
                tags: selectedTags
            });
            console.log(`User ${user._id} updated.`);
            setMessage("Kullanıcı başarıyla güncellendi");
        } catch (error) {
            console.error(error);
            setMessage("Lütfen bilgileri kontrol ediniz.");
        } 
    }

    async function createUser() {
        try {
            await addUser({
                name,
                lastname,
                email,
                password,
                description,
                avatarURL,
                location,
                locationCoordinates: {
                    latitude: 0,
                    longitude: 0,
                },
                tags: selectedTags
            });
            console.log("Yeni kullanıcı oluşturuldu.");
            setMessage("Yeni kullanıcı başarıyla oluşturuldu!");
        } catch (error) {
            console.error(error);
            setMessage("Lütfen bilgileri kontrol ediniz.");
        }
    }

    //open gallery to select an image
    async function selectImage() {

        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 500,
            maxWidth: 500,
            quality: 0.7,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) { 
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image picker error: ', response.error);
            } else {
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setAvatarURL(imageUri);
            }
        });
    }

    useEffect(() => {
        async function loadTags() {
            const response = await getTags();
            setTags(response.data);
        }
        loadTags();
    }, []);

    return (
        <KeyboardAwareScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            enableOnAndroid={true}
            extraScrollHeight={100}
        >
            <Text style={styles.header}>
                {isEditing ? "Profili Düzenle" : "Yeni Kullanıcı" }
            </Text>

            <Pressable
                onPress={selectImage}
            >
                <Image 
                    style={styles.picture}
                    source={{ uri: avatarURL }}
                />
            </Pressable>

            <Text style={styles.label }>İsim</Text>
            <TextInput
                value={name}
                style={styles.input}
                onChangeText={setName}
            />

            <Text style={styles.label}>Soyisim</Text>
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

            <Text style={styles.label}>Açıklama</Text>
            <TextInput
                value={description}
                multiline={true}
                style={styles.input}
                onChangeText={setDescription}
            />

            <Text style={styles.label}>Lokasyon</Text>
            <TextInput
                value={location}
                multiline={true}
                style={styles.input}
                onChangeText={setLocation}
            />

            <Text style={styles.label}>Etiketler</Text>
            <MultiSelect
                style={styles.dropdown}
                placeholderStyle={{ fontSize: 14, color: "grey", paddingLeft: 5 }}
                selectedTextStyle={{ fontSize: 12 }}
                data={tags}
                labelField="name"
                valueField="_id"
                placeholder="Add tags"
                dropdownPosition="top"
                value={selectedTags}
                onChange={item => {
                    setSelectedTags(item);
                }}
            />    
                <View style={styles.tagBox}>
                    {user?.tags.map((tag: Tag) => (
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

            {!isEditing && (
                <View>
                    <Text style={styles.label}>Şifre</Text>
                    <TextInput
                        value={password}
                        secureTextEntry={hidePassword}
                        style={styles.input}
                        onChangeText={setPassword}
                        maxLength={4}
                        keyboardType="number-pad"
                    />
                    <Pressable
                        style={styles.button }
                        onPress={() => setHidePassword(!hidePassword)}
                    >
                        <Text style={{color: "red"}}>{hidePassword ? "Şifreyi Göster": "Şifreyi Gizle"}</Text>
                    </Pressable>
                </View>
            )}

            <Pressable
                onPress={isEditing ? editUser : createUser}
                style={styles.button}
            >
                <Text style={{ fontSize: 16, color: "white" }}>
                    {isEditing ? "Kaydet" : "Oluştur"}
                </Text>
            </Pressable>

            {message ? <Text style={{textAlign: 'center'} }>{message}</Text> : null}
        </KeyboardAwareScrollView>
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
        marginBottom: 30,        
    },
    label: {
        fontWeight: '500',
        padding: 5
    },
    input: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
    },
    button: {
        alignSelf: 'center',
        margin: 20,
        backgroundColor: '#4989B6',
        borderRadius: 8,
        padding: 10,
        paddingHorizontal: 20
    },
    tagBox: {
        flexDirection: 'row',
    },
    tag: {
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 999,
        marginRight: 3,

    },
    dropdown: {
        height: 45,
        backgroundColor: '#ffffff',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        borderRadius: 8
    },
})