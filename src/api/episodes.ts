import api from './axios';

type EpisodeResponse = {
  id: number;
  name: string;
  episode: string;
};

export async function fetchEpisodes(ids: number[])
{
  if (ids.length === 0) return [];
  const res = await api.get<EpisodeResponse[] | EpisodeResponse>(`/episode/${ids.join(',')}`);
  return Array.isArray(res.data) ? res.data : [res.data];
}