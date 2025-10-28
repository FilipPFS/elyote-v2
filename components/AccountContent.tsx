"use client";

import { accountLinks } from "@/constants";
import { signOut } from "@/lib/actions/actions.global";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const AccountContent = ({ setOpen }: Props) => {
  const router = useRouter();
  const t = useTranslations("global.accountLinks");

  const handleLogOut = async () => {
    const res = await signOut();

    if (res?.success) {
      router.push("/sign-in");
    }
  };

  return (
    <div className="py-6 sm:py-3">
      <section className="flex items-start flex-col w-full gap-2">
        {accountLinks.map((item) => (
          <Link
            key={item.key}
            href={item.link}
            onClick={setOpen ? () => setOpen(false) : undefined}
            className="font-semibold transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 w-full px-4 p-1.5 rounded-sm"
          >
            {t(item.key)}
          </Link>
        ))}
        <button
          onClick={handleLogOut}
          className="font-semibold transition-all duration-300 hover:bg-blue-700 hover:text-white w-full px-4 p-1.5 rounded-sm text-left cursor-pointer"
        >
          {t("logout")}
        </button>
      </section>
    </div>
  );
};

export default AccountContent;
