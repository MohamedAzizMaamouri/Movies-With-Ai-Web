"use client";

import { useState } from "react";
import { useSearch } from "@/hooks/useSearch";
import MediaGrid from "@/components/MediaGrid";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const { data, isLoading } = useSearch(query);

  return (
    <main className="min-h-screen px-4 py-12 sm:px-8 lg:px-12 max-w-[1400px] mx-auto">
      {/* Header */}
      <header className="mb-12 text-center animate-fade-up">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          <span className="text-white">Search </span>
          <span className="text-gradient-gold">Catalog</span>
        </h1>
        <div className="mt-4 h-0.5 w-20 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto rounded-full" />
      </header>

      {/* Search Input */}
      <div className="mb-12 animate-fade-up" style={{ animationDelay: "0.1s" }}>
        <div className="relative max-w-2xl mx-auto">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies, TV shows, people..."
            className="w-full bg-card/50 backdrop-blur-md border border-zinc-800 text-white rounded-2xl pl-12 pr-4 py-4 text-lg placeholder-zinc-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all duration-300"
            autoFocus
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Results / Loading */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 animate-[fadeUp_0.3s_ease_out]">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="aspect-[2/3] bg-zinc-900 rounded-xl relative overflow-hidden border border-zinc-800/50">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent bg-[length:200%_100%] animate-shimmer" />
            </div>
          ))}
        </div>
      ) : data && data.length === 0 ? (
        <div className="text-center py-20 animate-fade-up">
          <p className="text-zinc-500 text-lg">No results found for <span className="text-accent">"{query}"</span></p>
        </div>
      ) : data && data.length > 0 ? (
        <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <p className="text-zinc-400 mb-6 text-center sm:text-left">Found {data.length} result{data.length !== 1 ? "s" : ""}</p>
          <MediaGrid items={data} />
        </div>
      ) : (
        <div className="text-center py-16 text-zinc-600 animate-fade-up">
          <p>Start typing to search the catalog...</p>
        </div>
      )}
    </main>
  );
}