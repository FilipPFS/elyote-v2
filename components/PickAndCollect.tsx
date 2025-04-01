import { pickCollectData } from "@/constants/data";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { FiTruck } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
import HomeBlock from "./HomeBlock";

const PickAndCollect = () => {
  return (
    <HomeBlock
      title="Pick & Collect"
      jsx={
        <section className="mt-5 flex flex-col gap-5">
          {pickCollectData.map((item) => (
            <div key={item.date} className="flex flex-col gap-3">
              <span className="text-gray-400">{item.date}</span>
              <div>
                {item.items.length > 0 &&
                  item.items.map((el) => (
                    <div
                      key={el.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        {el.type === "Livraison" && (
                          <FiTruck className="text-xl sm:text-2xl" />
                        )}
                        {el.type === "Retrait" && (
                          <IoCartOutline className="text-xl sm:text-2xl" />
                        )}
                        <div>
                          <h2 className="text-sm sm:text-lg font-semibold">
                            {el.type}
                          </h2>
                          <small className="text-gray-400 text-[11px] sm:text-sm">
                            {el.fullDate}
                          </small>
                        </div>
                      </div>
                      <small className="flex items-center gap-2">
                        <span
                          className={clsx(
                            "block w-2 h-2 rounded-full",
                            el.status === "En cours"
                              ? "bg-orange-400"
                              : "bg-green-500"
                          )}
                        />
                        {el.status}
                      </small>
                      <Link
                        href={"#"}
                        className="transition-all duration-300 hover:text-blue-600"
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

export default PickAndCollect;
