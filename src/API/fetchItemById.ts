import { BASE_PATH, ACCESS_KEY } from './constants';

const fetchItemById = async (itemId: string) => {
  const res = await fetch(`${BASE_PATH}/${itemId}`, {
    headers: { Authorization: `Bearer ${ACCESS_KEY}` },
  });
  if (res.status === 200) {
    const data = await res.json();
    return data;
  } else if (res.status === 500) {
    return { message: 'Wrong character id!' };
  } else {
    return { message: 'Try later!' };
  }
};

export default fetchItemById;
