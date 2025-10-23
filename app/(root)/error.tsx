"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <h1 className="text-3xl font-bold text-red-600 dark:text-red-500 mb-3">
        Oups ! Une erreur est survenue
      </h1>

      <p className="text-gray-700 dark:text-gray-300 mb-6">
        {error.message || "Erreur inconnue."}
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => reset()}
          className="px-6 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 transition-colors duration-200"
        >
          Réessayer
        </button>

        <Link
          href={"/"}
          className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold transition-colors duration-200"
        >
          Accueil
        </Link>
      </div>
    </div>
  );
}
