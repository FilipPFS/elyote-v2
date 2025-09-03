import React from "react";
import HeaderActionList from "./HeaderActionList";
import ToggleTest from "./Interface/ToggleTest";

const Header = () => {
  return (
    <header className="hidden h-[85px] sm:flex sm:px-6 lg:px-10">
      <div className="flex items-center gap-10 w-full justify-end">
        <ToggleTest />
        <HeaderActionList />
      </div>
    </header>
  );
};

export default Header;
