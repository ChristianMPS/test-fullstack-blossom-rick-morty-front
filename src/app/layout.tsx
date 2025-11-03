"use client";

import "@/app/globals.css";
import CharacterDetails from "@/components/CharacterDetails";
import CharacterSidebar from "@/components/CharacterSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";

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

export interface Character {
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  return (
    <html lang="es">
      <body className="flex min-h-screen">
        <SidebarProvider>
          <CharacterSidebar onSelectCharacter={setSelectedCharacter} />
          <main className="flex-1 bg-white p-8">
            {selectedCharacter ? (
              <CharacterDetails character={selectedCharacter} />
            ) : (
              children
            )}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
