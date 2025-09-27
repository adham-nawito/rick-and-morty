import { Link } from "react-router-dom";
import type { Character } from "../types";
import "../styles/CharacterCard.css";

type Props = {
  character: Character;
};

const CharacterCard = ({ character }: Props) =>
{
  const statusClass = `status-tag ${character.status.toLowerCase()}`;

  return (
    <Link to={`/character/${character.id}`} className="character-card">
      <img
        src={character.image}
        alt={character.name}
        className="character-image"
      />
      <div className="character-info">
        <h3>{character.name}</h3>
        <span className={statusClass}>{character.status}</span>
        <p><strong>Species:</strong> {character.species}</p>
        <p><strong>Origin:</strong> {character.origin?.name}</p>
      </div>
    </Link>
  );
};

export default CharacterCard;