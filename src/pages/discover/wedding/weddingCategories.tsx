import { AiFillCar } from "react-icons/ai";
import { FaGuitar, FaBreadSlice } from "react-icons/fa";
import { LuFlower } from "react-icons/lu";
import { BuildingOfficeIcon, CakeIcon } from "@heroicons/react/20/solid";
import { GiClown } from "react-icons/gi";

type Props = {
  replace: (url: string) => Promise<boolean>;
  iconClasses: string;
};

export const weddingCategories = ({ replace, iconClasses }: Props) => {
  return [
    {
      name: "Prostori",
      icon: <BuildingOfficeIcon className={iconClasses} />,
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick: async () => await replace("/discover/wedding?category=Prostori"),
    },
    {
      name: "Torte",
      icon: <CakeIcon className={iconClasses} />,
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick: async () => await replace("/discover/wedding?category=Torte"),
    },
    {
      name: "Cvijece",
      icon: <LuFlower className={iconClasses} />,
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick: async () => await replace("/discover/wedding?category=Cvijece"),
    },
    {
      name: "Muzika",
      icon: <FaGuitar className={iconClasses} />,
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick: async () => await replace("/discover/wedding?category=Muzika"),
    },
    {
      name: "Katering",
      icon: <FaBreadSlice className={iconClasses} />,
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick: async () => await replace("/discover/wedding?category=Katering"),
    },
    {
      name: "Zabava",
      icon: <GiClown className={iconClasses} />,
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick: async () => await replace("/discover/wedding?category=Zabava"),
    },
    {
      name: "Transport",
      icon: <AiFillCar className={iconClasses} />,
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick: async () =>
        await replace("/discover/wedding?category=Transport"),
    },
  ];
};
