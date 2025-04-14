import React from "react";
import { FiUser } from "react-icons/fi";
import { MdKeyboardArrowRight } from "react-icons/md";
import MobileCard from "./MobileCard";
import { Link } from "@/i18n/navigation";

type Props = {
  item: {
    number: string;
    client: string;
    orderDate: string;
    itemCount: number;
    status: string;
  };
};

const OrderCard = ({ item }: Props) => {
  return (
    <MobileCard>
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span>
            <FiUser size={20} />
          </span>
          <div className="flex flex-col ">
            <h3 className="text-[13px]">{item.client}</h3>
            <small className="text-gray-500 text-[11px]">
              {item.orderDate}
            </small>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {item.status === "recu" && (
            <div className=" flex text-[11px] gap-1.5 items-center">
              <span className={"block w-2 h-2 rounded-full bg-blue-400"} />
              Recu
            </div>
          )}
          {item.status === "a_commander" && (
            <div className=" flex text-[11px] gap-1.5 items-center">
              <span className={"block w-2 h-2 rounded-full bg-red-400"} />A
              commander
            </div>
          )}
          {item.status === "commande" && (
            <div className=" flex text-[11px] gap-1.5 items-center">
              <span className={"block w-2 h-2 rounded-full bg-yellow-500"} />
              Commandé
            </div>
          )}
          <Link href={`/cmd/cahier/${item.number}`}>
            <MdKeyboardArrowRight size={20} />
          </Link>
        </div>
      </section>
      <section className="text-[11px] flex justify-between mt-3">
        <span>
          Commande <span className="font-semibold">{item.number}</span>
        </span>
        <span>
          Nombre d'articles{" "}
          <span className="font-semibold">{item.itemCount}</span>
        </span>
      </section>
    </MobileCard>
  );
};

export default OrderCard;
