type Props = {
  setSortPrice: React.Dispatch<
    React.SetStateAction<"asc" | "desc" | undefined>
  >;
  setSortNew: React.Dispatch<React.SetStateAction<"asc" | "desc" | undefined>>;
  setSortPopular: React.Dispatch<
    React.SetStateAction<"asc" | "desc" | undefined>
  >;
  icon: JSX.Element;
};

export const sortItemsGeneral = ({
  setSortNew,
  setSortPopular,
  setSortPrice,
  icon,
}: Props) => [
  {
    name: "Popularno",
    icon: icon,
    onClick: () => {
      setSortPopular("desc");
      setSortNew(undefined);
      setSortPrice(undefined);
    },
  },
  {
    name: "Od najvise cijene",
    icon: icon,
    onClick: () => {
      setSortPopular(undefined);
      setSortNew(undefined);
      setSortPrice("desc");
    },
  },
  {
    name: "Od najnize cijene",
    icon: icon,
    onClick: () => {
      setSortPopular(undefined);
      setSortNew(undefined);
      setSortPrice("asc");
    },
  },
  {
    name: "Najnovije",
    icon: icon,
    onClick: () => {
      setSortPopular(undefined);
      setSortNew("desc");
      setSortPrice(undefined);
    },
  },
  {
    name: "Najstarije",
    icon: icon,
    onClick: () => {
      setSortPopular(undefined);
      setSortNew("asc");
      setSortPrice(undefined);
    },
  },
];
