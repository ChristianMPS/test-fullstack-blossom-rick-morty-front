"use client";

import { useEffect } from "react";
import { GET_CHARACTERS } from "@/lib/query";

export default function HomePage() {
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:4000/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: GET_CHARACTERS }),
        });

        const json = await res.json();
        console.log("📦 Datos desde GraphQL:", json.data.characters);
      } catch (err) {
        console.error("❌ Error al obtener datos:", err);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Rick & Morty - GraphQL</h1>
      <p className="mt-4 text-gray-600">Abre la consola para ver los resultados 🔍</p>
    </main>
  );
}
