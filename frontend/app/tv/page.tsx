"use client";

import { useState } from "react";
import { useDiscoverTV, useTVGenres } from "@/hooks/useMovies";
import MediaGrid from "@/components/MediaGrid";
import FilterBar from "@/components/FilterBar";
import Pagination from "@/components/Pagination";

const CATEGORIES = [
  { value: "popular",   label: "Popular" },
  { value: "trending",  label: "Trending" },
  { value: "top-rated", label: "Top Rated" },
  { value: "on-air",    label: "On The Air" },
  { value: "discover",  label: "Filter" },
];

export default function TVPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ category: "popular" });
  const { data: genres } = useTVGenres();
  const { data, isLoading } = useDiscoverTV({ page, ...filters });

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setPage(1); // Reset to page 1 on filter change
  };

  return (
    <main className="min-h-screen px-4 py-12 sm:px-8 lg:px-12 max-w-[1400px] mx-auto">
      {/* Header */}
      <header className="mb-12 text-center animate-fade-up">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          <span className="text-white">Discover </span>
          <span className="text-gradient-gold">TV Shows</span>
        </h1>
        <div className="mt-4 h-0.5 w-20 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto rounded-full" />
      </header>

      {/* Filters */}
      <FilterBar
        genres={genres ?? []}
        filters={{ ...filters, category: filters.category }}
        onChange={handleFilterChange}
        categories={CATEGORIES}
      />

      {/* Grid & Loading */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 animate-[fadeUp_0.3s_ease_out]">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="aspect-[2/3] bg-zinc-900 rounded-xl relative overflow-hidden border border-zinc-800/50">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent bg-[length:200%_100%] animate-shimmer" />
            </div>
          ))}
        </div>
      ) : (
        <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
          {data?.results?.length === 0 ? (
            <div className="text-center py-20 text-zinc-500 animate-fade-up">
              <p className="text-xl">No TV shows match your filters.</p>
            </div>
          ) : (
            <MediaGrid items={data?.results ?? []} type="tv" />
          )}

          {/* Pagination */}
          {(data?.total_pages ?? 1) > 1 && (
            <Pagination
              page={page}
              totalPages={data?.total_pages ?? 1}
              onChange={setPage}
            />
          )}
        </div>
      )}
    </main>
  );
}