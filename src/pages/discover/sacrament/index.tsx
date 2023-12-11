import { useRouter } from "next/router";
import { useEffect } from "react";
import DiscoverHeader from "~/Templates/Discover/DiscoverHeaderTemplate";
import DiscoverPosts from "~/Templates/Discover/DiscoverPostsTemplate";
import MainTemplate from "~/Templates/MainTemplate";
import useDiscover from "../../../hooks/useDiscover";
import { discoverCategories } from "../../../utils/discoverCategories";

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
    categoryName: "Sakramenti",
    categories: discoverCategories({
      replace,
      iconClasses: "h-5 w-5",
      url: "sacrament",
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
        url: "sacrament",
      }).find((i) => i.name === ((category as string) ?? "Prostori"))
    );
  }, [category]);

  return (
    <MainTemplate
      bgColorDesktop="bg-yellow-100"
      menus={menus}
      userCompany={userCompany}
    >
      <>
        <DiscoverHeader
          categories={discoverCategories({
            replace,
            iconClasses: "h-5 w-5",
            url: "sacrament",
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
          headerColor={"bg-yellow-100"}
          headerTitle={"Sakramenti"}
          headerFont={"font-Trochut"}
        />
        <DiscoverPosts
          posts={posts}
          isLoading={isLoading}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setSkip={setSkip}
          category="Sakramenti"
        />
      </>
    </MainTemplate>
  );
}
export default Index;
