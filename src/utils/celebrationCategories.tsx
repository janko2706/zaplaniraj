import { BuildingOfficeIcon } from "@heroicons/react/20/solid";
import { FaBreadSlice, FaGuitar } from "react-icons/fa";

type Props = {
  replace: (url: string) => Promise<boolean>;
  iconClasses: string;
};

export const celebrationCategories = ({ replace, iconClasses }: Props) => {
  return [
    {
      name: "Prostori",
      icon: <BuildingOfficeIcon className={iconClasses} />,
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick: async () =>
        await replace("/discover/celebration?category=Prostori"),
    },
    {
      name: "Muzika",
      icon: <FaGuitar className={iconClasses} />,
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick: async () =>
        await replace("/discover/celebration?category=Muzika"),
    },
    {
      name: "Katering",
      icon: <FaBreadSlice className={iconClasses} />,
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick: async () =>
        await replace("/discover/celebration?category=Katering"),
    },
  ];
};
