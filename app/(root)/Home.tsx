"use client";

import { Button } from "@/components/ui/button";
import { getUsersQueryOptions } from "@/modules/user/user.query";
import {
  counterInitialState,
  decrement,
  increment,
} from "@/redux/slice/counterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const { value } = useAppSelector(counterInitialState);
  const dispatch = useAppDispatch();

  const { data } = useQuery(getUsersQueryOptions());

  return (
    <main>
      <h1 className="text-2xl font-bold">Hello, Next.js!</h1>
      <article>
        <p>{value}</p>
        <Button onClick={() => dispatch(increment())}>Increment</Button>
        <Button onClick={() => dispatch(decrement())}>Decrement</Button>
      </article>
      <article>
        {data?.map((u) => {
          return <p key={u.id}>{u.name}</p>;
        })}
      </article>
      {/* <p>{JSON.stringify(data?.map((u) => u.name))}</p> */}
    </main>
  );
};

export default Home;
