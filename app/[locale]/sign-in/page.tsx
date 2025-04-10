import SingInForm from "@/components/SingInForm";
import { getToken } from "@/lib/actions/actions.global";
import { redirect } from "next/navigation";
import React from "react";

const SignIn = async () => {
  const token = await getToken();

  if (token) redirect("/");
  return (
    <>
      <SingInForm />
    </>
  );
};

export default SignIn;
