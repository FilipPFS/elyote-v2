"use client";

import Image from "next/image";
import { GoBell } from "react-icons/go";
import MobileSidebar from "./MobileSidebar";
import LanguageSwitcher from "../LanguageSwitcher";
import { Link } from "@/i18n/navigation";

const MobileHeader = () => {
  return (
    <div className="sticky z-[20] top-0 flex items-center bg-white justify-between sm:hidden h-[100px] px-7">
      <MobileSidebar />
      <Link href={"/"}>
        <Image
          src={"/logo_mobile.png"}
          alt="mobile logo"
          width={120}
          height={120}
        />
      </Link>
      <div className="flex gap-3 items-center">
        <button>
          <GoBell size={30} />
        </button>
        <LanguageSwitcher />
      </div>
    </div>
  );
};

export default MobileHeader;
