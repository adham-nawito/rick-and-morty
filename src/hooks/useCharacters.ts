import { useState, useEffect, useCallback } from 'react';

import axios from '../api/axios';
import type { CharactersResponse } from '../types';

type Params = {
  page?: number;
  name?: string;
  status?: string;
  species?: string;
};

export function useCharacters(params: Params)
{
  const [data, setData] = useState<CharactersResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (retry = 0) =>
    {
      try
      {
        setIsLoading(true);
        setError(null);

        const searchParams = new URLSearchParams();
        if (params.page) searchParams.append('page', params.page.toString());
        if (params.name) searchParams.append('name', params.name);
        if (params.status) searchParams.append('status', params.status);
        if (params.species) searchParams.append('species', params.species);

        const response = await axios.get(`/character?${searchParams.toString()}`);
        setData(response.data);
      } catch
      {
        if (retry < 3)
        {
          const delay = Math.pow(2, retry) * 1000;
          setTimeout(() => fetchData(retry + 1), delay);
        } else
        {
          setError('Failed to fetch characters after retries');
        }
      } finally
      {
        setIsLoading(false);
      }
    },
    [params.page, params.name, params.status, params.species]
  );

  useEffect(() =>
  {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}