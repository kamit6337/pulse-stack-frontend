"use client";

import { errosProjectQuery } from "@/modules/issues/issuesProject.query";
import formatedDate from "@/utils/formatedDate";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const IssueProjects = () => {
  const { isLoading, error, data } = useQuery(errosProjectQuery());

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error : {JSON.stringify(error.message)}</div>;
  }

  const errorsProject = data || [];

  if (errorsProject.length === 0) {
    return <div>No Project Available</div>;
  }

  return (
    <main className="space-y-5">
      {errorsProject.map((u) => {
        return (
          <article key={u._id}>
            <Link href={`/issues/project?id=${u._id}`}>
              <div className="bg-muted/50 flex justify-between p-4 rounded-lg">
                <div>
                  <p>{u.name}</p>
                  <p className="text-sm text-gray-400">{u.backendFramework}</p>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {formatedDate(u.createdAt)}
                </p>
              </div>
            </Link>
          </article>
        );
      })}
    </main>
  );
};

export default IssueProjects;
