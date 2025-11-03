import { Character } from "@/app/layout";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface CharacterDetailsProps {
  character: Character;
}

export default function CharacterDetails({ character }: CharacterDetailsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{character.name}</h2>
      <Avatar className="w-24 h-24">
        <AvatarImage src={character.image} alt={character.name} />
        <AvatarFallback>{character.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <p><strong>Estado:</strong> {character.status}</p>
      <p><strong>Especie:</strong> {character.species}</p>
      {character.type && <p><strong>Tipo:</strong> {character.type}</p>}
      <p><strong>Género:</strong> {character.gender}</p>
      {character.origin && (
        <p><strong>Origen:</strong> {character.origin.name} ({character.origin.dimension})</p>
      )}
      {character.location && (
        <p><strong>Ubicación:</strong> {character.location.name} ({character.location.dimension})</p>
      )}
      {character.episode && character.episode.length > 0 && (
        <div>
          <strong>Episodios:</strong>
          <ul className="list-disc list-inside">
            {character.episode.map((ep) => (
              <li key={ep.id}>{ep.episode} - {ep.name} ({ep.air_date})</li>
            ))}
          </ul>
        </div>
      )}
      <p><strong>Creado:</strong> {character.created}</p>
    </div>
  );
}
