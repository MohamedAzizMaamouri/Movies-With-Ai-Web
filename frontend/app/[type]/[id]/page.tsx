"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useMovieDetail, useTVDetail } from "@/hooks/useMovies";
import { tmdbImage } from "@/lib/tmdb-image";

export default function DetailPage() {
  const { type, id } = useParams() as { type: string; id: string };
  const isMovie = type === "movie";

  const { data, isLoading } = isMovie ? useMovieDetail(id) : useTVDetail(id);

  if (isLoading) return (
    <div className="animate-pulse space-y-4">
      <div className="h-96 bg-zinc-800 rounded-xl" />
      <div className="h-8 w-1/2 bg-zinc-800 rounded" />
      <div className="h-4 w-full bg-zinc-800 rounded" />
    </div>
  );

  if (!data) return <p className="text-zinc-400">Not found.</p>;

  const title = data.title ?? data.name;
  const releaseDate = data.release_date ?? data.first_air_date;
  const trailer = data.videos?.results?.find(
    (v: any) => v.type === "Trailer" && v.site === "YouTube"
  );
  const cast = data.credits?.cast?.slice(0, 8) ?? [];

  return (
    <div>
      {/* Backdrop */}
      {data.backdrop_path && (
        <div className="relative h-72 md:h-96 rounded-xl overflow-hidden mb-8">
          <Image
            src={tmdbImage(data.backdrop_path, "original")}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8 -mt-24 relative z-10">
        {/* Poster */}
        <div className="w-40 md:w-56 shrink-0">
          <Image
            src={tmdbImage(data.poster_path)}
            alt={title}
            width={224}
            height={336}
            className="rounded-lg shadow-2xl"
          />
        </div>

        {/* Info */}
        <div className="space-y-4 pt-24 md:pt-0">
          <h1 className="text-3xl font-bold">{title}</h1>
          <div className="flex items-center gap-4 text-sm text-zinc-400">
            <span className="text-yellow-400 font-semibold">
              ★ {data.vote_average?.toFixed(1)}
            </span>
            <span>{releaseDate?.split("-")[0]}</span>
            {data.runtime && <span>{data.runtime} min</span>}
          </div>
          <div className="flex flex-wrap gap-2">
            {data.genres?.map((g: any) => (
              <span key={g.id} className="bg-zinc-800 text-zinc-300 text-xs px-3 py-1 rounded-full">
                {g.name}
              </span>
            ))}
          </div>
          <p className="text-zinc-300 leading-relaxed max-w-2xl">{data.overview}</p>
        </div>
      </div>

      {/* Trailer */}
      {trailer && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Trailer</h2>
          <div className="aspect-video max-w-3xl rounded-xl overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        </section>
      )}

      {/* Cast */}
      {cast.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Cast</h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
            {cast.map((person: any) => (
              <div key={person.id} className="text-center">
                <div className="aspect-square rounded-full overflow-hidden bg-zinc-800 mb-2">
                  <Image
                    src={tmdbImage(person.profile_path, "w185")}
                    alt={person.name}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="text-xs text-zinc-300 line-clamp-1">{person.name}</p>
                <p className="text-xs text-zinc-500 line-clamp-1">{person.character}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

