"use client";

import React, { useState, useRef } from "react";
import ElButton from "../custom/ElButton";
import ElSelect from "../custom/ElSelect";
import CustomSpinner from "../custom/Spinner";
import {
  createTemplate,
  deleteTemplate,
  updateTemplate,
} from "@/lib/actions/actions.templates";
import { toast } from "react-toastify";
import { CgTemplate } from "react-icons/cg";
import { BsCardText } from "react-icons/bs";
import { PiMagnifyingGlass } from "react-icons/pi";
import GoBackButton from "../Global/GoBackButton";
import ElInput from "../custom/ElInput";
import ElTextarea from "../custom/ElTextarea";
import { TemplateType } from "@/types";
import { useRouter } from "next/navigation";
import DeletePasswordBtn from "../DeletePasswordBtn";

const tags = ["###NUM_DOCUMENT###", "###PRENOM###", "###NOM###", "###DATE###"];

const replacements = {
  "###NUM_DOCUMENT###": "12345",
  "###PRENOM###": "Julien",
  "###NOM###": "Dozinel",
  "###DATE###": new Date().toLocaleDateString("fr-FR"), // ex: 25/08/2025
};

type Props =
  | { updatePage: true; templateData: TemplateType }
  | { updatePage: false; templateData?: never };

const TemplateForm = ({ updatePage, templateData }: Props) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState(() => ({
    type: updatePage ? templateData.type : "",
    subject: updatePage ? templateData.subject : "",
    content: updatePage ? templateData.content : "",
  }));

  // Refs pour gérer le curseur actif
  const subjectRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const [activeField, setActiveField] = useState<"subject" | "content" | null>(
    null
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const insertTag = (tag: string) => {
    if (activeField === "subject" && subjectRef.current) {
      const input = subjectRef.current;
      const start = input.selectionStart ?? 0;
      const end = input.selectionEnd ?? 0;
      const newValue =
        formData.subject?.slice(0, start) + tag + formData.subject?.slice(end);
      setFormData((prev) => ({ ...prev, subject: newValue }));
      setTimeout(() => {
        input.setSelectionRange(start + tag.length, start + tag.length);
        input.focus();
      }, 0);
    }

    if (activeField === "content" && contentRef.current) {
      const textarea = contentRef.current;
      const start = textarea.selectionStart ?? 0;
      const end = textarea.selectionEnd ?? 0;
      const newValue =
        formData.content?.slice(0, start) + tag + formData.content?.slice(end);
      setFormData((prev) => ({ ...prev, content: newValue }));
      setTimeout(() => {
        textarea.setSelectionRange(start + tag.length, start + tag.length);
        textarea.focus();
      }, 0);
    }
  };

  const replaceTags = (text: string) => {
    let result = text;
    for (const key in replacements) {
      result = result.replaceAll(
        key,
        replacements[key as keyof typeof replacements]
      );
    }
    return result;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    try {
      const result = updatePage
        ? await updateTemplate(formData, String(templateData.id))
        : await createTemplate(formData);
      if (result.success) {
        toast.success(`${updatePage ? "Modifié" : "Ajouté"} avec succès.`);
        router.push("/template");
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
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 w-full">
      {/* Formulaire */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between w-full lg:w-2/3 bg-white dark:bg-gray-950 p-6 lg:p-10 rounded-md"
      >
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-semibold">
            {updatePage ? "Modifer" : "Créer"} une template
          </h1>

          {!updatePage && (
            <ElSelect
              name="type"
              value={formData.type}
              onChange={handleChange}
              icon={<CgTemplate className="text-blue-700" />}
            >
              <option value="" disabled>
                Choisir l'option
              </option>
              <option value="sms">SMS</option>
              <option value="mail">Email</option>
            </ElSelect>
          )}

          <ElInput
            name="subject"
            type="text"
            placeholder="Objet"
            value={formData.subject}
            onChange={handleChange}
            onFocus={() => setActiveField("subject")}
            ref={subjectRef}
            icon={<PiMagnifyingGlass className="text-blue-700" />}
          />

          <ElTextarea
            name="content"
            classNames="max-sm:h-52!"
            placeholder="Contenu"
            value={formData.content}
            onChange={handleChange}
            onFocus={() => setActiveField("content")}
            ref={contentRef}
            icon={<BsCardText className="text-blue-700" />}
          />

          {/* Boutons tags */}
          <div className="flex flex-col md:flex-row md:flex-wrap gap-2 mt-4">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => insertTag(tag)}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 rounded text-sm"
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="flex justify-center gap-5 mt-6">
            <ElButton
              label={updatePage ? "Modifier" : "Ajouter"}
              type="submit"
              classNames="self-center w-2/3 lg:w-1/4"
              disabled={isPending}
              icon={isPending ? <CustomSpinner /> : undefined}
            />
            {updatePage && (
              <DeletePasswordBtn
                id={String(templateData.id)}
                customAction={() => deleteTemplate(String(templateData.id))}
                pushLink="/template"
              />
            )}
          </div>
        </div>
        <GoBackButton link="/template" />
      </form>

      {/* Aperçu */}
      <div className="flex-1 bg-gray-50 dark:bg-gray-950 p-6 rounded-md border">
        <h2 className="text-lg font-semibold mb-4">Aperçu</h2>
        {formData.type && (
          <p className="mb-2 text-sm text-gray-600 dark:text-gray-200">
            Type : <span className="font-medium">{formData.type}</span>
          </p>
        )}
        <h3 className="text-xl font-bold">
          {replaceTags(formData?.subject) || "Titre de l’aperçu"}
        </h3>
        <p className="mt-2 text-gray-700 dark:text-gray-300 whitespace-pre-line">
          {replaceTags(formData?.content) || "Votre contenu apparaîtra ici..."}
        </p>
      </div>
    </div>
  );
};

export default TemplateForm;
