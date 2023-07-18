import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const FaceIDScreen: React.FC = () => {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        ;(async () => {
            try {
                const result = await LocalAuthentication.authenticateAsync
                ({
                    promptMessage: 'Authenticate with Face ID',
                    fallbackLabel: 'Use passcode',
                });

                console.log(result, "result")

                if (result.success) {
                    setAuthenticated(true);
                } else {
                    setAuthenticated(false);
                }
            } catch (error) {
                console.error('Face ID authentication error:', error);
                setAuthenticated(false);
            }
        })()
    }, [])

    return (
        <View>
            {/*{authenticated && <Text>Authentication successful!</Text>}*/}
        </View>
    );
};

export default FaceIDScreen;