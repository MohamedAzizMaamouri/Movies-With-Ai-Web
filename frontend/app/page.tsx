"use client";

import { useTrendingMovies, useTrendingTV } from "@/hooks/useMovies";
import MediaGrid from "@/components/MediaGrid";

export default function HomePage() {
  const { data: movies, isLoading: moviesLoading } = useTrendingMovies();
  const { data: shows, isLoading: tvLoading } = useTrendingTV();

  return (
    <main className="min-h-screen px-4 py-10 sm:px-8 lg:px-12 max-w-[1400px] mx-auto">
      {/* Header */}
      <header className="mb-16 text-center animate-fade-up" style={{ animationDelay: "0.1s" }}>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
          <span className="text-white">Trending </span>
          <span className="text-gradient-gold">Now</span>
        </h1>
        <p className="mt-4 text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Discover the most popular movies and TV shows, curated in real-time.
        </p>
        <div className="mt-6 h-1 w-24 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto rounded-full" />
      </header>

      {/* Movies Section */}
      <section className="mb-20 animate-fade-up" style={{ animationDelay: "0.2s" }}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold flex items-center gap-3">
            <span className="w-1.5 h-8 bg-accent rounded-full shadow-[0_0_10px_rgba(255,215,0,0.4)]" />
            <span className="text-white">Trending Movies</span>
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-card-border to-transparent ml-6" />
        </div>

        {moviesLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-skeleton rounded-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent bg-[length:200%_100%] animate-shimmer" />
              </div>
            ))}
          </div>
        ) : (
          <MediaGrid items={movies ?? []} type="movie" />
        )}
      </section>

      {/* TV Shows Section */}
      <section className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold flex items-center gap-3">
            <span className="w-1.5 h-8 bg-accent rounded-full shadow-[0_0_10px_rgba(255,215,0,0.4)]" />
            <span className="text-white">Trending TV Shows</span>
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-card-border to-transparent ml-6" />
        </div>

        {tvLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-skeleton rounded-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent bg-[length:200%_100%] animate-shimmer" />
              </div>
            ))}
          </div>
        ) : (
          <MediaGrid items={shows ?? []} type="tv" />
        )}
      </section>
    </main>
  );
}