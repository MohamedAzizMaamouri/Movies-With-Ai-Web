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
    <div className="space-y-6 mb-12 animate-fade-up" style={{ animationDelay: "0.1s" }}>
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-3 items-center justify-center sm:justify-start">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onChange({ ...filters, category: cat.value })}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
              filters.category === cat.value
                ? "bg-accent text-black border-accent shadow-[0_0_12px_rgba(255,215,0,0.3)] scale-[1.02]"
                : "bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-600 hover:bg-zinc-800"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Filters Row (Only visible in Discover mode) */}
      {filters.category === "discover" && (
        <div className="flex flex-wrap gap-4 pt-6 border-t border-zinc-800/50 animate-[fadeUp_0.4s_ease_out_forwards]">
          {[
            { label: "All Genres", options: genres.map(g => ({ val: g.id, lbl: g.name })), value: filters.genre_id, key: "genre_id" },
            { label: "All Years", options: years.map(y => ({ val: y, lbl: y.toString() })), value: filters.year, key: "year" },
            { label: "Any Rating", options: [9, 8, 7, 6, 5].map(r => ({ val: r, lbl: `★ ${r}+` })), value: filters.min_rating, key: "min_rating" }
          ].map((filter) => (
            <div key={filter.key} className="relative group">
              <select
                value={filter.value ?? ""}
                onChange={(e) => {
                  const val = e.target.value ? Number(e.target.value) : undefined;
                  onChange({ ...filters, [filter.key]: val });
                }}
                className="appearance-none bg-zinc-900 border border-zinc-700 text-zinc-300 text-sm rounded-xl px-4 py-3 pr-10 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all duration-300 cursor-pointer hover:border-zinc-500 min-w-[160px]"
              >
                <option value="" className="bg-zinc-900 text-zinc-400">{filter.label}</option>
                {filter.options.map((opt) => (
                  <option key={opt.val} value={opt.val} className="bg-zinc-900 text-zinc-300">
                    {opt.lbl}
                  </option>
                ))}
              </select>

              {/* Custom Chevron */}
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}