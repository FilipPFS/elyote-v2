import GoNextButton from "@/components/Global/GoNextButton";
import MainPage from "@/components/Mobile/MainPage";
import AddServiceTypeCard from "@/components/ServiceCards/AddServiceTypeCard";
import ServiceTypeCard from "@/components/ServiceCards/ServiceTypeCard";
import { getServiceCardTypes } from "@/lib/actions/services/actions.clients";
import React from "react";

const CartesCopiesReglages = async () => {
  const cardTypes = await getServiceCardTypes();

  if (!cardTypes) return <div>Aucun type trouvé.</div>;

  return (
    <MainPage
      title="Gestion de cartes copies"
      headerElement={
        <div className="flex items-center w-full md:w-fit gap-2">
          <GoNextButton link="/cartes-copies/liste" label="Retour à la liste" />
        </div>
      }
    >
      <div className="w-full h-px block bg-blue-500 opacity-10" />
      <div className="flex md:flex-row flex-col gap-3 md:items-center justify-between">
        <h2 className="text-lg md:text-xl font-bold">Réglages du module</h2>
        <AddServiceTypeCard />
      </div>
      <div className="w-full h-px bg-blue-500 opacity-10" />
      <div className="flex flex-col gap-2">
        <h3 className="text-[16px] md:text-lg">
          Cartes par défaut (communes à tous les magasins)
        </h3>
        {cardTypes.all.map((item) => (
          <ServiceTypeCard
            cardType={item}
            key={item.id}
            editable={item.customer_id !== "all"}
          />
        ))}
      </div>
      <div className="w-full h-px block bg-blue-500 opacity-10" />
      <div className="flex flex-col gap-2">
        <h3 className="text-[16px] md:text-lg">
          Cartes personnalisé du magasin
        </h3>
        {cardTypes.personal.map((item) => (
          <ServiceTypeCard
            cardType={item}
            key={item.id}
            editable={item.customer_id !== "all"}
          />
        ))}
      </div>
    </MainPage>
  );
};

export default CartesCopiesReglages;
