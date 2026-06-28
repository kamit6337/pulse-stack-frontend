import CreateProject from "./CreateProject";

const ErrorsPage = () => {
  return (
    <main className="flex flex-col gap-4">
      <header className="self-end">
        <CreateProject />
      </header>
      <article>Error Message</article>
    </main>
  );
};

export default ErrorsPage;
