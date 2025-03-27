"use client";

import { navItems } from "@/constants";
import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";
import MobNavLink from "./MobNavLink";

type MobileSidebarProps = {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
};

const MobileSidebar = ({ isVisible, setIsVisible }: MobileSidebarProps) => {
  return (
    <aside
      className={clsx(
        "fixed sm:hidden top-[100px] left-0 z-50 h-screen bg-white px-4 py-3 overflow-y-scroll overflow-x-hidden w-2/3 duration-500 ease-in-out flex flex-col shadow-lg",
        isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
      )}
    >
      <div className="flex flex-col items-start gap-3 mt-5 w-full">
        {navItems.map((item, index) => (
          <MobNavLink
            key={item.label}
            item={item}
            setIsVisible={setIsVisible}
          />
        ))}
      </div>
    </aside>
  );
};

export default MobileSidebar;
