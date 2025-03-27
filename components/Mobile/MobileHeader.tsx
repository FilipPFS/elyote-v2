"use client";

import Image from "next/image";
import { useState } from "react";
import { GoBell } from "react-icons/go";
import { HiBars3 } from "react-icons/hi2";
import Link from "next/link";
import MobileSidebar from "./MobileSidebar";

const MobileHeader = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <div className="sticky top-0 flex items-center bg-white justify-between sm:hidden h-[100px] px-7">
        <button onClick={() => setIsVisible((prev) => !prev)}>
          <HiBars3 size={35} />
        </button>
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
      <MobileSidebar isVisible={isVisible} setIsVisible={setIsVisible} />
    </>
  );
};

export default MobileHeader;
