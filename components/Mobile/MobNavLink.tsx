"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Dispatch, JSX, SetStateAction, useState } from "react";
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
  setIsVisible: Dispatch<SetStateAction<boolean>>;
};

const MobNavLink = ({ item, setIsVisible }: Props) => {
  const [subLinkVisible, setSubLinkVisible] = useState(false);
  const [activeIcon, setActiveIcon] = useState(false);
  const pathname = usePathname();
  const firstSegment = `/${pathname.split("/")[1]}`;
  const activePath = pathname === item.link || firstSegment === item.link;

  const handleSetLink = () => {
    setSubLinkVisible((prev) => !prev);
    setActiveIcon((prev) => !prev);
  };

  const handleVisibility = () => {
    setIsVisible(false);
  };

  return item.subLinks.length > 0 ? (
    <div className="relative w-full flex flex-col items-center">
      <div
        key={item.label}
        className={clsx(
          "flex items-center w-full rounded-md group transition-all duration-500 cursor-pointer justify-start gap-4"
        )}
        onClick={handleSetLink}
      >
        <span
          className={clsx(
            "p-1.5 rounded-lg text-3xl transition-all duration-300 group-hover:bg-blue-800 group-hover:text-white",
            activeIcon && "bg-blue-800 text-white",
            activePath && "bg-blue-800 text-white"
          )}
        >
          {item.icon}
        </span>
        <span
          className={clsx(
            "transition-all duration-300 text-lg font-semibold group-hover:text-blue-800",
            activeIcon && "text-blue-800",
            activePath && "text-blue-800"
          )}
        >
          {item.label}
        </span>
        <span>
          <IoIosArrowDown />
        </span>
      </div>
      {subLinkVisible && (
        <div className="flex flex-col items-start w-full gap-2 mt-5">
          {item.subLinks.map((subLink) => (
            <Link
              className="text-[15px] ml-2.5 font-semibold hover:text-blue-800"
              key={subLink.label}
              href={subLink.link}
              onClick={handleVisibility}
            >
              {subLink.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  ) : (
    <Link
      key={item.label}
      href={item.link}
      onClick={handleVisibility}
      className={clsx(
        "flex items-center w-full rounded-md group transition-all duration-500 justify-start gap-4"
      )}
    >
      <span
        className={clsx(
          "p-1.5 rounded-lg text-3xl transition-all duration-300 group-hover:bg-blue-800 group-hover:text-white",
          activePath && "bg-blue-800 text-white"
        )}
      >
        {item.icon}
      </span>
      <span
        className={clsx(
          "transition-all duration-300 text-lg font-semibold group-hover:text-blue-800",
          activePath && "text-blue-800 font-semibold"
        )}
      >
        {item.label}
      </span>
    </Link>
  );
};

export default MobNavLink;
