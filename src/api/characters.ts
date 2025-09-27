import type { Character } from '../types';

import api from './axios';

type FetchCharactersParams = {
  page?: number;
  name?: string;
  status?: string;
  species?: string;
};

type CharactersResponse = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
};

export const fetchCharacters = async (params: FetchCharactersParams) =>
{
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.append('page', String(params.page));
  if (params.name) searchParams.append('name', params.name);
  if (params.status) searchParams.append('status', params.status);
  if (params.species) searchParams.append('species', params.species);

  const query = searchParams.toString();
  const url = '/character' + (query ? '?' + query : '');
  const response = await api.get<CharactersResponse>(url);
  return response.data;
};