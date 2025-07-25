import { useTranslations } from "next-intl";
import ElSelect from "../custom/ElSelect";
import { Computer } from "@/types";

type PrinterSelectsProps = {
  selectedPrinter: string | undefined;
  setSelectedPrinter: (value: string) => void;
  values: {
    format: string;
    color: string;
    orientation: string;
    scale: string;
    side: string;
  };
  setValues: React.Dispatch<
    React.SetStateAction<{
      format: string;
      color: string;
      orientation: string;
      scale: string;
      side: string;
    }>
  >;
  printerList: Computer[];
};

const orientationOptions = [
  { label: "Paysage", value: "landscape" },
  { label: "Portrait", value: "portrait" },
];
const colorOptions = [
  { value: "0", label: "Auto" },
  { value: "1", label: "Couleur" },
  { value: "2", label: "Noir et blanc" },
];

const PrinterSelects = ({
  selectedPrinter,
  setSelectedPrinter,
  values,
  setValues,
  printerList,
}: PrinterSelectsProps) => {
  const paperOptions = (() => {
    if (!selectedPrinter) return [];
    const [computerName, printerName] = selectedPrinter.split("|||");
    const computer = printerList.find((c) => c.name === computerName);
    const printer = computer?.printers?.[printerName];
    return printer?.paperFormats || [];
  })();

  const t = useTranslations("printer");

  return (
    <div className="flex flex-col md:flex-row gap-1.5 text-sm justify-between">
      <div className="w-full flex flex-col gap-1">
        <h4>{t("modal.labels.printer")}</h4>
        <ElSelect
          parentClassnames="text-sm !gap-1.5 !h-8"
          value={selectedPrinter || ""}
          onChange={(e) => setSelectedPrinter(e.target.value)}
        >
          <option value="" disabled>
            {t("modal.selects.printer")}
          </option>
          {printerList.map((item) => (
            <optgroup key={item.name} label={item.name}>
              {item.printers ? (
                Object.entries(item.printers).map(([printerName]) => (
                  <option
                    key={printerName}
                    value={`${item.name}|||${printerName}`}
                  >
                    {printerName}
                  </option>
                ))
              ) : (
                <option disabled>{t("noPrinterAvailable")}</option>
              )}
            </optgroup>
          ))}
        </ElSelect>
      </div>
      <div className="w-full flex flex-col gap-1">
        <h4>{t("modal.labels.format")}</h4>
        <ElSelect
          value={values.format || ""}
          parentClassnames="text-sm !gap-1.5 !h-8"
          onChange={(e) =>
            setValues((prev) => ({ ...prev, format: e.target.value }))
          }
        >
          <option value="" disabled>
            {t("modal.selects.format")}
          </option>
          {paperOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </ElSelect>
      </div>
      <div className="w-full flex flex-col gap-1">
        <h4>{t("modal.labels.color")}</h4>
        <ElSelect
          parentClassnames="text-sm !gap-1.5 !h-8"
          value={values.color || ""}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, color: e.target.value }))
          }
        >
          <option value="" disabled>
            {t("modal.selects.color")}
          </option>
          {colorOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {t(`modal.selects.colors.${item.value}`)}
            </option>
          ))}
        </ElSelect>
      </div>
      <div className="w-full flex flex-col gap-1">
        <h4>{t("modal.labels.orientation")}</h4>
        <ElSelect
          parentClassnames="text-sm !gap-1.5 !h-8"
          value={values.orientation || ""}
          onChange={(e) =>
            setValues((prev) => ({
              ...prev,
              orientation: e.target.value,
            }))
          }
        >
          <option value="" disabled>
            {t("modal.selects.orientation")}
          </option>
          {orientationOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {t(`modal.selects.${item.value}`)}
            </option>
          ))}
        </ElSelect>
      </div>
    </div>
  );
};

export default PrinterSelects;
