"use client";

import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [query, setQuery] = useState("");

  return (
    <form action="" className="flex items-center gap-2 h-10 w-[45%]">
      <div className="p-3 px-4 h-full w-[calc(100%-40px)] flex items-center gap-3 border-[1px] border-black rounded-lg">
        <CiSearch size={24} />
        <input
          type="text"
          placeholder="Recherchez..."
          className="focus:outline-none focus:ring-0"
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

export default Search;
