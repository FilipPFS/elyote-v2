import { FaBarcode } from "react-icons/fa6";
import { FiSmartphone, FiTool } from "react-icons/fi";
import { GiSpy } from "react-icons/gi";
import { GrCubes } from "react-icons/gr";
import { LuClipboardList, LuIdCard, LuPrinter } from "react-icons/lu";
import { PiBag } from "react-icons/pi";
import { RiComputerLine, RiGalleryLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";

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
      { label: "Ajouter une carte", link: "#" },
      { label: "Caisse de l’espace service", link: "#" },
      { label: "Simply Copie - Compteur des copies", link: "#" },
    ],
    icon: <LuClipboardList />,
  },
  {
    link: "#",
    label: "Espace BMI",
    subLinks: [
      { label: "Rachat Livre de police", link: "#" },
      { label: "Rachat Cartouche", link: "#" },
      { label: "Retour Produit", link: "#" },
      { label: "Comparatif d’imprimantes et conso", link: "#" },
      { label: "Assistant à la commande d’articles BI", link: "#" },
    ],
    icon: <RiComputerLine />,
  },
  {
    link: "#",
    label: "Balisage",
    subLinks: [],
    icon: <RiGalleryLine />,
  },
  {
    link: "#",
    label: "Contact Client",
    subLinks: [
      { label: "Gestion Contact", link: "#" },
      { label: "SMS", link: "#" },
      { label: "Tel", link: "#" },
      { label: "Email", link: "#" },
    ],
    icon: <FiSmartphone />,
  },
  {
    link: "#",
    label: "Identifiants",
    subLinks: [
      { label: "Liste des identifiants", link: "#" },
      { label: "Ajouter un identifiant", link: "#" },
    ],
    icon: <GiSpy />,
  },
  {
    link: "#",
    label: "Répertoire",
    subLinks: [
      { label: "Liste des contacts", link: "#" },
      { label: "Ajouter un contact", link: "#" },
    ],
    icon: <LuIdCard />,
  },
  {
    link: "#",
    label: "SAV",
    subLinks: [],
    icon: <FiTool />,
  },
  {
    link: "#",
    label: "Parc Matériel",
    subLinks: [
      { label: "Liste du matériel", link: "#" },
      { label: "Ajouter un matériel", link: "#" },
    ],
    icon: <LuPrinter />,
  },
  {
    link: "#",
    label: "Location",
    subLinks: [
      { label: "Liste des locations", link: "#" },
      { label: "Ajouter une location", link: "#" },
    ],
    icon: <GrCubes />,
  },
  {
    link: "#",
    label: "Commandes",
    subLinks: [
      { label: "Cahier des commandes", link: "#" },
      { label: "Commandes Listes Scolaires", link: "#" },
      { label: "Commandes Click & Collect", link: "#" },
      { label: "Commandes Espaces Services", link: "#" },
      { label: "Colis & Expéditions", link: "#" },
    ],
    icon: <FaBarcode />,
  },
  {
    link: "#",
    label: "Outils",
    subLinks: [],
    icon: <PiBag />,
  },
];
