import { JSX } from "react";

export interface BlockCardData {
  object: string;
  date: string;
  items: {
    type: string;
    name?: string;
    status: string;
    fullDate: string;
    id: number;
  }[];
}

export type SearchParamProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type tableHeader = {
  label: string;
  icon: JSX.Element;
  classNames?: string;
};

export interface UserSettings {
  selection_cards_accueil?: string[];
  [key: string]: any;
}

export type PasswordData = {
  id: number;
  customer_id: string;
  site: string;
  url: string;
  login: string;
  password: string | boolean;
  access_level: number;
  client_type: string;
  additional_data: string;
};

export type ContactData = {
  id: number;
  customer_id: string;
  corporate_name: string;
  lastname: string;
  firstname: string;
  email: string;
  landline: string;
  mobile: string;
  access_level: number;
  client_type: string;
  additional_data: string;
};

export type MaterialData = {
  id: number;
  customer_id: string;
  name: string;
  type: string;
  lend: number;
  rent: number;
  daily_rate: number;
  deposit: string;
  state?: number;
  value?: string;
  client_type: string;
};

export type RentalData = {
  id: number;
  created_at: string;
  deleted_at: string | null;
  customer_id: string;
  id_material: number;
  client: string;
  client_city: string;
  email: string;
  phone: string;
  accessories: string;
  comment: string;
  deposit: string;
  rental_price: string;
  acompte: string;
  status: number;
  start_date: string;
  end_date: string;
  client_type: string;
};

export type RentalQuery = {
  id: number;
  name: string;
  daily_rate: string;
};

export type SavData = {
  id: number;
  customer_id: string;
  user_id: string;
  code_sav: string;
  client: string;
  supplier: string;
  sku: string;
  product: string;
  warranty: string;
  date_purchase: string;
  bill_number: string;
  serial_number: string;
  material_state: string;
  description: string;
  accessories: string;
  comment: string;
  attachment: string[];
  email: string;
  phone: string;
  lend_machine: string;
  status: string;
  deadline: number;
  created_at: string;
  updated_at: string;
};

export type SavEvolutionData = {
  id: number;
  sav_id: number;
  customer_id: number;
  user_id: number;
  status: number;
  details: string;
  created_at: string;
};

export type CustomSavStatus = {
  id: number;
  customer_id: number;
  statut: string;
  soft_delete: string;
  color_background: string;
  color_font: string;
};

export type PdfType = {
  pdfType: "SAV" | "Rental";
  content: Record<string, unknown> | Array<Record<string, unknown>>;
  type: string;
  template_id: string;
  resolution_dpi: number;
  template_name: string;
  template_title: string;
};

export type PrintSettings = {
  color?: string | number;
  option: string;
  computer_name?: string;
  format?: string;
  orientation?: string;
  printer_name?: string;
  scale?: string;
  side?: string;
  module?: string;
};

export type PrinterFormUpdateData = {
  computer_name: string;
  printer_name: string;
  module: string | undefined;
  format: string;
  color: string | number;
  orientation: string;
  scale: string;
  side: string;
};

export type Computer = {
  name: string;
  printers?: {
    [printerName: string]: {
      paperFormats: string[];
      status: string;
    };
  };
  settings: {
    print: boolean;
    web: boolean;
    copy: boolean;
  };
  notifications: {
    web: {
      sound: string;
      show_message: boolean;
    };
    service: {
      sound: string;
      show_message: boolean;
    };
  };
  last_seen?: string;
};

export type PrintRequestData = {
  module: string;
  computer_name: string;
  printer_name: string;
  paper_format: string;
  print_color: string;
  paper_quantity: string;
  paper_orientation: string;
  paper_side: string;
  paper_scale: string;
  url: string;
};

export type PrintHistory = {
  print_history_id: number;
  computer_name: string;
  printer_name: string;
  token: string;
  module: string;
  file: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type PackageData = {
  id: number;
  parent_type: string;
  parent_id: string;
  customer_id: number;
  statut: number;
  items_qty: number;
  emplacement: string;
  entrepot_id: number;
  date_creation: string; // or Date if you're converting it
  date_maj: string; // or Date
  date_livraison: string | null; // nullable
};
