import { Button } from "@/components/ui/button";
import { Ping } from "@/types/ping";

const defaultPing: Ping[] = [
  // {
  //   _id: "_id_1",
  //   name: "Project 1",
  //   url: "http://localhost:300",
  // },
];

const PingPage = () => {
  return (
    <main className="flex flex-col">
      <header className="self-end ">
        <Button>Create Project</Button>
      </header>
      {defaultPing.length === 0 && (
        <article className="flex justify-center items-center py-40">
          Dont' have any project. Create a new Project
        </article>
      )}
    </main>
  );
};

export default PingPage;
