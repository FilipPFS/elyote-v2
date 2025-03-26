"use client";

import { navItems } from "@/constants";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type MobileSidebarProps = {
  isVisible: boolean;
};

const MobileSidebar = ({ isVisible }: MobileSidebarProps) => {
  return (
    <aside
      className={clsx(
        "fixed sm:hidden top-[100px] left-0 z-50 h-screen bg-white px-4 py-3 overflow-y-scroll overflow-x-hidden w-2/3 duration-500 ease-in-out flex flex-col shadow-lg",
        isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
      )}
    >
      <div className="flex flex-col items-start gap-3 mt-5 w-full">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="flex items-center w-full rounded-md group transition-all duration-500 justify-start gap-4"
          >
            <span className="p-1.5 rounded-lg text-3xl transition-all duration-300 group-hover:bg-blue-800 group-hover:text-white">
              {item.icon}
            </span>
            <span className="transition-all duration-300 text-lg group-hover:text-blue-800">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default MobileSidebar;
