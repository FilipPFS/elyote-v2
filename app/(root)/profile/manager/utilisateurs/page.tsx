import GoNextButton from "@/components/Global/GoNextButton";
import TableRowCustom from "@/components/Table/TableRowCustom";
import TableExample from "@/components/TableExample";
import { TableCell, TableRow } from "@/components/ui/table";
import { usersTableHeaders } from "@/constants";
import { getAllUsers } from "@/lib/actions/actions.user";
import { User } from "@/types";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";

const Utilisateurs = async () => {
  const users: User[] = await getAllUsers();

  const tProfile = await getTranslations("profile");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl">Utilisateurs</h2>
        <GoNextButton
          label="Créer un utilisateur"
          link="/profile/manager/utilisateurs/create"
        />
      </div>
      <TableExample
        tableHeaders={usersTableHeaders}
        translationsKey="profile.headers"
        headerClassnames="w-1/4"
        tableBody={
          <>
            {users && users.length > 0 ? (
              <>
                {users.map((item) => (
                  <TableRowCustom
                    key={item.id}
                    href={`/profile/manager/utilisateurs/${item.id}`}
                  >
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.role}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>
                      <Link href={`/profile/manager/utilisateurs/${item.id}`}>
                        {tProfile("seeDetails")}
                      </Link>
                    </TableCell>
                  </TableRowCustom>
                ))}
              </>
            ) : (
              <>
                <TableRow>
                  <TableCell>{tProfile("noData")}</TableCell>
                </TableRow>
              </>
            )}
          </>
        }
      />
    </div>
  );
};

export default Utilisateurs;
