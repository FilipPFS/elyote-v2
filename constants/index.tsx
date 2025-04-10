import { FiPhone, FiSmartphone, FiTool } from "react-icons/fi";
import { GiSpy } from "react-icons/gi";
import { GrCubes } from "react-icons/gr";
import { IoMailOutline } from "react-icons/io5";
import { LuClipboardList, LuIdCard, LuPrinter } from "react-icons/lu";
import { PiBag } from "react-icons/pi";
import { RiComputerLine, RiGalleryLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { FaBarcode, FaRegCalendar } from "react-icons/fa6";
import { FiSearch, FiTruck, FiUser } from "react-icons/fi";
import { BiCube } from "react-icons/bi";
import { tableHeader } from "@/types";

export const navItems = [
  {
    link: "/",
    labelKey: "dashboard", // Use a key instead of "Dashboard"
    subLinks: [],
    icon: <RxDashboard />,
  },
  {
    link: "/cartes-copies",
    labelKey: "cartesCopies",
    subLinks: [
      { labelKey: "cartesCopies_list", link: "/cartes-copies/liste" },
      { labelKey: "cartesCopies_add", link: "/cartes-copies/ajout" },
      {
        labelKey: "cartesCopies_serviceDesk",
        link: "/cartes-copies/espaces-service",
      },
      {
        labelKey: "cartesCopies_simplyCopy",
        link: "/cartes-copies/simplycopy",
      },
    ],
    icon: <LuClipboardList />,
  },
  {
    link: "/bmi",
    labelKey: "bmi",
    subLinks: [
      { labelKey: "bmi_policeBook", link: "/bmi/livre-de-police" },
      { labelKey: "bmi_cartridgeReturn", link: "/bmi/retour/cartouche" },
      { labelKey: "bmi_productReturn", link: "/bmi/retour/produit" },
      { labelKey: "bmi_printerComparison", link: "/bmi/comparatif" },
      { labelKey: "bmi_biOrderAssistant", link: "/bmi/cmd-bi" },
    ],
    icon: <RiComputerLine />,
  },
  {
    link: "/balisage",
    labelKey: "balisage",
    subLinks: [],
    icon: <RiGalleryLine />,
  },
  {
    link: "/communication",
    labelKey: "communication",
    subLinks: [
      { labelKey: "communication_manage", link: "/communication/liste" },
      { labelKey: "communication_sms", link: "/communication/sms" },
      { labelKey: "communication_phone", link: "/communication/tel" },
      { labelKey: "communication_email", link: "/communication/email" },
    ],
    icon: <FiSmartphone />,
  },
  {
    link: "/identifiants",
    labelKey: "identifiants",
    subLinks: [
      { labelKey: "identifiants_list", link: "/identifiants/liste" },
      { labelKey: "identifiants_add", link: "/identifiants/ajout" },
    ],
    icon: <GiSpy />,
  },
  {
    link: "/repertoire",
    labelKey: "repertoire",
    subLinks: [
      { labelKey: "repertoire_list", link: "/repertoire/liste" },
      { labelKey: "repertoire_add", link: "/repertoire/ajout" },
    ],
    icon: <LuIdCard />,
  },
  {
    link: "/sav",
    labelKey: "sav",
    subLinks: [],
    icon: <FiTool />,
  },
  {
    link: "/parc-materiel",
    labelKey: "parcMateriel",
    subLinks: [
      { labelKey: "parcMateriel_list", link: "/parc-materiel/liste" },
      { labelKey: "parcMateriel_add", link: "/parc-materiel/ajout" },
    ],
    icon: <LuPrinter />,
  },
  {
    link: "/locations",
    labelKey: "locations",
    subLinks: [
      { labelKey: "locations_list", link: "/locations/liste" },
      { labelKey: "locations_add", link: "/locations/ajout" },
    ],
    icon: <GrCubes />,
  },
  {
    link: "/cmd",
    labelKey: "commandes",
    subLinks: [
      { labelKey: "commandes_orderBook", link: "/cmd/cahier" },
      { labelKey: "commandes_schoolLists", link: "/cmd/rdc-liste" },
      {
        labelKey: "commandes_clickCollect",
        link: "/cmd/click-collect-liste",
      },
      { labelKey: "commandes_serviceSpaces", link: "/cmd/print-liste" },
      { labelKey: "commandes_shipping", link: "/cmd/colis" },
    ],
    icon: <FaBarcode />,
  },
  {
    link: "/outils",
    labelKey: "outils",
    subLinks: [],
    icon: <PiBag />,
  },
];

export const accountLinks = [
  {
    link: "#",
    label: "Mes Factures",
  },
  {
    link: "#",
    label: "Statistiques",
  },
  {
    link: "#",
    label: "Réglage de mon profil",
  },
  {
    link: "#",
    label: "Mes envois vers sdp",
  },
  {
    link: "#",
    label: "Aide",
  },
];

export const scanData = {
  id: 1,
  img: "/hp.jpg",
  bvCode: 1979,
  title: "HP 56 - noir - cartouche d'encre originale",
  ttcPrice: "N/A",
  htPrice: "N/A",
  ecoTaxe: "N/A",
  tvaPrice: "N/A",
  quantity: 2,
};

export const contactList = [
  {
    label: "Envoyer un SMS",
    link: "/communication/sms",
    icon: <FiSmartphone />,
  },
  {
    label: "Envoyer un mail",
    link: "/communication/email",
    icon: <IoMailOutline />,
  },
  {
    label: "Enregistrer un appel",
    link: "/communication/tel",
    icon: <FiPhone />,
  },
];

export const markingCards = Array.from({ length: 12 }, (_, i) => ({
  title: `Affiche Numéro ${i + 1}`,
  link: "/balisage",
  img: "/affiche_1.png",
}));

export const orderTableHeaders: tableHeader[] = [
  { label: "Numéro", icon: <FaBarcode /> },
  { label: "Client", icon: <FiUser /> },
  { label: "Date de commande", icon: <FaRegCalendar /> },
  { label: "Nombre de colis", icon: <BiCube /> },
  { label: "Statut", icon: <FiTruck /> },
  { label: "Action", icon: <FiSearch />, classNames: "justify-end" }, // Align right for Action
];

export const passwordTableHeaders: tableHeader[] = [
  { label: "site", icon: <FaBarcode /> },
  { label: "login", icon: <FiUser /> },
  { label: "access", icon: <FaRegCalendar /> },
  { label: "action", icon: <FiSearch /> }, // Align right for Action
];

export const orderTableFilters = [
  {
    label: "Numéro",
    options: [
      {
        label: "Item 1",
        value: "item_1",
      },
      {
        label: "Item 2",
        value: "item_2",
      },
      {
        label: "Item 3",
        value: "item_3",
      },
    ],
  },
  {
    label: "Client",
    options: [
      {
        label: "Item 1",
        value: "item_1",
      },
      {
        label: "Item 2",
        value: "item_2",
      },
      {
        label: "Item 3",
        value: "item_3",
      },
    ],
  },
  {
    label: "Date de la commande",
    options: [
      {
        label: "Item 1",
        value: "item_1",
      },
      {
        label: "Item 2",
        value: "item_2",
      },
      {
        label: "Item 3",
        value: "item_3",
      },
    ],
  },
  {
    label: "Nombre d'articles différents",
    options: [
      {
        label: "Item 1",
        value: "item_1",
      },
      {
        label: "Item 2",
        value: "item_2",
      },
      {
        label: "Item 3",
        value: "item_3",
      },
    ],
  },
  {
    label: "Statut",
    options: [
      {
        label: "Item 1",
        value: "item_1",
      },
      {
        label: "Item 2",
        value: "item_2",
      },
      {
        label: "Item 3",
        value: "item_3",
      },
    ],
  },
  {
    label: "Action",
    options: [
      {
        label: "Item 1",
        value: "item_1",
      },
      {
        label: "Item 2",
        value: "item_2",
      },
      {
        label: "Item 3",
        value: "item_3",
      },
    ],
  },
];
