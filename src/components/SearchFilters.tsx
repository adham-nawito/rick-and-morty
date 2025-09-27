import React from "react";
import "../styles/SearchFilters.css";

type Props
  = {
    name: string;
    status: string;
    species: string;
    sort: "asc" | "desc";
    onNameChange: (v: string) => void;
    onStatusChange: (v: string) => void;
    onSpeciesChange: (v: string) => void;
    onSortChange: (v: "asc" | "desc") => void;
  };

const SearchFilters = ({
  name,
  status,
  species,
  sort,
  onNameChange,
  onStatusChange,
  onSpeciesChange,
  onSortChange,
}: Props) =>
{
  return (
    <form
      className="filters"
      aria-label="Character search and filters"
      onSubmit={(e) => e.preventDefault()}
    >
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <label htmlFor="name">Search by name</label>
        <input
          id="name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          aria-label="Search characters by name"
          placeholder="e.g. Rick"
        />
      </div>

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="">Any</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <label htmlFor="species">Species</label>
        <input
          id="species"
          value={species}
          onChange={(e) => onSpeciesChange(e.target.value)}
          aria-label="Filter by species"
          placeholder="Human"
        />
      </div>

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <label htmlFor="sort">Sort</label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => onSortChange(e.target.value as "asc" | "desc")}
        >
          <option value="asc">A → Z</option>
          <option value="desc">Z → A</option>
        </select>
      </div>
    </form>
  );
};

export default React.memo(SearchFilters);