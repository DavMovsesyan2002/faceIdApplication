import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import {ItemProps} from "../../types/dashboard/dashboard";

const List = ({item, onPress, showDescription}: ItemProps) => (
    <TouchableOpacity onPress={onPress}>
        <View key={item.id} style={styles.listContainer}>
            <Image source={{uri: item.urls.regular}} style={styles.image}/>
            <Text style={[styles.title]}>{item.alt_description}</Text>
            <Text style={[styles.description]}>{showDescription && item.user.bio}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: 200,
        marginRight: 12,
        marginBottom: 15,
    },
    listContainer: {
        padding: 20,
    },
    textContainer: {
        flex: 1,
    },
    description: {
        fontSize: 16,
        color: 'gray',
    },
});

export default List