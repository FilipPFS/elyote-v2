import {
  getCustomersFromToken,
  setCustomerCode,
} from "@/lib/actions/actions.global";
import React from "react";

const Stores = async () => {
  const customers = await getCustomersFromToken();
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-85px)]">
      <div className="flex flex-col gap-7 items-center">
        <h1 className="text-4xl">Séléctionnez votre magasin:</h1>
        <div className="flex gap-14">
          {customers &&
            customers.length > 1 &&
            customers.map((id) => (
              <form key={id} action={setCustomerCode}>
                <input type="hidden" defaultValue={id} name="code" />
                <button className="text-3xl cursor-pointer rounded-full h-20 w-20 bg-gray-200 dark:bg-gray-800 shadow-lg transition-all duration-300 hover:bg-gray-300 dark:hover:bg-gray-950">
                  {id}
                </button>
              </form>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Stores;
