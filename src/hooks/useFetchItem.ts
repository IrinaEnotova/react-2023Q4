import { useEffect, useState } from 'react';
import fetchItemById from '../API/fetchItemById';
import ApiItem from '../interfaces/interfaces';

export default function useFetchItem(
  searchParams: URLSearchParams
): [item: ApiItem | null, isLoading: boolean, isError: boolean] {
  const [item, setItem] = useState<ApiItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const itemId = searchParams.get('character');

  useEffect(() => {
    async function fetchData(): Promise<void> {
      setIsLoading(true);
      const itemData = await fetchItemById(itemId!);
      if (itemData && 'docs' in itemData) {
        setIsError(false);
        setItem(itemData.docs[0]);
      } else {
        setIsError(true);
      }
      setIsLoading(false);
    }
    fetchData();
  }, [itemId]);

  return [item, isLoading, isError];
}
