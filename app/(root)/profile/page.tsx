import ProfilePage from "@/components/Profile/ProfilePage";
import { getUserDataById } from "@/lib/actions/actions.user";
import { User } from "@/types";
import React from "react";

const Profile = async () => {
  const user: User = await getUserDataById("3", "1");

  console.log(user);

  return <div>{<ProfilePage user={user} />}</div>;
};

export default Profile;
