import PasswordUpdatePage from "@/components/PasswordUpdatePage";
import { getSinglePassword } from "@/lib/actions/actions.password";
import { PasswordData } from "@/types";
import Link from "next/link";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};
const IdentifiantsListeItem = async ({ params }: Props) => {
  const { id } = await params;

  const singlePasswordData: PasswordData | null = await getSinglePassword(id);

  if (!singlePasswordData) {
    return (
      <div>
        <h2>Identifiant non trouvé</h2>
        <p>Il semble que cet identifiant ait été supprimé.</p>

        <Link href="/identifiants/liste">Retour à la liste</Link>
      </div>
    );
  }

  return (
    <div className="flex-grow max-sm:p-5 py-6 flex justify-center">
      <PasswordUpdatePage passwordData={singlePasswordData} />
    </div>
  );
};

export default IdentifiantsListeItem;
