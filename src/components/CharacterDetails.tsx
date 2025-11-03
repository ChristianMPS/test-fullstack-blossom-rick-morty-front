import { Character } from "@/app/layout";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface CharacterDetailsProps {
  character: Character;
}

export default function CharacterDetails({ character }: CharacterDetailsProps) {
  const features = [
    { label: "Status", value: character.status },
    { label: "Specie", value: character.species },
    { label: "Type", value: character.type },
    { label: "Gender", value: character.gender },
    {
      label: "Origin",
      value: character.origin
        ? character.origin.dimension
          ? `${character.origin.name} (${character.origin.dimension})`
          : character.origin.name
        : null,
    },
    {
      label: "Location",
      value: character.location
        ? character.location.dimension
          ? `${character.location.name} (${character.location.dimension})`
          : character.location.name
        : null,
    },

    { label: "Created", value: character.created },
  ].filter((f) => f.value);
  return (
    <div className="flex flex-col items-center pl-20 pr-20 w-full">
      <Avatar className="w-50 h-50 mb-6">
        <AvatarImage src={character.image} alt={character.name} />
        <AvatarFallback>{character.name.charAt(0)}</AvatarFallback>
      </Avatar>

      <h2 className="text-3xl font-bold mb-6">{character.name}</h2>

      <div className="w-full space-y-4">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col">
            <span className="text-gray-500 font-medium">{feature.label}</span>
            <span className="text-gray-800 font-semibold">{feature.value}</span>
            <hr className="border-t border-gray-300 mt-1" />
          </div>
        ))}
      </div>

      {character.episode && character.episode.length > 0 && (
        <div className="w-full mt-6">
          <h3 className="font-bold mb-2">Episodios</h3>
          <ul className="list-disc list-inside space-y-1">
            {character.episode.map((ep) => (
              <li key={ep.id}>
                {ep.episode} - {ep.name} ({ep.air_date})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
