import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useEffect, useState } from "react";
import Accordion from "~/Atoms/Accordion/Accordion";
import ListCardSimple from "~/Molecules/ListCardSimple/ListCardSimple";
import { api } from "~/utils/api";
import { getCategoryTranslation } from "~/utils/translationHelpers";
import noFavorites from "~/Assets/VectorArt/nofavoritesVector.jpg";

const FavoritesTab = () => {
  const { data } = api.businessPost.getFavoritePosts.useQuery();
  const { mutateAsync: removeFavorite } = api.user.removeFavorite.useMutation();
  const { data: categories } = api.businessCategoryType.getAll.useQuery();

  const [favorites, setFavorites] = useState<typeof data>();
  let setNull = categories?.length;
  const getNull = () => {
    setNull = (setNull ?? 0) - 1;
  };
  useEffect(() => {
    setFavorites(data);
  }, [data]);
  return (
    <div className="mx-20 w-full">
      {categories?.map((cat, idx) => {
        if (
          !favorites?.filter(
            (e) => e.business?.typeOfBusiness.value === cat.value
          ).length
        ) {
          getNull();
        } else {
          return (
            <Accordion
              key={idx}
              buttonContent={(open) => (
                <div className="mt-4 flex w-full items-center justify-between gap-5 rounded-2xl border px-5">
                  <h3 className="p-3 text-lg">
                    {getCategoryTranslation(cat.label)}{" "}
                  </h3>
                  <ChevronDownIcon
                    className={`h-5 w-5 duration-300 sm:h-6 sm:w-6 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </div>
              )}
              initialOpen={false}
            >
              <div className="flex flex-col gap-5 rounded-2xl border p-5">
                {favorites
                  ?.filter(
                    (e) => e.business?.typeOfBusiness.value === cat.value
                  )
                  .map((favorite, idx) => {
                    const dataItem = {
                      id: favorite.id,
                      title: favorite.title,
                      handleDelete: async () => {
                        await removeFavorite({ postId: favorite.id }),
                          setFavorites((prev) =>
                            prev?.filter((e) => e.id !== favorite.id)
                          );
                      },
                    };
                    return <ListCardSimple key={idx} item={dataItem} />;
                  })}
              </div>
            </Accordion>
          );
        }
      })}
      {setNull === 0 ? (
        <div className="mb-12 flex w-full flex-col items-center justify-center gap-5 lg:mb-0 lg:mt-12">
          <Image
            src={noFavorites}
            alt="Dodajte svoje prve favorite!"
            height={200}
            width={200}
          />
          <p>Dodajte svoje prve favorite!</p>
        </div>
      ) : (
        void 0
      )}
    </div>
  );
};

export default FavoritesTab;
