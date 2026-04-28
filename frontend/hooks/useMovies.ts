import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export const useTrendingMovies = () =>
  useQuery({
    queryKey: ["movies", "trending"],
    queryFn: () => api.get("/api/v1/movies/trending").then((r) => r.data.results),
  });

export const useTrendingTV = () =>
  useQuery({
    queryKey: ["tv", "trending"],
    queryFn: () => api.get("/api/v1/tv/trending").then((r) => r.data.results),
  });

export const useMovieDetail = (id: string) =>
  useQuery({
    queryKey: ["movie", id],
    queryFn: () => api.get(`/api/v1/movies/${id}`).then((r) => r.data),
    enabled: !!id,
  });

export const useTVDetail = (id: string) =>
  useQuery({
    queryKey: ["tv", id],
    queryFn: () => api.get(`/api/v1/tv/${id}`).then((r) => r.data),
    enabled: !!id,
  });