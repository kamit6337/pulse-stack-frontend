"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const HeaderTitle = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/ping")) {
    return (
      <div className="text-sm">
        Welcome,
        <span className="ml-1 text-lg font-semibold">Ping Monitoring</span>
      </div>
    );
  }

  return (
    <div className="text-sm">
      Welcome,
      <span className="ml-1 text-lg font-semibold">Pulse Stack</span>
    </div>
  );
};

export default HeaderTitle;
