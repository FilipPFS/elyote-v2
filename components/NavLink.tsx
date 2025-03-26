import clsx from "clsx";
import Link from "next/link";
import React, { JSX, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

type Props = {
  item: {
    link: string;
    label: string;
    subLinks: {
      label: string;
      link: string;
    }[];
    icon: JSX.Element;
  };
  expanded: boolean;
};

const NavLink = ({ item, expanded }: Props) => {
  const [subLinkVisible, setSubLinkVisible] = useState(false);
  return item.subLinks.length > 0 ? (
    <div className="relative w-full flex flex-col items-center">
      <button
        key={item.label}
        className={clsx(
          "flex items-center w-full rounded-md group transition-all duration-500",
          expanded ? "justify-start gap-4" : "justify-center"
        )}
        onClick={() => setSubLinkVisible((prev) => !prev)}
      >
        <span className="p-1.5 flex-shrink-0 rounded-lg text-xl transition-all duration-300 group-hover:bg-blue-800 group-hover:text-white">
          {item.icon}
        </span>
        <span
          className={clsx(
            "transition-all duration-300 text-sm whitespace-nowrap overflow-hidden",
            expanded ? "opacity-100 w-auto" : "opacity-0 w-0",
            "group-hover:text-blue-800"
          )}
        >
          {item.label}
        </span>
        {expanded && (
          <span>
            <IoIosArrowDown />
          </span>
        )}
      </button>
      {subLinkVisible &&
        (expanded ? (
          <div className="flex flex-col items-start w-full gap-2">
            {item.subLinks.map((subLink) => (
              <Link className="text-sm" key={subLink.label} href={subLink.link}>
                {subLink.label}
              </Link>
            ))}
          </div>
        ) : (
          <div className="absolute top-0 left-full ml-2 bg-white shadow-md p-2 rounded-lg flex flex-col items-start z-50 gap-2 border border-gray-200">
            {item.subLinks.map((subLink) => (
              <Link
                className="text-sm font-bold text-blue-500 hover:underline"
                key={subLink.label}
                href={subLink.link}
              >
                {subLink.label}
              </Link>
            ))}
          </div>
        ))}
    </div>
  ) : (
    <Link
      key={item.label}
      href={item.link}
      className={clsx(
        "flex items-center w-full rounded-md group transition-all duration-500",
        expanded ? "justify-start gap-4" : "justify-center"
      )}
    >
      <span className="p-1.5 flex-shrink-0 rounded-lg text-xl transition-all duration-300 group-hover:bg-blue-800 group-hover:text-white">
        {item.icon}
      </span>
      <span
        className={clsx(
          "transition-all duration-300 text-sm whitespace-nowrap overflow-hidden",
          expanded ? "opacity-100 w-auto" : "opacity-0 w-0",
          "group-hover:text-blue-800"
        )}
      >
        {item.label}
      </span>
    </Link>
  );
};

export default NavLink;
