"use client";

import React, { useState } from "react";
import ElButton from "../custom/ElButton";
import ElInput from "../custom/ElInput";
import { User } from "@/types";
import { updateUserProfile } from "@/lib/actions/actions.user";
import { toast } from "react-toastify";
import CustomSpinner from "../custom/Spinner";

type Props = {
  user: User;
};

const ProfilePage = ({ user }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone_number: user.phone_number,
    mobile_device: user.mobile_device,
  });

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const result = await updateUserProfile({
        id: "3",
        customerId: "1",
        formData: formData,
      });
      if (result.success) {
        toast.success(`Envoyé avec succès.`);
        setEditMode(false);
        setIsPending(false);
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
      console.log(err);
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

export default ProfilePage;
