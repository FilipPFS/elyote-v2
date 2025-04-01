import BalisageBlock from "@/components/BalisageBlock";
import ContactClient from "@/components/ContactClient";
import PickAndCollect from "@/components/PickAndCollect";
import Sav from "@/components/Sav";
import React from "react";

const Home = () => {
  return (
    <div className="p-4 w-full flex-grow">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
        <PickAndCollect />
        <ContactClient />
        <Sav />
        <BalisageBlock />
      </div>
    </div>
  );
};

export default Home;
