"use client";

const ProjectError = ({ error }: { error: Error }) => {
  return (
    <div className="flex flex-col items-center justify-center h-96 text-red-500 border rounded-lg border-red-500">
      <p>{error.message}</p>
    </div>
  );
};

export default ProjectError;
