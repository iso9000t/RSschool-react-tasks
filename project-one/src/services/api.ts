/* import axios from 'axios';
import { ApiResponse, Character } from '../types';

const API_URL = 'https://rickandmortyapi.com/api';

interface FetchCharactersResult {
  characters: Character[];
  totalPages: number;
}

export const fetchCharacters = async (
  searchTerm: string = '',
  page: number = 1,
): Promise<FetchCharactersResult> => {
  const url = searchTerm
    ? `${API_URL}/character/?name=${searchTerm}&page=${page}`
    : `${API_URL}/character?page=${page}`;

  try {
    const response = await axios.get<ApiResponse>(url);
    return { characters: response.data.results, totalPages: response.data.info.pages };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return { characters: [], totalPages: 0 };
    }
    throw new Error('Network response was not ok');
  }
};

export const fetchCharacterDetails = async (id: number): Promise<Character> => {
  try {
    const response = await axios.get<Character>(`${API_URL}/character/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch character details');
  }
};
 */