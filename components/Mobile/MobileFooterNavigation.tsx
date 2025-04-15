"use client";

import React, { useState } from "react";
import MobileFooterAction from "./MobileFooterAction";
import { BsCart3 } from "react-icons/bs";
import { LuHouse } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import CartContent from "../CartContent";
import AccountContent from "../AccountContent";
import Link from "next/link";
const MobileFooterNavigation = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [accountLinksOpen, setAccountLinksOpen] = useState(false);
  return (
    <div className="pb-5 w-full flex items-center justify-between px-6">
      <MobileFooterAction
        open={accountLinksOpen}
        setOpen={setAccountLinksOpen}
        icon={<FiUser size={25} />}
        customContent={<AccountContent setOpen={setAccountLinksOpen} />}
        label="Profil"
      />
      <Link href={"/"} className="flex flex-col gap-1 items-center">
        <LuHouse size={25} />
        <small>Accueil</small>
      </Link>
      <MobileFooterAction
        open={cartOpen}
        setOpen={setCartOpen}
        icon={<BsCart3 size={25} />}
        customContent={<CartContent setOpen={setCartOpen} />}
        label="Panier"
      />
    </div>
  );
};

export default MobileFooterNavigation;
