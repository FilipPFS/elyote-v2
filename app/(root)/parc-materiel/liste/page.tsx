import MainPage from "@/components/Mobile/MainPage";
import MobileCard from "@/components/Mobile/MobileCard";
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
  const materials = data.material;

  console.log("materials", materials);

  const tMaterial = await getTranslations("material");

  return (
    <MainPage title="Gestion de mon parc matériel">
      <TableExample
        tableHeaders={materialTableHeaders}
        translationsKey="material.tableHeaders"
        headerClassnames="w-1/4"
        tableBody={
          <>
            {materials && materials.length > 0 ? (
              <>
                {materials.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{formatType(item.type)}</TableCell>
                    <TableCell>{item.lend === 0 ? "Non" : "Oui"}</TableCell>
                    <TableCell>{item.rent === 0 ? "Non" : "Oui"}</TableCell>
                    <TableCell>
                      {item.state === 0 ? (
                        <FaXmark className="text-red-600" />
                      ) : (
                        <FaCheck />
                      )}
                    </TableCell>
                    <TableCell>
                      <Link href={`/repertoire/liste/${item.id}`}>
                        {tMaterial("tableHeaders.action")}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell>Données non disponibles.</TableCell>
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
                    <Link href={`/repertoire/liste/${item.id}`}>
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
            <p>Données non disponibles.</p>
          </>
        )}
      </div>
    </MainPage>
  );
};

export default ParcMaterielListe;
