"use client";

import React, { useActionState, useEffect } from "react";
import ElButton from "../custom/ElButton";
import ElInput from "../custom/ElInput";
import ElSelect from "../custom/ElSelect";
import { useRouter } from "next/navigation";
import CustomSpinner from "../custom/Spinner";
import { useTranslations } from "next-intl";
import ElTextarea from "../custom/ElTextarea";
import { createTemplate } from "@/lib/actions/actions.templates";
import { toast } from "react-toastify";
import { CgTemplate } from "react-icons/cg";
import { BsCardText } from "react-icons/bs";
import { PiMagnifyingGlass } from "react-icons/pi";
import GoBackButton from "../Global/GoBackButton";

const TemplateForm = () => {
  const [state, action, isPending] = useActionState(createTemplate, {});
  const router = useRouter();
  const tMaterial = useTranslations("material");

  useEffect(() => {
    const { errors } = state;

    if (state.success) {
      router.push("/template");
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
  }, [state, router, tMaterial]);

  return (
    <form
      action={action}
      className="flex flex-col justify-between w-full lg:w-2/3 bg-white p-6 lg:p-10 rounded-md "
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 ">
          <h1 className="text-xl font-semibold">Créer une template</h1>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-7">
            <ElSelect
              name="type"
              defaultValue={""}
              icon={<CgTemplate className="text-blue-700" />}
            >
              <option value={""} disabled>
                Choisir l'option
              </option>
              <option value={"sms"}>SMS</option>
              <option value={"mail"}>Email</option>
            </ElSelect>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-7">
            <ElInput
              name="subject"
              type="text"
              placeholder={"Objet"}
              icon={<PiMagnifyingGlass className="text-blue-700" />}
            />
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-7">
            <ElTextarea
              name="content"
              placeholder={"Contenu"}
              icon={<BsCardText className="text-blue-700" />}
            />
          </div>
        </div>
        <div className="flex justify-center gap-5">
          <ElButton
            label={"Ajouter"}
            type="submit"
            classNames="self-center w-2/3 lg:w-1/4"
            disabled={isPending}
            icon={isPending ? <CustomSpinner /> : undefined}
          />
        </div>
      </div>
      <GoBackButton link="/template" />
    </form>
  );
};

export default TemplateForm;
