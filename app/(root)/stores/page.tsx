"use client";

import { useEffect, useState } from "react";
import { setCustomerCode } from "@/lib/actions/actions.global";
import { Customer } from "@/types";

export default function Stores() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const storedCustomers = localStorage.getItem("customers");
    if (storedCustomers) {
      setCustomers(JSON.parse(storedCustomers));
    }
  }, []);

  if (!customers || customers.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-85px)]">
        <p className="text-gray-600 dark:text-gray-300">
          Aucun magasin disponible.
        </p>
      </div>
    );
  }

  return (
    <div className="py-10 md:py-0 flex items-start md:items-center justify-center min-h-[calc(100vh-85px)]">
      <div className="flex flex-col gap-7 items-center">
        <h1 className="text-3xl text-center md:text-4xl font-semibold dark:text-white">
          Sélectionnez votre magasin :
        </h1>

        <div className="flex flex-col gap-4 md:flex-wrap md:gap-10 justify-center">
          {customers.map((customer) => (
            <form key={customer.id} action={setCustomerCode}>
              <input type="hidden" name="code" defaultValue={customer.id} />
              <button
                className="group flex flex-col cursor-pointer items-center justify-center w-40 h-40 rounded-xl bg-gray-100 dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                title={customer.company_name}
              >
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  Magasin {customer.id}
                </span>
                <div className="flex flex-col mt-2">
                  <span className="mt-1 text-gray-700 dark:text-gray-300 font-medium">
                    {customer.address}
                  </span>
                  <span className="mt-1 text-gray-700 dark:text-gray-300 font-medium">
                    {customer.postal_code} {customer.city}
                  </span>
                </div>
              </button>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
}
