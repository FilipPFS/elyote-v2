import ProfileSidebar from "@/components/Profile/ProfileSidebar";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col md:flex-row gap-3 pb-10 p-4 md:pr-6">
      <ProfileSidebar />
      <div className="w-full bg-white dark:bg-gray-950 rounded-2xl p-0 md:p-8 shadow">
        {children}
      </div>
    </div>
  );
};

export default Layout;
