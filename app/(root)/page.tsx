import DragTest from "@/components/DragTest";
import { getUserSettings } from "@/lib/actions/userSettings.actions";
import React from "react";

const Home = async () => {
  const settings = await getUserSettings(95);

  console.log("settings", settings);

  return (
    <div className="p-6 w-full flex-grow">
      <DragTest />
    </div>
  );
};

export default Home;
