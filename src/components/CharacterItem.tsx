"use client";

import { Character } from "@/app/layout";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SidebarMenuItem } from "@/components/ui/sidebar";
import { Favorite } from "./icons/Favorite";

interface CharacterItemProps {
  char: Character;
  isSelected: boolean;
  onSelectCharacter: (char: Character) => void;
  isFavorite: boolean;
  toggleFavorite: (char: Character) => void;
}

export const CharacterItem = ({
  char,
  isSelected,
  onSelectCharacter,
  isFavorite,
  toggleFavorite,
}: CharacterItemProps) => (
  <SidebarMenuItem
    className={`flex items-center justify-between cursor-pointer p-4 rounded-lg transition-colors
      ${
        isSelected ? "bg-[#EEE3FF]" : "hover:bg-gray-100"
      } border-b border-gray-200`}
    onClick={() => onSelectCharacter(char)}
  >
    <div className="flex items-center gap-3">
      <Avatar className="w-8 h-8">
        <AvatarImage src={char.image} alt={char.name} />
        <AvatarFallback>{char.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-bold">{char.name}</span>
        <span className="text-sm">{char.species}</span>
      </div>
    </div>
    <Favorite
      width={20}
      height={20}
      className={`cursor-pointer ${
        isFavorite ? "text-green-500 fill-green-400" : "text-gray-500"
      }`}
      onClick={() => {
        toggleFavorite(char);
      }}
    />
  </SidebarMenuItem>
);
