"use client";
import React, { useState } from "react";
import ElInput from "../custom/ElInput";
import ElButton from "../custom/ElButton";
import CustomSpinner from "../custom/Spinner";
import { toast } from "react-toastify";
import OtpModal from "./OtpModal";
import { forgotPassword } from "@/lib/actions/actions.user";

const ForgotPasswordForm = () => {
  const [username, setUsername] = useState("");
  const [success, setSuccess] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsPending(true);

    const res = await forgotPassword({
      username,
    });

    if (res.success) {
      setSuccess(true);
      setIsPending(false);
    } else {
      toast.error("Vous n'êtes pas autorisé à effectuer cette action.");
      setIsPending(false);
    }
  };

  return (
    <>
      {!success ? (
        <form className="flex flex-col w-full mt-3 gap-3" onSubmit={handleSave}>
          <ElInput
            placeholder="Identifiant"
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />

          <ElButton
            type="submit"
            disabled={!username}
            label="Confirmer"
            icon={isPending ? <CustomSpinner /> : undefined}
          />
        </form>
      ) : (
        <OtpModal username={username} />
      )}
    </>
  );
};

export default ForgotPasswordForm;
