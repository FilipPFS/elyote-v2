import React from "react";
import HeaderIcon from "./HeaderIcon";
import { FiBell, FiUser } from "react-icons/fi";
import { BsCart3 } from "react-icons/bs";
import CustomModal from "./CustomModal";
import { FaCircleQuestion } from "react-icons/fa6";
import { LuScanLine } from "react-icons/lu";
import { cartData } from "@/constants/data";
import { FaRegTrashAlt } from "react-icons/fa";
import { calculateCartTotal } from "@/lib/utils";
import Link from "next/link";
import { accountLinks } from "@/constants";

const HeaderActionList = () => {
  return (
    <div className="flex items-center gap-10">
      <CustomModal
        icon={<FaCircleQuestion size={25} />}
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
      <HeaderIcon
        icon={<BsCart3 size={25} />}
        customContent={
          <div className="flex flex-col w-[250px] gap-3">
            <section className="flex gap-3 items-center">
              <h1 className="text-lg font-semibold">Mon Panier</h1>
              <span>[{cartData.length}]</span>
            </section>
            <section className="w-fit">
              {cartData.map((item) => (
                <div
                  key={item.code}
                  className="flex text-[13px] justify-between gap-4 items-center"
                >
                  <button className="cursor-pointer">
                    <FaRegTrashAlt />
                  </button>
                  <section className="w-3/5 flex flex-col items-start">
                    <div>
                      <small>
                        {item.name} {`(${item.code})`}
                      </small>
                    </div>
                    <small className="font-semibold">
                      {item.price / 100}€ x {item.quantity}
                    </small>
                  </section>
                  <small className="font-semibold w-12">
                    {((item.price / 100) * item.quantity).toFixed(2)}€
                  </small>
                </div>
              ))}
            </section>
            <section className="flex font-semibold justify-between items-center">
              <span>Total:</span>
              <small className="w-12">{calculateCartTotal(cartData)}€</small>
            </section>
            <section className="self-center flex gap-4 w-full">
              <button className="bg-blue-700 text-sm cursor-pointer transition-all duration-500 hover:bg-blue-800 text-white w-[45%] rounded-md py-1">
                Imprimer
              </button>
              <Link href={"/panier"} className="w-[45%]">
                <button className="bg-blue-700 text-sm cursor-pointer transition-all duration-500 hover:bg-blue-800 text-white w-full rounded-md py-1">
                  Voir
                </button>
              </Link>
            </section>
          </div>
        }
      />
      <HeaderIcon
        icon={<LuScanLine size={25} />}
        customContent={
          <div>
            <h1>Scan</h1>
          </div>
        }
      />
      <HeaderIcon
        icon={<FiBell size={25} />}
        customContent={
          <div>
            <h1>Mes notifications</h1>
          </div>
        }
      />
      <HeaderIcon
        icon={<FiUser size={25} />}
        customContent={
          <div className="p-3">
            <section className="flex items-start flex-col gap-2">
              {accountLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.link}
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
        }
      />
    </div>
  );
};

export default HeaderActionList;
