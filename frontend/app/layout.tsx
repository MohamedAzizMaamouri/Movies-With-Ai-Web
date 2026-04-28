"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Navbar from "@/components/Navbar";
import "./globals.css";

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-white min-h-screen">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </body>
    </html>
  );
}