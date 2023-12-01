import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DiscoverHeader from "~/Templates/Discover/DiscoverHeaderTemplate";
import DiscoverPosts from "~/Templates/Discover/DiscoverPostsTemplate";
import MainTemplate from "~/Templates/MainTemplate";
import useDiscover from "../../../hooks/useDiscover";
import { weddingCategories } from "../../../utils/weddingCategories";

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
    categoryName: "Vjencanja",
    categories: weddingCategories({ replace, iconClasses: "h-5 w-5" }),
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
      weddingCategories({ replace, iconClasses: "h-5 w-5" }).find(
        (i) => i.name === ((category as string) ?? "Prostori")
      )
    );
  }, [category]);

  return (
    <MainTemplate
      bgColorDesktop="bg-primaryLight"
      menus={menus}
      userCompany={userCompany}
    >
      <>
        <DiscoverHeader
          categories={weddingCategories({
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
          headerColor={"bg-primaryLight"}
          headerTitle={"Vjencanja"}
          headerFont={"font-Alex-Brush"}
        />
        <DiscoverPosts
          posts={posts}
          isLoading={isLoading}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setSkip={setSkip}
          category="Vjencanja"
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
