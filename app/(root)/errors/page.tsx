import CreateProject from "./CreateProject";
import IssueProjects from "./IssueProjects";

const ErrorsPage = () => {
  return (
    <main className="flex flex-col gap-4">
      <header className="self-end">
        <CreateProject />
      </header>
      <article>
        Error Message
        <IssueProjects />
      </article>
    </main>
  );
};

export default ErrorsPage;
