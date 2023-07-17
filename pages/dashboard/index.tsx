import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    Image,
    Button, TouchableOpacity
} from 'react-native';
import {NavigationProp} from "@react-navigation/native";
import {FIREBASE_AUTH} from "../../firebaseConfig";
import {SetStateAction, useEffect, useState} from "react";
import List from "../../components/user/List";
import Pagination from "../../components/user/Pagination";

// import Pagination,{Icon,Dot} from 'react-native-pagination';


type ItemData = {
    id: string;
    title: string;
};


interface RouterProps {
    navigation: NavigationProp<any, any>
}

const ACCESS_KEY = 'PYLoOTjIB72QWqrijqixoPVabeueomre9mVVqeiX4AA'
// const API_URL = `https://api.unsplash.com/photos/?count=10&client_id=${ACCESS_KEY}`;

const Dashboard = ({navigation}: RouterProps) => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const totalPages = 5;

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const fetchData = async (page: number) => {
        const API_URL = `https://api.unsplash.com/photos/?count=10&client_id=${ACCESS_KEY}&page=${page}`;

        // ?page=${page}
        const response = await fetch(API_URL);
        const data = await response.json();
        setData(data);
        console.log(response, "response")
    };

    const handleSignOut = () => {
        FIREBASE_AUTH.signOut()
        navigation.navigate('Login')
    }

    const handlePageChange = (page: SetStateAction<number>) => {
        setCurrentPage(page);
    };

    const handleOnList = (id: string) => {
        const listId = (id === selectedId ? null : id)
        setSelectedId(listId)
    }

    const renderItem = ({item}: {item: ItemData}) => {
        const show = item.id === selectedId;

        return (
            <List
                item={item}
                onPress={() => handleOnList(item.id)}
                showDescription={show}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {data && <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />}
            <View style={styles.containerPagination}>
                <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
            </View>
            {/*<Button title="Logout" onPress={handleSignOut}/>*/}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    containerPagination: {
        width: '100%',
        padding: 16,
    },
    contentContainer: {
        paddingBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    pageInfo: {
        fontSize: 16,
        marginTop: 16,
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
});

export default Dashboard