import clsx from "clsx";
import Link from "next/link";
import React, { Dispatch, JSX, SetStateAction } from "react";
import { IoIosArrowDown } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";

type Props = {
  item: {
    link: string;
    label: string;
    subLinks: { label: string; link: string }[];
    icon: JSX.Element;
  };
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
  activeDropdown: string | null;
  setActiveDropdown: Dispatch<SetStateAction<string | null>>;
};

const NavLink = ({
  item,
  expanded,
  setExpanded,
  activeDropdown,
  setActiveDropdown,
}: Props) => {
  const pathname = usePathname();
  const firstSegment = `/${pathname.split("/")[1]}`;
  const activePath = pathname === item.link || firstSegment === item.link;
  const isDropdownOpen = activeDropdown === item.label;

  const handleSetLink = () => {
    setActiveDropdown(isDropdownOpen ? null : item.label); // Close if already open
  };

  const handleVisibility = () => {
    setActiveDropdown(null);
    setExpanded(false);
  };

  return item.subLinks.length > 0 ? (
    <div className="relative w-full flex flex-col items-center">
      <div
        key={item.label}
        className={clsx(
          "flex items-center w-full rounded-md group transition-all duration-500 cursor-pointer",
          expanded ? "justify-start gap-4" : "justify-center"
        )}
        onClick={handleSetLink}
      >
        {!expanded ? (
          <DropdownMenu open={isDropdownOpen} onOpenChange={handleSetLink}>
            <DropdownMenuTrigger
              className={clsx(
                "p-1.5 hidden sm:block flex-shrink-0 rounded-lg text-xl transition-all duration-300 group-hover:bg-blue-800 group-hover:text-white",
                isDropdownOpen && "bg-blue-800 text-white",
                activePath && "bg-blue-800 text-white"
              )}
            >
              {item.icon}
            </DropdownMenuTrigger>
            <DropdownMenuContent
              sideOffset={-36}
              className="bg-white border-none ml-20 p-3"
            >
              <div className="flex flex-col gap-3">
                {item.subLinks.map((subLink) => (
                  <Link
                    className="text-[11px] font-bold transition-all duration-500 hover:text-blue-800"
                    key={subLink.label}
                    href={subLink.link}
                  >
                    {subLink.label}
                  </Link>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <span
            className={clsx(
              "p-1.5 flex-shrink-0 rounded-lg text-xl transition-all duration-300 group-hover:bg-blue-800 group-hover:text-white",
              isDropdownOpen && "bg-blue-800 text-white",
              activePath && "bg-blue-800 text-white"
            )}
          >
            {item.icon}
          </span>
        )}
        <span
          className={clsx(
            "transition-all duration-300 text-sm whitespace-nowrap overflow-hidden",
            expanded ? "opacity-100 w-auto" : "opacity-0 w-0",
            isDropdownOpen && "text-blue-800 font-semibold",
            activePath && "text-blue-800 font-semibold",
            "group-hover:text-blue-800 group-hover:font-semibold"
          )}
        >
          {item.label}
        </span>
        {expanded && (
          <IoIosArrowDown
            className={clsx(
              "transition-transform",
              isDropdownOpen && "rotate-180"
            )}
          />
        )}
      </div>
      {isDropdownOpen && expanded && (
        <div className="flex flex-col items-start w-full gap-2 mt-5">
          {item.subLinks.map((subLink) => (
            <Link
              className="text-[12px] ml-2.5 font-semibold hover:text-blue-800"
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
        "flex items-center w-full rounded-md group transition-all duration-500",
        expanded ? "justify-start gap-4" : "justify-center"
      )}
    >
      <span
        className={clsx(
          "p-1.5 flex-shrink-0 rounded-lg text-xl transition-all duration-300 group-hover:bg-blue-800 group-hover:text-white",
          activePath && "bg-blue-800 text-white"
        )}
      >
        {item.icon}
      </span>
      <span
        className={clsx(
          "transition-all duration-300 text-sm whitespace-nowrap overflow-hidden",
          expanded ? "opacity-100 w-auto" : "opacity-0 w-0",
          activePath && "text-blue-800 font-semibold",
          "group-hover:text-blue-800"
        )}
      >
        {item.label}
      </span>
    </Link>
  );
};

export default NavLink;
