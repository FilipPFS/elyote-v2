"use client";

import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "100px auto",
};
const Loading = () => {
  return (
    <div className="flex w-full h-full justify-center items-center dark:bg-gray-900 bg-gray-100">
      <ClipLoader
        color="blue"
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
      />
    </div>
  );
};

export default Loading;
