import { SignOutButton, useAuth } from "@clerk/nextjs";

const SignOutBtn = () => {
  const { sessionId } = useAuth();

  if (!sessionId) {
    return <p>No Session</p>;
  }

  return <SignOutButton sessionId={sessionId} />;
};

export default SignOutBtn;
