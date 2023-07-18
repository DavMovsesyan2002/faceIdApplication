import {Registration} from "../pages/register";
import {LogIn} from "../pages/login";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
    <Stack.Navigator initialRouteName="Registration">
        <Stack.Screen name="Registration" component={Registration} options={{headerShown: true}}/>
        <Stack.Screen name="Login" component={LogIn} options={{headerShown: true}}/>
    </Stack.Navigator>
)


export default AuthNavigator