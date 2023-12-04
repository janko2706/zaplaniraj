import { UserProfile, useUser } from "@clerk/nextjs";
import {
  ChartBarIcon,
  Cog6ToothIcon,
  HeartIcon,
  PencilSquareIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import useCompany from "~/hooks/company/useCompany";
import { useTranslation } from "next-i18next";
import StatisticDashboardTab from "~/Organisms/CompanySpecific/StatisticDashboardTab";
import MyPlans from "~/Organisms/UserSpecific/MyPlans";

import FavoritesTab from "~/Organisms/UserSpecific/FavoritesTab";
import PostReview from "~/Molecules/PostReview/PostReview";

function useMenu() {
  const { t } = useTranslation("common");
  const company = useTranslation("dashboard");
  const user = useTranslation("dashboard-user");
  const clerkUser = useUser();
  const { userCompany, companyPost } = useCompany({
    clerkId: clerkUser.user?.id ?? "",
  });

  const menus = [
    {
      title: t("menu-home"),
      url: "/",
    },
    {
      title: t("menu-discover"),
      url: "/discover",

      submenu: [
        {
          title: t("Category1"),
          submenu: [
            {
              title: "Prostori",
              url: "/discover/wedding?category=Prostori",
            },
            {
              title: "Muzika",
              url: "/discover/wedding?category=Music",
            },
            {
              title: "Katering",
              url: "/discover/wedding?category=Catering",
            },
            {
              title: "Transport",
              url: "/discover/wedding?category=Transport",
            },
            {
              title: "Cvijece",
              url: "/discover/wedding?category=Flowers",
            },
            {
              title: "Torte",
              url: "/discover/wedding?category=Cakes",
            },
          ],
        },
        {
          title: t("Category2"),
          submenu: [
            {
              title: "Prostori",
              url: "/discover/birthday?category=Prostori",
            },
            {
              title: "Torte",
              url: "/discover/birthday?category=Torte",
            },
            {
              title: "Zabava",
              url: "/discover/birthday?category=Zabava",
            },
          ],
        },
        {
          title: t("Category3"),
          url: "/about-us",
          submenu: [
            {
              title: "Agent",
              url: "/agent",
            },
            {
              title: "Agent Details List",
              url: "/agent-details-list",
            },
          ],
        },
        {
          title: t("Category4"),
          url: "/payment-method",
          submenu: [
            {
              title: "Agent",
              url: "/agent",
            },
            {
              title: "Agent Details List",
              url: "/agent-details-list",
            },
          ],
        },
      ],
    },
    {
      title: t("menu-dashboard"),
      url: userCompany ? `/company/dashboard` : `/user/dashboard`,
    },
  ];
  const userDashboardMenu = [
    {
      title: user.t("menu-plans"),
      icon: <PencilSquareIcon className="h-5 w-5" />,
      children: <MyPlans />,
    },
    {
      title: user.t("menu-favorites"),
      icon: <HeartIcon className="h-5 w-5 text-red-500" />,
      // FAVORITES TAB
      children: <FavoritesTab />,
    },
    {
      title: user.t("menu-settings"),
      icon: <Cog6ToothIcon className="h-5 w-5" />,
      children: (
        <UserProfile
          appearance={{
            elements: {
              rootBox: "w-full ",
              pageScrollBox: "w-full ",
              card: "w-full",
              navbar: "hidden",
            },
          }}
        />
      ),
    },
  ];
  const companyDashboardMenu: {
    title: string;
    icon: JSX.Element;
    children: JSX.Element;
  }[] = [
    {
      title: company.t("menu-stats"),
      icon: <ChartBarIcon className="h-5 w-5" />,
      children: <StatisticDashboardTab businessPost={companyPost} />,
    },
    {
      title: company.t("menu-reviews"),
      icon: <StarIcon className="h-5 w-5" />,
      children: (
        <div className="mt-3 flex w-full flex-col">
          {companyPost?.reviews.map((item, idx) => {
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
          }) ?? (
            <p className="mt-8 text-center text-base text-black">
              Trenutno nemate recenzija...
            </p>
          )}
        </div>
      ),
    },
    {
      title: company.t("menu-settings"),
      icon: <Cog6ToothIcon className="h-5 w-5" />,
      children: (
        <UserProfile
          appearance={{
            elements: {
              rootBox: "w-full bg-dark overflow-hidden",
              pageScrollBox: "w-full ",
              card: "w-full",
              navbar: "hidden",
              navbarMobileMenuButton: "hidden",
            },
          }}
        />
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
