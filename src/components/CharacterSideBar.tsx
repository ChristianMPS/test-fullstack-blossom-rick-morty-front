"use client";

import { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { GET_CHARACTERS } from "@/lib/query";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Character } from "@/app/layout";
import { Input } from "@/components/ui/input";
import { Search } from "./icons/Search";
import { Filter } from "./icons/Filter";

interface CharacterSidebarProps {
  selectedCharacter: Character | null;
  onSelectCharacter: (char: Character) => void;
}

export default function CharacterSidebar({
  onSelectCharacter,
  selectedCharacter,
}: CharacterSidebarProps) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:4000/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: GET_CHARACTERS }),
        });

        const json = await res.json();
        setCharacters(json.data.characters as Character[]);
      } catch (err) {
        console.error("❌ Error al obtener datos:", err);
      }
    }

    fetchData();
  }, []);

  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Sidebar>
      <SidebarContent>
        <div className="px-4 py-2">
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-1">
            <Search width={20} height={20} className="text-gray-500" />
            <Input
              type="text"
              placeholder="Buscar personaje..."
              className="ml-2 flex-1 bg-transparent border-none focus:ring-0 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Filter width={20} height={20} className="text-gray-500 cursor-pointer" />
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Personajes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredCharacters.map((char) => {
                const isSelected = selectedCharacter?.id === char.id;

                return (
                  <SidebarMenuItem
                    key={char.id}
                    className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-colors
                      ${isSelected ? "bg-[#EEE3FF]" : "hover:bg-gray-100"}`}
                    onClick={() => onSelectCharacter(char)}
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={char.image} alt={char.name} />
                      <AvatarFallback>{char.name.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <span className="text-sm flex-1">{char.name}</span>

                    {isSelected && (
                      <span className="text-purple-600">
              
                      </span>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
