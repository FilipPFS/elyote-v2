"use client";

import { generatePdf } from "@/lib/actions/actions.global";
import { PdfType } from "@/types";
import { useState } from "react";
import CustomSpinner from "./custom/Spinner";
import CustomModal from "./CustomModal";
import Spinner from "./Spinner";

type Props = {
  pdfObject: PdfType;
};

const GeneratePdf = ({ pdfObject }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [url, setUrl] = useState("");
  const {
    content,
    template_name,
    template_id,
    template_title,
    resolution_dpi,
    type,
    pdfType,
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
      pdfType,
    });

    if (res.status === "success") {
      setIsSubmitting(false);
      setUrl(res.url);
    }
  };

  return (
    <>
      <CustomModal
        classNames="md:max-w-[700px]!"
        customContent={
          <div className="h-[400px] flex items-center justify-center">
            {isSubmitting ? (
              <Spinner />
            ) : (
              <iframe src={`${url}#toolbar=1`} width="100%" height="400px" />
            )}
          </div>
        }
        title="Visualisation du PDF"
        jsxBtn={
          <div
            role="button"
            onClick={!isSubmitting ? handleSubmit : undefined}
            className="bg-green-600 w-fit disabled:bg-gray-500 flex items-center gap-2 text-sm font-semibold cursor-pointer transition-all duration-500 hover:bg-green-800 px-6 py-1 rounded-md text-white"
          >
            {isSubmitting && <CustomSpinner />}
            Generate PDF
          </div>
        }
      />
    </>
  );
};

export default GeneratePdf;
