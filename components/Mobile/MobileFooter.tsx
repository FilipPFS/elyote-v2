import React from "react";
import MobileSearchForm from "./MobileSearchForm";
import MobileFooterNavigation from "./MobileFooterNavigation";

const MobileFooter = () => {
  return (
    <div className="fixed bottom-0 flex flex-col gap-4 items-center justify-between sm:hidden h-36 px-6 text-white bg-[#8554C5] w-full">
      <div
        className="absolute  h-[40%] w-[140%] bg-[#8554C5] top-[-25px]"
        style={{
          clipPath: "ellipse(50% 30% at 50% 50%)", // Direct ellipse shape
        }}
      ></div>
      <div className="w-full bg-[#8554C5] flex flex-col gap-4 items-center justify-start">
        <MobileSearchForm />
        <MobileFooterNavigation />
      </div>
    </div>
  );
};

export default MobileFooter;
