"use client";

import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu } from "@/components/ui/sidebar";
import { CharacterItem } from "./CharacterItem";
import { Character } from "@/app/layout";

interface CharacterGroupProps {
  title: string;
  characters: Character[];
  selectedCharacter: Character | null;
  favorites: Character[];
  onSelectCharacter: (char: Character) => void;
  toggleFavorite: (char: Character) => void;
}

export const CharacterGroup = ({
  title,
  characters,
  selectedCharacter,
  favorites,
  onSelectCharacter,
  toggleFavorite,
}: CharacterGroupProps) => (
  <SidebarGroup>
    <SidebarGroupLabel>
      {title} ({characters.length})
    </SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        {characters.map((char) => (
          <CharacterItem
            key={char.id}
            char={char}
            isSelected={selectedCharacter?.id === char.id}
            onSelectCharacter={onSelectCharacter}
            isFavorite={!!favorites.find((f) => f.id === char.id)}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
);
