// app/getQueryClient.tsx
import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

// cache() is scoped per request, so we don't leak data between requests

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

// const getQueryClient = cache(() => new QueryClient());

const getQueryClient = cache(makeQueryClient);
export default getQueryClient;
