import MainPage from "@/components/Mobile/MainPage";
import MobileCard from "@/components/Mobile/MobileCard";
import Search from "@/components/Search";
import TableExample from "@/components/TableExample";
import { TableCell, TableRow } from "@/components/ui/table";
import { passwordTableHeaders } from "@/constants";
import Link from "next/link";
import {
  getCredentials,
  getCredentialsFromQuery,
} from "@/lib/actions/actions.credentials";
import { accessLevel } from "@/lib/utils";
import { PasswordData, SearchParamProps } from "@/types";
import { getTranslations } from "next-intl/server";
import React, { Suspense } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import TableRowCustom from "@/components/Table/TableRowCustom";
import GoNextButton from "@/components/Global/GoNextButton";
import Pagination from "@/components/Global/Pagination";

const IdentifiantsListe = async ({ searchParams }: SearchParamProps) => {
  const awaitedSearchParams = await searchParams;
  let passwords: PasswordData[] = [];
  const page = Number(awaitedSearchParams.page) || 1;
  let totalPages = 1;

  const query = (awaitedSearchParams.query as string) || "";

  if (query) {
    const data: { passwords: PasswordData[] } = await getCredentialsFromQuery(
      query
    );
    passwords = data?.passwords;
  } else {
    const passwordData = await getCredentials({ limit: 6, page: page });
    if (passwordData) {
      passwords = passwordData.data.passwords;
      totalPages = passwordData.pagesNumber;
    }
  }

  const tCredentials = await getTranslations("credentials");
  const tGlobal = await getTranslations("global");

  return (
    <MainPage
      title={tCredentials("title")}
      headerElement={
        <Suspense fallback={null}>
          <Search
            component="identifiants"
            placeholder={tCredentials("searchPlaceholder")}
            classNames="w-full sm:w-2/4"
          />
        </Suspense>
      }
    >
      {query.length > 1 && (
        <span className="text-gray-500 font-semibold">
          {tGlobal("search.result")}: {query}
        </span>
      )}
      <GoNextButton link="/identifiants/ajout" label="Ajouter un identifiant" />
      <TableExample
        tableHeaders={passwordTableHeaders}
        translationsKey="credentials.headers"
        headerClassnames="w-1/4"
        tableBody={
          <>
            {passwords && passwords.length > 0 ? (
              <>
                {passwords.map((item) => (
                  <TableRowCustom
                    key={item.id}
                    href={`/identifiants/liste/${item.id}`}
                  >
                    <TableCell className="font-medium">{item.site}</TableCell>
                    <TableCell>{item.login}</TableCell>
                    <TableCell>
                      {" "}
                      {tCredentials(
                        `accessLevel.${accessLevel(item.access_level)}`
                      )}
                    </TableCell>
                    <TableCell>
                      <Link href={`/identifiants/liste/${item.id}`}>
                        {tCredentials("seeDetails")}
                      </Link>
                    </TableCell>
                  </TableRowCustom>
                ))}
              </>
            ) : (
              <>
                <TableRow>
                  <TableCell>{tCredentials("noData")}</TableCell>
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
                      {tCredentials("login")}:{" "}
                      <span className="font-semibold">{item.login}</span>
                    </span>
                    <span>
                      {tCredentials("access")}:{" "}
                      <span className="font-semibold">
                        {tCredentials(
                          `accessLevel.${accessLevel(item.access_level)}`
                        )}
                      </span>
                    </span>
                  </section>
                </div>
              </MobileCard>
            ))}
          </>
        ) : (
          <>
            <p>{tCredentials("noData")}</p>
          </>
        )}
      </div>
      <Pagination totalPages={totalPages} page={page} />
    </MainPage>
  );
};

export default IdentifiantsListe;
