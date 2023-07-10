import {View, Button} from "react-native";
import {NavigationProp} from "@react-navigation/native";
import {FIREBASE_AUTH} from "../../firebaseConfig";

interface RouterProps {
    navigation: NavigationProp<any, any>
}

const List = ({navigation}: RouterProps) => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Button title="Open Details" onPress={() => navigation.navigate('details')} />
            <Button title="Logout" onPress={() => FIREBASE_AUTH.signOut()} />
        </View>
    )
}

export default List