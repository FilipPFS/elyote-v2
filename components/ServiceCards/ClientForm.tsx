"use client";

import { GoPerson } from "react-icons/go";
import { MdOutlineBusiness, MdEmail, MdPhone } from "react-icons/md";
import { LuInfo } from "react-icons/lu";
import GoBackButton from "../Global/GoBackButton";
import CustomSpinner from "../custom/Spinner";
import ElButton from "../custom/ElButton";
import ElTextarea from "../custom/ElTextarea";
import ElInput from "../custom/ElInput";
import clsx from "clsx";
import { InfoIcon } from "lucide-react";
import { ClientFormState } from "@/lib/actions/services/actions.clients";

type CustomerData = {
  societe?: string;
  nom?: string;
  prenom?: string;
  email?: string;
  telephone?: string;
  commentaire?: string;
  code_contact?: number;
};

type Props = {
  isPending?: boolean;
  action?: (payload: FormData) => void;
  updatePage: boolean;
  customerData?: CustomerData;
  id?: string;
  state: ClientFormState;
};

const ClientForm = ({ action, isPending, updatePage, id, state }: Props) => {
  console.log("CLIENT FORM", state);

  return (
    <form
      action={action}
      className="flex flex-col justify-between gap-8 w-full rounded-md "
    >
      <div className="flex flex-col gap-4 ">
        {!updatePage && (
          <h1 className="text-xl font-semibold">
            {updatePage ? "Modifier un client" : "Ajouter un client"}
          </h1>
        )}
        {updatePage && (
          <div className="flex items-center mb-3 gap-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
            <InfoIcon className="w-5 h-5" />
            Informations du client
          </div>
        )}

        {/* Société */}
        <ElInput
          name="societe"
          placeholder="Société"
          defaultValue={state.data?.societe ?? ""}
          icon={<MdOutlineBusiness className="text-blue-700" />}
        />

        {/* Nom / Prénom */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-7">
          <ElInput
            name="nom"
            placeholder="Nom"
            defaultValue={state.data?.nom ?? ""}
            icon={<GoPerson className="text-blue-700" />}
          />
          <ElInput
            name="prenom"
            placeholder="Prénom"
            defaultValue={state.data?.prenom ?? ""}
            icon={<GoPerson className="text-blue-700" />}
          />
        </div>

        {/* Email / Téléphone */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-7">
          <ElInput
            name="email"
            placeholder="Adresse email"
            defaultValue={state.data?.email ?? ""}
            icon={<MdEmail className="text-blue-700" />}
          />
          <ElInput
            name="telephone"
            placeholder="Téléphone"
            defaultValue={state.data?.telephone ?? ""}
            icon={<MdPhone className="text-blue-700" />}
          />
        </div>

        {/* Code Contact */}
        <ElInput
          name="code_contact"
          placeholder="Code contact"
          defaultValue={state.data?.code_contact ?? ""}
          icon={<MdOutlineBusiness className="text-blue-700" />}
        />

        {/* Commentaire */}
        <ElTextarea
          name="commentaire"
          placeholder="Commentaire"
          defaultValue={state.data?.commentaire ?? ""}
          icon={<LuInfo className="text-blue-700" />}
        />

        {/* Hidden input pour l’ID si update */}
        {updatePage && id && (
          <input type="hidden" name="id" defaultValue={id} />
        )}
      </div>

      {/* Boutons */}
      <div
        className={clsx(
          "flex gap-5",
          updatePage ? "justify-start" : "justify-center"
        )}
      >
        <ElButton
          label={updatePage ? "Modifier" : "Ajouter"}
          type="submit"
          disabled={isPending}
          icon={isPending ? <CustomSpinner /> : undefined}
          classNames="self-center w-2/3 lg:w-1/4"
        />
      </div>

      {!updatePage && <GoBackButton link="/cartes-copies/liste" />}
    </form>
  );
};

export default ClientForm;
