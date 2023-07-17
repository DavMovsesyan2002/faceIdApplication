export interface IPaginationProps {
    totalPages: number,
    onPageChange: (currentPage: number) => void
    totalItems: number
}