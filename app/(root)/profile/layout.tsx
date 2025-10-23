import AdminProfileSidebar from "@/components/Profile/AdminProfileSidebar";
import ProfileSidebar from "@/components/Profile/ProfileSidebar";
import { extractRoleFromToken } from "@/lib/actions/actions.user";
import React, { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const role = await extractRoleFromToken();

  if (!role) {
    return <p>Accès refusé</p>;
  }
  return (
    <div className="flex flex-col md:flex-row gap-3 pb-10 p-4 md:pr-6">
      <div className="flex flex-col gap-4">
        <ProfileSidebar />
        {role !== "user" && <AdminProfileSidebar />}
      </div>
      <div className="w-full bg-white dark:bg-gray-950 rounded-2xl p-0 md:p-8 shadow">
        {children}
      </div>
    </div>
  );
};

export default Layout;
