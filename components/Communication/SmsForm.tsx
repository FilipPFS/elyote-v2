"use client";

import { TemplateType } from "@/types";
import ElSelect from "../custom/ElSelect";
import ElInput from "../custom/ElInput";
import ElTextarea from "../custom/ElTextarea";
import ElButton from "../custom/ElButton";
import { BsCardText } from "react-icons/bs";
import { CgTemplate } from "react-icons/cg";
import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { MdOutlineMail, MdOutlinePhone } from "react-icons/md";

type Props = {
  sms: TemplateType[];
};

const SmsForm = ({ sms }: Props) => {
  const [formData, setFormData] = useState(() => ({
    templateId: "",
    content: "",
    firstName: "",
    lastName: "",
    phone: "",
    operator: "",
  }));

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 👇 Autofill subject & content when templateId changes
  useEffect(() => {
    if (formData.templateId) {
      const selectedMail = sms.find(
        (item) => String(item.id) === formData.templateId
      );
      if (selectedMail) {
        setFormData((prev) => ({
          ...prev,
          content: selectedMail.content,
        }));
      }
    }
  }, [formData.templateId, sms]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submitted", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-between w-full lg:w-2/3 bg-white dark:bg-gray-950 p-6 lg:p-10 rounded-md"
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold weight:font-bold">
          Envoyer un SMS
        </h1>
        <ElSelect
          name="templateId"
          value={formData.templateId}
          onChange={handleChange}
          icon={<CgTemplate className="text-blue-700" />}
        >
          <option value="" disabled>
            Choisir le model
          </option>
          {sms.map((item) => (
            <option key={item.id} value={item.id}>
              {item.subject}
            </option>
          ))}
        </ElSelect>
        <ElTextarea
          name="content"
          classNames="max-sm:h-52!"
          placeholder="Contenu"
          value={formData.content}
          onChange={handleChange}
          icon={<BsCardText className="text-blue-700" />}
        />
        <ElInput
          name="firstName"
          type="text"
          placeholder="Prénom"
          value={formData.firstName}
          onChange={handleChange}
          icon={<FiUser className="text-blue-700" />}
        />
        <ElInput
          name="lastName"
          type="text"
          placeholder="Nom"
          value={formData.lastName}
          onChange={handleChange}
          icon={<FiUser className="text-blue-700" />}
        />
        <ElInput
          name="phone"
          type="text"
          placeholder="Numéro (format 0102030405)"
          value={formData.phone}
          onChange={handleChange}
          icon={<MdOutlineMail className="text-blue-700" />}
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

export default SmsForm;
