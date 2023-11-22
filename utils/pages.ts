export const getPageCount = (totalItems: number, limit: number): number => {
  return Math.ceil(totalItems / limit);
};
