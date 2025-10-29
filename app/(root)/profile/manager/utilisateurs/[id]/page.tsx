import UserProfileForm from "@/components/Profile/UserProfileForm";
import { getStoreCode } from "@/lib/actions/actions.global";
import {
  extractRoleFromToken,
  getUserDataById,
} from "@/lib/actions/actions.user";
import { Customer, User } from "@/types";
import { redirect } from "next/navigation";
import React from "react";
type Props = {
  params: Promise<{ id: string }>;
};

const UserPage = async ({ params }: Props) => {
  const { id } = await params;

  const userData = await getUserDataById(id);
  const user: User = userData?.user;
  const customers: Customer[] = userData?.customers;
  const role = await extractRoleFromToken();
  const customerIds = customers.map((c) => c.id);
  const storeCode = await getStoreCode();

  if (!customerIds.includes(Number(storeCode))) {
    redirect("/profile/manager/utilisateurs");
  }

  if (!user || !role || !customers) {
    return <div>Not available.</div>;
  }

  return (
    <div>
      <UserProfileForm
        initialUser={user}
        role={role}
        initialCustomers={customers}
        userId={id}
      />
    </div>
  );
};

export default UserPage;
