"use client";

import MaterialForm from "@/components/MaterialForm";
import { addMaterial } from "@/lib/actions/actions.material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

const ParcMaterielAjout = () => {
  const [state, action, isPending] = useActionState(addMaterial, {});
  const router = useRouter();
  const tMaterial = useTranslations("material");

  useEffect(() => {
    const { errors } = state;

    if (state.success) {
      router.push("/parc-materiel/liste");
      toast.success(tMaterial("zodValidation.addSuccess"));
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
  }, [state, router, tMaterial]);

  return (
    <div className="flex-grow max-sm:p-5 py-6 flex justify-center">
      <MaterialForm action={action} isPending={isPending} updatePage={false} />
    </div>
  );
};

export default ParcMaterielAjout;
