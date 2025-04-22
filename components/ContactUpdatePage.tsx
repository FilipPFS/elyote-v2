"use client";

import { ContactData } from "@/types";
import React, { useActionState, useEffect } from "react";
import ContactForm from "./ContactForm";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { updateContact } from "@/lib/actions/actions.contacts";

type Props = {
  contactData: ContactData;
};

const ContactUpdatePage = ({ contactData }: Props) => {
  const [state, action, isPending] = useActionState(updateContact, {});
  const router = useRouter();

  useEffect(() => {
    const { errors } = state;

    if (state.success) {
      router.push("/repertoire/liste");
      toast.success(`Modifié avec succès.`);
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
    <ContactForm
      updatePage={true}
      contactData={contactData}
      isPending={isPending}
      action={action}
      id={String(contactData.id)}
    />
  );
};

export default ContactUpdatePage;
