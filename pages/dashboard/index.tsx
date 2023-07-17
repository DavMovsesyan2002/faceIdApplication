import {
    SafeAreaView,
    FlatList,
    StyleSheet, View, Text, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import React, {SetStateAction, useEffect, useState} from "react";
import List from "../../components/user/List";
import Pagination from "../../components/pagination/Pagination";
import {ItemDataProps} from "../../types/dashboard/dashboard";
import {RouterProps} from "../../types/route/route";
import SortBy from "../../components/sortBy/SortBy";

const ACCESS_KEY = 'PYLoOTjIB72QWqrijqixoPVabeueomre9mVVqeiX4AA'

const Dashboard = ({navigation}: RouterProps) => {
    const [data, setData] = useState<ItemDataProps[]>([]);
    const [sortBy, setSortBy] = useState('latest'); // Default sorting option
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(100);
    const [totalItems, setTotalItems] = useState(0);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const MAX_LIMIT = 10; // Maximum items per page


    useEffect(() => {
        sortData();
    }, [sortBy]);

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const fetchData = async (page: number) => {
        setIsLoading(true)
        const API_URL = `https://api.unsplash.com/photos/?count=10&client_id=${ACCESS_KEY}&page=${page}`;
        const response = await fetch(API_URL);
        const data = await response.json();
        const headers = response.headers;
        const totalItems = parseInt(headers.get('x-total') as string, 10);
        const totalPages = Math.ceil(100 / MAX_LIMIT);
        setTotalItems(totalItems);
        setTotalPages(totalPages);
        setData(data);
        setIsLoading(false)
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
            <SortBy sortBy={sortBy} handleSortChange={handleSortChange} />
            {isLoading ? <ActivityIndicator  style={[styles.isLoading]} size="large" color="#0000ff" /> : data && <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />}
            <Pagination totalPages={totalPages} totalItems={totalItems} onPageChange={handlePageChange} />
            {/*<Button title="Logout" onPress={handleSignOut}/>*/}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    isLoading:{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Dashboard