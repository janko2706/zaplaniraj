import { UserProfile, useUser } from "@clerk/nextjs";
import {
  ChartBarIcon,
  Cog6ToothIcon,
  HeartIcon,
  PencilSquareIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import useCompany from "~/hooks/company/useCompany";
import StatisticDashboardTab from "~/Organisms/CompanySpecific/StatisticDashboardTab";
import MyPlans from "~/Organisms/UserSpecific/MyPlans";

import FavoritesTab from "~/Organisms/UserSpecific/FavoritesTab";
import PostReview from "~/Molecules/PostReview/PostReview";
import SmallModal from "~/Atoms/SmallModal/SmallModal";
import { useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { FaMoneyBill } from "react-icons/fa";
import { discoverCategories } from "~/utils/discoverCategories";
import LoadingSpinner from "~/Atoms/LoadingSpinner/LoadingSpinner";

function useMenu() {
  const clerkUser = useUser();
  const { userCompany, companyPost } = useCompany({
    clerkId: clerkUser.user?.id ?? "",
  });
  const { replace } = useRouter();

  const { mutateAsync: deleteUser, isLoading: isDeletingUser } =
    api.user.deleteUser.useMutation({
      onSettled: async () => {
        await clerkUser.user?.reload();
        await replace("/");
      },
    });

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { mutateAsync: billingPortalUrl } =
    api.stripe.createBillingPortalSession.useMutation();

  const menus = [
    {
      title: "Pocetna",
      url: "/",
    },
    {
      title: "Istrazi",
      url: "/discover/wedding",

      submenu: [
        {
          title: "Vjencanja",
          submenu: discoverCategories({
            replace,
            url: "not important",
            iconClasses: "",
          }).map((item) => {
            return {
              title: item.name,
              url: `/discover/wedding?category=${item.name}`,
            };
          }),
        },
        {
          title: "Rodendani",
          submenu: discoverCategories({
            replace,
            url: "not important",
            iconClasses: "",
          }).map((item) => {
            return {
              title: item.name,
              url: `/discover/birthday?category=${item.name}`,
            };
          }),
        },
        {
          title: "Sakramenti",
          submenu: discoverCategories({
            replace,
            url: "not important",
            iconClasses: "",
          }).map((item) => {
            return {
              title: item.name,
              url: `/discover/sacrament?category=${item.name}`,
            };
          }),
        },
        {
          title: "Slavlja",
          submenu: discoverCategories({
            replace,
            url: "not important",
            iconClasses: "",
          }).map((item) => {
            return {
              title: item.name,
              url: `/discover/celebration?category=${item.name}`,
            };
          }),
        },
      ],
    },
    {
      title: "Moj portal",
      url: clerkUser.isSignedIn
        ? userCompany
          ? `/company/dashboard`
          : `/user/dashboard`
        : "signIn",
    },
  ];
  const userDashboardMenu = [
    {
      title: "Moji planovi",
      icon: <PencilSquareIcon className="h-5 w-5" />,
      children: <MyPlans />,
    },
    {
      title: "Favoriti",
      icon: <HeartIcon className="h-5 w-5 text-red-500" />,
      // FAVORITES TAB
      children: <FavoritesTab />,
    },
    {
      title: "Postavke",
      icon: <Cog6ToothIcon className="h-5 w-5" />,
      children: (
        <div className="relative w-full">
          <UserProfile
            appearance={{
              elements: {
                rootBox: "w-full bg-dark overflow-hidden",
                profileSection__danger: "hidden",
                pageScrollBox: "w-full pb-32",
                card: "w-full",
                navbar: "hidden",
                navbarMobileMenuButton: "hidden",
              },
            }}
          />
          <div className=" absolute bottom-[3rem] right-[3rem] mr-[1.75rem]  md:bottom-[2rem] md:right-[4.75rem] ">
            <button
              type="button"
              className="rounded-2xl bg-red-400 px-4 py-3 text-white transition-all duration-300 ease-in-out hover:bg-red-700"
              onClick={() => setOpenDeleteModal((prev) => !prev)}
            >
              Izbrisi racun
            </button>
            <SmallModal
              onConfirm={async () => {
                await deleteUser();
              }}
              title={"Izbrisi racun"}
              subText={
                "Ova akcija ce izbisati sve unesene podatke te je nepovratljiva, jeste li sigurni?"
              }
              confirmButtonText={"Izbrisi"}
              open={openDeleteModal}
              setOpen={setOpenDeleteModal}
            />
          </div>
        </div>
      ),
    },
  ];
  const companyDashboardMenu: {
    title: string;
    icon: JSX.Element;
    children: JSX.Element;
  }[] = [
    {
      title: "Statistika",
      icon: <ChartBarIcon className="h-5 w-5" />,
      children: <StatisticDashboardTab businessPost={companyPost} />,
    },
    {
      title: "Recenzije",
      icon: <StarIcon className="h-5 w-5" />,
      children: (
        <div className="mt-3 flex max-h-[40rem] w-full flex-col overflow-y-auto ">
          {companyPost?.reviews.length ? (
            companyPost?.reviews.map((item, idx) => {
              return (
                <PostReview
                  key={idx}
                  reviewerName={item.userName}
                  dateOfReview={item.createdAt}
                  numberOfStars={item.starts}
                  reviewText={item.reviewText}
                  reviewLikes={item.likes}
                />
              );
            })
          ) : (
            <p className="mt-8 text-center text-base text-black">
              Trenutno nemate recenzija...
            </p>
          )}
        </div>
      ),
    },
    {
      title: "Postavke",
      icon: <Cog6ToothIcon className="h-5 w-5" />,
      children: (
        <div className="relative w-full">
          {isDeletingUser && (
            <div className="absolute top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
              <LoadingSpinner spinnerHeight="h-20" spinnerWidth="w-20" />
            </div>
          )}
          <UserProfile
            appearance={{
              elements: {
                rootBox: "w-full bg-dark overflow-hidden",
                profileSection__danger: "hidden",
                pageScrollBox: "w-full pb-32",
                card: "w-full",
                navbar: "hidden",
                navbarMobileMenuButton: "hidden",
              },
            }}
          />
          <div className=" absolute bottom-[3rem] right-[3rem] mr-[1.75rem]  md:bottom-[2rem] md:right-[4.75rem] ">
            <button
              type="button"
              className="rounded-2xl bg-red-400 px-4 py-3 text-white transition-all duration-300 ease-in-out hover:bg-red-700"
              onClick={() => setOpenDeleteModal((prev) => !prev)}
            >
              Izbrisi racun
            </button>
            <SmallModal
              onConfirm={async () => {
                await deleteUser();
              }}
              title={"Izbrisi racun"}
              subText={
                "Ova akcija ce izbisati sve unesene podatke te je nepovratljiva, jeste li sigurni?"
              }
              confirmButtonText={"Izbrisi"}
              open={openDeleteModal}
              setOpen={setOpenDeleteModal}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Placanja i racuni",
      icon: <FaMoneyBill className="h-5 w-5" />,
      children: (
        <div className="relative flex w-full items-start justify-center">
          <button
            className="btn btn-primary mt-20"
            type="button" // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={async () => {
              const newUrl = await billingPortalUrl();
              await replace(newUrl.billingPortalUrl ?? "");
            }}
          >
            Vas portal placanja
          </button>
        </div>
      ),
    },
  ];
  return {
    menus,
    companyDashboardMenu,
    userDashboardMenu,
    userCompany,
    companyPost,
  };
}

export default useMenu;
