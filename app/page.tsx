import React from "react";

const Home = () => {
  return (
    <div className="p-4 w-full flex-grow">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
        <div className="bg-blue-200 rounded-md p-4 w-[100%]">Item 1</div>
        <div className="bg-blue-200 rounded-md p-4">Item 2</div>
        <div className="bg-blue-200 rounded-md p-4">Item 4</div>
        <div className="bg-amber-800 rounded-md p-4">Item 5</div>
      </div>
    </div>
  );
};

export default Home;
