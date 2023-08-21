import React from "react";
import { useUser } from "@clerk/nextjs";
import avatarPlaceholder from "../Assets/avatar-placeholder.png";

export default function useMainTemplate() {
  const navigation = [
    { name: "Pocetna", href: "#", current: true },
    { name: "Istrazi", href: "#", current: false },
    { name: "Moji projekti", href: "#", current: false },
  ];

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }
  const userInfo = useUser();
  const userNavigation = [
    {
      name: "Your Profile",
      href: "#",
      onClick: () => {
        return 0;
      },
    },
    {
      name: "Settings",
      href: "#",
      onClick: () => {
        return 0;
      },
    },
  ];
  const user = {
    name: userInfo.user?.fullName,
    imageUrl:
      userInfo.isSignedIn && userInfo.isLoaded
        ? userInfo.user?.imageUrl
        : avatarPlaceholder,
  };
  return { navigation, userNavigation, user, classNames };
}
