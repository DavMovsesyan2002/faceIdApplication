import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

interface ListProps {
    id: number
    urls: any
    alt_description: string
}

type ItemProps = {
    item: ListProps;
    onPress: () => void;
    showDescription: boolean;
    textColor: string;
};

const List = ({item, onPress, showDescription}: ItemProps) => (
    <TouchableOpacity onPress={onPress}>
        <View key={item.id} style={styles.listContainer}>
            <Image source={{uri: item.urls.regular}} style={styles.image}/>
            <Text style={[styles.title]}>{item.alt_description}</Text>
            <Text style={[styles.description]}>{showDescription && 'description'}</Text>
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