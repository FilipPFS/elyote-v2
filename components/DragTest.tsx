"use client";

import { createSwapy, Swapy } from "swapy";
import { useEffect, useRef } from "react";
import PickAndCollect from "./PickAndCollect";
import ContactClient from "./ContactClient";
import Sav from "./Sav";
import BalisageBlock from "./BalisageBlock";

const DragTest = () => {
  const swapy = useRef<Swapy | null>(null);
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (container.current) {
      swapy.current = createSwapy(container.current);

      if (swapy.current) {
        swapy.current.onSwap((event) => {
          console.log("swap", event);
        });
      }
    }

    return () => {
      swapy.current?.destroy();
    };
  }, []);

  return (
    <div ref={container} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div data-swapy-slot="a" className="cursor-pointer">
        <div data-swapy-item="a">
          <PickAndCollect />
        </div>
      </div>

      <div data-swapy-slot="b" className="cursor-pointer">
        <div data-swapy-item="b" className="h-full">
          <ContactClient />
        </div>
      </div>
      <div data-swapy-slot="c" className="cursor-pointer">
        <div data-swapy-item="c" className="h-full">
          <Sav />
        </div>
      </div>

      <div data-swapy-slot="d" className="cursor-pointer">
        <div data-swapy-item="d" className="h-full">
          <BalisageBlock />
        </div>
      </div>
    </div>
  );
};

export default DragTest;
