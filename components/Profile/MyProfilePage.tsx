"use client";

import React, { useEffect, useState } from "react";
import ElButton from "../custom/ElButton";
import ElInput from "../custom/ElInput";
import { Customer, User } from "@/types";
import { updateMyUserProfile } from "@/lib/actions/actions.user";
import { toast } from "react-toastify";
import CustomSpinner from "../custom/Spinner";
import { ImCheckboxChecked } from "react-icons/im";

const MyProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [myCustomers, setMyCustomers] = useState<Customer[]>([]);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    mobile_device: "",
  });

  useEffect(() => {
    const storedCustomers = localStorage.getItem("customers");
    if (storedCustomers) {
      const parsed: Customer[] = JSON.parse(storedCustomers);
      setMyCustomers(parsed);
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData({
        first_name: parsedUser.first_name,
        last_name: parsedUser.last_name,
        email: parsedUser.email,
        phone_number: parsedUser.phone_number,
        mobile_device: parsedUser.mobile_device,
      });
    }
  }, []);

  if (!user) return <p>Loading...</p>;

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const result = await updateMyUserProfile({
        formData,
      });

      if (result.success) {
        toast.success(`Modifié avec succès.`);

        if (result.data) {
          const newUser = { ...user, ...result.data };
          setUser(newUser);
          localStorage.setItem("user", JSON.stringify(newUser));
        }

        setEditMode(false);
      } else if (result.errors) {
        for (const key in result.errors) {
          const messages = result.errors[key];
          if (Array.isArray(messages)) {
            messages.forEach((msg) =>
              toast.error(msg, {
                className: "bg-amber-700 text-white",
              })
            );
          }
        }
        setFormData({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          phone_number: user.phone_number,
          mobile_device: user.mobile_device,
        });
      } else if (result.error) {
        toast.error(result.error.toString(), {
          className: "bg-amber-700 text-white",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Une erreur est survenue.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full justify-center items-start p-6">
      <main className="flex flex-col w-full gap-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <ElButton
            label={editMode ? "Cancel" : "Edit"}
            onClick={() => setEditMode(!editMode)}
          ></ElButton>
        </div>

        {/* Editable Fields */}
        <div className="flex flex-col gap-4">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="flex flex-col gap-1">
              <label className="text-sm font-medium capitalize">
                {key.replace("_", " ")}
              </label>
              {editMode ? (
                <ElInput
                  value={value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(key as keyof typeof formData, e.target.value)
                  }
                />
              ) : (
                <p className="text-gray-700 dark:text-gray-300">{value}</p>
              )}
            </div>
          ))}
        </div>

        {/* Non-editable Info */}
        <div className="border-t pt-4 flex flex-col gap-2 text-sm text-gray-500">
          <p>
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Username:
            </span>{" "}
            {user.username}
          </p>
          <p>
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Role:
            </span>{" "}
            {user.role}
          </p>
          <p>
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Created at:
            </span>{" "}
            {new Date(user.created_at).toLocaleString()}
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Magasins liés</h2>
          <div className="flex flex-col gap-2">
            {myCustomers.length > 0 ? (
              myCustomers.map((customer) => {
                return (
                  <label
                    key={customer.id}
                    className={"flex items-center gap-2"}
                  >
                    <ImCheckboxChecked />
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">{customer.id}</span>
                      <span>{customer.city}</span>
                      <span>{customer.company_name}</span>
                    </div>
                  </label>
                );
              })
            ) : (
              <p className="text-gray-500 text-sm">
                Aucun client trouvé dans le localStorage.
              </p>
            )}
          </div>
        </div>

        {/* Save Button */}
        {editMode && (
          <ElButton
            label="Save"
            onClick={handleSave}
            className="mt-4 self-end"
            disabled={isPending}
            icon={isPending ? <CustomSpinner /> : undefined}
          ></ElButton>
        )}
      </main>
    </div>
  );
};

export default MyProfilePage;
