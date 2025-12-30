import Loader from "@/components/Loader";
import MainPage from "@/components/Mobile/MainPage";
import Search from "@/components/Search";
import AlphabetFilter from "@/components/ServiceCards/AlphabetFilter";

export default function Loading() {
  return (
    <MainPage title="Gestion de cartes copies">
      <Search placeholder="Recherche par les mots clès" />
      <AlphabetFilter />
      {/* A simple skeleton or spinner for the table */}
      <Loader />
    </MainPage>
  );
}
