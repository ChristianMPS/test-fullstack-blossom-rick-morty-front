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

interface Location {
  name: string;
  type: string;
  dimension: string;
}

interface Episode {
  id: string;
  name: string;
  air_date: string;
  episode: string;
}

interface Character {
  id: string;
  name: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
  origin?: Location;
  location?: Location;
  image?: string;
  episode?: Episode[];
  created?: string;
}

export default function CharacterSidebar() {
  const [characters, setCharacters] = useState<Character[]>([]);

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

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Personajes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {characters.map((char) => (
                <SidebarMenuItem
                  key={char.id}
                  className="flex items-center gap-3"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={char.image} alt={char.name} />
                    <AvatarFallback>{char.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{char.name}</span>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
