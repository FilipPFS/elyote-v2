import SingInForm from "@/components/SingInForm";
import { getToken } from "@/lib/actions/actions.global";
import { redirect } from "next/navigation";
import React from "react";

const SignIn = async () => {
  const token = await getToken();

  if (token) redirect("/");
  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="flex flex-col gap-6 items-center bg-white p-7 lg:px-14 rounded-md sm:w-1/2 lg:w-1/3">
        <h1 className="text-2xl font-semibold">Connexion</h1>
        <SingInForm />
      </div>
    </div>
  );
};

export default SignIn;
