import Dashboard from "../pages/dashboard";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const InsideStack = createNativeStackNavigator()

const InsideLayout = () => (
    <InsideStack.Navigator>
        <InsideStack.Screen name="Dashboard" component={Dashboard}/>
    </InsideStack.Navigator>
)

export default InsideLayout