
"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const CharacterLoader = () => {
  return (
    <div className="flex items-center justify-between p-6 rounded-lg transition-colors border-b border-gray-300 bg-gray-300 animate-pulse">
      <Skeleton className="w-8 h-8 rounded-full" />
      <div className="flex flex-col flex-1 ml-3 gap-1">
        <Skeleton className="h-3 w-24 rounded" />
        <Skeleton className="h-3 w-16 rounded" />
      </div>
      <Skeleton className="w-5 h-5 rounded-full" />
    </div>
  );
};
