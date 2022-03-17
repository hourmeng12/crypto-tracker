import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.coingecko.com/api/v3/',
  }),
  endpoints: (builder) => ({
    getCryptoMarket: builder.query({
      query: (page) =>
        `coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`,
    }),
    getGlobalData: builder.query({
      query: () => `global`,
    }),
    getSingleCrypto: builder.query({
      query: (cryptoId) => `coins/${cryptoId}`,
    }),
    getSingleCryptoHistorical: builder.query({
      query: ({ cryptoId, days }) =>
        `coins/${cryptoId}/market_chart?vs_currency=usd&days=${days}`,
    }),
    getSearchCrypto: builder.query({
      query: (search) => `search?query=${search}`,
    }),
  }),
});

export const {
  useGetCryptoMarketQuery,
  useGetGlobalDataQuery,
  useGetSingleCryptoQuery,
  useGetSingleCryptoHistoricalQuery,
  useGetSearchCryptoQuery,
} = cryptoApi;
