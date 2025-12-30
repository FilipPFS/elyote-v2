"use client";

import { ServiceClient } from "@/app/(root)/cartes-copies/liste/page";
import ClientForm from "@/components/ServiceCards/ClientForm";
import { updateClient } from "@/lib/actions/services/actions.clients";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

type Props = {
  id: string;
  clientData: ServiceClient;
};

const ServiceClientData = ({ clientData, id }: Props) => {
  const updateClientWithId = updateClient.bind(null, id);

  const [state, action, isPending] = useActionState(updateClientWithId, {});
  const router = useRouter();

  useEffect(() => {
    const { errors } = state;

    if (state.success) {
      router.push("/cartes-copies/liste");
      toast.success("Success.");
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
    <ClientForm
      isPending={isPending}
      action={action}
      updatePage={true}
      customerData={clientData}
    />
  );
};

export default ServiceClientData;
