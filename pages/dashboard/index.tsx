import {
    SafeAreaView,
    FlatList,
    StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';
// import {FIREBASE_AUTH} from "../../firebaseConfig";
import {SetStateAction, useEffect, useState} from "react";
import List from "../../components/user/List";
import Pagination from "../../components/user/Pagination";
import {ISortedData, ItemDataProps} from "../../types/dashboard/dashboard";
import {RouterProps} from "../../types/route/route";

const ACCESS_KEY = 'PYLoOTjIB72QWqrijqixoPVabeueomre9mVVqeiX4AA'

const Dashboard = ({navigation}: RouterProps) => {
    const [data, setData] = useState<ItemDataProps[]>([]);
    const [sortBy, setSortBy] = useState('latest'); // Default sorting option
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const totalPages = 5;

    useEffect(() => {
        sortData();
    }, [sortBy]);

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const fetchData = async (page: number) => {
        const API_URL = `https://api.unsplash.com/photos/?count=10&client_id=${ACCESS_KEY}&page=${page}`;
        const response = await fetch(API_URL);
        const data = await response.json();
        setData(data);
        console.log(response, "response")
    };

    // const handleSignOut = () => {
    //     FIREBASE_AUTH.signOut()
    //     navigation.navigate('Login')
    // }

    const handlePageChange = (page: SetStateAction<number>) => {
        setCurrentPage(page);
    };

    const handleOnList = (id: string) => {
        const listId = (id === selectedId ? null : id)
        setSelectedId(listId)
    }

    const sortData = () => {
        const sortedData: ItemDataProps[] = [...data];

        if (sortBy === 'last') {
            sortedData.sort((a, b) => b.id.localeCompare(a.id));
        } else if (sortBy === 'start') {
            sortedData.sort((a, b) => a.id.localeCompare(b.id));
        }

        setData(sortedData);
    };


    const handleSortChange = (sort: SetStateAction<string>) => {
        setSortBy(sort);
    };

    const renderItem = ({item}: {item: ItemDataProps}) => {
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
            <View style={styles.sortContainer}>
                <Text style={styles.sortText}>Sort By:</Text>
                <TouchableOpacity
                    style={[styles.sortButton, sortBy === 'last' && styles.activeSortButton]}
                    onPress={() => handleSortChange('last')}
                >
                    <Text style={sortBy === 'last' ? styles.sortButtonTextActive : styles.sortButtonText}>
                        Last
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.sortButton, sortBy === 'start' && styles.activeSortButton]}
                    onPress={() => handleSortChange('start')}
                >
                    <Text style={sortBy === 'start' ? styles.sortButtonTextActive : styles.sortButtonText}>
                        Start
                    </Text>
                </TouchableOpacity>
            </View>
            {data && <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />}
            <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
            {/*<Button title="Logout" onPress={handleSignOut}/>*/}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    sortContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    sortText: {
        fontSize: 18,
        marginLeft: 20,
        marginTop: 20,
        marginRight: 20,
    },
    sortButton: {
        marginTop: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        marginRight: 10,
    },
    activeSortButton: {
        backgroundColor: '#2196F3',
    },
    sortButtonTextActive:{
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    sortButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2196F3',
    },
});

export default Dashboard