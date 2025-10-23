"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { MdOutlineLock } from "react-icons/md";

const userLinks = [
  { label: "Utilisateurs", href: "/profile/manager/utilisateurs" },
];

const AdminProfileSidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile dropdown button */}
      <div className="md:hidden w-full mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 shadow-sm"
        >
          <span className="font-semibold">Admin</span>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {isOpen && (
          <div className="mt-2 bg-white dark:bg-gray-950 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 p-3 flex flex-col gap-2">
            {userLinks.map((item) => {
              const activeTab = item.href === pathname;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg transition ${
                    activeTab
                      ? "bg-blue-600 dark:bg-gray-800 text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setIsOpen(false)} // close dropdown after click
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:block w-60 bg-white dark:bg-gray-950 rounded-2xl h-fit shadow-md p-4 border-r">
        <h2 className="text-lg font-semibold mb-4">Admin</h2>
        <nav className="flex flex-col gap-2">
          {userLinks.map((item) => {
            const activeTab = item.href === pathname;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-left flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                  activeTab
                    ? "bg-blue-600 dark:bg-gray-800 text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <span>
                  <MdOutlineLock />
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default AdminProfileSidebar;
