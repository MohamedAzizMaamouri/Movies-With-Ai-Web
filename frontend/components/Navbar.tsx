"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) router.push(`/search?q=${encodeURIComponent(search)}`);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-card-border bg-background/80 backdrop-blur-md animate-[fadeDown_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards]">
      {/* Increased height from h-16 to h-20 to comfortably fit the larger logo */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between gap-6">

        {/* Logo - Increased Size */}
        <Link href="/" className="shrink-0 hover:opacity-80 transition-opacity">
          <Image
            src="/logo.png"
            alt="CineApp Logo"
            width={260}
            height={80}
            className="h-14 w-auto"
            priority
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/movies" className="text-sm text-zinc-400 hover:text-accent transition-colors relative group">
            Movies
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
          </Link>
          <Link href="/tv" className="text-sm text-zinc-400 hover:text-accent transition-colors relative group">
            TV Shows
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
          </Link>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md mx-auto">
          <div className={`relative flex items-center rounded-xl border transition-all duration-300 ${isFocused ? 'border-accent/50 shadow-[0_0_12px_rgba(255,215,0,0.15)]' : 'border-card-border bg-card'}`}>
            <svg className={`absolute left-3 w-4 h-4 transition-colors duration-300 ${isFocused ? 'text-accent' : 'text-zinc-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search movies & shows..."
              className="w-full bg-transparent pl-10 pr-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none"
            />
          </div>
        </form>

        {/* Right Links */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/dashboard" className="text-sm text-zinc-400 hover:text-accent transition-colors relative group">
            My List
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
          </Link>
        </div>
      </div>
    </nav>
  );
}