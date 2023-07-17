import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Pagination = ({ totalPages, onPageChange }) => {
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
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <TouchableOpacity onPress={handlePreviousPage} disabled={currentPage === 1}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginRight: 10 }}>Previous</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{currentPage}</Text>
            <TouchableOpacity onPress={handleNextPage} disabled={currentPage === totalPages}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Pagination;