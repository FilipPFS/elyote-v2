import ContactUpdatePage from "@/components/ContactUpdatePage";
import { getContactById } from "@/lib/actions/actions.contacts";
import { ContactData } from "@/types";
import Link from "next/link";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const RepertoirePage = async ({ params }: Props) => {
  const { id } = await params;

  const singleContactData: ContactData = await getContactById(id);

  if (!singleContactData) {
    return (
      <div>
        <h2>Contact non trouvé</h2>
        <p>Il semble que cet Contact ait été supprimé.</p>

        <Link href="/repertoire/liste">Retour à la liste</Link>
      </div>
    );
  }

  return (
    <div className="flex-grow max-sm:p-5 py-6 flex justify-center">
      <ContactUpdatePage contactData={singleContactData} />
    </div>
  );
};

export default RepertoirePage;
