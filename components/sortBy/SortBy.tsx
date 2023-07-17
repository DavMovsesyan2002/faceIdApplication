import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {ISortByProps} from "../../types/sortBy/sortBy";

const SortBy = ({sortBy, handleSortChange} : ISortByProps) => {
   return(<View style={styles.sortContainer}>
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
    </View>)
}

const styles = StyleSheet.create({
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

export default SortBy