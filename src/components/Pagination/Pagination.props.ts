export interface PaginationProps {
  page: number;
  totalPage: number;
  changePage: (page: number) => void;
}
