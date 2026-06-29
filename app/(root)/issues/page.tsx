import CreateProject from "./CreateProject";
import IssueProjects from "./IssueProjects";

const ErrorsPage = () => {
  return (
    <section className="flex flex-col gap-4">
      <header className="self-end">
        <CreateProject />
      </header>

      <IssueProjects />
    </section>
  );
};

export default ErrorsPage;
