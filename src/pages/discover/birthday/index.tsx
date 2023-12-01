import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DiscoverHeader from "~/Templates/Discover/DiscoverHeaderTemplate";
import DiscoverPosts from "~/Templates/Discover/DiscoverPostsTemplate";
import MainTemplate from "~/Templates/MainTemplate";
import useDiscover from "../useDiscover";
import { birthdayCategories } from "./birthdayCategories";

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
    categoryName: "Rodendani",
    categories: birthdayCategories({ replace, iconClasses: "h-5 w-5" }),
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [category, skip, refetch]);

  useEffect(() => {
    setSelectedCategory(
      birthdayCategories({ replace, iconClasses: "h-5 w-5" }).find(
        (i) => i.name === ((category as string) ?? "Prostori")
      )
    );
  }, [category]);

  return (
    <MainTemplate
      bgColorDesktop="bg-blue-200"
      menus={menus}
      userCompany={userCompany}
    >
      <>
        <DiscoverHeader
          categories={birthdayCategories({
            replace,
            iconClasses: "h-5 w-5",
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
          headerColor={"bg-blue-200"}
          headerTitle={"Rodendani"}
          headerFont={"font-Schoolbell"}
        />
        <DiscoverPosts
          posts={posts}
          isLoading={isLoading}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setSkip={setSkip}
          category="Rodendani"
        />
      </>
    </MainTemplate>
  );
}
export default Index;
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "hr", ["common", "dashboard"])),
  },
});
