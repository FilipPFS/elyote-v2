"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navItems } from "@/constants";
import { JSX, useState } from "react";
import MobNavLink from "./MobNavLink";
import { HiBars3 } from "react-icons/hi2";

const MobileSidebar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  return (
    <Sheet open={isVisible} onOpenChange={setIsVisible}>
      <SheetTrigger>
        <HiBars3 size={35} />
      </SheetTrigger>
      <SheetContent side="left" className="p-4 pt-6">
        <SheetTitle hidden>Mobile Navigation Sidebar</SheetTitle>
        <SheetDescription hidden>
          Mobile Sidebar Navigation with Links
        </SheetDescription>
        {navItems.map((item) => (
          <MobNavLink
            key={item.label}
            item={item}
            setIsVisible={setIsVisible}
            activeSubmenu={activeSubmenu}
            setActiveSubmenu={setActiveSubmenu}
          />
        ))}
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
