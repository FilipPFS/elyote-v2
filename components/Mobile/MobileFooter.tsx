import React from "react";
import MobileSearchForm from "./MobileSearchForm";
import MobileFooterNavigation from "./MobileFooterNavigation";

const MobileFooter = () => {
  return (
    <div className="fixed bottom-0 flex flex-col gap-4 items-center justify-between sm:hidden h-48 px-6 text-white bg-[#8554C5] w-full">
      <div
        className="absolute w-full h-[50%] bg-[#8554C5] top-[-45px]"
        style={{
          clipPath: "ellipse(50% 20% at 50% 50%)", // Direct ellipse shape
        }}
      ></div>
      <div className="w-full bg-[#8554C5] flex flex-col gap-4 items-center justify-between">
        <MobileSearchForm />
        <MobileFooterNavigation />
      </div>
    </div>
  );
};

export default MobileFooter;
