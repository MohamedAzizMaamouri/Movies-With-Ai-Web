"use client";
import { useTrendingMovies, useTrendingTV } from "@/hooks/useMovies";
import MediaGrid from "@/components/MediaGrid";

export default function HomePage() {
  const { data: movies, isLoading: moviesLoading } = useTrendingMovies();
  const { data: shows, isLoading: tvLoading } = useTrendingTV();

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-2xl font-semibold mb-6">Trending Movies</h2>
        {moviesLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-zinc-800 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <MediaGrid items={movies ?? []} type="movie" />
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Trending TV Shows</h2>
        {tvLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-zinc-800 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <MediaGrid items={shows ?? []} type="tv" />
        )}
      </section>
    </div>
  );
}