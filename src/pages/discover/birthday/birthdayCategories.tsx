import { BuildingOfficeIcon, CakeIcon } from "@heroicons/react/20/solid";
import { GiClown } from "react-icons/gi";

type Props = {
  replace: (url: string) => Promise<boolean>;
  iconClasses: string;
};

export const birthdayCategories = ({ replace, iconClasses }: Props) => {
  return [
    {
      name: "Prostori",
      icon: <BuildingOfficeIcon className={iconClasses} />,
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick: async () =>
        await replace("/discover/birthday?category=Prostori"),
    },
    {
      name: "Torte",
      icon: <CakeIcon className={iconClasses} />,
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick: async () => await replace("/discover/birthday?category=Torte"),
    },
    {
      name: "Zabava",
      icon: <GiClown className={iconClasses} />,
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick: async () => await replace("/discover/birthday?category=Zabava"),
    },
  ];
};
