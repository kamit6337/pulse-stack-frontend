import { USER } from "@/types/user";
import { queryOptions, QueryOptions } from "@tanstack/react-query";
import axios from "axios";

export const getUsersQueryOptions = () =>
  queryOptions({
    queryKey: ["Users"],
    queryFn: async (): Promise<USER[]> => {
      const result = await axios.get<USER[]>(
        "https://jsonplaceholder.typicode.com/users",
      );

      return result.data;
    },
    staleTime: Infinity,
  });
