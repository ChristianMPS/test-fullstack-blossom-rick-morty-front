"use client";

import { useEffect, useState } from "react";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { Character } from "@/app/layout";
import { Input } from "@/components/ui/input";
import { Search } from "./icons/Search";
import { GET_CHARACTERS } from "@/lib/query";
import { CharacterGroup } from "./CharacterGroup";
import { FilterPanel } from "./FilterPanel";
import { CharacterLoader } from "./CharacterLoader";

interface CharacterSidebarProps {
  selectedCharacter: Character | null;
  onSelectCharacter: (char: Character) => void;
}

export default function CharacterSidebar({
  onSelectCharacter,
  selectedCharacter,
}: CharacterSidebarProps) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");
  const [activeSpecie, setActiveSpecie] = useState("All");
  const [activeGender, setActiveGender] = useState("All");
  const [tempStatus, setTempStatus] = useState("All");
  const [tempSpecie, setTempSpecie] = useState("All");
  const [tempGender, setTempGender] = useState("All");
  const [favorites, setFavorites] = useState<Character[]>([]);

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
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const toggleFavorite = (char: Character) => {
    setFavorites((prev) =>
      prev.find((c) => c.id === char.id)
        ? prev.filter((c) => c.id !== char.id)
        : [...prev, char]
    );
  };

  const applyFilter = () => {
    setActiveStatus(tempStatus);
    setActiveSpecie(tempSpecie);
    setActiveGender(tempGender);
  };

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

  const filteredCharacters = characters.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeStatus === "All" || c.status === activeStatus) &&
      (activeSpecie === "All" || c.species === activeSpecie) &&
      (activeGender === "All" || c.gender === activeGender)
  );

  const filteredFavorites = favorites.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeStatus === "All" || c.status === activeStatus) &&
      (activeSpecie === "All" || c.species === activeSpecie) &&
      (activeGender === "All" || c.gender === activeGender)
  );

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
            <FilterPanel
              activeStatus={activeStatus}
              activeSpecie={activeSpecie}
              activeGender={activeGender}
              tempStatus={tempStatus}
              tempSpecie={tempSpecie}
              tempGender={tempGender}
              statusOptions={statusOptions}
              specieOptions={specieOptions}
              genderOptions={genderOptions}
              setTempStatus={setTempStatus}
              setTempSpecie={setTempSpecie}
              setTempGender={setTempGender}
              applyFilter={applyFilter}
            />
          </div>
        </div>

        {loading ? (
          Array.from({ length: 20 }).map((_, i) => <CharacterLoader key={i} />)
        ) : (
          <>
            <CharacterGroup
              title="Starred characters"
              characters={filteredFavorites}
              selectedCharacter={selectedCharacter}
              favorites={favorites}
              onSelectCharacter={onSelectCharacter}
              toggleFavorite={toggleFavorite}
            />

            <CharacterGroup
              title="Characters"
              characters={filteredCharacters.filter(
                (c) => !favorites.find((f) => f.id === c.id)
              )}
              selectedCharacter={selectedCharacter}
              favorites={favorites}
              onSelectCharacter={onSelectCharacter}
              toggleFavorite={toggleFavorite}
            />
          </>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
