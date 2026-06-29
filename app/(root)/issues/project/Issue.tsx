"use client";

import formatedDate from "@/utils/formatedDate";

const Issue = ({ projectId }: { projectId: string }) => {
  return (
    <main>
      <article className="bg-muted rounded-lg flex justify-between p-5">
        <div>
          <p>Issue</p>
          <p className="text-sm text-gray-400">{projectId}</p>
        </div>
        <div className="flex flex-col items-center">
          <p>Occurence Count</p>
          <p className="text-sm text-gray-400">3</p>
        </div>
        <div className="flex flex-col items-center">
          <p>First Seen</p>
          <p className="text-sm text-gray-400">
            {formatedDate(new Date(Date.now()))}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p>Last Seen</p>
          <p className="text-sm text-gray-400">
            {formatedDate(new Date(Date.now()))}
          </p>
        </div>
      </article>
    </main>
  );
};

export default Issue;
