import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { type Dispatch, type SetStateAction } from "react";
import LoadingSpinner from "~/Atoms/LoadingSpinner/LoadingSpinner";
import ListCard from "~/Molecules/ListCard/ListCard";
import Pagination from "~/Molecules/Pagination/Pagination";
import { api } from "~/utils/api";

type Props = {
  posts:
    | {
        id: number;
        title: string;
        address: string;
        priceRange: (number | null)[];
        type: string;
        img?: string | null | undefined;
      }[]
    | undefined;
  isLoading: boolean;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setSkip: Dispatch<SetStateAction<number>>;
  category: string;
};

const DiscoverPosts = ({
  posts,
  isLoading,
  currentPage,
  setCurrentPage,
  category,
  setSkip,
}: Props) => {
  const { data } = api.businessPost.getFavoritePosts.useQuery();

  return (
    <div className="discover-padding container min-h-[60rem]">
      {!isLoading ? (
        <>
          <motion.ul
            className="flex w-full flex-col gap-9 pb-10"
            variants={{
              hidden: {
                opacity: 1,
              },
              show: {
                opacity: 1,
                transition: {
                  when: "beforeChildren",
                  staggerChildren: 0.2,
                },
              },
            }}
            initial="hidden"
            animate="show"
          >
            {!posts ? (
              <></>
            ) : (
              posts.map((item, index) => (
                <motion.li
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: 100 },
                    show: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 0.25,
                        type: "spring",
                        stiffness: 150,
                      },
                    },
                  }}
                >
                  <ListCard
                    item={item}
                    key={item.id}
                    isFavorite={data?.some((e) => e.id === item.id)}
                    category={category}
                  />
                </motion.li>
              ))
            )}
          </motion.ul>
          <Pagination
            onClickLeft={() => {
              if (currentPage === 1) return;
              setSkip((prev) => prev - 10);
              setCurrentPage((prev) => prev - 1);
            }}
            onClickRight={() => {
              setSkip((prev) => prev + 10);
              setCurrentPage((prev) => prev + 1);
            }}
            count={posts?.length ?? 1}
            currentPage={currentPage}
            onClickPage={(p) => {
              if (currentPage !== p) {
                setSkip(10 * (p - 1));
                setCurrentPage(p);
              }
            }}
          />
        </>
      ) : (
        <div className="my-10 flex w-full justify-center">
          <LoadingSpinner spinnerHeight="h-20" spinnerWidth="w-20" />
        </div>
      )}
    </div>
  );
};

export default DiscoverPosts;
