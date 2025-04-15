import React from "react";
import HeaderActionList from "./HeaderActionList";

const Header = () => {
  return (
    <header className="hidden h-[85px] sm:flex sm:px-6 lg:px-10">
      <div className="flex w-full justify-end">
        <HeaderActionList />
      </div>
    </header>
  );
};

export default Header;
