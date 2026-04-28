interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onChange }: Props) {
  const max = Math.min(totalPages, 500); // TMDB caps at 500
  const pages = [];

  // Always show: first, prev-2 to next+2, last
  const start = Math.max(1, page - 2);
  const end   = Math.min(max, page + 2);

  if (start > 1)   pages.push(1, "...");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < max)   pages.push("...", max);

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
      >
        ← Prev
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="text-zinc-500 px-1">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p as number)}
            className={`w-9 h-9 rounded-lg text-sm transition-colors ${
              p === page
                ? "bg-white text-zinc-900 font-semibold"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === max}
        className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
      >
        Next →
      </button>
    </div>
  );
}