"use client";

import { errosProjectQuery } from "@/modules/errors/errorsProject.query";
import { useQuery } from "@tanstack/react-query";

const IssueProjects = () => {
  const { data, error } = useQuery(errosProjectQuery());

  return (
    <div>
      <p>IssueProjects</p>
      <p>Data : {JSON.stringify(data)}</p>
      <p>Error : {JSON.stringify(error?.message)}</p>
    </div>
  );
};

export default IssueProjects;
