import SingInForm from "@/components/SingInForm";
import React from "react";

const SignIn = async () => {
  return (
    <div className="flex min-h-screen justify-center items-center px-4">
      <div className="flex flex-col gap-3 items-center bg-white dark:bg-gray-950 p-4 sm:py-8 lg:px-14 rounded-md w-full sm:w-1/2 lg:w-1/3">
        <h1 className="text-2xl font-semibold">Connexion</h1>
        <SingInForm />
      </div>
    </div>
  );
};

export default SignIn;
