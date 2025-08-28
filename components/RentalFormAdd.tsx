"use client";

import ElSelect from "./custom/ElSelect";
import ElInput from "./custom/ElInput";
import ElTextarea from "./custom/ElTextarea";
import {
  MdDevices,
  MdEuro,
  MdOutlineCreditCard,
  MdOutlineLocationCity,
  MdOutlineMail,
  MdOutlinePerson,
  MdOutlinePhone,
} from "react-icons/md";
import { BiComment } from "react-icons/bi";
import { FiTool } from "react-icons/fi";
import { useState } from "react";
import { MaterialData, RentalQuery } from "@/types";
import { addNewRental } from "@/lib/actions/actions.rental";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  rentalFormFirstPartSchema,
  rentalFormSecondPartSchema,
} from "@/lib/validation";
import { HiArrowLeft } from "react-icons/hi2";
import { getMaterialById } from "@/lib/actions/actions.material";
import { useTranslations } from "next-intl";
import ElButton from "./custom/ElButton";
import CustomSpinner from "./custom/Spinner";

type Props = {
  materials: Record<string, RentalQuery[]>;
};

export type RentalFormData = {
  client: string;
  client_city: string;
  phone: string;
  email: string;
  start_date: string;
  end_date: string;
  id_material: string;
  accessories: string;
  comment: string;
  rental_price: string;
  acompte: string;
};

const RentalFormAdd = ({ materials }: Props) => {
  const [firstPartVisible, setFirstPartVisible] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const tRental = useTranslations("rentals");

  const router = useRouter();

  const [formData, setFormData] = useState<RentalFormData>({
    client: "",
    client_city: "",
    phone: "",
    email: "",
    start_date: "",
    end_date: "",
    id_material: "",
    accessories: "",
    comment: "",
    rental_price: "",
    acompte: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVisibility = async () => {
    const result = rentalFormFirstPartSchema.safeParse(formData);

    if (result.success) {
      const startDate = new Date(formData.start_date);
      const endDate = new Date(formData.end_date);
      const timeDiff = endDate.getTime() - startDate.getTime();
      const days = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;

      if (startDate > endDate) {
        toast.error(tRental("zodValidation.dateCheck"));
        return;
      }

      const selectedMaterial: MaterialData = await getMaterialById(
        formData.id_material
      );

      if (selectedMaterial && days > 0) {
        const totalPrice = Number(selectedMaterial.daily_rate) * days;
        const deposit = Number(selectedMaterial.deposit);

        setFormData((prev) => ({
          ...prev,
          rental_price: totalPrice.toFixed(2),
          acompte: deposit.toFixed(2),
        }));
      }

      console.log(formData);

      setFirstPartVisible(false);
    } else {
      result.error.errors.map((item) => toast.error(tRental(item.message)));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = rentalFormSecondPartSchema.safeParse(formData);

    if (!result.success) {
      result.error.errors.map((item) => toast.error(tRental(item.message)));
      setIsSubmitting(false);
      return;
    }

    const res = await addNewRental(formData);

    if (res.success) {
      toast.success(tRental("addPage.success"));
      router.push("/locations/liste");
    } else if (res.error) {
      toast.error(`Erreur: ${res.error.toString()}`);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full lg:w-2/3 bg-white dark:bg-gray-950 p-6 lg:p-10 rounded-md flex flex-col gap-8">
      <h1 className="text-xl font-semibold">{tRental("addPage.title")}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {firstPartVisible ? (
          <>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-7">
                <ElInput
                  name="client"
                  placeholder={tRental("addPage.form.customer")}
                  icon={<MdOutlinePerson className="text-blue-700" />}
                  value={formData.client}
                  onChange={handleChange}
                />
                <ElInput
                  name="client_city"
                  placeholder={tRental("addPage.form.customerCity")}
                  icon={<MdOutlineLocationCity className="text-blue-700" />}
                  value={formData.client_city}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-7">
                <ElInput
                  name="phone"
                  placeholder={tRental("addPage.form.phone")}
                  icon={<MdOutlinePhone className="text-blue-700" />}
                  value={formData.phone}
                  onChange={handleChange}
                />
                <ElInput
                  name="email"
                  placeholder="Email"
                  icon={<MdOutlineMail className="text-blue-700" />}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-7">
                <div className="w-full sm:w-1/2">
                  <label>{tRental("addPage.form.startDate")}</label>
                  <ElInput
                    type="date"
                    name="start_date"
                    className="p-2 border rounded w-full"
                    id="date-input"
                    value={formData.start_date}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full sm:w-1/2">
                  <label>{tRental("addPage.form.endDate")}</label>
                  <ElInput
                    type="date"
                    name="end_date"
                    className="p-2 border rounded w-full"
                    id="date-input"
                    value={formData.end_date}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <ElSelect
                name="id_material"
                icon={<MdDevices className="text-blue-700" />}
                value={formData.id_material}
                onChange={handleChange}
              >
                <option value="" disabled>
                  {tRental("addPage.form.selectMaterial")}
                </option>
                {Object.entries(materials).map(([section, items]) => (
                  <optgroup key={section} label={section}>
                    {items.length > 0 ? (
                      items.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>
                        {" "}
                        {tRental("addPage.form.noMaterialData")}
                      </option>
                    )}
                  </optgroup>
                ))}
              </ElSelect>
              <ElTextarea
                name="accessories"
                placeholder={tRental("addPage.form.accessories")}
                icon={<FiTool className="text-blue-700" />}
                value={formData.accessories}
                onChange={handleChange}
              />
              <ElTextarea
                name="comment"
                placeholder={tRental("addPage.form.comment")}
                icon={<BiComment className="text-blue-700" />}
                value={formData.comment}
                onChange={handleChange}
              />
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-4 lg:gap-7">
            <span
              onClick={() => setFirstPartVisible(true)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <HiArrowLeft /> {tRental("addPage.form.goBack")}
            </span>
            <ElInput
              name="rental_price"
              placeholder={tRental("addPage.form.rentalPrice")}
              icon={<MdEuro className="text-blue-700" />}
              value={formData.rental_price}
              onChange={handleChange}
            />
            <ElInput
              name="acompte"
              placeholder={tRental("addPage.form.deposit")}
              icon={<MdOutlineCreditCard className="text-blue-700" />}
              value={formData.acompte}
              onChange={handleChange}
            />

            <ElButton
              classNames="w-2/3 lg:w-1/4"
              type="submit"
              disabled={isSubmitting}
              icon={isSubmitting ? <CustomSpinner /> : undefined}
              label={tRental("addPage.form.add")}
            />
          </div>
        )}
      </form>

      {firstPartVisible && (
        <button
          type="button"
          className="bg-blue-700 disabled:bg-gray-400 flex items-center gap-2 justify-center text-sm cursor-pointer transition-all duration-500 hover:bg-blue-800 text-white rounded-md h-10 self-center w-2/3 lg:w-1/4"
          onClick={handleVisibility}
        >
          {tRental("addPage.form.priceCalc")}
        </button>
      )}
    </div>
  );
};

export default RentalFormAdd;
