"use client";

import Link from "next/link";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import React, { Dispatch, JSX, SetStateAction } from "react";
import { IoIosArrowDown } from "react-icons/io";

type Props = {
  item: {
    link: string;
    labelKey: string;
    subLinks: {
      labelKey: string;
      link: string;
    }[];
    icon: JSX.Element;
  };
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  activeSubmenu: string | null;
  setActiveSubmenu: Dispatch<SetStateAction<string | null>>;
};

const MobNavLink = ({
  item,
  setIsVisible,
  activeSubmenu,
  setActiveSubmenu,
}: Props) => {
  const pathname = usePathname();
  const firstSegment = `/${pathname.split("/")[1]}`;
  const activePath = pathname === item.link || firstSegment === item.link;

  const isOpen = activeSubmenu === item.labelKey;

  const tGlobal = useTranslations("global");
  const t = (key: string) => tGlobal(`sidebar.${key}`);

  const handleSetLink = () => {
    setActiveSubmenu(isOpen ? null : item.labelKey);
  };

  const handleVisibility = () => {
    setIsVisible(false);
    setActiveSubmenu(null);
  };

  return item.subLinks.length > 0 ? (
    <div className="relative w-full flex flex-col items-center">
      <div
        key={item.labelKey}
        className={clsx(
          "flex items-center w-full rounded-md group transition-all duration-500 cursor-pointer justify-start gap-4"
        )}
        onClick={handleSetLink}
      >
        <span
          className={clsx(
            "p-1.5 rounded-lg text-3xl transition-all duration-300 group-hover:bg-blue-800 group-hover:text-white",
            isOpen && "bg-blue-800 text-white",
            activePath && "bg-blue-800 text-white"
          )}
        >
          {item.icon}
        </span>
        <span
          className={clsx(
            "transition-all duration-300 text-lg font-semibold group-hover:text-blue-800",
            isOpen && "text-blue-800",
            activePath && "text-blue-800"
          )}
        >
          {t(item.labelKey)}
        </span>
        <span>
          <IoIosArrowDown
            className={clsx("transition-transform", isOpen && "rotate-180")}
          />
        </span>
      </div>
      {isOpen && (
        <div className="flex flex-col items-start w-full gap-2 mt-5">
          {item.subLinks.map((subLink) => (
            <Link
              className="text-[15px] ml-2.5 font-semibold hover:text-blue-800"
              key={subLink.labelKey}
              href={subLink.link}
              onClick={handleVisibility}
            >
              {t(subLink.labelKey)}
            </Link>
          ))}
        </div>
      )}
    </div>
  ) : (
    <Link
      key={item.labelKey}
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
        {t(item.labelKey)}
      </span>
    </Link>
  );
};

export default MobNavLink;
