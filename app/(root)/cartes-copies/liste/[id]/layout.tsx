import ClientPageNavigation from "@/components/ServiceCards/ClientPageNavigation";
import { getServiceClientById } from "@/lib/actions/services/actions.clients";
import Link from "next/link";

export default async function IdLayout({
  params,
  children,
}: {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}) {
  const { id } = await params;
  const clientData = await getServiceClientById(Number(id));

  if (!clientData || !clientData.client) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-85px)] px-4 text-center">
        <div className="max-w-md space-y-8">
          <div className="w-24 h-24 mx-auto rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400 dark:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
              Client non trouvé
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Le client avec l'ID{" "}
              <span className="font-mono font-bold">{id}</span> n'existe pas ou
              a été supprimé.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cartes-copies/liste"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
            >
              Retour à la liste
            </Link>
            <Link
              href="/"
              className="px-6 py-3 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors"
            >
              Accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { client } = clientData;

  return (
    <div className="p-4 md:p-10">
      <h1 className="text-xl md:text-2xl">
        Fiche client: {client.societe} {client.nom} - {client.id}
      </h1>
      <ClientPageNavigation id={id} />
      <div className="mt-8">{children}</div>
    </div>
  );
}
