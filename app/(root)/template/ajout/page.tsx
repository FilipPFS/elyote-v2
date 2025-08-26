import TemplateForm from "@/components/Templates/TemplateForm";
import React from "react";

const Template = () => {
  return (
    <div className="flex items-center justify-center flex-1 px-4 py-6 md:px-20">
      <TemplateForm updatePage={false} />
    </div>
  );
};

export default Template;
