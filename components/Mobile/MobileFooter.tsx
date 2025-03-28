import React from "react";
import MobileSearchForm from "./MobileSearchForm";
import MobileFooterNavigation from "./MobileFooterNavigation";

const MobileFooter = () => {
  return (
    <div className="sticky bottom-0 flex flex-col gap-4 items-center justify-between sm:hidden h-48 px-6 text-white bg-[#8554C5] w-full">
      <MobileSearchForm />
      <MobileFooterNavigation />
    </div>
  );
};

export default MobileFooter;
