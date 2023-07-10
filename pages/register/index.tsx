import React, {FC, ReactElement, useState } from "react";
import {Button, StyleSheet, TextInput, Alert, View, KeyboardAvoidingView, ActivityIndicator} from "react-native";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {FIREBASE_AUTH} from "../../firebaseConfig";
import {NavigationProp} from "@react-navigation/native";

interface RouterProps {
    navigation: NavigationProp<any, any>
}

export const Registration = ({navigation}: RouterProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const auth = FIREBASE_AUTH;

    const signUp = async () => {
        setIsLoading(true)
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password)
            console.log(response)
            alert("Check your emails!")
            navigation.navigate('Login')
        }catch (error){
            console.log(error)
            alert('Registration failed: ' + error.message)
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
                        <Button title="Create account" onPress={signUp} />
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