import { FaBarcode, FaClipboardList } from "react-icons/fa6";
import { FiSmartphone, FiTool } from "react-icons/fi";
import { GiSpy } from "react-icons/gi";
import { GrCubes } from "react-icons/gr";
import { LuIdCard, LuPrinter } from "react-icons/lu";
import { PiBag } from "react-icons/pi";
import { RiComputerLine, RiGalleryLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";

export const navItems = [
  {
    link: "#",
    label: "Dashboard",
    subLinks: [],
    icon: <RxDashboard />,
  },
  {
    link: "#",
    label: "Espace Services",
    subLinks: [
      { label: "Liste des cartes", link: "#" },
      { label: "Ajouter une carte", link: "#" },
      { label: "Caisse de l’espace service", link: "#" },
      { label: "Simply Copie - Compteur des copies", link: "#" },
    ],
    icon: <FaClipboardList />,
  },
  {
    link: "#",
    label: "Espace BMI",
    subLinks: [],
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
    subLinks: [],
    icon: <FiSmartphone />,
  },
  {
    link: "#",
    label: "Identifiants",
    subLinks: [],
    icon: <GiSpy />,
  },
  {
    link: "#",
    label: "Répertoire",
    subLinks: [],
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
    subLinks: [],
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
    subLinks: [],
    icon: <FaBarcode />,
  },
  {
    link: "#",
    label: "Outil",
    subLinks: [],
    icon: <PiBag />,
  },
];
