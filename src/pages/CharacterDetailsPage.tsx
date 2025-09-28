import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchEpisodes } from "../api/episodes";
import type { Episode, Character } from "../types";
import { useCharacters } from '../hooks/useCharacters';

import "../styles/CharacterDetailsPage.css";
import Skeleton from '../components/Skeleton';

const CharacterDetailsPage = () =>
{
  const { id } = useParams<{ id: string; }>();

  const { data: characters, isLoading, error } = useCharacters({});
  const character = characters?.results?.find(c => c.id === Number(id));

  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() =>
  {
    const fetchCharacterEpisodes = async () =>
    {
      if (!character) return;
      const firstFive = character.episode.slice(0, 5);
      const ids = firstFive.map((url: string) => Number(url.split("/").pop()));
      const eps = await fetchEpisodes(ids);
      setEpisodes(eps);

      // Save in recently viewed
      const stored = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
      const updated = [
        character,
        ...stored.filter((c: Character) => c.id !== character.id),
      ].slice(0, 5);
      localStorage.setItem("recentlyViewed", JSON.stringify(updated));
    };

    fetchCharacterEpisodes();
  }, [character]);

  if (isLoading) return Array.from({ length: 4 }).map((_, index) => (
    <Skeleton key={index} width="300px" height="10px" />
  ));
  if (error) return <p className="error">{error}</p>;
  if (!character) return null;

  return (
    <div className="character-details">
      <div className="details-card">
        <img src={character.image} alt={character.name} />
        <div className="details-info">
          <h2>{character.name}</h2>
          <p><strong>Status:</strong> {character.status}</p>
          <p><strong>Species:</strong> {character.species}</p>
          <p><strong>Gender:</strong> {character.gender}</p>
          <p><strong>Origin:</strong> {character.origin?.name}</p>
          <p><strong>Last Location:</strong> {character.location?.name}</p>
        </div>
      </div>

      <h3>First 5 Episodes</h3>
      <ul className="episode-list">
        {episodes.map((ep) => (
          <li key={ep.id}>{ep.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterDetailsPage;