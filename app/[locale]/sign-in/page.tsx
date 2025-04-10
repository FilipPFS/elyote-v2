import ElButton from "@/components/custom/ElButton";
import ElInput from "@/components/custom/ElInput";
import { getToken, signIn } from "@/lib/actions/actions.global";
import { redirect } from "next/navigation";

import React from "react";

const SignIn = async () => {
  const token = await getToken();

  if (token) redirect("/");
  return (
    <>
      <form action={signIn}>
        <ElInput type="text" placeholder="Username" name="username" />
        <ElInput type="text" placeholder="User ID" name="user_id" />
        <ElInput type="password" placeholder="Password" name="password" />
        <ElButton label="Submit" type="submit" />
      </form>
    </>
  );
};

export default SignIn;
