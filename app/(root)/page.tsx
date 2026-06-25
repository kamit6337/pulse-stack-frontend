import getQueryClient from "@/lib/getQueryClient";
import Home from "./Home";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getUsersQueryOptions } from "@/modules/user/user.query";

export default async function HomePage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(getUsersQueryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Home />
    </HydrationBoundary>
  );
}
