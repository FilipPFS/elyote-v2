import React from "react";
import MobileFooterAction from "./MobileFooterAction";
import { BsCart3 } from "react-icons/bs";
import Link from "next/link";
import { LuHouse } from "react-icons/lu";
import { FiUser } from "react-icons/fi";

const MobileFooterNavigation = () => {
  return (
    <div className="pb-5 w-full flex items-center justify-between px-6">
      <MobileFooterAction
        icon={<FiUser size={37} />}
        customContent={<h1>Test</h1>}
        label="Profil"
      />
      <Link href={"/"} className="flex flex-col gap-1 items-center">
        <LuHouse size={37} />
        <small>Accueil</small>
      </Link>
      <MobileFooterAction
        icon={<BsCart3 size={37} />}
        customContent={<h1>Test</h1>}
        label="Panier"
      />
    </div>
  );
};

export default MobileFooterNavigation;
