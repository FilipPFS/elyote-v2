import ResetMyPassword from "@/components/Auth/ResetMyPassword";
import { extractUsernameFromToken } from "@/lib/actions/actions.user";
import React from "react";

const ResetPassword = async () => {
  const username = await extractUsernameFromToken();

  if (!username) throw new Error("Username indisponible.");
  return (
    <div>
      <ResetMyPassword username={username} />
    </div>
  );
};

export default ResetPassword;
