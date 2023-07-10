import { NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator} from "@react-navigation/native-stack";
import {LogIn} from "./pages/login";
import List from "./components/user/List";
import Details from "./components/user/Details";
import {useEffect, useState} from "react";
import {User, onAuthStateChanged} from "firebase/auth";
import {FIREBASE_AUTH} from "./firebaseConfig";
import {Registration} from "./pages/register";

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator()

const InsideLayout = () =>  (
  <InsideStack.Navigator>
    <InsideStack.Screen name="my Todos" component={List} />
    <InsideStack.Screen name="details" component={Details} />
  </InsideStack.Navigator>
)

export default function App() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user)
      setUser(user)
    })
  },[])

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Registration">
          {user ? <Stack.Screen name="Inside" component={InsideLayout} options={{headerShown: true }} />
              :  <Stack.Screen name="Registration" component={Registration} options={{headerShown: true }} /> }
            <Stack.Screen name="Login" component={LogIn} options={{headerShown: true }} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}