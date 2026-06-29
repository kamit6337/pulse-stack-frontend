const IssueDetails = () => {
  return (
    <div className="border rounded-lg p-5 grid grid-cols-2">
      <div className="space-y-3">
        <p>Basic</p>
        <div className="text-sm flex gap-3">
          <div className="text-gray-200">
            <p>Environment</p>
            <p>Level</p>
          </div>
          <div className="">
            <p>-</p>
            <p>-</p>
          </div>
          <div className="text-gray-500">
            <p>Production</p>
            <p>error</p>
          </div>
        </div>
      </div>
      <div>
        <p>Request</p>
      </div>
    </div>
  );
};

export default IssueDetails;
