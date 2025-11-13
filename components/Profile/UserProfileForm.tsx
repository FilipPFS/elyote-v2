"use client";

import React, { useEffect, useState } from "react";
import ElButton from "../custom/ElButton";
import ElInput from "../custom/ElInput";
import ElSelect from "../custom/ElSelect";
import CustomSpinner from "../custom/Spinner";
import { toast } from "react-toastify";
import { Customer, User } from "@/types";
import { updateUserProfile } from "@/lib/actions/actions.user";
import Link from "next/link";

type Props = {
  initialUser: User;
  initialCustomers: Customer[]; // customers already linked to the user
  role: string; // role of the connected user (manager, director, superadmin)
  userId: string;
};

interface UserFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  mobile_device: string;
  role: string;
  customers_id: number[]; // only IDs
}

const UserProfilePage = ({
  initialUser,
  initialCustomers,
  role,
  userId,
}: Props) => {
  const [myCustomers, setMyCustomers] = useState<Customer[]>([]);
  const [userCustomers] = useState<Customer[]>(initialCustomers);
  const [user, setUser] = useState<User | null>(initialUser || null);
  const [editMode, setEditMode] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const [formData, setFormData] = useState<UserFormData>({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    mobile_device: "",
    role: "",
    customers_id: [],
  });

  // Role hierarchy logic
  const roleHierarchy: Record<string, number> = {
    user: 0,
    manager: 1,
    director: 2,
    superadmin: 3,
  };

  // Determine if connected user can edit this profile
  const canEdit =
    roleHierarchy[role] > roleHierarchy[user?.role ?? "user"] ||
    user?.role === "user";

  // Roles user can assign (depends on who is logged in)
  let availableRoles: string[] = [];
  switch (role) {
    case "superadmin":
      availableRoles = ["director", "manager", "user"];
      break;
    case "director":
      availableRoles = ["manager", "user"];
      break;
    case "manager":
      availableRoles = ["user"];
      break;
    default:
      availableRoles = [];
  }

  // Initialize form data and customers
  useEffect(() => {
    const storedCustomers = localStorage.getItem("customers");
    if (storedCustomers) {
      const parsed: Customer[] = JSON.parse(storedCustomers);
      setMyCustomers(parsed);
    }

    if (initialUser) {
      setFormData({
        first_name: initialUser.first_name,
        last_name: initialUser.last_name,
        email: initialUser.email,
        phone_number: initialUser.phone_number,
        mobile_device: initialUser.mobile_device,
        role: initialUser.role,
        customers_id: initialCustomers.map((c) => c.id), // map to only IDs
      });
    }
  }, [initialUser, initialCustomers]);

  if (!user) return <p>Loading...</p>;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCustomerToggle = (customerId: number) => {
    setFormData((prev) => {
      const alreadyLinked = prev.customers_id.includes(customerId);
      if (alreadyLinked) {
        return {
          ...prev,
          customers_id: prev.customers_id.filter((id) => id !== customerId),
        };
      }
      return { ...prev, customers_id: [...prev.customers_id, customerId] };
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canEdit) {
      toast.error("Vous n'avez pas la permission de modifier cet utilisateur.");
      return;
    }

    setIsPending(true);

    console.log("FORMDATA", formData);

    try {
      const result = await updateUserProfile({
        formData,
        id: userId,
      });

      if (result.success) {
        toast.success("Modifié avec succès.");

        if (result.data) {
          const newUser = { ...user, ...result.data };
          setUser(newUser);
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
          <h1 className="text-2xl font-semibold">Profil utilisateur</h1>
          {canEdit && (
            <div className="flex items-center gap-2">
              <ElButton
                label={editMode ? "Annuler" : "Modifier"}
                onClick={() => setEditMode(!editMode)}
              />
              <Link
                href={`/profile/manager/utilisateurs/${userId}/reset-password`}
              >
                <ElButton label={"Changer le mot de passe"} />
              </Link>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium capitalize">Username</label>
          <p className="text-gray-700 dark:text-gray-300">{user.username}</p>
        </div>

        {/* Editable Fields */}
        <div className="flex flex-col gap-4">
          {Object.entries(formData).map(([key, value]) => {
            if (key === "customers_id") return null; // handled separately below

            return (
              <div key={key} className="flex flex-col gap-1">
                <label className="text-sm font-medium capitalize">
                  {key.replace("_", " ")}
                </label>
                {editMode ? (
                  key === "role" ? (
                    role !== user.role ? (
                      <ElSelect
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                      >
                        {availableRoles.map((r) => (
                          <option key={r} value={r}>
                            {r.charAt(0).toUpperCase() + r.slice(1)}
                          </option>
                        ))}
                      </ElSelect>
                    ) : (
                      <p className="text-gray-700 dark:text-gray-300">{role}</p>
                    )
                  ) : (
                    <ElInput
                      name={key}
                      value={value as string}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(e)
                      }
                    />
                  )
                ) : (
                  <p className="text-gray-700 dark:text-gray-300">
                    {value as string}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Linked Customers */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Clients liés</h2>
          <div className="flex flex-col gap-2">
            {(() => {
              // Combine myCustomers + userCustomers (no duplicates)
              const allCustomersMap = new Map<number, Customer>();
              myCustomers.forEach((c) => allCustomersMap.set(c.id, c));
              userCustomers.forEach((c) => allCustomersMap.set(c.id, c));
              const allCustomers = Array.from(allCustomersMap.values());

              if (allCustomers.length === 0) {
                return (
                  <p className="text-gray-500 text-sm">
                    Aucun client trouvé dans le localStorage.
                  </p>
                );
              }

              return allCustomers.map((customer) => {
                const isLinked = formData.customers_id.includes(customer.id);
                const canToggle = myCustomers.some((c) => c.id === customer.id);

                return (
                  <label
                    key={customer.id}
                    className={`flex items-center gap-2 ${
                      canToggle
                        ? "cursor-pointer"
                        : "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="accent-blue-600"
                      checked={isLinked}
                      disabled={!editMode || !canEdit || !canToggle}
                      onChange={() =>
                        editMode &&
                        canEdit &&
                        canToggle &&
                        handleCustomerToggle(customer.id)
                      }
                    />
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">{customer.id}</span>
                      <span>{customer.city}</span>
                      <span>{customer.company_name}</span>
                      {!canToggle && (
                        <span className="text-xs text-gray-500 ml-1">
                          (Non géré par vous)
                        </span>
                      )}
                    </div>
                  </label>
                );
              });
            })()}
          </div>
        </div>

        {/* Save Button */}
        {editMode && canEdit && (
          <ElButton
            label="Enregistrer"
            onClick={handleSave}
            className="mt-4 self-end"
            disabled={isPending}
            icon={isPending ? <CustomSpinner /> : undefined}
          />
        )}
      </main>
    </div>
  );
};

export default UserProfilePage;
