import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {IPaginationProps} from "../../types/pagination/pagination";

const Pagination = ({ totalPages, onPageChange }: IPaginationProps ) => {
    const [currentPage, setCurrentPage] = useState(1);
    const MAX_VISIBLE_PAGES = 5; // Maximum visible page numbers

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

    const handlePageChange = (page: React.SetStateAction<number>) => {
        setCurrentPage(page);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];

        if (totalPages <= MAX_VISIBLE_PAGES) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(
                    <TouchableOpacity
                        key={i}
                        onPress={() => handlePageChange(i)}
                        style={[
                            styles.pageNumber,
                        ]}
                    >
                        <Text>{i}</Text>
                    </TouchableOpacity>
                );
            }
        } else {
            const visiblePageNumbers = getVisiblePageNumbers();

            visiblePageNumbers.forEach((pageNumber, index) => {
                const isEllipsis = pageNumber === '...';

                pageNumbers.push(
                    <TouchableOpacity
                        key={index}
                        onPress={() => handlePageChange(pageNumber as number)}
                        style={[styles.pageNumber]}
                    >
                        <Text style={currentPage === pageNumber ? styles.activePageText : null}>
                            {isEllipsis ? '...' : pageNumber}
                        </Text>
                    </TouchableOpacity>
                );
            });
        }

        return pageNumbers;
    };

    const getVisiblePageNumbers = () => {
        const visiblePageNumbers = [];
        const startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
        const endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);

        if (startPage > 1) {
            visiblePageNumbers.push(1);
            if (startPage > 2) {
                visiblePageNumbers.push('...');
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            visiblePageNumbers.push(i);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                visiblePageNumbers.push('...');
            }
            visiblePageNumbers.push(totalPages);
        }

        return visiblePageNumbers;
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
            <View style={styles.pageNumbersContainer}>{renderPageNumbers()}</View>
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
    activePageText: {
        color: '#fff',
        backgroundColor: '#2196F3',
        padding: 10
    },
});

export default Pagination;