"use client";

import { useEffect, useState } from "react";
import ElInput from "../custom/ElInput";
import ElSelect from "../custom/ElSelect";
import { Customer } from "@/types";
import { createUser } from "@/lib/actions/actions.user";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ElButton from "../custom/ElButton";
import CustomSpinner from "../custom/Spinner";

type Props = {
  role: string; // rôle de l'utilisateur connecté
};

type FormData = {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  customers_id: number[];
  mobile_device: string;
  role: string;
};

const CreateUserForm = ({ role }: Props) => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    customers_id: [],
    mobile_device: "",
    role: "user",
  });
  const [isPending, setIsPending] = useState(false);

  const [availableCustomers, setAvailableCustomers] = useState<Customer[]>([]);

  // ✅ Charger les customers depuis le localStorage
  useEffect(() => {
    const storedCustomers = localStorage.getItem("customers");
    if (storedCustomers) {
      try {
        const parsed = JSON.parse(storedCustomers);
        if (Array.isArray(parsed)) {
          setAvailableCustomers(parsed);
        }
      } catch (error) {
        console.error("Erreur parsing localStorage.customers:", error);
      }
    }
  }, []);

  // Rôles disponibles selon le rôle du créateur
  let availableRoles: string[] = [];
  switch (role) {
    case "superadmin":
      availableRoles = ["superadmin", "director", "manager", "user"];
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Gérer la sélection des customers via checkbox
  const handleCustomerToggle = (id: number) => {
    setFormData((prev) => {
      const alreadySelected = prev.customers_id.includes(id);
      return {
        ...prev,
        customers_id: alreadySelected
          ? prev.customers_id.filter((c) => c !== id)
          : [...prev.customers_id, id],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsPending(true);

    try {
      console.log(formData);

      const res = await createUser({ formData: formData });

      if (res.success) {
        setIsPending(false);
        router.push("/profile/manager/utilisateurs");
        toast.success("Ajouté avec succès.");
      }
      if (res.error) {
        toast.error(`${res.error.toString()}`, {
          className: "bg-amber-700 text-white",
        });
        setIsPending(false);
      }
      if (res.errors) {
        for (const key in res.errors) {
          const messages = res.errors[key];
          if (Array.isArray(messages)) {
            messages.forEach((msg) =>
              toast.error(msg, {
                className: "bg-amber-700 text-white",
              })
            );
          }
        }
        setIsPending(false);
      }

      setFormData({
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        customers_id: [],
        mobile_device: "",
        role: "user",
      });
      setIsPending(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-white dark:bg-gray-950 px-6 rounded-2xl shadow-md w-full"
    >
      <h2 className="text-xl font-semibold mb-2">Créer un utilisateur</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Username */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Nom d’utilisateur
          </label>
          <ElInput
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="fpetrovic04"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 text-sm font-medium">Mot de passe</label>
          <ElInput
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
          />
        </div>
      </div>

      {/* First / Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Prénom</label>
          <ElInput
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Jack"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Nom</label>
          <ElInput
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Harley"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Email */}
        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <ElInput
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="director@example.fr"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 text-sm font-medium">Téléphone</label>
          <ElInput
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="+33636659810"
          />
        </div>
      </div>

      {/* ✅ Customers Checkboxes */}
      <div>
        <label className="block mb-2 text-sm font-medium">
          Clients associés
        </label>
        <div className="flex flex-col gap-2">
          {availableCustomers.length > 0 ? (
            availableCustomers.map((customer) => (
              <label
                key={customer.id}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  className="accent-blue-600"
                  checked={formData.customers_id.includes(customer.id)}
                  onChange={() => handleCustomerToggle(customer.id)}
                />
                <div className="flex items-center gap-1">
                  <span className="font-semibold">{customer.id} </span>
                  <span>{customer.city}</span>
                  <span>{customer.company_name}</span>
                </div>
              </label>
            ))
          ) : (
            <p className="text-gray-500 text-sm">
              Aucun client trouvé dans le localStorage.
            </p>
          )}
        </div>
      </div>

      {/* Mobile Device */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium">
            Appareil mobile
          </label>
          <ElInput
            name="mobile_device"
            value={formData.mobile_device}
            onChange={handleChange}
            placeholder="iPhone 13"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block mb-1 text-sm font-medium">Rôle</label>
          <ElSelect name="role" value={formData.role} onChange={handleChange}>
            {availableRoles.map((r) => (
              <option key={r} value={r}>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </option>
            ))}
          </ElSelect>
        </div>
      </div>

      <ElButton
        type="submit"
        label="Créer l’utilisateur"
        disabled={isPending}
        icon={isPending ? <CustomSpinner /> : undefined}
      />
    </form>
  );
};

export default CreateUserForm;
