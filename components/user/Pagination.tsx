import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {IPaginationProps} from "../../types/pagination/pagination";

const Pagination = ({ totalPages, onPageChange }: IPaginationProps ) => {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        onPageChange(currentPage);
    }, [currentPage]);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 10, justifyContent: 'space-around', width: '100%' }}>
            <TouchableOpacity
                style={[styles.paginationButton, currentPage === 1 && styles.disabledPaginationButton]}
                onPress={handlePreviousPage}
                disabled={currentPage === 1}
            >
                <Text style={styles.paginationButtonText}>Prev</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{currentPage}</Text>
            <TouchableOpacity
                style={[
                    styles.paginationButton,
                    currentPage === totalPages && styles.disabledPaginationButton,
                ]}
                onPress={handleNextPage}
                disabled={currentPage === totalPages}
            >
                <Text style={styles.paginationButtonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    paginationButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        marginRight: 10,
    },
    disabledPaginationButton: {
        opacity: 0.5,
    },
    paginationButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    pageNumbersContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pageNumber: {
        fontSize: 16,
        marginHorizontal: 5,
        fontWeight: 'bold',
    },
    activePageNumber: {
        color: '#2196F3',
    },
    ellipsis: {
        fontSize: 16,
        marginHorizontal: 5,
    },
});

export default Pagination;