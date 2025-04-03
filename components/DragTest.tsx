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
import { UserSettings } from "@/types";

const DragTest = () => {
  const swapy = useRef<Swapy | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [order, setOrder] = useState<string[]>(["a", "b", "c", "d"]);
  const orderRef = useRef<string[]>(order);
  const [firstChange, setFirstChange] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (typeof window !== "undefined") {
      const parametresUtilisateurs = localStorage.getItem(
        "parametres_utilisateurs"
      );

      if (parametresUtilisateurs) {
        const parsedParametres: UserSettings[] = JSON.parse(
          parametresUtilisateurs
        );

        const selectedOrderObj = parsedParametres.find((param) =>
          param.hasOwnProperty("selection_cards_accueil")
        );

        if (selectedOrderObj) {
          const savedOrder = selectedOrderObj.selection_cards_accueil;

          if (savedOrder) {
            orderRef.current = savedOrder;
            setOrder(savedOrder);
          }
        }
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
      const parametresUtilisateurs = localStorage.getItem(
        "parametres_utilisateurs"
      );

      let updatedParametres: { [key: string]: string[] }[];

      if (parametresUtilisateurs) {
        updatedParametres = JSON.parse(parametresUtilisateurs);
        const index = updatedParametres.findIndex((param) =>
          param.hasOwnProperty("selection_cards_accueil")
        );

        if (index !== -1) {
          updatedParametres[index].selection_cards_accueil = orderRef.current;
        } else {
          updatedParametres.push({ selection_cards_accueil: orderRef.current });
        }
      } else {
        updatedParametres = [{ selection_cards_accueil: orderRef.current }];
      }
      localStorage.setItem(
        "parametres_utilisateurs",
        JSON.stringify(updatedParametres)
      );
      console.log("parametres_utilisateurs saved:", updatedParametres);

      toast("La sélection a été modifiée avec succès.");
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
            className="bg-blue-600 text-sm transition-all duration-500 cursor-pointer hover:bg-blue-800 active:bg-blue-950 px-5 py-1 text-white font-semibold rounded-md flex items-center gap-3 mb-3"
          >
            Enregistrer les modifications <FaCheck />
          </button>
        </form>
      )}
      <div ref={container} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {order.map((slot) => (
          <div key={slot} data-swapy-slot={slot} className="relative">
            <div data-swapy-item={slot}>
              <div className="absolute  bg-white h-7 mt-5  right-0 top-0 cursor-pointer rounded-t-md flex items-center px-5 sm:px-6">
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
