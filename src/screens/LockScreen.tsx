import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import { setToken } from '../store/tokenStore';
import { login } from "../api/auth.api";

interface PinInputProps {
    onUnlock: () => void;
}

const LockScreen = ({ onUnlock }: PinInputProps) => { 

    const [pin, setPin] = useState<string[]>(['', '', '', '']);
    const [message, setMessage] = useState<string>('');

    //this array will contain either a TextInput ref or a null value
    const inputsRef = useRef<(TextInput | null)[]>([]);

    const verifyPin = async (currentPinArray: string[]) => {
 
        const fullPin = currentPinArray.join('');

        if (fullPin.length === 4) {
            try {
                const response = await login(fullPin);
                setToken(response.token);
                onUnlock();
            } catch {
                setMessage("Yanlış şifre. Tekrar Deneyin!");
                resetPin();
            }
        }
    };

    const resetPin = () => {
        setPin(['', '', '', '']);
        inputsRef.current[0]?.focus();
    };

    const handleTextChange = (text: string, index: number) => {

        //make a copy of the state array bc we cant play with the state array
        const newPin = [...pin];
        newPin[index] = text;
        //update the state, ui updates to display the number
        setPin(newPin);

        if (text && index < 3) {
            inputsRef.current[index + 1]?.focus();
        }

        verifyPin(newPin);
    };

    const handleKeyPress = (index: number) => {

        if (!pin[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();

        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.pinContainer}>     
                {pin.map((digit, index) => (        //for each item in the array, output a seperate TextInput component
                    <TextInput
                        key={index}
                        style={styles.pinBox} 
                        maxLength={1}
                        keyboardType="numeric"
                        value={digit}

                        //an event listener that triggers the moment the user types with custom handling
                        onChangeText={(text) => handleTextChange(text, index)} 

                        //event listener that triggers when any key is pressed
                        onKeyPress={(e) => {
                            if (e.nativeEvent.key === 'Backspace' && !pin[index]) {
                                handleKeyPress(index);
                            }
                        }}

                        //callback ref to handle all 4 digits at the same time
                        ref={(el) => { inputsRef.current[index] = el; }}
                    />
                ))}
            </View>

            {message ? <Text style={styles.messageText}>{message}</Text> : null}
        </SafeAreaView>
    );
};

//aesthetics
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white'
    },
    pinContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
        marginTop: 40
    },
    pinBox: {
        borderWidth: 1,
        borderColor: 'black',
        width: 47,
        height: 46,
        margin: 8,
        textAlign: 'center',
        fontSize: 20,
        borderRadius: 5,
        padding: 5,
    },
    messageText: {
        marginTop: 30,
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    }
});


export default LockScreen;