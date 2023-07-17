import {NavigationContainer} from "@react-navigation/native";
import {useEffect, useState} from "react";
import {onAuthStateChanged, User} from "firebase/auth";
import {FIREBASE_AUTH} from "../firebaseConfig";
import AuthNavigator from "./publicRoute";
import InsideLayout from "./privetRoute";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
    <Stack.Navigator initialRouteName="Registration">
        <Stack.Screen name="Inside" component={InsideLayout} options={{headerShown: false}}/>
    </Stack.Navigator>
)

const AppRoutes = () => {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user)
        })
    }, [])

    return (<NavigationContainer>
        {user ? <AppNavigator/> : <AuthNavigator/>}
    </NavigationContainer>)
}

export default AppRoutes