interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onChange }: Props) {
  const max = Math.min(totalPages, 500);
  const pages = [];

  const start = Math.max(1, page - 2);
  const end   = Math.min(max, page + 2);

  if (start > 1)   pages.push(1, "...");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < max)   pages.push("...", max);

  return (
    <div className="flex items-center justify-center gap-3 mt-16 pt-8 border-t border-zinc-800/50 animate-[fadeUp_0.5s_ease_out_forwards]">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-accent hover:border-accent/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 text-sm font-medium"
      >
        ← Prev
      </button>

      <div className="flex items-center gap-1.5">
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="text-zinc-600 px-2 text-lg select-none">…</span>
          ) : (
            <button
              key={p}
              onClick={() => onChange(p as number)}
              className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-300 border ${
                p === page
                  ? "bg-accent text-black border-accent shadow-[0_0_12px_rgba(255,215,0,0.25)] scale-105"
                  : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 hover:bg-zinc-800"
              }`}
            >
              {p}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === max}
        className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-accent hover:border-accent/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 text-sm font-medium"
      >
        Next →
      </button>
    </div>
  );
}