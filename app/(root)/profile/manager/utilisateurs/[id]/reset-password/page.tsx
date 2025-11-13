import React from "react";
import { getStoreCode } from "@/lib/actions/actions.global";
import {
  extractRoleFromToken,
  getUserDataById,
} from "@/lib/actions/actions.user";
import { Customer, User } from "@/types";
import { redirect } from "next/navigation";
import ChangeUserPassword from "@/components/Auth/ChangeUserPassword";

type Props = {
  params: Promise<{ id: string }>;
};

const ResetPassword = async ({ params }: Props) => {
  const { id } = await params;

  console.log("ID", id);

  const [userData, storeCode, myRole] = await Promise.all([
    getUserDataById(id),
    getStoreCode(),
    extractRoleFromToken(),
  ]);

  if (!userData || !userData.user || !userData.customers || !myRole) {
    return <div>Not available.</div>;
  }

  const user: User = userData.user;

  console.log("USER ROLE", user.role);
  console.log("MY ROLE", myRole);

  const customers: Customer[] = userData.customers;
  const customerIds = customers.map((c) => c.id);

  const roleHierarchy: Record<string, number> = {
    user: 0,
    manager: 1,
    director: 2,
    superadmin: 3,
  };

  const canEdit =
    roleHierarchy[myRole] > roleHierarchy[user.role ?? "user"] ||
    user.role === "user";

  console.log("CAN EDIT", canEdit);

  const storeId = Number(storeCode);

  if (!customerIds.includes(storeId) || !canEdit) {
    redirect("/profile/manager/utilisateurs");
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl">
        Modifier le mot de passe de :{" "}
        <span className="font-semibold">{user.username}</span>
      </h2>
      <ChangeUserPassword username={user.username} />
    </div>
  );
};

export default ResetPassword;
