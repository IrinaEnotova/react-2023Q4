export const getPageCount = (totalItems: number, limit: number): number => {
  return Math.ceil(totalItems / limit);
};

export const getPagesArray = (totalPages: number): number[] => {
  const pagesArray = [];
  for (let i = 0; i < totalPages; i++) {
    pagesArray.push(i + 1);
  }

  return pagesArray;
};
