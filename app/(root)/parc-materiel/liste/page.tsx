import GoNextButton from "@/components/Global/GoNextButton";
import MainPage from "@/components/Mobile/MainPage";
import MobileCard from "@/components/Mobile/MobileCard";
import TableRowCustom from "@/components/Table/TableRowCustom";
import TableExample from "@/components/TableExample";
import { TableCell, TableRow } from "@/components/ui/table";
import { materialTableHeaders } from "@/constants";
import { getMaterials } from "@/lib/actions/actions.material";
import { formatType } from "@/lib/utils";
import { MaterialData } from "@/types";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";

const ParcMaterielListe = async () => {
  const data: { material: MaterialData[] } = await getMaterials();
  const materials = data?.material;
  const tMaterial = await getTranslations("material");
  const tGlobal = await getTranslations("global");

  return (
    <MainPage
      title={tMaterial("title")}
      headerElement={
        <div className="max-sm:w-full">
          <GoNextButton
            link="/parc-materiel/ajout"
            label="Ajouter un matériel"
          />
        </div>
      }
    >
      <TableExample
        tableHeaders={materialTableHeaders}
        translationsKey="material.tableHeaders"
        headerClassnames="w-1/4"
        tableBody={
          <>
            {materials && materials.length > 0 ? (
              <>
                {materials.map((item) => (
                  <TableRowCustom
                    key={item.id}
                    href={`/parc-materiel/liste/${item.id}`}
                  >
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      {tMaterial(`types.${formatType(item.type)}`)}
                    </TableCell>
                    <TableCell>
                      {item.lend === 0 ? tGlobal("no") : tGlobal("yes")}
                    </TableCell>
                    <TableCell>
                      {item.rent === 0 ? tGlobal("no") : tGlobal("yes")}
                    </TableCell>
                    <TableCell>
                      {item.state === 0 ? (
                        <FaXmark className="text-red-600" />
                      ) : (
                        <FaCheck />
                      )}
                    </TableCell>
                    <TableCell>
                      <Link href={`/parc-materiel/liste/${item.id}`}>
                        {tMaterial("tableHeaders.seeDetails")}
                      </Link>
                    </TableCell>
                  </TableRowCustom>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell>{tGlobal("dataNotAvailable")}</TableCell>
              </TableRow>
            )}
          </>
        }
      />

      <div className="lg:hidden flex flex-col gap-3">
        {materials && materials.length > 0 ? (
          <>
            {materials.map((item) => (
              <MobileCard key={item.id}>
                <div className="flex flex-col gap-3">
                  <section className="flex justify-between items-center">
                    <div>
                      <h2 className="font-semibold">ID: {item.id}</h2>
                    </div>
                    <Link href={`/parc-materiel/liste/${item.id}`}>
                      <MdKeyboardArrowRight size={20} />
                    </Link>
                  </section>
                  <section className="flex justify-between items-center">
                    <h3 className="font-semibold text-sm">{item.name}</h3>
                    <div className="text-[12px] flex gap-3 items-center">
                      <div className="flex items-center gap-2">
                        Prêt:
                        <span>
                          {item.lend === 0 ? (
                            <FaXmark className="text-red-600" />
                          ) : (
                            <FaCheck />
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        Location:
                        {item.rent === 0 ? (
                          <FaXmark className="text-red-600" />
                        ) : (
                          <FaCheck />
                        )}
                      </div>
                    </div>
                  </section>
                </div>
              </MobileCard>
            ))}
          </>
        ) : (
          <>
            <p>{tGlobal("dataNotAvailable")}</p>
          </>
        )}
      </div>
    </MainPage>
  );
};

export default ParcMaterielListe;
