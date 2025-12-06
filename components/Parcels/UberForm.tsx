"use client";

import React, { useState } from "react";
import ElInput from "../custom/ElInput";
import ElButton from "../custom/ElButton";

// ================== TYPES ==================

type ManifestItemDimensions = {
  length: number;
  height: number;
  depth: number;
};

type ManifestItem = {
  name: string;
  quantity: number;
  size: string;
  dimensions: ManifestItemDimensions;
  price: number;
  must_be_upright: boolean;
  weight: number;
  vat_percentage: number;
};

type Barcode = {
  value: string;
  type: string;
};

type SignatureRequirement = {
  enabled: boolean;
  collect_signer_name: boolean;
  collect_signer_relationship: boolean;
};

type Verification = {
  signature: boolean;
  signature_requirement: SignatureRequirement;
  barcodes: Barcode[];
  picture: boolean;
  pincode?: {
    enabled: boolean;
  };
  identification?: {
    min_age: number;
  };
};

type ExternalUserInfo = {
  merchant_account: {
    account_created_at: string;
    email: string;
  };
  device: {
    id: string;
  };
};

type TestSpecifications = {
  robo_courier_specification: {
    mode: string;
  };
};

export type UberFormData = {
  transporteur: string;

  dropoff_address: string;
  dropoff_name: string;
  dropoff_phone_number: string;
  manifest_items: ManifestItem[];

  pickup_address: string;
  pickup_name: string;
  pickup_phone_number: string;
  pickup_business_name: string;
  pickup_latitude: number;
  pickup_longitude: number;
  pickup_notes: string;
  pickup_verification: Verification;

  dropoff_business_name: string;
  dropoff_latitude: number;
  dropoff_longitude: number;
  dropoff_notes: string;
  dropoff_seller_notes: string;
  dropoff_verification: Verification;

  deliverable_action: string;
  manifest_reference: string;
  manifest_total_value: number;
  quote_id: string;
  pickup_ready_dt: string;
  pickup_deadline_dt: string;
  dropoff_ready_dt: string;
  dropoff_deadline_dt: string;
  requires_dropoff_signature: boolean;
  requires_id: boolean;
  tip: number;
  idempotency_key: string;
  external_store_id: string;
  return_verification: Verification;
  external_user_info: ExternalUserInfo;
  external_id: string;
  test_specifications: TestSpecifications;
};

// ============= DEFAULT EMPTY FORM =============

const emptyUberForm: UberFormData = {
  transporteur: "uber",

  dropoff_address: "",
  dropoff_name: "",
  dropoff_phone_number: "",
  manifest_items: [],

  pickup_address: "",
  pickup_name: "",
  pickup_phone_number: "",
  pickup_business_name: "",
  pickup_latitude: 0,
  pickup_longitude: 0,
  pickup_notes: "",
  pickup_verification: {
    signature: false,
    signature_requirement: {
      enabled: false,
      collect_signer_name: false,
      collect_signer_relationship: false,
    },
    barcodes: [],
    picture: false,
    pincode: { enabled: false },
    identification: { min_age: 0 },
  },

  dropoff_business_name: "",
  dropoff_latitude: 0,
  dropoff_longitude: 0,
  dropoff_notes: "",
  dropoff_seller_notes: "",
  dropoff_verification: {
    signature: false,
    signature_requirement: {
      enabled: false,
      collect_signer_name: false,
      collect_signer_relationship: false,
    },
    barcodes: [],
    picture: false,
    pincode: { enabled: false },
    identification: { min_age: 0 },
  },

  deliverable_action: "",
  manifest_reference: "",
  manifest_total_value: 0,
  quote_id: "",
  pickup_ready_dt: "",
  pickup_deadline_dt: "",
  dropoff_ready_dt: "",
  dropoff_deadline_dt: "",
  requires_dropoff_signature: false,
  requires_id: false,
  tip: 0,
  idempotency_key: "",
  external_store_id: "",
  return_verification: {
    signature: false,
    signature_requirement: {
      enabled: false,
      collect_signer_name: false,
      collect_signer_relationship: false,
    },
    barcodes: [],
    picture: false,
  },
  external_user_info: {
    merchant_account: {
      account_created_at: "",
      email: "",
    },
    device: {
      id: "",
    },
  },
  external_id: "",
  test_specifications: {
    robo_courier_specification: {
      mode: "",
    },
  },
};

// ============= PROPS =============

type UberFormProps = {
  initialData?: UberFormData; // optional now
};

// ============= COMPONENT =============

const UberForm: React.FC<UberFormProps> = ({ initialData }) => {
  const [formData, setFormData] = useState<UberFormData>(
    initialData ?? emptyUberForm
  );

  // collapsible sections
  const [showPickup, setShowPickup] = useState(true);
  const [showDropoff, setShowDropoff] = useState(true);
  const [showManifest, setShowManifest] = useState(true);
  const [showPickupVerif, setShowPickupVerif] = useState(true);
  const [showDropoffVerif, setShowDropoffVerif] = useState(true);
  const [showReturnVerif, setShowReturnVerif] = useState(false);
  const [showExternal, setShowExternal] = useState(false);
  const [showTestSpecs, setShowTestSpecs] = useState(false);
  const [showOther, setShowOther] = useState(true);

  // ---- SIMPLE FIELD UPDATE ----
  const updateField = <K extends keyof UberFormData>(
    field: K,
    value: UberFormData[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ---- MANIFEST ITEMS ----
  const updateManifestItem = <K extends keyof ManifestItem>(
    index: number,
    field: K,
    value: ManifestItem[K]
  ) => {
    setFormData((prev) => {
      const items = [...prev.manifest_items];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, manifest_items: items };
    });
  };

  const updateManifestItemDimension = (
    index: number,
    dimField: keyof ManifestItemDimensions,
    value: number
  ) => {
    setFormData((prev) => {
      const items = [...prev.manifest_items];
      const dims = { ...items[index].dimensions, [dimField]: value };
      items[index] = { ...items[index], dimensions: dims };
      return { ...prev, manifest_items: items };
    });
  };

  const addManifestItem = () => {
    const emptyItem: ManifestItem = {
      name: "",
      quantity: 1,
      size: "",
      dimensions: { length: 0, height: 0, depth: 0 },
      price: 0,
      must_be_upright: false,
      weight: 0,
      vat_percentage: 0,
    };
    setFormData((prev) => ({
      ...prev,
      manifest_items: [...prev.manifest_items, emptyItem],
    }));
  };

  const removeManifestItem = (index: number) => {
    setFormData((prev) => {
      const items = [...prev.manifest_items];
      items.splice(index, 1);
      return { ...prev, manifest_items: items };
    });
  };

  // ---- GENERIC HELPERS FOR VERIFICATION ----

  const updatePickupVerification = (patch: Partial<Verification>) => {
    setFormData((prev) => ({
      ...prev,
      pickup_verification: {
        ...prev.pickup_verification,
        ...patch,
      },
    }));
  };

  const updateDropoffVerification = (patch: Partial<Verification>) => {
    setFormData((prev) => ({
      ...prev,
      dropoff_verification: {
        ...prev.dropoff_verification,
        ...patch,
      },
    }));
  };

  const updateReturnVerification = (patch: Partial<Verification>) => {
    setFormData((prev) => ({
      ...prev,
      return_verification: {
        ...prev.return_verification,
        ...patch,
      },
    }));
  };

  // barcodes helpers for each verification

  const updateBarcodeArray = (
    type: "pickup" | "dropoff" | "return",
    index: number,
    field: keyof Barcode,
    value: string
  ) => {
    setFormData((prev) => {
      const target =
        type === "pickup"
          ? prev.pickup_verification
          : type === "dropoff"
          ? prev.dropoff_verification
          : prev.return_verification;

      const barcodes = [...target.barcodes];
      barcodes[index] = { ...barcodes[index], [field]: value };

      const updatedVerification: Verification = {
        ...target,
        barcodes,
      };

      if (type === "pickup") {
        return { ...prev, pickup_verification: updatedVerification };
      }
      if (type === "dropoff") {
        return { ...prev, dropoff_verification: updatedVerification };
      }
      return { ...prev, return_verification: updatedVerification };
    });
  };

  const addBarcode = (type: "pickup" | "dropoff" | "return") => {
    setFormData((prev) => {
      const target =
        type === "pickup"
          ? prev.pickup_verification
          : type === "dropoff"
          ? prev.dropoff_verification
          : prev.return_verification;

      const barcodes = [...target.barcodes, { value: "", type: "" } as Barcode];

      const updatedVerification: Verification = {
        ...target,
        barcodes,
      };

      if (type === "pickup") {
        return { ...prev, pickup_verification: updatedVerification };
      }
      if (type === "dropoff") {
        return { ...prev, dropoff_verification: updatedVerification };
      }
      return { ...prev, return_verification: updatedVerification };
    });
  };

  const removeBarcode = (
    type: "pickup" | "dropoff" | "return",
    index: number
  ) => {
    setFormData((prev) => {
      const target =
        type === "pickup"
          ? prev.pickup_verification
          : type === "dropoff"
          ? prev.dropoff_verification
          : prev.return_verification;

      const barcodes = [...target.barcodes];
      barcodes.splice(index, 1);

      const updatedVerification: Verification = {
        ...target,
        barcodes,
      };

      if (type === "pickup") {
        return { ...prev, pickup_verification: updatedVerification };
      }
      if (type === "dropoff") {
        return { ...prev, dropoff_verification: updatedVerification };
      }
      return { ...prev, return_verification: updatedVerification };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // send formData to your API
    console.log("UBER PAYLOAD:", formData);
  };

  return (
    <form className="w-full mx-auto p-6 space-y-6" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold">UberForm (API editable)</h1>

      <div className="flex flex-col gap-5 items-start">
        {/* TRANSPORTEUR */}
        <div className="flex flex-col gap-1 max-w-sm">
          <label className="text-sm font-medium">Transporteur</label>
          <ElInput value={formData.transporteur} readOnly />
        </div>

        {/* PICKUP */}
        <button
          type="button"
          className="text-blue-600 underline cursor-pointer text-sm"
          onClick={() => setShowPickup((p) => !p)}
        >
          {showPickup ? "Masquer Pickup" : "Afficher Pickup"}
        </button>

        {showPickup && (
          <div className="p-4 border rounded-md grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 dark:bg-gray-900 w-full">
            {[
              ["pickup_address", "Adresse pickup"],
              ["pickup_name", "Nom pickup"],
              ["pickup_phone_number", "Téléphone pickup"],
              ["pickup_business_name", "Entreprise pickup"],
            ].map(([key, label]) => (
              <div className="flex flex-col gap-1" key={key}>
                <label className="text-sm font-medium">{label}</label>
                <ElInput
                  value={formData[key as keyof UberFormData] as any}
                  onChange={(e) =>
                    updateField(
                      key as keyof UberFormData,
                      e.target.value as any
                    )
                  }
                />
              </div>
            ))}

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Latitude</label>
              <ElInput
                type="number"
                value={formData.pickup_latitude}
                onChange={(e) =>
                  updateField("pickup_latitude", Number(e.target.value))
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Longitude</label>
              <ElInput
                type="number"
                value={formData.pickup_longitude}
                onChange={(e) =>
                  updateField("pickup_longitude", Number(e.target.value))
                }
              />
            </div>

            <div className="flex flex-col gap-1 md:col-span-3">
              <label className="text-sm font-medium">Notes pickup</label>
              <ElInput
                value={formData.pickup_notes}
                onChange={(e) => updateField("pickup_notes", e.target.value)}
              />
            </div>
          </div>
        )}

        {/* DROPOFF */}
        <button
          type="button"
          className="text-blue-600 underline cursor-pointer text-sm"
          onClick={() => setShowDropoff((p) => !p)}
        >
          {showDropoff ? "Masquer Dropoff" : "Afficher Dropoff"}
        </button>

        {showDropoff && (
          <div className="p-4 w-full border rounded-md grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 dark:bg-gray-900">
            {[
              ["dropoff_address", "Adresse dropoff"],
              ["dropoff_name", "Nom dropoff"],
              ["dropoff_phone_number", "Téléphone dropoff"],
              ["dropoff_business_name", "Entreprise dropoff"],
            ].map(([key, label]) => (
              <div className="flex flex-col gap-1" key={key}>
                <label className="text-sm font-medium">{label}</label>
                <ElInput
                  value={formData[key as keyof UberFormData] as any}
                  onChange={(e) =>
                    updateField(
                      key as keyof UberFormData,
                      e.target.value as any
                    )
                  }
                />
              </div>
            ))}

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Latitude</label>
              <ElInput
                type="number"
                value={formData.dropoff_latitude}
                onChange={(e) =>
                  updateField("dropoff_latitude", Number(e.target.value))
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Longitude</label>
              <ElInput
                type="number"
                value={formData.dropoff_longitude}
                onChange={(e) =>
                  updateField("dropoff_longitude", Number(e.target.value))
                }
              />
            </div>

            <div className="flex flex-col gap-1 md:col-span-3">
              <label className="text-sm font-medium">Notes dropoff</label>
              <ElInput
                value={formData.dropoff_notes}
                onChange={(e) => updateField("dropoff_notes", e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1 md:col-span-3">
              <label className="text-sm font-medium">Notes vendeur</label>
              <ElInput
                value={formData.dropoff_seller_notes}
                onChange={(e) =>
                  updateField("dropoff_seller_notes", e.target.value)
                }
              />
            </div>
          </div>
        )}

        {/* MANIFEST ITEMS */}
        <button
          type="button"
          className="text-blue-600 underline text-sm"
          onClick={() => setShowManifest((p) => !p)}
        >
          {showManifest ? "Masquer les articles" : "Afficher les articles"}
        </button>

        {showManifest && (
          <div className="p-4 border rounded-md w-full space-y-4 bg-gray-50 dark:bg-gray-900">
            {formData.manifest_items.map((item, index) => (
              <div
                key={index}
                className="border rounded-md p-3 space-y-3 bg-white dark:bg-gray-900"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-sm">
                    Article #{index + 1}
                  </h3>
                  <button
                    type="button"
                    className="text-red-600 text-xs underline"
                    onClick={() => removeManifestItem(index)}
                  >
                    Supprimer
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Nom</label>
                    <ElInput
                      value={item.name}
                      onChange={(e) =>
                        updateManifestItem(index, "name", e.target.value)
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Quantité</label>
                    <ElInput
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateManifestItem(
                          index,
                          "quantity",
                          Number(e.target.value)
                        )
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Taille</label>
                    <ElInput
                      value={item.size}
                      onChange={(e) =>
                        updateManifestItem(index, "size", e.target.value)
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Prix</label>
                    <ElInput
                      type="number"
                      value={item.price}
                      onChange={(e) =>
                        updateManifestItem(
                          index,
                          "price",
                          Number(e.target.value)
                        )
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Poids</label>
                    <ElInput
                      type="number"
                      value={item.weight}
                      onChange={(e) =>
                        updateManifestItem(
                          index,
                          "weight",
                          Number(e.target.value)
                        )
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">TVA (%)</label>
                    <ElInput
                      type="number"
                      value={item.vat_percentage}
                      onChange={(e) =>
                        updateManifestItem(
                          index,
                          "vat_percentage",
                          Number(e.target.value)
                        )
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Longueur (cm)</label>
                    <ElInput
                      type="number"
                      value={item.dimensions.length}
                      onChange={(e) =>
                        updateManifestItemDimension(
                          index,
                          "length",
                          Number(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Hauteur (cm)</label>
                    <ElInput
                      type="number"
                      value={item.dimensions.height}
                      onChange={(e) =>
                        updateManifestItemDimension(
                          index,
                          "height",
                          Number(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">
                      Profondeur (cm)
                    </label>
                    <ElInput
                      type="number"
                      value={item.dimensions.depth}
                      onChange={(e) =>
                        updateManifestItemDimension(
                          index,
                          "depth",
                          Number(e.target.value)
                        )
                      }
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 mt-2 text-sm">
                  <input
                    type="checkbox"
                    checked={item.must_be_upright}
                    onChange={(e) =>
                      updateManifestItem(
                        index,
                        "must_be_upright",
                        e.target.checked
                      )
                    }
                  />
                  Doit rester debout
                </label>
              </div>
            ))}

            <ElButton label="Ajouter un article" onClick={addManifestItem} />
          </div>
        )}

        {/* PICKUP VERIFICATION */}
        <button
          type="button"
          className="text-blue-600 cursor-pointer underline text-sm"
          onClick={() => setShowPickupVerif((p) => !p)}
        >
          {showPickupVerif
            ? "Masquer vérification Pickup"
            : "Afficher vérification Pickup"}
        </button>

        {showPickupVerif && (
          <div className="p-4 border rounded-md w-full space-y-3 bg-gray-50 dark:bg-gray-900">
            <h2 className="font-semibold text-sm">Pickup verification</h2>

            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={formData.pickup_verification.signature}
                  onChange={(e) =>
                    updatePickupVerification({
                      signature: e.target.checked,
                    })
                  }
                />
                Signature requise
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={formData.pickup_verification.picture}
                  onChange={(e) =>
                    updatePickupVerification({
                      picture: e.target.checked,
                    })
                  }
                />
                Photo requise
              </label>
            </div>

            <div className="border rounded-md p-3 space-y-2 bg-white dark:bg-gray-900">
              <p className="font-medium text-xs">Signature requirement</p>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={
                    formData.pickup_verification.signature_requirement.enabled
                  }
                  onChange={(e) =>
                    updatePickupVerification({
                      signature_requirement: {
                        ...formData.pickup_verification.signature_requirement,
                        enabled: e.target.checked,
                      },
                    })
                  }
                />
                Enabled
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={
                    formData.pickup_verification.signature_requirement
                      .collect_signer_name
                  }
                  onChange={(e) =>
                    updatePickupVerification({
                      signature_requirement: {
                        ...formData.pickup_verification.signature_requirement,
                        collect_signer_name: e.target.checked,
                      },
                    })
                  }
                />
                Collect signer name
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={
                    formData.pickup_verification.signature_requirement
                      .collect_signer_relationship
                  }
                  onChange={(e) =>
                    updatePickupVerification({
                      signature_requirement: {
                        ...formData.pickup_verification.signature_requirement,
                        collect_signer_relationship: e.target.checked,
                      },
                    })
                  }
                />
                Collect signer relationship
              </label>
            </div>

            {/* Pickup barcodes */}
            <div className="border rounded-md p-3 space-y-2 bg-white dark:bg-gray-900">
              <div className="flex justify-between items-center">
                <p className="font-medium text-xs">Barcodes pickup</p>
                <button
                  type="button"
                  className="text-xs text-blue-600 underline"
                  onClick={() => addBarcode("pickup")}
                >
                  Ajouter un barcode
                </button>
              </div>

              {formData.pickup_verification.barcodes.map((b, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 md:grid-cols-[2fr,2fr,auto] gap-2 items-end"
                >
                  <div className="flex flex-col gap-1">
                    <label className="text-xs">Value</label>
                    <ElInput
                      value={b.value}
                      onChange={(e) =>
                        updateBarcodeArray("pickup", i, "value", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs">Type</label>
                    <ElInput
                      value={b.type}
                      onChange={(e) =>
                        updateBarcodeArray("pickup", i, "type", e.target.value)
                      }
                    />
                  </div>
                  <button
                    type="button"
                    className="text-xs text-red-600 underline"
                    onClick={() => removeBarcode("pickup", i)}
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DROPOFF VERIFICATION */}
        <button
          type="button"
          className="text-blue-600 underline text-sm"
          onClick={() => setShowDropoffVerif((p) => !p)}
        >
          {showDropoffVerif
            ? "Masquer vérification Dropoff"
            : "Afficher vérification Dropoff"}
        </button>

        {showDropoffVerif && (
          <div className="p-4 border rounded-md w-full space-y-3 bg-gray-50 dark:bg-gray-900">
            <h2 className="font-semibold text-sm">Dropoff verification</h2>

            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={formData.dropoff_verification.signature}
                  onChange={(e) =>
                    updateDropoffVerification({
                      signature: e.target.checked,
                    })
                  }
                />
                Signature requise
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={formData.dropoff_verification.picture}
                  onChange={(e) =>
                    updateDropoffVerification({
                      picture: e.target.checked,
                    })
                  }
                />
                Photo requise
              </label>
            </div>

            <div className="border rounded-md p-3 space-y-2 bg-white dark:bg-gray-900">
              <p className="font-medium text-xs">Signature requirement</p>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={
                    formData.dropoff_verification.signature_requirement.enabled
                  }
                  onChange={(e) =>
                    updateDropoffVerification({
                      signature_requirement: {
                        ...formData.dropoff_verification.signature_requirement,
                        enabled: e.target.checked,
                      },
                    })
                  }
                />
                Enabled
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={
                    formData.dropoff_verification.signature_requirement
                      .collect_signer_name
                  }
                  onChange={(e) =>
                    updateDropoffVerification({
                      signature_requirement: {
                        ...formData.dropoff_verification.signature_requirement,
                        collect_signer_name: e.target.checked,
                      },
                    })
                  }
                />
                Collect signer name
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={
                    formData.dropoff_verification.signature_requirement
                      .collect_signer_relationship
                  }
                  onChange={(e) =>
                    updateDropoffVerification({
                      signature_requirement: {
                        ...formData.dropoff_verification.signature_requirement,
                        collect_signer_relationship: e.target.checked,
                      },
                    })
                  }
                />
                Collect signer relationship
              </label>
            </div>

            <div className="border rounded-md p-3 space-y-2 bg-white dark:bg-gray-900">
              <p className="font-medium text-xs">Pincode</p>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={
                    formData.dropoff_verification.pincode?.enabled ?? false
                  }
                  onChange={(e) =>
                    updateDropoffVerification({
                      pincode: {
                        enabled: e.target.checked,
                      },
                    })
                  }
                />
                Pincode enabled
              </label>
            </div>

            <div className="border rounded-md p-3 space-y-2 bg-white dark:bg-gray-900">
              <p className="font-medium text-xs">Identification</p>
              <div className="flex flex-col gap-1 max-w-xs">
                <label className="text-xs">Minimum age</label>
                <ElInput
                  type="number"
                  value={
                    formData.dropoff_verification.identification?.min_age ?? 0
                  }
                  onChange={(e) =>
                    updateDropoffVerification({
                      identification: {
                        min_age: Number(e.target.value),
                      },
                    })
                  }
                />
              </div>
            </div>

            {/* Dropoff barcodes */}
            <div className="border rounded-md p-3 space-y-2 bg-white dark:bg-gray-900">
              <div className="flex justify-between items-center">
                <p className="font-medium text-xs">Barcodes dropoff</p>
                <button
                  type="button"
                  className="text-xs text-blue-600 underline"
                  onClick={() => addBarcode("dropoff")}
                >
                  Ajouter un barcode
                </button>
              </div>

              {formData.dropoff_verification.barcodes.map((b, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 md:grid-cols-[2fr,2fr,auto] gap-2 items-end"
                >
                  <div className="flex flex-col gap-1">
                    <label className="text-xs">Value</label>
                    <ElInput
                      value={b.value}
                      onChange={(e) =>
                        updateBarcodeArray(
                          "dropoff",
                          i,
                          "value",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs">Type</label>
                    <ElInput
                      value={b.type}
                      onChange={(e) =>
                        updateBarcodeArray("dropoff", i, "type", e.target.value)
                      }
                    />
                  </div>
                  <button
                    type="button"
                    className="text-xs text-red-600 underline"
                    onClick={() => removeBarcode("dropoff", i)}
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RETURN VERIFICATION */}
        <button
          type="button"
          className="text-blue-600 underline text-sm"
          onClick={() => setShowReturnVerif((p) => !p)}
        >
          {showReturnVerif
            ? "Masquer vérification Retour"
            : "Afficher vérification Retour"}
        </button>

        {showReturnVerif && (
          <div className="p-4 border rounded-md w-full space-y-3 bg-gray-50 dark:bg-gray-900">
            <h2 className="font-semibold text-sm">Return verification</h2>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={formData.return_verification.signature}
                onChange={(e) =>
                  updateReturnVerification({
                    signature: e.target.checked,
                  })
                }
              />
              Signature requise
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={formData.return_verification.picture}
                onChange={(e) =>
                  updateReturnVerification({
                    picture: e.target.checked,
                  })
                }
              />
              Photo requise
            </label>

            {/* Return barcodes */}
            <div className="border rounded-md p-3 space-y-2 bg-white dark:bg-gray-900">
              <div className="flex justify-between items-center">
                <p className="font-medium text-xs">Barcodes retour</p>
                <button
                  type="button"
                  className="text-xs text-blue-600 underline"
                  onClick={() => addBarcode("return")}
                >
                  Ajouter un barcode
                </button>
              </div>

              {formData.return_verification.barcodes.map((b, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 md:grid-cols-[2fr,2fr,auto] gap-2 items-end"
                >
                  <div className="flex flex-col gap-1">
                    <label className="text-xs">Value</label>
                    <ElInput
                      value={b.value}
                      onChange={(e) =>
                        updateBarcodeArray("return", i, "value", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs">Type</label>
                    <ElInput
                      value={b.type}
                      onChange={(e) =>
                        updateBarcodeArray("return", i, "type", e.target.value)
                      }
                    />
                  </div>
                  <button
                    type="button"
                    className="text-xs text-red-600 underline"
                    onClick={() => removeBarcode("return", i)}
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EXTERNAL USER INFO */}
        <button
          type="button"
          className="text-blue-600 underline text-sm"
          onClick={() => setShowExternal((p) => !p)}
        >
          {showExternal ? "Masquer infos externes" : "Afficher infos externes"}
        </button>

        {showExternal && (
          <div className="p-4 border rounded-md w-full space-y-4 bg-gray-50 dark:bg-gray-900">
            <h2 className="font-semibold text-sm">External user info</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">
                  Merchant - account created at
                </label>
                <ElInput
                  value={
                    formData.external_user_info.merchant_account
                      .account_created_at
                  }
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      external_user_info: {
                        ...prev.external_user_info,
                        merchant_account: {
                          ...prev.external_user_info.merchant_account,
                          account_created_at: e.target.value,
                        },
                      },
                    }))
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Merchant - email</label>
                <ElInput
                  value={formData.external_user_info.merchant_account.email}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      external_user_info: {
                        ...prev.external_user_info,
                        merchant_account: {
                          ...prev.external_user_info.merchant_account,
                          email: e.target.value,
                        },
                      },
                    }))
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Device ID</label>
                <ElInput
                  value={formData.external_user_info.device.id}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      external_user_info: {
                        ...prev.external_user_info,
                        device: {
                          ...prev.external_user_info.device,
                          id: e.target.value,
                        },
                      },
                    }))
                  }
                />
              </div>
            </div>
          </div>
        )}

        {/* TEST SPECIFICATIONS */}
        <button
          type="button"
          className="text-blue-600 underline text-sm"
          onClick={() => setShowTestSpecs((p) => !p)}
        >
          {showTestSpecs
            ? "Masquer test specifications"
            : "Afficher test specifications"}
        </button>

        {showTestSpecs && (
          <div className="p-4 border rounded-md w-full space-y-4 bg-gray-50 dark:bg-gray-900 max-w-sm">
            <h2 className="font-semibold text-sm">Test specifications</h2>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Robo courier mode</label>
              <ElInput
                value={
                  formData.test_specifications.robo_courier_specification.mode
                }
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    test_specifications: {
                      ...prev.test_specifications,
                      robo_courier_specification: {
                        ...prev.test_specifications.robo_courier_specification,
                        mode: e.target.value,
                      },
                    },
                  }))
                }
              />
            </div>
          </div>
        )}

        {/* OTHER FIELDS */}
        <button
          type="button"
          className="text-blue-600 underline text-sm"
          onClick={() => setShowOther((p) => !p)}
        >
          {showOther ? "Masquer autres champs" : "Afficher autres champs"}
        </button>

        {showOther && (
          <div className="w-full">
            <div className="p-4 border rounded-md w-full grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 dark:bg-gray-900">
              {[
                ["deliverable_action", "Deliverable action"],
                ["manifest_reference", "Manifest reference"],
                ["quote_id", "Quote ID"],

                ["idempotency_key", "Idempotency key"],
                ["external_store_id", "External store id"],
                ["external_id", "External id"],
              ].map(([key, label]) => (
                <div className="flex flex-col gap-1" key={key}>
                  <label className="text-sm font-medium">{label}</label>
                  <ElInput
                    value={formData[key as keyof UberFormData] as any}
                    onChange={(e) =>
                      updateField(
                        key as keyof UberFormData,
                        e.target.value as any
                      )
                    }
                  />
                </div>
              ))}

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">
                  Manifest total value
                </label>
                <ElInput
                  type="number"
                  value={formData.manifest_total_value}
                  onChange={(e) =>
                    updateField("manifest_total_value", Number(e.target.value))
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Tip</label>
                <ElInput
                  type="number"
                  value={formData.tip}
                  onChange={(e) => updateField("tip", Number(e.target.value))}
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-3">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={formData.requires_dropoff_signature}
                    onChange={(e) =>
                      updateField(
                        "requires_dropoff_signature",
                        e.target.checked
                      )
                    }
                  />
                  Requires dropoff signature
                </label>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={formData.requires_id}
                    onChange={(e) =>
                      updateField("requires_id", e.target.checked)
                    }
                  />
                  Requires ID
                </label>
              </div>
            </div>
            {[
              ["pickup_ready_dt", "Pickup ready dt"],
              ["pickup_deadline_dt", "Pickup deadline dt"],
              ["dropoff_ready_dt", "Dropoff ready dt"],
              ["dropoff_deadline_dt", "Dropoff deadline dt"],
            ].map(([key, label]) => (
              <div className="flex flex-col gap-1" key={key}>
                <label className="text-sm font-medium">{label}</label>

                <ElInput
                  type="datetime-local"
                  value={
                    formData[key as keyof UberFormData]
                      ? (formData[key as keyof UberFormData] as string)
                      : ""
                  }
                  onChange={(e) =>
                    updateField(key as keyof UberFormData, e.target.value)
                  }
                />
              </div>
            ))}
          </div>
        )}

        <ElButton label="Enregistrer / Envoyer" />
      </div>
    </form>
  );
};

export default UberForm;
