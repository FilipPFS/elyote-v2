import GoNextButton from "@/components/Global/GoNextButton";
import MainPage from "@/components/Mobile/MainPage";
import TemplateCard from "@/components/Templates/TemplateCard";
import { getTemplates } from "@/lib/actions/actions.templates";
import { TemplateType } from "@/types";
import React from "react";
import { MdOutlineMail, MdOutlineSms } from "react-icons/md";

const Templates = async () => {
  const templates: { sms: TemplateType[]; mail: TemplateType[] } =
    await getTemplates();

  console.log("templates", templates);

  return (
    <MainPage
      headerElement={
        <GoNextButton label="Ajouter une template" link="/template/ajout" />
      }
      title="Template"
    >
      <div className="flex flex-col gap-5">
        <div className="flex md:flex-row flex-col justify-between gap-6">
          <section className="flex flex-col w-full md:w-1/2  gap-4">
            <h2 className="text-xl font-bold flex gap-2 items-center">
              <MdOutlineSms /> SMS
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-4">
              {templates.sms.length > 0 ? (
                <>
                  {templates.sms.map((template) => (
                    <TemplateCard key={template.id} template={template} />
                  ))}
                </>
              ) : (
                <p>Aucune template disponible</p>
              )}
            </div>
          </section>
          <section className="flex flex-col w-full md:w-1/2 gap-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <MdOutlineMail /> Mail
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-4 items-stretch">
              {templates.mail.length > 0 ? (
                <>
                  {templates.mail.map((template) => (
                    <TemplateCard key={template.id} template={template} />
                  ))}
                </>
              ) : (
                <p>Aucune template disponible</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </MainPage>
  );
};

export default Templates;
