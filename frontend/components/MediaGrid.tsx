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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {items.map((item) => {
        const resolvedType = type ?? (item.media_type === "tv" ? "tv" : "movie");
        return (
          <MediaCard
            key={item.id}
            id={item.id}
            title={item.title ?? item.name ?? "Untitled"}
            posterPath={item.poster_path}
            rating={item.vote_average ?? 0}
            type={resolvedType}
          />
        );
      })}
    </div>
  );
}