import { Tab } from "@headlessui/react";
import Link from "next/link";
import { useState } from "react";
import { FaHourglassHalf } from "react-icons/fa";
import LoadingSpinner from "~/Atoms/LoadingSpinner/LoadingSpinner";
import ListCard from "~/Molecules/ListCard/ListCard";
import classNames from "~/utils/classNames";
import { useCompanyPost } from "../CompanySpecific/useCompanyPost";
import { getTranslationForRouter } from "~/utils/translationHelpers";

function RecommendedIndex() {
  const { getPostsByCategory } = useCompanyPost();
  const [recommendedCategory, setRecommendedCategory] =
    useState<string>("Vjencanja");

  const { data, isLoading } = getPostsByCategory.useQuery({
    categoryLabel: recommendedCategory,
    businessTypeLabel: "Venue",
    skip: 0,
    take: 3,
    sortPopular: "desc",
  });

  return (
    <section className="relative bg-[var(--bg-2)] py-[60px] lg:py-5">
      <div className="container">
        <div className="mx-auto flex max-w-[570px] flex-col items-center px-3 text-center">
          <h2 className="h2 mt-3 pb-8 pt-5 text-neutral-600 lg:pb-14">
            Preporuceni prostori
          </h2>
        </div>
        <div>
          {isLoading ? (
            <LoadingSpinner spinnerHeight="h-10" spinnerWidth="w-10" />
          ) : (
            <Tab.Group>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4 px-3">
                <Tab.List className="flex flex-wrap gap-3">
                  {["Vjencanja", "Rodendani"].map((category) => (
                    <Tab
                      key={category}
                      className={({ selected }) =>
                        classNames(
                          "rounded-full px-7 py-4 font-semibold leading-5 duration-300",
                          selected
                            ? "bg-primary text-white shadow outline-none"
                            : "bg-[var(--primary-light)] text-neutral-600 hover:bg-primary hover:text-white"
                        )
                      }
                    >
                      <div onClick={() => setRecommendedCategory(category)}>
                        {category}
                      </div>
                    </Tab>
                  ))}
                </Tab.List>
              </div>
              <Tab.Panels className="mt-2">
                {["Vjencanja", "Rodendani"].map((cat, idx) => (
                  <Tab.Panel key={idx} className={"flex flex-col gap-8"}>
                    {data?.map((item) => {
                      const dataItem = {
                        id: item.id,
                        address: item.location ?? "",
                        title: item.title,
                        priceRange: [item.priceRangeMin, item.priceRangeMax],
                        type: item.serviceDescription ?? "",
                        popular: false,
                        img: item.pictures?.split(",")[0] ?? "",
                      };
                      return <ListCard key={item.id} item={dataItem} />;
                    })}
                    <div className="mt-10 flex justify-center">
                      <Link
                        href={`discover/${getTranslationForRouter(
                          cat
                        )}?category=Prostori`}
                        className="btn-primary flex items-center gap-2 font-medium"
                      >
                        <FaHourglassHalf className="text text-lg" /> Pokazi jos
                      </Link>
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          )}
        </div>
      </div>
    </section>
  );
}

export default RecommendedIndex;
