interface Genre {
  id: number;
  name: string;
}

interface Filters {
  genre_id?: number;
  year?: number;
  min_rating?: number;
  category: string;
}

interface Props {
  genres: Genre[];
  filters: Filters;
  onChange: (filters: Filters) => void;
  categories: { value: string; label: string }[];
}

export default function FilterBar({ genres, filters, onChange, categories }: Props) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 40 }, (_, i) => currentYear - i);

  return (
    <div className="flex flex-wrap gap-3 bg-zinc-900 p-4 rounded-xl border border-zinc-800">
      {/* Category tabs */}
      <div className="flex gap-2 w-full flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onChange({ ...filters, category: cat.value })}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filters.category === cat.value
                ? "bg-white text-zinc-900"
                : "bg-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Only show filters when in discover mode */}
      {filters.category === "discover" && (
        <div className="flex flex-wrap gap-3 w-full">
          {/* Genre */}
          <select
            value={filters.genre_id ?? ""}
            onChange={(e) =>
              onChange({ ...filters, genre_id: e.target.value ? Number(e.target.value) : undefined })
            }
            className="bg-zinc-800 border border-zinc-700 text-zinc-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-zinc-500"
          >
            <option value="">All Genres</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>

          {/* Year */}
          <select
            value={filters.year ?? ""}
            onChange={(e) =>
              onChange({ ...filters, year: e.target.value ? Number(e.target.value) : undefined })
            }
            className="bg-zinc-800 border border-zinc-700 text-zinc-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-zinc-500"
          >
            <option value="">All Years</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          {/* Min rating */}
          <select
            value={filters.min_rating ?? ""}
            onChange={(e) =>
              onChange({ ...filters, min_rating: e.target.value ? Number(e.target.value) : undefined })
            }
            className="bg-zinc-800 border border-zinc-700 text-zinc-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-zinc-500"
          >
            <option value="">Any Rating</option>
            {[9, 8, 7, 6, 5].map((r) => (
              <option key={r} value={r}>★ {r}+</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}