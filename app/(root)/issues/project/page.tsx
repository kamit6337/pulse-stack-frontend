import formatedDate from "@/utils/formatedDate";
import Issue from "./Issue";
import IssueDetails from "./IssueDetails";

type PageProps = {
  searchParams: Promise<{
    id?: string;
  }>;
};

const IssuesProjectPage = async ({ searchParams }: PageProps) => {
  const params = await searchParams;

  if (!params.id) {
    throw new Error("Id is not provided");
  }

  return (
    <main className="space-y-5">
      <Issue projectId={params.id} />
      <div className="h-96 flex items-center justify-center border rounded-lg">
        <p>Metrics</p>
      </div>
      <IssueDetails />
    </main>
  );
};

export default IssuesProjectPage;
