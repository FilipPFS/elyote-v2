"use client";

import { TemplateType } from "@/types";
import ElSelect from "../custom/ElSelect";
import ElInput from "../custom/ElInput";
import ElTextarea from "../custom/ElTextarea";
import ElButton from "../custom/ElButton";
import { BsCardText } from "react-icons/bs";
import { PiMagnifyingGlass } from "react-icons/pi";
import { CgTemplate } from "react-icons/cg";
import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { MdOutlineMail, MdOutlinePhone } from "react-icons/md";
import { toast } from "react-toastify";
import { sendMail } from "@/lib/actions/communication.actions";
import CustomSpinner from "../custom/Spinner";

type Props = {
  mails: TemplateType[];
};

const MailForm = ({ mails }: Props) => {
  const [formData, setFormData] = useState(() => ({
    templateId: "",
    subject: "",
    content: "",
    firstName: "",
    lastName: "",
    email: "",
    operator: "",
  }));
  const [isPending, setIsPending] = useState(false);

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
      const selectedMail = mails.find(
        (mail) => String(mail.id) === formData.templateId
      );
      if (selectedMail) {
        setFormData((prev) => ({
          ...prev,
          subject: selectedMail.subject,
          content: selectedMail.content,
        }));
      }
    }
  }, [formData.templateId, mails]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const result = await sendMail(formData);
      if (result.success) {
        toast.success(`Envoyé avec succès.`);
        setFormData({
          templateId: "",
          subject: "",
          content: "",
          firstName: "",
          lastName: "",
          email: "",
          operator: "",
        });
      } else if (result.errors) {
        for (const key in result.errors) {
          const messages = result.errors[key];
          if (Array.isArray(messages)) {
            messages.forEach((msg) =>
              toast.error(msg, {
                className: "bg-amber-700 text-white",
              })
            );
          }
        }
      } else if (result.error) {
        toast.error(result.error.toString(), {
          className: "bg-amber-700 text-white",
        });
      }
    } catch (err) {
      console.log(err);
      toast.error("Une erreur est survenue.");
    } finally {
      setIsPending(false);
    }

    console.log("submitted", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-between w-full lg:w-2/3 bg-white dark:bg-gray-950 p-6 lg:p-10 rounded-md"
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold">Envoyer un mail</h1>
        <ElSelect
          name="templateId"
          value={formData.templateId}
          onChange={handleChange}
          icon={<CgTemplate className="text-blue-700" />}
        >
          <option value="" disabled>
            Choisir le model
          </option>
          {mails.map((mail) => (
            <option key={mail.id} value={mail.id}>
              {mail.subject}
            </option>
          ))}
        </ElSelect>

        <ElInput
          name="subject"
          type="text"
          placeholder="Objet"
          value={formData.subject}
          onChange={handleChange}
          icon={<PiMagnifyingGlass className="text-blue-700" />}
        />

        <ElTextarea
          name="content"
          classNames="max-sm:h-52!"
          placeholder="Contenu"
          value={formData.content}
          onChange={handleChange}
          icon={<BsCardText className="text-blue-700" />}
        />

        <h2 className="font-semibold italic">
          La signature s'ajoute automatiquement lors de l'envoi du mail.
        </h2>

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
          name="email"
          type="text"
          placeholder="Email"
          value={formData.email}
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
            disabled={isPending}
            icon={isPending ? <CustomSpinner /> : undefined}
          />
        </div>
      </div>
    </form>
  );
};

export default MailForm;
