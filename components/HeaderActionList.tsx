import React from "react";
import HeaderIcon from "./HeaderIcon";
import { FiBell, FiUser } from "react-icons/fi";
import { BsCart3 } from "react-icons/bs";
import CustomModal from "./CustomModal";
import { FaCircleQuestion } from "react-icons/fa6";
import { LuScanLine } from "react-icons/lu";
import CartContent from "./CartContent";
import AccountContent from "./AccountContent";
import ScanContent from "./ScanContent";
import { cartData } from "@/constants/data";
import LanguageSwitcher from "./LanguageSwitcher";
import { IoSearch } from "react-icons/io5";
import Search from "./Search";
import { useTranslations } from "next-intl";

const HeaderActionList = () => {
  const tSearch = useTranslations("global.globalSearch");
  const tNotifications = useTranslations("global.notifications");

  return (
    <div className="flex items-center gap-10">
      <CustomModal
        icon={<FaCircleQuestion size={25} className="text-blue-700" />}
        title="Alerte"
        customContent={
          <div>
            <p>
              Exceptionnellement l'atelier Elyote pour BV ouro lieu ce Jeudi de
              13h ô 15h Pour vous connecter, cliquez sur le lien ci-dessous ou
              rendez-vous sur l'adresse suivante: https://meet.google.com/zvd
            </p>
          </div>
        }
      />
      <CustomModal
        icon={<IoSearch size={25} />}
        title={tSearch("title")}
        customContent={<Search placeholder={tSearch("placeholder")} />}
      />
      <HeaderIcon
        icon={<BsCart3 size={25} />}
        customContent={<CartContent />}
        notification={
          cartData.length > 0 ? (
            <div className="absolute top-[-9px] text-sm right-[-9px] flex items-center justify-center bg-blue-700 h-5 w-5 text-white rounded-full">
              {cartData.length}
            </div>
          ) : (
            ""
          )
        }
      />
      <HeaderIcon
        icon={<LuScanLine size={25} />}
        customContent={<ScanContent />}
      />
      <HeaderIcon
        icon={<FiBell size={25} />}
        customContent={
          <div>
            <h1>{tNotifications("title")}</h1>
          </div>
        }
      />
      <HeaderIcon
        icon={<FiUser size={25} />}
        customContent={<AccountContent />}
      />
      <LanguageSwitcher />
    </div>
  );
};

export default HeaderActionList;
