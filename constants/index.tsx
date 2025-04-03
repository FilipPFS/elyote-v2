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
    label: "Dashboard",
    subLinks: [],
    icon: <RxDashboard />,
  },
  {
    link: "/cartes-copies",
    label: "Cartes Copies",
    subLinks: [
      { label: "Liste des cartes", link: "/cartes-copies/liste" },
      { label: "Ajouter une carte", link: "/cartes-copies/ajout" },
      {
        label: "Caisse de l’espace service",
        link: "/cartes-copies/espaces-service",
      },
      {
        label: "Simply Copie - Compteur des copies",
        link: "/cartes-copies/simplycopy",
      },
    ],
    icon: <LuClipboardList />,
  },
  {
    link: "/bmi",
    label: "Espace BMI",
    subLinks: [
      { label: "Rachat Livre de police", link: "/bmi/livre-de-police" },
      { label: "Rachat Cartouche", link: "/bmi/retour/cartouche" },
      { label: "Retour Produit", link: "/bmi/retour/produit" },
      { label: "Comparatif d’imprimantes et conso", link: "/bmi/comparatif" },
      { label: "Assistant à la commande d’articles BI", link: "/bmi/cmd-bi" },
    ],
    icon: <RiComputerLine />,
  },
  {
    link: "/balisage",
    label: "Balisage",
    subLinks: [],
    icon: <RiGalleryLine />,
  },
  {
    link: "/communication",
    label: "Contact Client",
    subLinks: [
      { label: "Gestion Contact", link: "/communication/liste" },
      { label: "SMS", link: "/communication/sms" },
      { label: "Tel", link: "/communication/tel" },
      { label: "Email", link: "/communication/email" },
    ],
    icon: <FiSmartphone />,
  },
  {
    link: "/identifiants",
    label: "Identifiants",
    subLinks: [
      { label: "Liste des identifiants", link: "/identifiants/liste" },
      { label: "Ajouter un identifiant", link: "/identifiants/ajout" },
    ],
    icon: <GiSpy />,
  },
  {
    link: "/repertoire",
    label: "Répertoire",
    subLinks: [
      { label: "Liste des contacts", link: "/repertoire/liste" },
      { label: "Ajouter un contact", link: "/repertoire/ajout" },
    ],
    icon: <LuIdCard />,
  },
  {
    link: "/sav",
    label: "SAV",
    subLinks: [],
    icon: <FiTool />,
  },
  {
    link: "/parc-materiel",
    label: "Parc Matériel",
    subLinks: [
      { label: "Liste du matériel", link: "/parc-materiel/liste" },
      { label: "Ajouter un matériel", link: "/parc-materiel/ajout" },
    ],
    icon: <LuPrinter />,
  },
  {
    link: "/locations",
    label: "Location",
    subLinks: [
      { label: "Liste des locations", link: "/locations/liste" },
      { label: "Ajouter une location", link: "/locations/ajout" },
    ],
    icon: <GrCubes />,
  },
  {
    link: "/cmd",
    label: "Commandes",
    subLinks: [
      { label: "Cahier des commandes", link: "/cmd/cahier" },
      { label: "Commandes Listes Scolaires", link: "/cmd/rdc-liste" },
      { label: "Commandes Click & Collect", link: "/cmd/click-collect-liste" },
      { label: "Commandes Espaces Services", link: "/cmd/print-liste" },
      { label: "Colis & Expéditions", link: "/cmd/colis" },
    ],
    icon: <FaBarcode />,
  },
  {
    link: "/outils",
    label: "Outils",
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
