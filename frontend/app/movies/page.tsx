"use client";
import { useState } from "react";
import { useDiscoverMovies, useMovieGenres } from "@/hooks/useMovies";
import MediaGrid from "@/components/MediaGrid";
import FilterBar from "@/components/FilterBar";
import Pagination from "@/components/Pagination";

const CATEGORIES = [
  { value: "popular",   label: "Popular" },
  { value: "trending",  label: "Trending" },
  { value: "top-rated", label: "Top Rated" },
  { value: "upcoming",  label: "Upcoming" },
  { value: "discover",  label: "Filter" },
];

export default function MoviesPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ category: "popular" });

  const { data: genres } = useMovieGenres();
  const { data, isLoading } = useDiscoverMovies({ page, ...filters });

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setPage(1); // reset to page 1 whenever filter changes
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Movies</h1>

      <FilterBar
        genres={genres ?? []}
        filters={{ ...filters, category: filters.category }}
        onChange={handleFilterChange}
        categories={CATEGORIES}
      />

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="aspect-[2/3] bg-zinc-800 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          <MediaGrid items={data?.results ?? []} type="movie" />
          <Pagination
            page={page}
            totalPages={data?.total_pages ?? 1}
            onChange={setPage}
          />
        </>
      )}
    </div>
  );
}