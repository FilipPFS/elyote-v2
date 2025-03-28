"use client";

import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";

const MobileSearchForm = () => {
  const [query, setQuery] = useState("");
  return (
    <form className="bg-white w-full mt-10 h-12 flex px-5 items-center justify-between gap-3 border-[1px] rounded-full">
      <div className="flex items-center gap-4 w-3/4">
        <span>
          <CiSearch size={24} className="block text-black" />
        </span>
        <input
          type="text"
          placeholder="Recherchez..."
          className="focus:outline-none focus:ring-0 text-black text-lg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <button
        disabled={!query}
        className="h-[39px] disabled:bg-gray-500 bg-blue-600 w-10 flex justify-center items-center rounded-lg cursor-pointer transition-all duration-500 hover:bg-blue-800 accent-violet-950"
      >
        <FaSearch className="text-white" />
      </button>
    </form>
  );
};

export default MobileSearchForm;
