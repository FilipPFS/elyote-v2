import Header from "@/components/Header";
import MobileFooter from "@/components/Mobile/MobileFooter";
import MobileHeader from "@/components/Mobile/MobileHeader";
import Sidebar from "@/components/Sidebar";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex relative min-h-screen sm:flex-row flex-col gap-4">
      <MobileHeader />
      <Sidebar />
      <main className="flex-1 flex flex-col max-sm:pb-48">
        <Header />
        {children}
      </main>
      <MobileFooter />
    </div>
  );
};

export default Layout;
