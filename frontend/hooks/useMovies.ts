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

export const useMovieGenres = () =>
  useQuery({
    queryKey: ["movie-genres"],
    queryFn: () => api.get("/api/v1/movies/genres").then((r) => r.data.genres),
    staleTime: Infinity, // genres never change
  });

export const useTVGenres = () =>
  useQuery({
    queryKey: ["tv-genres"],
    queryFn: () => api.get("/api/v1/tv/genres").then((r) => r.data.genres),
    staleTime: Infinity,
  });

export const useDiscoverMovies = (filters: {
  page: number;
  genre_id?: number;
  year?: number;
  min_rating?: number;
  category?: string;
}) =>
  useQuery({
    queryKey: ["movies", "discover", filters],
    queryFn: () => {
      if (filters.category && filters.category !== "discover") {
        return api
          .get(`/api/v1/movies/${filters.category}`, { params: { page: filters.page } })
          .then((r) => r.data);
      }
      return api.get("/api/v1/movies/discover", { params: filters }).then((r) => r.data);
    },
  });

export const useDiscoverTV = (filters: {
  page: number;
  genre_id?: number;
  year?: number;
  min_rating?: number;
  category?: string;
}) =>
  useQuery({
    queryKey: ["tv", "discover", filters],
    queryFn: () => {
      if (filters.category && filters.category !== "discover") {
        return api
          .get(`/api/v1/tv/${filters.category}`, { params: { page: filters.page } })
          .then((r) => r.data);
      }
      return api.get("/api/v1/tv/discover", { params: filters }).then((r) => r.data);
    },
  });