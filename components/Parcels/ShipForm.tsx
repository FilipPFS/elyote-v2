"use client";

import React, { useState } from "react";
import ElInput from "../custom/ElInput";
import ElSelect from "../custom/ElSelect";
import TimePicker from "./TimePicker";
import ElButton from "../custom/ElButton";
import { toISOWithTZ } from "@/lib/utils";

export type ShopopopFormData = {
  clientType: string;
  companyName: string;
  lastName: string;
  firstName: string;
  phone: string;
  email: string;
  country: string;
  address: string;
  postalCode: string;
  city: string;
  parcelCount: string;
  parcelWeight: string;
  vehicleType: string;
  parcelValue: string;
  recipientRef: string;
  placeName?: string;
  locationType?: string;
  digicode?: string;
  floor?: string;
  elevator?: string;
  comment?: string;
  heavy?: boolean;
  bulky?: boolean;
  additionalInfo?: string;
};

const MIN = 9 * 60;
const MIN_GAP = 2 * 60;

const dates = Array.from({ length: 17 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i);
  return d;
});

const ShipmentForm: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeRange, setTimeRange] = useState<number[]>([MIN, MIN + MIN_GAP]);
  const [formData, setFormData] = useState<ShopopopFormData>({
    clientType: "individual",
    companyName: "",
    lastName: "",
    firstName: "",
    phone: "",
    email: "",
    country: "France",
    address: "",
    postalCode: "",
    city: "",
    parcelCount: "1",
    parcelWeight: "1",
    vehicleType: "no_preference",
    parcelValue: "",
    recipientRef: "",
    placeName: "",
    locationType: "house",
    digicode: "",
    floor: "",
    elevator: "unknown",
    comment: "",
    heavy: false,
    bulky: false,
    additionalInfo: "",
  });

  const [showMore, setShowMore] = useState(false);

  const updateField = <K extends keyof ShopopopFormData>(
    field: K,
    value: ShopopopFormData[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const dropoff_start = toISOWithTZ(selectedDate, timeRange[0]);
  const dropoff_end = toISOWithTZ(selectedDate, timeRange[1]);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   try {
  //     e.preventDefault();

  //     const res = await shipParcel(formData);

  //     if (res?.errors) {
  //       for (const key in res.errors) {
  //         const messages = res.errors[key];
  //         if (Array.isArray(messages)) {
  //           messages.forEach((msg) =>
  //             toast.error(msg, {
  //               className: "bg-amber-700 text-white",
  //             })
  //           );
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <form className="w-full mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Formulaire d'expédition</h1>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Type de client */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Type de client</label>
          <ElSelect
            value={formData.clientType}
            onChange={(e) => updateField("clientType", e.target.value)}
          >
            <option value="individual">Particulier</option>
            <option value="business">Professionnel</option>
          </ElSelect>
        </div>

        {/* Raison sociale */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Raison sociale</label>
          <ElInput
            value={formData.companyName}
            onChange={(e) => updateField("companyName", e.target.value)}
          />
        </div>

        {/* Nom */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Nom</label>
          <ElInput
            value={formData.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
          />
        </div>

        {/* Prénom */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Prénom</label>
          <ElInput
            value={formData.firstName}
            onChange={(e) => updateField("firstName", e.target.value)}
          />
        </div>

        {/* Téléphone */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Téléphone</label>
          <ElInput
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Email</label>
          <ElInput
            type="email"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
        </div>

        {/* Pays */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Pays</label>
          <ElSelect
            value={formData.country}
            onChange={(e) => updateField("country", e.target.value)}
          >
            <option value="France">France</option>
          </ElSelect>
        </div>

        {/* Adresse */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Adresse</label>
          <ElInput
            value={formData.address}
            onChange={(e) => updateField("address", e.target.value)}
          />
        </div>

        {/* Code postal */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Code postal</label>
          <ElInput
            value={formData.postalCode}
            onChange={(e) => updateField("postalCode", e.target.value)}
          />
        </div>

        {/* Ville */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Ville</label>
          <ElInput
            value={formData.city}
            onChange={(e) => updateField("city", e.target.value)}
          />
        </div>

        {/* Nombre de colis */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Nombre de colis</label>
          <ElInput
            value={formData.parcelCount}
            onChange={(e) => updateField("parcelCount", e.target.value)}
          />
        </div>

        {/* Poids du colis */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Poids du colis (kg)</label>
          <ElInput
            value={formData.parcelWeight}
            onChange={(e) => updateField("parcelWeight", e.target.value)}
          />
        </div>

        {/* Type de véhicule */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Type de véhicule</label>
          <ElSelect
            value={formData.vehicleType}
            onChange={(e) => updateField("vehicleType", e.target.value)}
          >
            <option value="no_preference">Aucun choix particulier</option>
            <option value="car">Voiture</option>
            <option value="van">Camionnette</option>
            <option value="truck">Camion</option>
          </ElSelect>
        </div>

        {/* Valeur du colis */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Valeur du colis (€)</label>
          <ElInput
            value={formData.parcelValue}
            onChange={(e) => updateField("parcelValue", e.target.value)}
          />
        </div>

        {/* Référence destinataire */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Référence destinataire</label>
          <ElInput
            value={formData.recipientRef}
            onChange={(e) => updateField("recipientRef", e.target.value)}
          />
        </div>
      </div>

      {/* COLLAPSE SECTION */}
      <button
        type="button"
        className="text-blue-600 underline text-sm"
        onClick={() => setShowMore((prev) => !prev)}
      >
        {showMore
          ? "Masquer les informations complémentaires"
          : "Afficher les informations complémentaires"}
      </button>
      {showMore && (
        <div
          className="p-4 border rounded-md bg-gray-50 dark:bg-gray-900 mt-2 
                  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {/* Nom du lieu */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Nom du lieu</label>
            <ElInput
              value={formData.placeName}
              onChange={(e) => updateField("placeName", e.target.value)}
            />
          </div>

          {/* Type de localisation */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Type de localisation</label>
            <ElSelect
              value={formData.locationType}
              onChange={(e) => updateField("locationType", e.target.value)}
            >
              <option value="house">Maison</option>
              <option value="apartment">Appartement</option>
              <option value="office">Bureau</option>
            </ElSelect>
          </div>

          {/* Digicode */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Digicode / Interphone</label>
            <ElInput
              value={formData.digicode}
              onChange={(e) => updateField("digicode", e.target.value)}
            />
          </div>

          {/* Étage */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Étage</label>
            <ElInput
              value={formData.floor}
              onChange={(e) => updateField("floor", e.target.value)}
            />
          </div>

          {/* Ascenseur */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Ascenseur</label>
            <ElSelect
              value={formData.elevator}
              onChange={(e) => updateField("elevator", e.target.value)}
            >
              <option value="unknown">Ne sait pas</option>
              <option value="yes">Oui</option>
              <option value="no">Non</option>
            </ElSelect>
          </div>

          {/* Commentaire */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Commentaire</label>
            <ElInput
              value={formData.comment}
              onChange={(e) => updateField("comment", e.target.value)}
            />
          </div>

          {/* Checkbox lourds */}
          <div className="flex flex-col gap-2 col-span-1 sm:col-span-2 lg:col-span-3 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.heavy}
                onChange={(e) => updateField("heavy", e.target.checked)}
              />
              Article lourd ?
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.bulky}
                onChange={(e) => updateField("bulky", e.target.checked)}
              />
              Article volumineux ?
            </label>
          </div>

          {/* Informations supplémentaires */}
          <div className="flex flex-col gap-1 col-span-1 sm:col-span-2 lg:col-span-3">
            <label className="text-sm font-medium">
              Informations supplémentaires
            </label>
            <ElInput
              value={formData.additionalInfo}
              onChange={(e) => updateField("additionalInfo", e.target.value)}
            />
          </div>
        </div>
      )}

      <div>
        <label className="text-sm font-medium">Date de livraison</label>
        <ElSelect
          value={selectedDate.toISOString()}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          className="border rounded-md p-2"
        >
          {dates.map((d, i) => (
            <option key={i} value={d.toISOString()}>
              {d.toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </option>
          ))}
        </ElSelect>

        <TimePicker values={timeRange} onChange={setTimeRange} />
      </div>

      <ElButton label="Tester l'égilibité" />
    </form>
  );
};

export default ShipmentForm;
