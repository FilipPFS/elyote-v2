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
import { RentalQuery } from "@/types";
import { addNewRental } from "@/lib/actions/actions.rental";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  rentalFormFirstPartSchema,
  rentalFormSecondPartSchema,
} from "@/lib/validation";
import { HiArrowLeft } from "react-icons/hi2";

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

  console.log("submitting", isSubmitting);

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

  const handleVisibility = () => {
    const result = rentalFormFirstPartSchema.safeParse(formData);

    if (result.success) {
      setFirstPartVisible(false);
    } else {
      result.error.errors.map((item) => toast.error(item.message));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = rentalFormSecondPartSchema.safeParse(formData);

    if (!result.success) {
      result.error.errors.map((item) => toast.error(item.message));
      return;
    }

    const res = await addNewRental(formData);

    if (res.success) {
      toast.success("Votre location a été ajouté.");
      router.push("/locations/liste");
    } else if (res.error) {
      toast.error(`Erreur: ${res.error.toString()}`);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full lg:w-2/3 bg-white p-6 lg:p-10 rounded-md flex flex-col gap-8">
      <h1 className="text-xl font-semibold">Ajouter une location</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {firstPartVisible ? (
          <>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-7">
                <ElInput
                  name="client"
                  placeholder="Client"
                  icon={<MdOutlinePerson className="text-blue-700" />}
                  value={formData.client}
                  onChange={handleChange}
                />
                <ElInput
                  name="client_city"
                  placeholder="Ville du client"
                  icon={<MdOutlineLocationCity className="text-blue-700" />}
                  value={formData.client_city}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-7">
                <ElInput
                  name="phone"
                  placeholder="Tél"
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
                <div className="w-1/2">
                  <label>Date de début</label>
                  <ElInput
                    type="date"
                    name="start_date"
                    className="p-2 border rounded w-full"
                    id="date-input"
                    value={formData.start_date}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-1/2">
                  <label>Date de fin</label>
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
            </div>
            <ElSelect
              name="id_material"
              icon={<MdDevices className="text-blue-700" />}
              value={formData.id_material}
              onChange={handleChange}
            >
              <option value="">Select a material</option>
              {Object.entries(materials).map(
                ([section, items]) =>
                  items.length > 0 && (
                    <optgroup key={section} label={section}>
                      {items.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </optgroup>
                  )
              )}
            </ElSelect>
            <ElTextarea
              name="accessories"
              placeholder="Accessoires"
              icon={<FiTool className="text-blue-700" />}
              value={formData.accessories}
              onChange={handleChange}
            />
            <ElTextarea
              name="comment"
              placeholder="Commentaires"
              icon={<BiComment className="text-blue-700" />}
              value={formData.comment}
              onChange={handleChange}
            />
          </>
        ) : (
          <div className="flex flex-col gap-4 lg:gap-7">
            <span
              onClick={() => setFirstPartVisible(true)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <HiArrowLeft /> Retour
            </span>
            <ElInput
              name="rental_price"
              placeholder="Prix"
              icon={<MdEuro className="text-blue-700" />}
              value={formData.rental_price}
              onChange={handleChange}
            />
            <ElInput
              name="acompte"
              placeholder="acompte"
              icon={<MdOutlineCreditCard className="text-blue-700" />}
              value={formData.acompte}
              onChange={handleChange}
            />

            <button
              className="w-32 bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 justify-center text-sm cursor-pointer transition-all duration-500 hover:bg-blue-800 text-white rounded-md h-10"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </div>
        )}
      </form>

      {firstPartVisible && (
        <button
          type="button"
          className="bg-blue-700 disabled:bg-gray-400 flex items-center gap-2 justify-center text-sm cursor-pointer transition-all duration-500 hover:bg-blue-800 text-white rounded-md h-10 self-center w-2/3 lg:w-1/4"
          onClick={handleVisibility}
        >
          Calculer le prix
        </button>
      )}
    </div>
  );
};

export default RentalFormAdd;
