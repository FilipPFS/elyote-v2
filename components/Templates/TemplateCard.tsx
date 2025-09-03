import { TemplateType } from "@/types";
import Link from "next/link";
import React from "react";
import { FaRegEdit } from "react-icons/fa";

type Props = {
  template: TemplateType;
};

const TemplateCard = ({ template }: Props) => {
  return (
    <Link
      href={`/template/${template.id}`}
      className="block h-full transition-all hover:scale-95 duration-300"
    >
      <div className="bg-gray-50 dark:bg-gray-800 relative shadow-md h-full rounded-md p-4 pt-6 flex flex-col gap-2">
        <h3 className="flex flex-col gap-0.5">
          <span className="font-semibold">Objet:</span>
          <span>{template.subject}</span>
        </h3>

        <p className="flex gap-0.5 flex-col">
          <span className="font-semibold">Contenu:</span>
          <span>
            {template.content.length > 50
              ? template.content.slice(0, 50) + "..."
              : template.content}
          </span>
        </p>
        <button className="cursor-pointer absolute top-1.5 right-1.5">
          <FaRegEdit size={15} />
        </button>
      </div>
    </Link>
  );
};

export default TemplateCard;
