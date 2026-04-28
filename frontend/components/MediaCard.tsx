import Image from "next/image";
import Link from "next/link";
import { tmdbImage } from "@/lib/tmdb-image";

interface Props {
  id: number;
  title: string;
  posterPath: string | null;
  rating?: number;
  type: "movie" | "tv";
}

export default function MediaCard({ id, title, posterPath, rating, type }: Props) {
  return (
    <Link href={`/${type}/${id}`} className="block h-full">
      <div className="relative w-full aspect-[2/3] overflow-hidden rounded-xl bg-card border border-card-border transition-all duration-300">
        {/* Poster Image */}
        <Image
          src={tmdbImage(posterPath)}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 ease-out hover:scale-110"
          sizes="(max-width: 768px) 50vw, 20vw"
          priority={false}
        />

        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />

        {/* Rating Badge */}
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
          <svg className="w-3 h-3 text-accent" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-xs font-medium text-white">{(rating ?? 0).toFixed(1)}</span>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-3 opacity-0 transition-all duration-300 hover:translate-y-0 hover:opacity-100">
          <h3 className="text-sm font-semibold text-white line-clamp-2 drop-shadow-lg">{title}</h3>
          <div className="h-0.5 w-8 bg-accent mt-2 rounded-full transform origin-left scale-x-0 transition-transform duration-300 delay-75 hover:scale-x-100" />
        </div>
      </div>
    </Link>
  );
}