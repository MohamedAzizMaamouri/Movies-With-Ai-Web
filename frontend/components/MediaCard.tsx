import Image from "next/image";
import Link from "next/link";
import { tmdbImage } from "@/lib/tmdb-image";

interface Props {
  id: number;
  title: string;
  posterPath: string | null;
  rating: number;
  type: "movie" | "tv";
}

export default function MediaCard({ id, title, posterPath, rating, type }: Props) {
  return (
    <Link href={`/${type}/${id}`}>
      <div className="group relative rounded-lg overflow-hidden bg-zinc-900 hover:scale-105 transition-transform duration-200 cursor-pointer">
        <div style={{ position: "relative", width: "100%", paddingBottom: "150%" }}>
          <Image
            src={tmdbImage(posterPath)}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 20vw"
            priority={false}
          />
        </div>
        {/* Rating badge */}
        <div className="absolute top-2 left-2 bg-black/70 text-yellow-400 text-xs font-medium px-2 py-1 rounded-full">
          ★ {rating.toFixed(1)}
        </div>
        {/* Title on hover */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
          <p className="text-sm font-medium text-white line-clamp-2">{title}</p>
        </div>
      </div>
    </Link>
  );
}