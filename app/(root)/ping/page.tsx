import CreateProject from "./CreateProject";

const defaultPing = [];

const PingPage = () => {
  return (
    <main className="flex flex-col">
      <header className="self-end ">
        <CreateProject />
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
