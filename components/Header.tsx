import React from "react";
import Search from "./Search";
import HeaderActionList from "./HeaderActionList";

const Header = () => {
  return (
    <header className="hidden h-[85px] sm:flex justify-end sm:px-6 lg:px-10">
      <div className="xl:w-4/5 flex justify-between items-center">
        <Search placeholder="Rechercher..." component="header" />
        <HeaderActionList />
      </div>
    </header>
  );
};

export default Header;
