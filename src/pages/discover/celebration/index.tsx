import { useRouter } from "next/router";
import { useEffect } from "react";
import DiscoverHeader from "~/Templates/Discover/DiscoverHeaderTemplate";
import DiscoverPosts from "~/Templates/Discover/DiscoverPostsTemplate";
import MainTemplate from "~/Templates/MainTemplate";
import { discoverCategories } from "~/utils/discoverCategories";
import useDiscover from "../../../hooks/useDiscover";

function Index() {
  const { query, replace } = useRouter();
  const { category } = query;
  const {
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
  } = useDiscover({
    categoryName: "Slavlja",
    categories: discoverCategories({
      replace,
      iconClasses: "h-5 w-5",
      url: "celebration",
    }),
  });

  useEffect(() => {
    if (!data) return;
    setPosts(
      data.map((item) => {
        const imageArray =
          item.pictures !== undefined && item.pictures !== null
            ? item.pictures.split(",")
            : "";
        return {
          id: item.id,
          title: item.title,
          type: item.serviceDescription ?? "",
          address: item.location ?? "",
          priceRange: [item.priceRangeMin, item.priceRangeMax],
          img: imageArray ? imageArray[0] : "",
        };
      })
    );
  }, [data, setPosts]);

  useEffect(() => {
    void (async () => await refetch())();
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [category, skip, refetch]);

  useEffect(() => {
    setSelectedCategory(
      discoverCategories({
        replace,
        iconClasses: "h-5 w-5",
        url: "celebration",
      }).find((i) => i.name === ((category as string) ?? "Prostori"))
    );
  }, [category]);

  return (
    <MainTemplate
      bgColorDesktop="bg-red-200"
      menus={menus}
      userCompany={userCompany}
    >
      <>
        <DiscoverHeader
          categories={discoverCategories({
            replace,
            iconClasses: "h-5 w-5",
            url: "celebration",
          })}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          filterName={filterName}
          setFilterName={setFilterName}
          placesForSelect={placesForSelect}
          filterSelectedPlace={filterSelectedPlace}
          setFilterSelectedPlace={setFilterSelectedPlace}
          filterPriceMin={filterPriceMin}
          setFilterPriceMin={setFilterPriceMin}
          filterPriceMax={filterPriceMax}
          setFilterPriceMax={setFilterPriceMax}
          OnFilterSearch={OnFilterSearch}
          iconClasses={iconClasses}
          sortItems={sortItems}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          headerColor={"bg-red-200"}
          headerTitle={"Slavlja"}
          headerFont={"font-Satisfy"}
        />
        <DiscoverPosts
          posts={posts}
          isLoading={isLoading}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setSkip={setSkip}
          category="Slavlja"
        />
      </>
    </MainTemplate>
  );
}
export default Index;
