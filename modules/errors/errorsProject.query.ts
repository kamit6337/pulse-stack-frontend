import { queryOptions } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../base-url";

const queryFn = async () => {
  const result = await axios.get(`${BASE_URL}/issues/project`);

  return result.data;
};

export const errosProjectQuery = () =>
  queryOptions({
    queryKey: ["Errors Project"],
    queryFn: () => queryFn(),
    staleTime: Infinity,
  });
