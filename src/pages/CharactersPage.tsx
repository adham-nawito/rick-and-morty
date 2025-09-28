import { useState, useEffect, useMemo } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useCharacters } from "../hooks/useCharacters";
import CharacterCard from "../components/CharacterCard";
import SearchFilters from "../components/SearchFilters";
import Skeleton from "../components/Skeleton";
import Timer from "../components/Timer";
import type { Character } from "../types";
import "../styles/CharactersPage.css";

const CharactersPage = () =>
{
  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [species, setSpecies] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  const debouncedName = useDebounce(name, 400);

  const { data, isLoading, error, refetch } = useCharacters({
    page,
    name: debouncedName,
    status,
    species,
  });

  // Reset characters when filters change (new search)
  useEffect(() =>
  {
    setPage(1);
    setCharacters([]);
  }, [debouncedName, status, species]);

  // Append new results instead of replacing
  useEffect(() =>
  {
    if (data?.results)
    {
      setCharacters((prev) =>
      {
      const existingIds = new Set(prev.map((c) => c.id));
      const newOnes = data.results.filter((c) => !existingIds.has(c.id));
      return [...prev, ...newOnes];
      });
    }
  }, [data]);

  const sortedResults = useMemo(() =>
  {
    return [...characters].sort((a, b) =>
      sort === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  }, [characters, sort]);

  const recentlyViewed = JSON.parse(
    localStorage.getItem("recentlyViewed") || "[]"
  );

  return (
    <div>
      <h1>Character Explorer</h1>

      {recentlyViewed.length > 0 && (
        <section style={{ marginBottom: '2rem' }}>
          <h2>Recently Viewed</h2>
          <div className="character-grid">
            {recentlyViewed.map((c: Character) => (
              <CharacterCard key={c.id} character={c} />
            ))}
          </div>
        </section>
      )}

      <SearchFilters
        name={name}
        status={status}
        species={species}
        sort={sort}
        onNameChange={setName}
        onStatusChange={setStatus}
        onSpeciesChange={setSpecies}
        onSortChange={(val) => setSort(val)}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <Timer onRefresh={refetch} />

        <p className="visible-count">
          Showing <strong>{sortedResults.length}</strong> characters
        </p>
      </div>

      {isLoading && sortedResults.length === 0 && (
        <div className="character-grid">
          {Array.from({ length: 10 }).map((_, idx) => (
            <Skeleton key={idx} width="200px" height="300px" />
          ))}
        </div>
      )}

      {error && <p className="error">{error}</p>}

      <div className="character-grid">
        {sortedResults.map((c: Character) => (
          <CharacterCard key={c.id} character={c} />
        ))}
      </div>

      {data?.info?.next && (
        <button
          className="load-more"
          disabled={isLoading}
          onClick={() => setPage((p) => p + 1)}
        >
          {isLoading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default CharactersPage;