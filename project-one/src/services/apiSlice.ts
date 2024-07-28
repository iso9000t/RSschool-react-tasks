import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Character, ApiResponse } from '../types';

export const rickAndMortyApi = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api' }),
  endpoints: (builder) => ({
    getCharacters: builder.query<
      { characters: Character[]; totalPages: number },
      { searchTerm: string; page: number }
    >({
      query: ({ searchTerm, page }) =>
        searchTerm
          ? `/character/?name=${searchTerm}&page=${page}`
          : `/character?page=${page}`,
      transformResponse: (response: ApiResponse) => ({
        characters: response.results,
        totalPages: response.info.pages,
      }),
    }),
    getCharacterDetails: builder.query<Character, number>({
      query: (id) => `/character/${id}`,
    }),
  }),
});

export const { useLazyGetCharactersQuery, useGetCharacterDetailsQuery } =
  rickAndMortyApi;
