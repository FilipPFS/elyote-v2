"use client";

import { MaterialData } from "@/types";
import React, { useActionState, useEffect } from "react";
import MaterialForm from "./MaterialForm";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { updateMaterial } from "@/lib/actions/actions.material";
import { useTranslations } from "next-intl";

type Props = {
  materialData: MaterialData;
};

const MaterialUpdatePage = ({ materialData }: Props) => {
  const [state, action, isPending] = useActionState(updateMaterial, {});
  const router = useRouter();
  const tMaterial = useTranslations("material");

  useEffect(() => {
    const { errors } = state;

    if (state.success) {
      router.push("/parc-materiel/liste");
      toast.success(tMaterial("zodValidation.updateSuccess"));
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
      <MaterialForm
        updatePage={true}
        materialData={materialData}
        action={action}
        isPending={isPending}
        id={String(materialData.id)}
      />
    </div>
  );
};

export default MaterialUpdatePage;
