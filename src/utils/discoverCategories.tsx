import { AiFillCar } from "react-icons/ai";
import { FaGuitar, FaBreadSlice } from "react-icons/fa";
import { LuFlower } from "react-icons/lu";
import { BuildingOfficeIcon, CakeIcon } from "@heroicons/react/20/solid";
import { GiAmpleDress, GiClown } from "react-icons/gi";

type Props = {
  replace: (url: string) => Promise<boolean>;
  iconClasses: string;
  url: string;
};

export const discoverCategories = ({ replace, iconClasses, url }: Props) => {
  return [
    {
      name: "Prostori",
      icon: <BuildingOfficeIcon className={iconClasses} />,
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick: async () => await replace(`/discover/${url}?category=Prostori`),
    },
    {
      name: "Haljine",
      icon: <GiAmpleDress className={iconClasses} />,
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick: async () => await replace(`/discover/${url}?category=Haljine`),
    },
    {
      name: "Torte",
      icon: <CakeIcon className={iconClasses} />,
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick: async () => await replace(`/discover/${url}?category=Torte`),
    },
    {
      name: "Cvijece",
      icon: <LuFlower className={iconClasses} />,
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick: async () => await replace(`/discover/${url}?category=Cvijece`),
    },
    {
      name: "Muzika",
      icon: <FaGuitar className={iconClasses} />,
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick: async () => await replace(`/discover/${url}?category=Muzika`),
    },
    {
      name: "Katering",
      icon: <FaBreadSlice className={iconClasses} />,
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick: async () => await replace(`/discover/${url}?category=Katering`),
    },
    {
      name: "Zabava",
      icon: <GiClown className={iconClasses} />,
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick: async () => await replace(`/discover/${url}?category=Zabava`),
    },
    {
      name: "Transport",
      icon: <AiFillCar className={iconClasses} />,
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick: async () => await replace(`/discover/${url}?category=Transport`),
    },
  ];
};
