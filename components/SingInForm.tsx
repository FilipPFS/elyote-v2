"use client";

import React, { useActionState, useEffect } from "react";
import ElInput from "./custom/ElInput";
import ElButton from "./custom/ElButton";
import { signIn } from "@/lib/actions/actions.global";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SingInForm = () => {
  const [state, action, isPending] = useActionState(signIn, {
    success: false,
    error: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push("/");
      toast.success("Connexion réussi.");
    }
    if (state.error) {
      toast.error(`Erreur: ${state.error.toString()}`);
    }
  }, [state, router]);

  return (
    <form action={action}>
      <ElInput type="text" placeholder="Username" name="username" />
      <ElInput type="text" placeholder="User ID" name="user_id" />
      <ElInput type="password" placeholder="Password" name="password" />
      <ElButton label="Submit" type="submit" disabled={isPending} />
    </form>
  );
};

export default SingInForm;
