"use client";
import { useState } from "react";
import { useSearch } from "@/hooks/useSearch";
import MediaGrid from "@/components/MediaGrid";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const { data, isLoading } = useSearch(query);

  return (
    <div className="space-y-6">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies & shows..."
        className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 text-lg"
        autoFocus
      />

      {isLoading && <p className="text-zinc-400">Searching...</p>}

      {data && data.length === 0 && (
        <p className="text-zinc-400">No results for "{query}"</p>
      )}

      {data && data.length > 0 && <MediaGrid items={data} />}
    </div>
  );
}