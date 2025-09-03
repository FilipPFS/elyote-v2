"use client";

import { generatePdf } from "@/lib/actions/actions.global";
import { Computer, PdfType, PrintSettings } from "@/types";
import { useState } from "react";
import CustomSpinner from "./custom/Spinner";
import { HiXMark } from "react-icons/hi2";
import Spinner from "./Spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ElButton from "./custom/ElButton";
import PrinterSelects from "./Printer/PrinterSelects";
import { toast } from "react-toastify";
import { sendPrintRequest } from "@/lib/actions/printer.actions";
import { RiArrowDownWideFill } from "react-icons/ri";
import clsx from "clsx";
import { useTranslations } from "next-intl";

type Props = {
  pdfObject: PdfType;
  printModule?: PrintSettings | undefined;
  printerList?: Computer[];
  rentalPage: boolean;
};

const GeneratePdf = ({
  pdfObject,
  printModule,
  printerList,
  rentalPage,
}: Props) => {
  const [printerOptionsVisible, setPrinterOptionsVisible] = useState(false);
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
  const tGlobal = useTranslations("global");
  const tPrinter = useTranslations("printer");

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

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const [selectedPrinter, setSelectedPrinter] = useState<string | undefined>(
    printModule?.computer_name && printModule?.printer_name
      ? `${printModule.computer_name}|||${printModule.printer_name}`
      : undefined
  );

  const [values, setValues] = useState({
    format: printModule?.format || "",
    color: String(printModule?.color) || "",
    orientation: printModule?.orientation || "",
    scale: "auto",
    side: "auto",
  });

  // Sync state with props when they change
  // useEffect(() => {
  //   if (printModule?.computer_name && printModule?.printer_name) {
  //     setSelectedPrinter(
  //       `${printModule.computer_name}|||${printModule.printer_name}`
  //     );
  //   } else {
  //     setSelectedPrinter(undefined);
  //   }

  //   setValues({
  //     format: printModule?.format || "",
  //     color: String(printModule?.color) || "",
  //     orientation: printModule?.orientation || "",
  //     scale: "auto",
  //     side: "auto",
  //   });
  // }, [printModule, printerList]); // Run when printModule or printerList changes

  const handleFormSubmit = async () => {
    setIsFormSubmitting(true);
    console.log("submitted");

    if (!selectedPrinter) {
      toast.error(tPrinter("printerError"));
      setIsFormSubmitting(false);
      return;
    }

    const [computerName, printerName] = selectedPrinter.split("|||");

    if (!values.color || !values.orientation || !values.format) {
      setIsFormSubmitting(false);
      toast.error("errorMsg");
      return;
    }

    const dataToSend = {
      computer_name: computerName,
      printer_name: printerName,
      module: String(printModule?.module),
      paper_format: values.format,
      print_color: "Couleur",
      paper_quantity: "1",
      paper_orientation: values.orientation,
      paper_side: "simplex",
      paper_scale: "fit",
      url: url,
    };

    const res = await sendPrintRequest(dataToSend);

    if (res?.success) {
      setIsFormSubmitting(false);
      toast.success(tPrinter("printSuccess"));
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger className="cursor-pointer">
          <div
            role="button"
            onClick={!isSubmitting ? handleSubmit : undefined}
            className="bg-green-600 w-fit disabled:bg-gray-500 flex items-center gap-2 text-sm font-semibold cursor-pointer transition-all duration-500 hover:bg-green-800 px-6 py-1 rounded-md text-white"
          >
            {isSubmitting && <CustomSpinner />}
            {tGlobal("pdfModal.btn")}
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="md:max-w-[700px]! flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <AlertDialogTitle>{tGlobal("pdfModal.title")}</AlertDialogTitle>
            <AlertDialogAction className="cursor-pointer">
              <HiXMark size={20} />
            </AlertDialogAction>
          </div>
          <div className="min-h-[300px] flex items-center justify-center">
            {isSubmitting ? (
              <Spinner />
            ) : (
              <iframe src={`${url}#toolbar=1`} width="100%" height="300px" />
            )}
          </div>
          {!isSubmitting && rentalPage && (
            <div className="flex items-center flex-col gap-3">
              <div className="flex justify-center items-center gap-2">
                <ElButton
                  label={tGlobal("pdfModal.download")}
                  classNames="px-6 !h-8"
                />
                <ElButton
                  onClick={handleFormSubmit}
                  label={tGlobal("pdfModal.print")}
                  classNames="px-6 !h-8"
                  disabled={isFormSubmitting}
                  icon={isFormSubmitting ? <CustomSpinner /> : undefined}
                />
              </div>
              <span
                className="cursor-pointer text-sm flex items-center gap-2"
                onClick={() => setPrinterOptionsVisible((prev) => !prev)}
              >
                <span
                  className={clsx(
                    "text-sm transform transition-all rotate-0 duration-300",
                    printerOptionsVisible && "rotate-180"
                  )}
                >
                  <RiArrowDownWideFill size={20} />
                </span>
                {printerOptionsVisible
                  ? tGlobal("pdfModal.hideOptions")
                  : tGlobal("pdfModal.viewOptions")}
              </span>
              {printerOptionsVisible && (
                <PrinterSelects
                  selectedPrinter={selectedPrinter}
                  setSelectedPrinter={setSelectedPrinter}
                  values={values}
                  setValues={setValues}
                  printerList={printerList!}
                />
              )}
            </div>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default GeneratePdf;
