import { TemplateType } from "@/types";
import Link from "next/link";
import React from "react";
import { FaRegEdit } from "react-icons/fa";

type Props = {
  template: TemplateType;
};

const TemplateCard = ({ template }: Props) => {
  return (
    <div className="bg-gray-50 relative shadow-md rounded-md p-4 pt-6 flex flex-col gap-2">
      <h3 className="text-lg font-bold">Objet: {template.subject}</h3>
      <p>Contenu: {template.content}</p>
      <Link href={""} className="absolute top-1.5 right-1.5">
        <button className="cursor-pointer">
          <FaRegEdit size={15} />
        </button>
      </Link>
    </div>
  );
};

export default TemplateCard;
