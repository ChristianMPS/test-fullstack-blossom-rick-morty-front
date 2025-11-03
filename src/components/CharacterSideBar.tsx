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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

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

  const [activeStatus, setActiveStatus] = useState("All");
  const [activeSpecie, setActiveSpecie] = useState("All");
  const [activeGender, setActiveGender] = useState("All");

  const [tempStatus, setTempStatus] = useState("All");
  const [tempSpecie, setTempSpecie] = useState("All");
  const [tempGender, setTempGender] = useState("All");

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

  const statusOptions = [
    "All",
    ...Array.from(new Set(characters.map((c) => c.status ?? "Unknown"))),
  ];
  const specieOptions = [
    "All",
    ...Array.from(new Set(characters.map((c) => c.species ?? "Unknown"))),
  ];
  const genderOptions = [
    "All",
    ...Array.from(new Set(characters.map((c) => c.gender ?? "Unknown"))),
  ];

  const filteredCharacters = characters.filter((char) => {
    const matchSearch = char.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = activeStatus === "All" || char.status === activeStatus;
    const matchSpecie = activeSpecie === "All" || char.species === activeSpecie;
    const matchGender = activeGender === "All" || char.gender === activeGender;
    return matchSearch && matchStatus && matchSpecie && matchGender;
  });

  return (
    <Sidebar className="w-80"> 
      <SidebarContent>
 
        <div className="px-4 py-2 flex items-center gap-2">
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-1 flex-1">
            <Search width={20} height={20} className="text-gray-500" />
            <Input
              type="text"
              placeholder="Buscar personaje..."
              className="ml-2 flex-1 bg-transparent border-none focus:ring-0 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className={
                    activeStatus !== "All" ||
                    activeSpecie !== "All" ||
                    activeGender !== "All"
                      ? "bg-[#EEE3FF]"
                      : ""
                  }
                >
                  <Filter width={20} height={20} className="text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-4">
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Status</h3>
                  <div className="flex gap-2 flex-wrap">
                    {statusOptions.map((option) => (
                      <Button
                        key={option}
                        size="sm"
                        variant="outline"
                        className={tempStatus === option ? "bg-[#EEE3FF]" : ""}
                        onClick={() => setTempStatus(option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Specie</h3>
                  <div className="flex gap-2 flex-wrap">
                    {specieOptions.map((option) => (
                      <Button
                        key={option}
                        size="sm"
                        variant="outline"
                        className={tempSpecie === option ? "bg-[#EEE3FF]" : ""}
                        onClick={() => setTempSpecie(option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Gender</h3>
                  <div className="flex gap-2 flex-wrap">
                    {genderOptions.map((option) => (
                      <Button
                        key={option}
                        size="sm"
                        variant="outline"
                        className={tempGender === option ? "bg-[#EEE3FF]" : ""}
                        onClick={() => setTempGender(option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="mt-2">
                  <Button
                    size="sm"
                    className="w-full bg-purple-100 hover:bg-purple-600"
                    onClick={() => {
                      setActiveStatus(tempStatus);
                      setActiveSpecie(tempSpecie);
                      setActiveGender(tempGender);
                    }}
                  >
                    Apply Filter
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
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
