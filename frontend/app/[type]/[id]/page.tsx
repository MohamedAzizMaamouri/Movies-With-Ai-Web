"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useMovieDetail, useTVDetail } from "@/hooks/useMovies";
import { tmdbImage } from "@/lib/tmdb-image";

export default function DetailPage() {
  const { type, id } = useParams() as { type: string; id: string };
  const isMovie = type === "movie";
  const { data, isLoading } = isMovie ? useMovieDetail(id) : useTVDetail(id);

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-accent/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-t-accent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  // Not Found State
  if (!data) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-center px-4">
      <h1 className="text-5xl font-bold text-gradient-gold mb-4 animate-fade-up">Not Found</h1>
      <p className="text-zinc-400 text-lg animate-fade-up" style={{ animationDelay: "0.1s" }}>
        The requested media does not exist or has been removed.
      </p>
    </div>
  );

  const title = data.title ?? data.name ?? "Untitled";
  const releaseDate = data.release_date ?? data.first_air_date;
  const trailer = data.videos?.results?.find(
    (v: any) => v.type === "Trailer" && v.site === "YouTube"
  );
  const cast = data.credits?.cast?.slice(0, 10) ?? [];

  return (
    <main className="min-h-screen bg-[#050505] text-white pb-20">
      {/* Hero Backdrop */}
      <div className="relative w-full h-[65vh] md:h-[75vh] overflow-hidden">
        {data.backdrop_path && (
          <Image
            src={tmdbImage(data.backdrop_path, "original")}
            alt="Backdrop"
            fill
            className="object-cover opacity-50"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/20 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 -mt-36 md:-mt-52 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-start">

          {/* Poster Card */}
          <div className="w-52 md:w-64 shrink-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="relative rounded-xl overflow-hidden shadow-[0_0_40px_rgba(255,215,0,0.12)] border border-zinc-800 group transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,215,0,0.2)]">
              <Image
                src={tmdbImage(data.poster_path)}
                alt={title}
                width={256}
                height={384}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Info Section */}
          <div className="flex-1 space-y-8 pt-4 md:pt-12 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 text-gradient-gold drop-shadow-lg">
                {title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-zinc-300">
                {/* Rating Badge */}
                <div className="flex items-center gap-2 bg-zinc-800/60 backdrop-blur px-3 py-1.5 rounded-lg border border-accent/30">
                  <svg className="w-4 h-4 text-accent fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  <span className="font-bold text-white text-lg">{data.vote_average?.toFixed(1)}</span>
                  <span className="text-zinc-500 text-xs">/10</span>
                </div>

                <span className="font-medium text-accent">{releaseDate?.split("-")[0]}</span>
                {data.runtime && <span className="px-2 py-0.5 bg-zinc-800 rounded text-xs border border-zinc-700">{data.runtime} min</span>}

                {data.genres?.length > 0 && (
                  <div className="flex gap-2 flex-wrap mt-1">
                    {data.genres.map((g: any) => (
                      <span key={g.id} className="px-3 py-1 text-xs font-medium text-accent border border-accent/40 rounded-full bg-accent/5 hover:bg-accent/15 hover:border-accent transition-colors cursor-default">
                        {g.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <p className="text-zinc-300 leading-relaxed text-lg max-w-3xl border-l-2 border-accent/30 pl-5">
              {data.overview}
            </p>
          </div>
        </div>

        {/* Trailer Section */}
        {trailer && (
          <section className="mt-24 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <h2 className="text-2xl font-semibold mb-8 flex items-center gap-4">
              <span className="w-1.5 h-8 bg-accent rounded-full shadow-[0_0_10px_rgba(255,215,0,0.4)]" />
              Official Trailer
            </h2>
            <div className="relative aspect-video max-w-5xl rounded-xl overflow-hidden shadow-[0_0_40px_rgba(255,215,0,0.08)] border border-zinc-800 group">
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?modestbranding=1&rel=0&autoplay=0`}
                className="w-full h-full transition-transform duration-300 group-hover:scale-[1.01]"
                allowFullScreen
                title="Trailer"
              />
            </div>
          </section>
        )}

        {/* Cast Section */}
        {cast.length > 0 && (
          <section className="mt-24 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <h2 className="text-2xl font-semibold mb-10 flex items-center gap-4">
              <span className="w-1.5 h-8 bg-accent rounded-full shadow-[0_0_10px_rgba(255,215,0,0.4)]" />
              Top Cast
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-8">
              {cast.map((person: any) => (
                <div key={person.id} className="group flex flex-col items-center text-center">
                  <div className="relative w-28 h-28 mb-4 rounded-full overflow-hidden border-2 border-transparent group-hover:border-accent/70 transition-all duration-300 shadow-lg group-hover:shadow-[0_0_20px_rgba(255,215,0,0.2)]">
                    {person.profile_path ? (
                      <Image
                        src={tmdbImage(person.profile_path, "w185")}
                        alt={person.name}
                        width={112}
                        height={112}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-600 text-3xl font-bold">?</div>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-white line-clamp-1 group-hover:text-accent transition-colors">{person.name}</p>
                  <p className="text-xs text-zinc-500 line-clamp-1 mt-1">{person.character}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}