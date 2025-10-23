import CreateUserForm from "@/components/Profile/CreateUserForm";
import { extractRoleFromToken } from "@/lib/actions/actions.user";
import React from "react";

const CreateUser = async () => {
  const role = await extractRoleFromToken();

  console.log("role", role);

  if (!role) {
    return <p>Accès refusé</p>;
  }

  if (["director", "superadmin", "manager"].includes(role) === false) {
    return <p>Accès interdit</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <CreateUserForm role={role} />
    </div>
  );
};

export default CreateUser;
