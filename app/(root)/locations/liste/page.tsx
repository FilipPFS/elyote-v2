import GoNextButton from "@/components/Global/GoNextButton";
import Loader from "@/components/Loader";
import MainPage from "@/components/Mobile/MainPage";
import RentalList from "@/components/Rentals/RentalList";
import { SearchParamProps } from "@/types";
import React, { Suspense } from "react";

const LocationsListe = async ({ searchParams }: SearchParamProps) => {
  const awaitedSearchParams = await searchParams;
  const page = Number(awaitedSearchParams.page) || 1;

  return (
    <MainPage
      title="Locations"
      headerElement={
        <div className="max-sm:w-full">
          <GoNextButton link="/locations/ajout" label="Ajouter une location" />
        </div>
      }
    >
      <Suspense fallback={<Loader />}>
        <RentalList page={page} />
      </Suspense>
    </MainPage>
  );
};

export default LocationsListe;
