import { BASE_PATH, SEARCH_PATH, PAGINATION, LIMIT, ACCESS_KEY } from './constants';

const fetchItems = async (searchStr: string, page: number, limit: number) => {
  const res = await fetch(`${BASE_PATH}?${SEARCH_PATH}=/${searchStr}/i&${PAGINATION}=${page}&${LIMIT}=${limit}`, {
    headers: { Authorization: `Bearer ${ACCESS_KEY}` },
  });
  const data = await res.json();
  return data;
};

export default fetchItems;
