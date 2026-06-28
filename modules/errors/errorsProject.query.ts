import { queryOptions } from "@tanstack/react-query";
import { getReq } from "@/config/api";

export const errosProjectQuery = () =>
  queryOptions({
    queryKey: ["Errors Project"],
    queryFn: () => getReq("/issues/project"),
    staleTime: Infinity,
    retry: 3,
  });
