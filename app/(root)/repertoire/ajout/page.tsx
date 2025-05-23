"use client";

import ContactForm from "@/components/ContactForm";
import { addNewContact } from "@/lib/actions/actions.contacts";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

const RepertoireAjout = () => {
  const [state, action, isPending] = useActionState(addNewContact, {});
  const router = useRouter();

  useEffect(() => {
    const { errors } = state;

    if (state.success) {
      router.push("/repertoire/liste");
      toast.success("Ajouté avec succès.");
    }
    if (state.error) {
      toast.error(`${state.error.toString()}`, {
        className: "bg-amber-700 text-white",
      });
    }
    if (errors) {
      for (const key in errors) {
        const messages = errors[key];
        if (Array.isArray(messages)) {
          messages.forEach((msg) =>
            toast.error(msg, {
              className: "bg-amber-700 text-white",
            })
          );
        }
      }
    }
  }, [state, router]);

  return (
    <div className="flex-grow max-sm:p-5 py-6 flex justify-center">
      <ContactForm updatePage={false} action={action} isPending={isPending} />
    </div>
  );
};

export default RepertoireAjout;
