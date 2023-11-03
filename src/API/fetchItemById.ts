import { BASE_PATH, ACCESS_KEY } from './constants';

const fetchItemById = async (itemId: string) => {
  const res = await fetch(`${BASE_PATH}/${itemId}`, {
    headers: { Authorization: `Bearer ${ACCESS_KEY}` },
  });
  const data = await res.json();
  return data;
};

export default fetchItemById;
