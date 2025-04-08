import React from "react";
import { Spinner } from "@material-tailwind/react";

const CustomSpinner = () => {
  const spinnerProps = {} as React.ComponentProps<typeof Spinner>;

  return <Spinner {...spinnerProps} className="text-white h-4 w-4" />;
};

export default CustomSpinner;
