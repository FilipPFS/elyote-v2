"use client";

import ElSelect from "../custom/ElSelect";
import ElInput from "../custom/ElInput";
import ElTextarea from "../custom/ElTextarea";
import ElButton from "../custom/ElButton";
import { BsCardText } from "react-icons/bs";
import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { MdOutlinePhone } from "react-icons/md";

const TelForm = () => {
  const [formData, setFormData] = useState(() => ({
    notAnswered: false,
    content: "",
    client: "",
    details_contact: "",
    operator: "",
  }));

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, type, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" && e.target instanceof HTMLInputElement
          ? e.target.checked // ✅ safe access
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submitted", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-between w-full lg:w-2/3 bg-white p-6 lg:p-10 rounded-md"
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold">
          Renseigner un appel téléphonique
        </h1>
        <label className="flex items-center gap-2">
          <input
            name="notAnswered"
            type="checkbox"
            checked={formData.notAnswered}
            onChange={handleChange}
          />
          <span className="text-gray-700">
            Cochez, si vous avez laissé un message sur le répondeur
          </span>
        </label>
        <ElTextarea
          name="content"
          classNames="max-sm:h-52!"
          placeholder="J'ai appelé le client, voici les détails"
          value={formData.content}
          onChange={handleChange}
          icon={<BsCardText className="text-blue-700" />}
        />
        <ElInput
          name="client"
          type="text"
          placeholder="Client"
          value={formData.client}
          onChange={handleChange}
          icon={<FiUser className="text-blue-700" />}
        />
        <ElInput
          name="details_contact"
          type="text"
          placeholder="Numéro du client"
          value={formData.details_contact}
          onChange={handleChange}
          icon={<FiUser className="text-blue-700" />}
        />
        <ElSelect
          name="operator"
          value={formData.operator}
          onChange={handleChange}
          icon={<MdOutlinePhone className="text-blue-700" />}
        >
          <option value="" disabled>
            Choisir l'operateur
          </option>
          <option value={"Test 1"}>Test 1</option>
          <option value={"Test 2"}>Test 2</option>
        </ElSelect>

        <div className="flex justify-center gap-5 mt-6">
          <ElButton
            label={"Envoyer"}
            type="submit"
            classNames="self-center w-2/3 lg:w-1/4"
            // disabled={isPending}
            // icon={isPending ? <CustomSpinner /> : undefined}
          />
        </div>
      </div>
    </form>
  );
};

export default TelForm;
