"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface ClientPageNavigationProps {
  id: string;
}

const ClientPageNavigation = ({ id }: ClientPageNavigationProps) => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const basePath = `/cartes-copies/liste/${id}`;
  const fichePath = basePath;
  const historiquePath = `${basePath}/historique`;

  return (
    <nav className="border-b border-gray-200 dark:border-gray-800">
      <div className="flex space-x-8 max-w-3xl">
        <Link
          href={fichePath}
          className={`
            relative py-4 px-1 text-sm font-medium transition-all duration-200
            border-b-2
            ${
              isActive(fichePath)
                ? "text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400"
                : "text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-gray-100"
            }
          `}
        >
          Fiche client
          {/* Optional: subtle background glow on active */}
          {isActive(fichePath) && (
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 dark:bg-blue-400 opacity-30 blur-sm" />
          )}
        </Link>

        <Link
          href={historiquePath}
          className={`
            relative py-4 px-1 text-sm font-medium transition-all duration-200
            border-b-2
            ${
              isActive(historiquePath)
                ? "text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400"
                : "text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-gray-100"
            }
          `}
        >
          Historique
          {isActive(historiquePath) && (
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 dark:bg-blue-400 opacity-30 blur-sm" />
          )}
        </Link>
      </div>
    </nav>
  );
};

export default ClientPageNavigation;
