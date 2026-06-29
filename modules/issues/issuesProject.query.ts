import { queryOptions } from "@tanstack/react-query";
import { getReq } from "@/config/api";
import { IssueProject } from "./issues.types";

export const errosProjectQuery = (enabled = true) =>
  queryOptions({
    queryKey: ["Errors Project"],
    queryFn: () => getReq<IssueProject[]>("/issues/project"),
    staleTime: Infinity,
    retry: 3,
    enabled,
  });
