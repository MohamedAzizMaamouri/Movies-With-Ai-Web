import MediaCard from "./MediaCard";

interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  vote_average?: number;
  media_type?: string;
}

interface Props {
  items: MediaItem[];
  type?: "movie" | "tv";
}

export default function MediaGrid({ items, type }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {items.map((item, index) => {
        const resolvedType = type ?? (item.media_type === "tv" ? "tv" : "movie");

        return (
          <div
            key={item.id}
            className="group relative rounded-xl overflow-hidden will-change-transform transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_24px_rgba(255,215,0,0.12)]"
            style={{ animation: `fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards`, animationDelay: `${index * 0.06}s` }}
          >
            <MediaCard
              id={item.id}
              title={item.title ?? item.name ?? "Untitled"}
              posterPath={item.poster_path}
              rating={item.vote_average ?? 0}
              type={resolvedType}
            />

            {/* Hover Border & Overlay */}
            <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-accent/40 transition-colors duration-300 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        );
      })}
    </div>
  );
}