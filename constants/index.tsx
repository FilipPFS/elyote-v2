import { FiPhone, FiSmartphone, FiTool } from "react-icons/fi";
import { GiSpy } from "react-icons/gi";
import { GrCubes } from "react-icons/gr";
import { IoMailOutline } from "react-icons/io5";
import { LuClipboardList, LuIdCard, LuPrinter } from "react-icons/lu";
import { PiBag, PiIdentificationBadge } from "react-icons/pi";
import { RiComputerLine, RiGalleryLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { FaBarcode, FaRegCalendar, FaRegHandshake } from "react-icons/fa6";
import { FiSearch, FiTruck, FiUser } from "react-icons/fi";
import { BiCalendarAlt, BiCalendarCheck, BiCube } from "react-icons/bi";
import { tableHeader } from "@/types";
import {
  MdDevices,
  MdOutlineLock,
  MdOutlineLockClock,
  MdOutlineRadio,
  MdOutlineRadioButtonChecked,
  MdOutlineTag,
} from "react-icons/md";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { CgOptions } from "react-icons/cg";

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
    key: "invoices",
  },
  {
    link: "#",
    key: "statistics",
  },
  {
    link: "#",
    key: "profileSettings",
  },
  {
    link: "#",
    key: "sdpShipments",
  },
  {
    link: "#",
    key: "help",
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
    label: "sms",
    link: "/communication/sms",
    icon: <FiSmartphone />,
  },
  {
    label: "mail",
    link: "/communication/email",
    icon: <IoMailOutline />,
  },
  {
    label: "call",
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
  { label: "number", icon: <FaBarcode /> },
  { label: "client", icon: <FiUser /> },
  { label: "orderDate", icon: <FaRegCalendar /> },
  { label: "packageCount", icon: <BiCube /> },
  { label: "status", icon: <FiTruck /> },
  { label: "action", icon: <FiSearch />, classNames: "justify-end" },
];

export const passwordTableHeaders: tableHeader[] = [
  { label: "site", icon: <FaBarcode /> },
  { label: "login", icon: <FiUser /> },
  { label: "access", icon: <MdOutlineLock /> },
  { label: "action", icon: <FiSearch /> }, // Align right for Action
];

export const contactsTableHeaders: tableHeader[] = [
  { label: "corporateName", icon: <HiOutlineBuildingOffice /> },
  { label: "firstName", icon: <PiIdentificationBadge /> },
  { label: "lastName", icon: <PiIdentificationBadge /> },
  { label: "access", icon: <MdOutlineLock /> },
  { label: "action", icon: <FiSearch /> }, // Align right for Action
];

export const materialTableHeaders: tableHeader[] = [
  { label: "id", icon: <MdOutlineTag /> },
  { label: "name", icon: <MdDevices /> },
  { label: "type", icon: <CgOptions /> },
  { label: "availableForLoan", icon: <FaRegHandshake /> },
  { label: "availableForRent", icon: <FaRegHandshake /> },
  { label: "status", icon: <MdOutlineRadioButtonChecked /> },
  { label: "action", icon: <FiSearch /> },
];

export const rentalsTableHeaders: tableHeader[] = [
  { label: "customer", icon: <MdOutlineTag /> },
  { label: "material", icon: <MdDevices /> },
  { label: "startDate", icon: <BiCalendarAlt /> },
  { label: "endDate", icon: <BiCalendarCheck /> },
  { label: "status", icon: <MdOutlineRadioButtonChecked /> },
  { label: "action", icon: <FiSearch /> },
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

export const filterContactOptions = [
  {
    label: "all",
    filterKey: "all",
  },
  {
    label: "corporateName",
    filterKey: "corporate_name",
  },
  {
    label: "firstName",
    filterKey: "firstname",
  },
  {
    label: "lastName",
    filterKey: "lastname",
  },
  {
    label: "access",
    filterKey: "access_level",
  },
];
