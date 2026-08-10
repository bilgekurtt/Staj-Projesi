//purpose: ui for the user form screen

import { View, Text, TextInput, StyleSheet, Pressable, Image } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { launchImageLibrary } from 'react-native-image-picker';
import { getTagColor } from "../utils/tagColors";
import { MultiSelect } from 'react-native-element-dropdown';

import { addUser, updateUser } from '../api/users.api';
import { getTags } from '../api/tags.api';

import { Tag } from "../types/tag.types";

import { appStateFlag } from "../flags/appStateFlag";

import { ThemeContext } from "../context/ThemeContext";
import { getThemeColors } from "../utils/themeColors";

import Clipboard from "@react-native-clipboard/clipboard";
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
    const [tags, setTags] = useState<Tag[]>([]);
    
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState("");
    const [selectedTags, setSelectedTags] = useState(
            user?.tags?.map((tag: Tag) => tag._id) ?? []
    );

    const isEditing = !!user

    const { theme } = useContext(ThemeContext)!;
    const colors = getThemeColors(theme);

    async function saveUser() {
        try {
            if (isEditing) {
                await updateUser(user._id, {
                    name,
                    lastname,
                    email,
                    description,
                    avatarURL,
                    location,
                    tags: selectedTags,
                });

                setMessage("Kullanıcı başarıyla güncellendi!");
            } else {
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
                    tags: selectedTags,
                });

                setMessage("Yeni kullanıcı başarıyla oluşturuldu!");
            }
        } catch (error) {
            console.error(error);
            setMessage("Lütfen bilgileri kontrol ediniz.");
        }
    }

    //open gallery to select an image
    async function selectImage() {

        const options = {
            mediaType: 'photo',
            selectionLimit: 1,
            includeBase64: false,
            maxHeight: 500,
            maxWidth: 500,
            quality: 0.7,
        };

        appStateFlag.isPickerOpen = true;

        launchImageLibrary(options, (response) => {

            setTimeout(() => {
                appStateFlag.isPickerOpen = false;
            }, 500);

            if (response.didCancel) { 
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('Image picker error: ', response.errorMessage);
            } else {
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setAvatarURL(imageUri);
            }
        });
    }

    function copyUserInfo() {

        const tagNames = selectedTags
            .map(tagId => {
                const tag = tags.find(tag => tag._id === tagId);
                return tag?.name;
            });

        const userInfo = 
           `İsim: ${name}
            Soyisim: ${lastname}
            Email: ${email}
            Açıklama: ${description}
            Lokasyon: ${location}
            Etiketler: ${tagNames.join(", ")}`;

        Clipboard.setString(userInfo);

        console.log("selectedTags:", selectedTags);
        console.log("tags:", tags);

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
            style={[
                styles.container,
                { backgroundColor: colors.background }
            ]}
            contentContainerStyle={styles.content}
            enableOnAndroid={true}
            extraScrollHeight={100}
        >
            <Text style={[
                styles.header,
                { color: colors.text }
            ]}>
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

            <Text style={[styles.label, { color: colors.text }]}>İsim</Text>
            <TextInput
                value={name}
                style={[
                    styles.input,
                    {
                        backgroundColor: colors.input,
                        color: colors.text,
                    }
                ]}
                onChangeText={setName}
            />

            <Text style={[styles.label, { color: colors.text }]}>Soyisim</Text>
            <TextInput
                value={lastname}
                style={[
                    styles.input,
                    {
                        backgroundColor: colors.input,
                        color: colors.text,
                    }
                ]}
                onChangeText={setLastname}
            />

            <Text style={[styles.label, { color: colors.text }]}>Email</Text>
            <TextInput
                value={email}
                style={[
                    styles.input,
                    {
                        backgroundColor: colors.input,
                        color: colors.text,
                    }
                ]}
                onChangeText={setEmail}
            />

            <Text style={[styles.label, { color: colors.text }]}>Açıklama</Text>
            <TextInput
                value={description}
                multiline={true}
                style={[
                    styles.input,
                    {
                        backgroundColor: colors.input,
                        color: colors.text,
                    }
                ]}
                onChangeText={setDescription}
            />

            <Text style={[styles.label, { color: colors.text }]}>Lokasyon</Text>
            <TextInput
                value={location}
                multiline={true}
                style={[
                    styles.input,
                    {
                        backgroundColor: colors.input,
                        color: colors.text,
                    }
                ]}
                onChangeText={setLocation}
            />

            <Text style={[styles.label, { color: colors.text }]}>Etiketler</Text>
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
                    <Text style={[styles.label, { color: colors.text }]}>Şifre</Text>
                    <TextInput
                        value={password}
                        secureTextEntry={hidePassword}
                        style={[
                            styles.input,
                            {
                                backgroundColor: colors.input,
                                color: colors.text,
                            }
                        ]}
                        onChangeText={setPassword}
                        maxLength={4}
                        keyboardType="number-pad"
                    />

                  
                        <Pressable
                            style={styles.button}
                            onPress={() => setHidePassword(!hidePassword)}
                        >
                            <Text style={{color: "red"}}>{hidePassword ? "Şifreyi Göster": "Şifreyi Gizle"}</Text>
                        </Pressable>

                     
                    

                </View>
            )}

            {message ? (
                <Text style={[
                    styles.message,
                    { color: colors.text }
                ]}>
                    {message}
                </Text>
            ) : null}

            <View style={styles.buttonRow}>

                <Pressable
                    style={[styles.button, styles.copyButton, ]}
                    onPress={copyUserInfo}
                >
                    <Text style={{ color: "white" }}>Kopyala</Text>
                </Pressable>

                <Pressable
                    onPress={saveUser}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        {isEditing ? "Kaydet" : "Oluştur"}
                    </Text>
                </Pressable>
            </View>

        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
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
    copyButton: {
        backgroundColor: '#6bc2ed',
    },
    buttonText: {
        fontSize: 16,
        color: "white"
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
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        borderRadius: 8
    },
    message: {
        textAlign: "center",
        marginTop: 12
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 40,
    }
})