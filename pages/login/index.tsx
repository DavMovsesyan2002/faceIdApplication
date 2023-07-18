import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator, Button, KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import {FIREBASE_AUTH} from "../../firebaseConfig";
import { signInWithEmailAndPassword } from 'firebase/auth'
import TouchID from 'react-native-touch-id';
import FaceIDScreen from "../../components/faceIdScreen";
import {RouterProps} from "../../types/route/route";

const optionalConfigObject = {
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the dashboard is not enrolled.  (default false)
}

export const LogIn = ({navigation}: RouterProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const auth = FIREBASE_AUTH;

    useEffect(() => {
        TouchID.isSupported(optionalConfigObject)
            .then(biometryType => {
                // Success code
                if (biometryType === 'FaceID') {
                    console.log('FaceID is supported.');
                } else {
                    console.log('TouchID is supported.');
                }
            })
            .catch(error => {
                // Failure code
                console.log(error);
            });
    },[])

    const handleSignIn = async () => {
        setIsLoading(true)
        try{
            const response = await signInWithEmailAndPassword(auth, email, password)
            console.log(response)
            navigation.navigate('Inside')
        }catch (error){
            if (error instanceof Error) {
                console.log(error)
                alert('Sign in failed: ' + error.message)
            }
        }finally {
            setIsLoading(false)
        }
    }

    const handleSignUp = () => {
        navigation.navigate('Registration')
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="position">
                <Button color="#841584" title='Sign up' onPress={handleSignUp} />
                <FaceIDScreen />
                <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>
                <TextInput style={styles.input} placeholder="Password" autoCapitalize="none" onChangeText={(text) => setPassword(text)}></TextInput>
                {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> :
                    <>
                        <Button title="Login" onPress={handleSignIn} />
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
        width: 350,
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