import MainPage from "@/components/Mobile/MainPage";
import MobileCard from "@/components/Mobile/MobileCard";
import Search from "@/components/Search";
import TableExample from "@/components/TableExample";
import { TableCell, TableRow } from "@/components/ui/table";
import { passwordTableHeaders } from "@/constants";
import { getPasswordsFromQuery } from "@/lib/actions/actions.password";
import { accessLevel } from "@/lib/utils";
import { PasswordData, SearchParamProps } from "@/types";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React, { Suspense } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const IdentifiantsListe = async ({ searchParams }: SearchParamProps) => {
  const awaitedSearchParams = await searchParams;
  const query = (awaitedSearchParams.query as string) || "";
  const data: { passwords: PasswordData[] } = await getPasswordsFromQuery(
    query
  );
  const passwords = data?.passwords;

  const t = await getTranslations("global.credentials");

  return (
    <MainPage
      title={t("title")}
      headerElement={
        <Suspense fallback={null}>
          <Search
            component="identifiants"
            placeholder={t("searchPlaceholder")}
            classNames="w-full sm:w-2/4"
          />
        </Suspense>
      }
    >
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
                    <TableCell>
                      {" "}
                      {t(`accessLevel.${accessLevel(item.access_level)}`)}
                    </TableCell>
                    <TableCell>
                      <Link href={`/identifiants/liste/${item.id}`}>
                        {t("seeDetails")}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <>
                <TableRow>
                  <TableCell>{t("noData")}</TableCell>
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
                      {t("login")}:{" "}
                      <span className="font-semibold">{item.login}</span>
                    </span>
                    <span>
                      {t("access")}:{" "}
                      <span className="font-semibold">
                        {t(`accessLevel.${accessLevel(item.access_level)}`)}
                      </span>
                    </span>
                  </section>
                </div>
              </MobileCard>
            ))}
          </>
        ) : (
          <>
            <p>{t("noData")}</p>
          </>
        )}
      </div>
    </MainPage>
  );
};

export default IdentifiantsListe;
