import TokenRefresher from "@/components/Auth/TokenRefresher";
import Header from "@/components/Header";
import MobileFooter from "@/components/Mobile/MobileFooter";
import MobileHeader from "@/components/Mobile/MobileHeader";
import Sidebar from "@/components/Sidebar";
import React, { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <>
      <TokenRefresher />
      <div className="flex relative min-h-screen sm:flex-row flex-col gap-4 ont-poppins font-inter:font-inter weight:font-bold text-base small:text-sm big:text-lg font-roboto:font-roboto">
        <MobileHeader />
        <Sidebar />
        <main className="flex-1 flex dark:bg-gray-900  bg-gray-100 flex-col max-sm:pb-48">
          <Header />
          {children}
        </main>
        <MobileFooter />
      </div>
    </>
  );
};

export default Layout;
