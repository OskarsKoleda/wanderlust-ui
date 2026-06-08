import { QueryClient } from "@tanstack/react-query";
import { QUERY_CACHE_TIME, QUERY_STALE_TIME } from "./config/query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_STALE_TIME,
      gcTime: QUERY_CACHE_TIME,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
