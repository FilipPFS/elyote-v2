import { accountLinks } from "@/constants";
import Link from "next/link";
import React from "react";

type Props = {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const AccountContent = ({ setOpen }: Props) => {
  return (
    <div className="p-6 sm:p-3">
      <section className="flex items-start flex-col gap-2">
        {accountLinks.map((item) => (
          <Link
            key={item.label}
            href={item.link}
            onClick={setOpen ? () => setOpen(false) : undefined}
            className="font-semibold hover:text-blue-900"
          >
            {item.label}
          </Link>
        ))}
        <button className="font-semibold  hover:text-blue-900">
          Déconnexion
        </button>
      </section>
    </div>
  );
};

export default AccountContent;
