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
  password: string;
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
  deposit: number;
  state?: number;
  value?: string;
  client_type: string;
};
