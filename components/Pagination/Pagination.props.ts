export interface PaginationProps {
  totalPages: number;
  page: number;
  changePage: (page: number) => void;
}
