import React, {FC, ReactElement, useState} from 'react';
import {
    ActivityIndicator, Button, KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import {FIREBASE_AUTH} from "../../firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import {NavigationProp} from "@react-navigation/native";

interface RouterProps {
    navigation: NavigationProp<any, any>
}

export const LogIn = ({navigation}: RouterProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setIsLoading(true)
        try{
            const response = await signInWithEmailAndPassword(auth, email, password)
            console.log(response)
            navigation.navigate('Inside')
        }catch (error){
            console.log(error)
            alert('Sign in failed: ' + error.message)
        }finally {
            setIsLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="position">
                <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>
                <TextInput style={styles.input} placeholder="Password" autoCapitalize="none" onChangeText={(text) => setPassword(text)}></TextInput>
                {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> :
                    <>
                        <Button title="Login" onPress={signIn} />
                    </>
                }
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});