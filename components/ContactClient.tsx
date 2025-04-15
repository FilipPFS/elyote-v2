import React from "react";
import HomeBlock from "./HomeBlock";
import Search from "./Search";
import { contactList } from "@/constants";
import Link from "next/link";
import { useTranslations } from "next-intl";

const ContactClient = () => {
  const t = useTranslations("global.contactBlock");

  return (
    <HomeBlock
      title={t("title")}
      jsx={
        <section className="mt-2 flex-grow flex flex-col justify-between h-full">
          <Search placeholder={t("placeholder")} component="contact_client" />
          <div className="flex justify-between w-full xl:px-10">
            {contactList.map((item) => (
              <Link
                key={item.label}
                href={item.link}
                className="shadow-sm transition-all duration-500 hover:shadow-lg bg-white w-[30%] rounded-lg p-4 flex flex-col gap-3 items-center text-center"
              >
                <span className="text-lg sm:text-2xl">{item.icon}</span>
                <span className="max-sm:text-sm leading-none font-semibold">
                  {t(item.label)}
                </span>
              </Link>
            ))}
          </div>
          <Link href={"#"} className="self-center">
            <button className="bg-blue-700 cursor-pointer transition-all duration-500 hover:bg-blue-900 px-5 py-1.5 rounded-lg text-white">
              {t("btn")}
            </button>
          </Link>
        </section>
      }
    />
  );
};

export default ContactClient;
