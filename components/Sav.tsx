import React from "react";
import HomeBlock from "./HomeBlock";
import { savData } from "@/constants/data";
import { FiPrinter } from "react-icons/fi";
import { IoCameraOutline } from "react-icons/io5";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import clsx from "clsx";
import { useTranslations } from "next-intl";

const Sav = () => {
  const t = useTranslations("global.afterSaleServiceBlock");
  return (
    <HomeBlock
      title={t("title")}
      jsx={
        <section className="mt-2 flex flex-col gap-2">
          {savData.map((item) => (
            <div key={item.date} className="flex flex-col gap-2">
              <span className="text-gray-400">{item.date}</span>
              <div>
                {item.items.length > 0 &&
                  item.items.map((el) => (
                    <div
                      key={el.id}
                      className="flex items-center justify-between "
                    >
                      <div className="flex items-center w-[50%] gap-4">
                        {el.type === "Imprimante" && (
                          <FiPrinter className="text-xl sm:text-2xl" />
                        )}
                        {el.type === "Camera" && (
                          <IoCameraOutline className="text-xl sm:text-2xl" />
                        )}
                        <div>
                          <h2 className="text-sm sm:text-[15px] font-semibold">
                            {el.name}
                          </h2>
                          <small className="text-gray-400 text-[11px] sm:text-sm">
                            {el.fullDate}
                          </small>
                        </div>
                      </div>
                      <small className="flex items-center justify-start w-32 gap-2">
                        <span
                          className={clsx(
                            "block w-2 h-2 rounded-full",
                            el.status === "En attente" && "bg-orange-400",
                            el.status === "A faire" && "bg-red-600"
                          )}
                        />
                        {el.status}
                      </small>
                      <Link
                        href={"#"}
                        className="transition-all duration-300 hover:rotate-45 hover:text-blue-600"
                      >
                        <MdArrowOutward size={25} />
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </section>
      }
    />
  );
};

export default Sav;
