import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fetchItems from '../API/fetchItems';
import ApiItem from '../interfaces/interfaces';
import { getPageCount } from '../utils/pages';

export default function useFetchData(
  limit: number,
  page: number,
  changeSearchQuery: (query: string) => void,
  changePageNumber: (page: number) => void
): [
  items: ApiItem[],
  isLoading: boolean,
  totalPage: number,
  isError: boolean,
  handleItems: (searchStr: string, page: number) => Promise<void>,
] {
  const [items, setItems] = useState<ApiItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [isError, setIsError] = useState(false);

  const params = useParams();

  const handleItems = useCallback(
    async (searchStr: string, page: number) => {
      setIsLoading(true);
      try {
        const data = await fetchItems(searchStr, page, limit);
        const pageCount = getPageCount(data.total, limit);
        setItems(data.docs);
        setTotalPage(pageCount);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    },
    [limit]
  );

  useEffect(() => {
    const searchStr = localStorage.getItem('query') || '';
    if (searchStr) {
      changeSearchQuery(searchStr);
    }
    if (params.id && +params.id !== page) {
      changePageNumber(Number(params.id));
      handleItems(searchStr, Number(params.id));
    } else {
      handleItems(searchStr, page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, handleItems, page]);

  return [items, isLoading, totalPage, isError, handleItems];
}
