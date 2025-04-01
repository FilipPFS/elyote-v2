"use client";

import Image from "next/image";
import { GoBell } from "react-icons/go";
import Link from "next/link";
import MobileSidebar from "./MobileSidebar";

const MobileHeader = () => {
  return (
    <div className="sticky z-[100] top-0 flex items-center bg-white justify-between sm:hidden h-[100px] px-7">
      <MobileSidebar />
      <Link href={"/"}>
        <Image
          src={"/logo_mobile.png"}
          alt="mobile logo"
          width={150}
          height={150}
        />
      </Link>
      <button>
        <GoBell size={35} />
      </button>
    </div>
  );
};

export default MobileHeader;
