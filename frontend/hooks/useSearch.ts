import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export const useSearch = (query: string) =>
  useQuery({
    queryKey: ["search", query],
    queryFn: () =>
      api.get("/api/v1/search/", { params: { q: query } }).then((r) => 
        r.data.results.filter((item: any) => item.media_type !== "person")
      ),
    enabled: query.length > 1,   // don't fire on empty input
    staleTime: 1000 * 30,
  });