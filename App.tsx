import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {LogIn} from "./pages/login";
import {useEffect, useState} from "react";
import {User, onAuthStateChanged} from "firebase/auth";
import {FIREBASE_AUTH} from "./firebaseConfig";
import {Registration} from "./pages/register";
import Dashboard from "./pages/dashboard";

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator()

const InsideLayout = () => (
    <InsideStack.Navigator>
        <InsideStack.Screen name="Dashboard" component={Dashboard}/>
    </InsideStack.Navigator>
)

const AppNavigator = () => (
    <Stack.Navigator initialRouteName="Registration">
        <Stack.Screen name="Inside" component={InsideLayout} options={{headerShown: true}}/>
    </Stack.Navigator>
)

const AuthNavigator = () => (
    <Stack.Navigator initialRouteName="Registration">
        <Stack.Screen name="Registration" component={Registration} options={{headerShown: true}}/>
        <Stack.Screen name="Login" component={LogIn} options={{headerShown: true}}/>
    </Stack.Navigator>
)

export default function App() {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            console.log('user', user)
            setUser(user)
        })
    }, [])

    return (
        <NavigationContainer>
            {user ? <AppNavigator/> : <AuthNavigator/>}
        </NavigationContainer>
    );
}