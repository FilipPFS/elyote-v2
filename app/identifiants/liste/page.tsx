import MainPage from "@/components/Mobile/MainPage";
import MobileCard from "@/components/Mobile/MobileCard";
import TableExample from "@/components/TableExample";
import { TableCell, TableRow } from "@/components/ui/table";
import { passwordTableHeaders } from "@/constants";
import { getPasswords } from "@/lib/actions";
import { accessLevel } from "@/lib/utils";
import { PasswordData } from "@/types";
import Link from "next/link";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const IdentifiantsListe = async () => {
  const data: { passwords: PasswordData[] } = await getPasswords();
  const passwords = data?.passwords;

  return (
    <MainPage title="Gestion D'identifiants">
      <TableExample
        tableHeaders={passwordTableHeaders}
        headerClassnames="w-1/4"
        tableBody={
          <>
            {passwords && passwords.length > 0 ? (
              <>
                {passwords.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.site}</TableCell>
                    <TableCell>{item.login}</TableCell>
                    <TableCell>{accessLevel(item.access_level)}</TableCell>
                    <TableCell>
                      <Link href={`/cmd/cahier/${item.id}`}>Voir Détails</Link>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <>
                <TableRow>
                  <TableCell>Données non disponible.</TableCell>
                </TableRow>
              </>
            )}
          </>
        }
      />
      <div className="lg:hidden flex flex-col gap-3">
        {passwords && passwords.length > 0 ? (
          <>
            {passwords.map((item) => (
              <MobileCard key={item.id}>
                <div className="flex flex-col gap-3">
                  <section className="flex justify-between items-center">
                    <h2>{item.site}</h2>
                    <Link href={`/identifiants/liste/${item.id}`}>
                      <MdKeyboardArrowRight size={20} />
                    </Link>
                  </section>
                  <section className="flex justify-between items-center">
                    <span>
                      Login: <span className="font-semibold">{item.login}</span>
                    </span>
                    <span>
                      Accès:{" "}
                      <span className="font-semibold">
                        {accessLevel(item.access_level)}
                      </span>
                    </span>
                  </section>
                </div>
              </MobileCard>
            ))}
          </>
        ) : (
          <>
            <p>Données non disponible.</p>
          </>
        )}
      </div>
    </MainPage>
  );
};

export default IdentifiantsListe;
