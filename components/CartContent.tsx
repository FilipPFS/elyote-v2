import { cartData } from "@/constants/data";
import { calculateCartTotal } from "@/lib/utils";
import { FaRegTrashAlt } from "react-icons/fa";
import Link from "next/link";
import { useTranslations } from "next-intl";
type Props = {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const CartContent = ({ setOpen }: Props) => {
  const tCart = useTranslations("global.cartModal");
  return (
    <div className="flex flex-col max-sm:p-5 gap-3">
      <section className="flex gap-3 items-center">
        <h1 className="text-lg font-semibold">{tCart("title")}</h1>
        <span>[{cartData.length}]</span>
      </section>
      <section className="w-fit">
        {cartData.map((item) => (
          <div
            key={item.code}
            className="flex text-[15px] sm:text-[13px] justify-between gap-4 items-center"
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
      <section className="self-center flex sm:flex-row flex-col gap-2 sm:gap-4 w-full">
        <button className="bg-blue-700 w-full text-sm cursor-pointer transition-all duration-500 hover:bg-blue-800 text-white sm:w-[45%] rounded-md py-1">
          {tCart("printBtn")}
        </button>
        <Link
          href={"/panier"}
          onClick={setOpen ? () => setOpen(false) : undefined}
          className="w-full sm:w-[45%]"
        >
          <button className="bg-blue-700 text-sm cursor-pointer transition-all duration-500 hover:bg-blue-800 text-white w-full rounded-md py-1">
            {tCart("viewBtn")}
          </button>
        </Link>
      </section>
    </div>
  );
};

export default CartContent;
