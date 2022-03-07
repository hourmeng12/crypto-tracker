import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://newsapi.org/v2/`,
  }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: (pageSize = 10) =>
        `everything?q=crypto&pageSize=${pageSize}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`,
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
