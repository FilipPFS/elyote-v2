import UberForm from "@/components/Parcels/UberForm";
import React from "react";

const deliveryRequest = {
  transporteur: "uber",
  dropoff_address: "56 Avenue de la Grande Armée, 75017 Paris, France",
  dropoff_name: "M. Antoine TEST",
  dropoff_phone_number: "+33636659810",
  manifest_items: [
    {
      name: "Tablette de chocolat",
      quantity: 34,
      size: "medium",
      dimensions: {
        length: 20,
        height: 5,
        depth: 2,
      },
      price: 100,
      must_be_upright: false,
      weight: 1,
      vat_percentage: 20,
    },
    {
      name: "Bouteille de vin",
      quantity: 1,
      size: "xlarge",
      dimensions: {
        length: 30,
        height: 40,
        depth: 10,
      },
      price: 1500,
      must_be_upright: true,
      weight: 3,
      vat_percentage: 20,
    },
    {
      name: "Tablette de chocolat",
      quantity: 34,
      size: "medium",
      dimensions: {
        length: 20,
        height: 5,
        depth: 2,
      },
      price: 100,
      must_be_upright: false,
      weight: 1,
      vat_percentage: 20,
    },
    {
      name: "Bouteille de vin",
      quantity: 1,
      size: "xlarge",
      dimensions: {
        length: 30,
        height: 40,
        depth: 10,
      },
      price: 1500,
      must_be_upright: true,
      weight: 3,
      vat_percentage: 20,
    },
  ],
  pickup_address: "27 Rue de Rivoli, 75001 Paris, France",
  pickup_name: "Magasin Rivoli",
  pickup_phone_number: "+33644778899",
  pickup_business_name: "Boutique Parisienne",
  pickup_latitude: 48.85545,
  pickup_longitude: 2.36418,
  pickup_notes: "Préparer la commande dans l'heure",
  pickup_verification: {
    signature: true,
    signature_requirement: {
      enabled: true,
      collect_signer_name: true,
      collect_signer_relationship: false,
    },
    barcodes: [
      {
        value: "PKG123456789",
        type: "CODE128",
      },
      {
        value: "PKG987654321",
        type: "CODE128",
      },
    ],
    picture: false,
  },
  dropoff_business_name: "Client final",
  dropoff_latitude: 48.87649,
  dropoff_longitude: 2.29521,
  dropoff_notes: "Appeler 10 minutes avant arrivée",
  dropoff_seller_notes: "Livrer entre 16:45 et 17:40",
  dropoff_verification: {
    signature: true,
    signature_requirement: {
      enabled: true,
      collect_signer_name: true,
      collect_signer_relationship: true,
    },
    barcodes: [
      {
        value: "DLV123456789",
        type: "CODE39",
      },
      {
        value: "DLVQR123456",
        type: "QR",
      },
    ],
    pincode: {
      enabled: false,
    },
    identification: {
      min_age: 18,
    },
    picture: true,
  },
  deliverable_action: "deliverable_action_meet_at_door",
  manifest_reference: "Cmd302936779",
  manifest_total_value: 59,
  quote_id: "dqt_070YiYr-SE2J7sYX976uqQ",
  // undeliverable_action: "leave_at_door",  // commented out in original
  pickup_ready_dt: "2025-11-20T16:30:00+01:00",
  pickup_deadline_dt: "2025-11-20T17:00:00+01:00",
  dropoff_ready_dt: "2025-11-20T16:45:00+01:00",
  dropoff_deadline_dt: "2025-11-20T17:40:00+01:00",
  requires_dropoff_signature: true,
  requires_id: false,
  tip: 0,
  idempotency_key: "unique-idempotency-key-12345",
  external_store_id: "store_fr_123",
  return_verification: {
    signature: false,
    signature_requirement: {
      enabled: false,
      collect_signer_name: false,
      collect_signer_relationship: false,
    },
    barcodes: [
      {
        value: "test",
        type: "CODE39",
      },
      {
        value: "test1",
        type: "QR",
      },
    ],
    picture: false,
  },
  external_user_info: {
    merchant_account: {
      account_created_at: "2023-01-01T00:00:00Z",
      email: "aa@elyote.com",
    },
    device: {
      id: "device-xyz-987",
    },
  },
  external_id: "order-external-id-123456",
  test_specifications: {
    robo_courier_specification: {
      mode: "auto",
    },
  },
};

const UberShip = () => {
  return (
    <div>
      <UberForm />
    </div>
  );
};

export default UberShip;
