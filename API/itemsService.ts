import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ACCESS_KEY, BASE_PATH } from './constants';
import { HYDRATE } from 'next-redux-wrapper';

export const itemsAPI = createApi({
  reducerPath: 'itemsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_PATH }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    getItems: build.query({
      query: ({ searchStr, page, limit }) => ({
        url: '',
        params: {
          name: `/${searchStr}/i`,
          page: `${page}`,
          limit: `${limit}`,
        },
        method: 'GET',
        headers: { Authorization: `Bearer ${ACCESS_KEY}` },
      }),
    }),
    getDetailedItem: build.query({
      query: (itemId) => {
        if (itemId) {
          return {
            url: `${itemId}`,
            method: 'GET',
            headers: { Authorization: `Bearer ${ACCESS_KEY}` },
          };
        } else {
          return '';
        }
      },
    }),
  }),
});

export const { useGetItemsQuery, useGetDetailedItemQuery } = itemsAPI;

export const { getItems, getDetailedItem } = itemsAPI.endpoints;
