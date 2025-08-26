import TemplateForm from "@/components/Templates/TemplateForm";
import { getTemplateById } from "@/lib/actions/actions.templates";
import { TemplateType } from "@/types";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const TemplateId = async ({ params }: Props) => {
  const { id } = await params;

  const template: TemplateType = await getTemplateById(id);

  console.log("template", template);

  if (!template) return <div>Aucune template disponible avec l'id: {id}</div>;

  return (
    <div className="flex items-center justify-center flex-1 px-4 py-6 md:px-20">
      <TemplateForm templateData={template} updatePage={true} />
    </div>
  );
};

export default TemplateId;
