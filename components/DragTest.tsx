"use client";

import { createSwapy, Swapy } from "swapy";
import { useEffect, useRef, useState } from "react";
import PickAndCollect from "./PickAndCollect";
import ContactClient from "./ContactClient";
import Sav from "./Sav";
import BalisageBlock from "./BalisageBlock";
import { SlCursorMove } from "react-icons/sl";
import { FaCheck } from "react-icons/fa6";
import { toast } from "sonner";

const DragTest = () => {
  const swapy = useRef<Swapy | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [order, setOrder] = useState<string[]>(["a", "b", "c", "d"]); // Default order
  const orderRef = useRef<string[]>(order);
  const [firstChange, setFirstChange] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Track if component is mounted

  // Load order from localStorage *after* mount
  useEffect(() => {
    setIsMounted(true); // Prevents SSR mismatch

    if (typeof window !== "undefined") {
      const savedOrder = localStorage.getItem("swapy-order");
      if (savedOrder) {
        const parsedOrder = JSON.parse(savedOrder);
        orderRef.current = parsedOrder;
        setOrder(parsedOrder);
      }
    }
  }, []);

  useEffect(() => {
    if (!isMounted || !container.current || swapy.current) return;

    swapy.current = createSwapy(container.current, {
      autoScrollOnDrag: true,
    });

    if (swapy.current) {
      swapy.current.onSwap((event) => {
        console.log("Swapped:", event);
        setFirstChange(true);
        orderRef.current = event.newSlotItemMap.asArray.map(
          (item) => item.item
        );
      });
    }

    return () => {
      swapy.current?.destroy();
      swapy.current = null;
    };
  }, [isMounted]);

  const handleSaveOrder = (event: React.FormEvent) => {
    event.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem("swapy-order", JSON.stringify(orderRef.current));
      console.log("Order saved:", orderRef.current);
      toast("La séléction a été modifié avec succès.");
      setFirstChange(false);
    }
  };

  if (!isMounted) return null; // Prevent hydration errors

  return (
    <>
      {firstChange && (
        <form onSubmit={handleSaveOrder}>
          <button
            type="submit"
            className="bg-blue-600 transition-all duration-500 cursor-pointer hover:bg-blue-800 active:bg-blue-950 px-5 py-1 text-white font-semibold rounded-md flex items-center gap-3 mb-3"
          >
            Modifier <FaCheck />
          </button>
        </form>
      )}
      <div ref={container} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {order.map((slot) => (
          <div key={slot} data-swapy-slot={slot}>
            <div data-swapy-item={slot}>
              <div className="bg-white cursor-pointer rounded-t-md h-8 flex items-center px-5 sm:px-6 border-b-2">
                <span>
                  <SlCursorMove />
                </span>
              </div>
              <div data-swapy-no-drag className="h-full">
                {slot === "a" && <PickAndCollect />}
                {slot === "b" && <ContactClient />}
                {slot === "c" && <Sav />}
                {slot === "d" && <BalisageBlock />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DragTest;
