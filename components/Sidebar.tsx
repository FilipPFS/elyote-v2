"use client";

import { navItems } from "@/constants";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import NavLink from "./NavLink";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      className={clsx(
        "hidden sticky z-20 top-0 remove-scrollbar h-screen bg-white transition-all px-4 py-3 overflow-y-auto duration-300 sm:flex flex-col",
        expanded ? "min-w-[224px] max-w-[224px]" : "min-w-[80px] max-w-[80px]"
      )}
    >
      <div className="flex flex-col items-start gap-3 mt-5 w-full">
        <Link
          href={"/"}
          className={clsx(
            "flex items-center w-full rounded-md group transition-all duration-500",
            expanded ? "justify-start gap-[11px]" : "justify-center"
          )}
        >
          <Image src={"/logo.webp"} alt="logo" width={35} height={35} />
          <span
            className={clsx(
              "transition-all duration-300 text-sm whitespace-nowrap overflow-hidden",
              expanded ? "opacity-100 w-auto" : "opacity-0 w-0",
              "group-hover:text-blue-800"
            )}
          >
            Elyote
          </span>
        </Link>

        {navItems.map((item, index) => (
          <NavLink key={item.label} item={item} expanded={expanded} />
        ))}

        {/* Toggle button */}
        <button
          className={clsx(
            "flex w-full group transition-all duration-500",
            expanded ? "justify-start items-center gap-4" : "justify-center"
          )}
          onClick={() => setExpanded(!expanded)}
        >
          <span className="p-1.5 text-xl flex justify-center transition-all duration-300 group-hover:bg-blue-800 group-hover:text-white rounded-lg">
            {expanded ? <IoIosArrowBack /> : <IoIosArrowForward />}
          </span>
          <span
            className={clsx(
              "transition-all duration-300 text-sm whitespace-nowrap overflow-hidden",
              expanded ? "opacity-100 w-auto" : "opacity-0 w-0",
              "group-hover:text-blue-800"
            )}
          >
            Développer
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
