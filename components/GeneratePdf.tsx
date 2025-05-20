"use client";

import { generatePdf } from "@/lib/actions/actions.global";
import { PdfType } from "@/types";
import { useState } from "react";
import CustomSpinner from "./custom/Spinner";

type Props = {
  pdfObject: PdfType;
};

const GeneratePdf = ({ pdfObject }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    content,
    template_name,
    template_id,
    template_title,
    resolution_dpi,
    type,
  } = pdfObject;

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const res = await generatePdf({
      content,
      template_name,
      template_id,
      template_title,
      resolution_dpi,
      type,
    });

    if (res.status === "success") {
      setIsSubmitting(false);
      window.open(res.url, "_blank");
    }
  };

  return (
    <button
      onClick={handleSubmit}
      disabled={isSubmitting}
      className="bg-green-600 w-fit disabled:bg-gray-500 flex items-center gap-2 text-sm font-semibold cursor-pointer transition-all duration-500 hover:bg-green-800 px-6 py-1 rounded-sm text-white"
    >
      {isSubmitting && <CustomSpinner />}
      Generate PDF
    </button>
  );
};

export default GeneratePdf;
