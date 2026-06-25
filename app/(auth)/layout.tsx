import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      className="min-h-svh flex justify-center items-center bg-cover"
      style={{ backgroundImage: "url(bg-2.jpg)" }}
    >
      {children}
    </main>
  );
};

export default AuthLayout;
