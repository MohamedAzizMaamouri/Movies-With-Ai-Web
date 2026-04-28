"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) router.push(`/search?q=${encodeURIComponent(search)}`);
  };

  return (
    <nav className="bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-6">
        <Link href="/" className="text-xl font-bold text-white shrink-0">
          🎬 CineApp
        </Link>
        <Link href="/movies" className="text-zinc-400 hover:text-white text-sm transition-colors">Movies</Link>
        <Link href="/tv" className="text-zinc-400 hover:text-white text-sm transition-colors">TV Shows</Link>

        <form onSubmit={handleSearch} className="flex-1 max-w-sm ml-auto">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full bg-zinc-800 rounded-lg px-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600"
          />
        </form>

        <Link href="/dashboard" className="text-zinc-400 hover:text-white text-sm transition-colors">
          My List
        </Link>
      </div>
    </nav>
  );
}