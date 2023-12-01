import { AdjustmentsHorizontalIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";

import { useCompanyPost } from "~/Organisms/CompanySpecific/useCompanyPost";
import useMenu from "~/hooks/useMenu/useMenu";
import { getCategoryTranslationBackToEnglish } from "~/utils/translationHelpers";
import { sortItemsGeneral } from "../../utils/sortItems";

type Props = {
  categoryName: string;
  categories: {
    name: string;
    icon?: JSX.Element | undefined;
    onClick?: React.MouseEventHandler<HTMLLIElement> | undefined;
  }[];
};

function useDiscover({ categoryName, categories }: Props) {
  const iconClasses = "h-5 w-5";

  const { getPostsByCategory } = useCompanyPost();
  const placesForSelect = [{ name: "Zagreb" }, { name: "Okolica Zagreba" }];
  const [filterSelectedPlace, setFilterSelectedPlace] = useState<
    | {
        name: string;
      }
    | undefined
  >({ name: "Pretrazi po lokaciji" });
  const [filterName, setFilterName] = useState<string>("");
  const [sortPrice, setSortPrice] = useState<"asc" | "desc" | undefined>(
    undefined
  );
  const [sortPopular, setSortPopular] = useState<"asc" | "desc" | undefined>(
    "desc"
  );
  const [sortNew, setSortNew] = useState<"asc" | "desc" | undefined>(undefined);

  const [skip, setSkip] = useState(0);
  const [filterPriceMin, setFilterPriceMin] = useState(0);
  const [filterPriceMax, setFilterPriceMax] = useState(10000);
  const [priceMaxForSearch, setPriceMaxForSearch] = useState<
    number | undefined
  >(undefined);
  const [priceMinForSearch, setPriceMinForSearch] = useState<
    number | undefined
  >(undefined);
  const [titleForSearch, setTitleForSearch] = useState<string | undefined>(
    undefined
  );
  const [placeForSearch, setPlaceForSearch] = useState<string | undefined>(
    undefined
  );
  const [selectedCategory, setSelectedCategory] = useState<
    | {
        name: string;
        icon?: JSX.Element;
        onClick?: React.MouseEventHandler<HTMLLIElement>;
      }
    | undefined
  >(categories[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, refetch, isLoading } = getPostsByCategory.useQuery({
    categoryLabel: categoryName,
    businessTypeLabel:
      getCategoryTranslationBackToEnglish(selectedCategory?.name ?? "") ??
      "Venue",
    skip,
    filterPriceMax: priceMaxForSearch,
    filterPriceMin: priceMinForSearch,
    sortPrice: sortPrice,
    sortNew: sortNew,
    sortPopular: sortPopular,
    filterTitle: titleForSearch,
    filterPlace:
      placeForSearch === "Pretrazi po lokaciji" ? undefined : placeForSearch,
  });

  const OnFilterSearch = () => {
    setPriceMaxForSearch(filterPriceMax);
    setPriceMinForSearch(filterPriceMin);
    setTitleForSearch(filterName);
    setPlaceForSearch(filterSelectedPlace?.name);
  };

  const [posts, setPosts] = useState<
    | {
        id: number;
        title: string;
        address: string;
        priceRange: (number | null)[];
        type: string;
        img?: string | null;
      }[]
    | undefined
  >([]);

  const [selectedSort, setSelectedSort] = useState<
    | {
        name: string;
        onClick?: React.MouseEventHandler<HTMLLIElement>;
      }
    | undefined
  >(
    sortItemsGeneral({
      setSortNew,
      setSortPopular,
      setSortPrice,
      icon: <AdjustmentsHorizontalIcon className={iconClasses} />,
    })[0]
  );
  const { menus, userCompany } = useMenu();
  const sortItems = sortItemsGeneral({
    setSortNew,
    setSortPopular,
    setSortPrice,
    icon: <AdjustmentsHorizontalIcon className={iconClasses} />,
  });
  return {
    placesForSelect,
    setFilterSelectedPlace,
    setFilterName,
    setSkip,
    setFilterPriceMin,
    setFilterPriceMax,
    currentPage,
    setCurrentPage,
    data,
    isLoading,
    OnFilterSearch,
    posts,
    setPosts,
    selectedSort,
    setSelectedSort,
    menus,
    userCompany,
    selectedCategory,
    setSelectedCategory,
    filterName,
    filterSelectedPlace,
    filterPriceMin,
    filterPriceMax,
    iconClasses,
    sortItems,
    refetch,
    skip,
  };
}

export default useDiscover;
