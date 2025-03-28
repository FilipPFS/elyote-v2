import React from "react";
import Search from "./Search";
import HeaderActionList from "./HeaderActionList";

const Header = () => {
  return (
    <header className="hidden h-[85px] sm:flex justify-end sm:px-6 lg:px-14">
      <div className="lg:w-4/5 flex justify-between items-center">
        <Search />
        <HeaderActionList />
      </div>
    </header>
  );
};

export default Header;
