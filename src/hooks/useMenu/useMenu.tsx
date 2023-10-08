import { UserProfile, useUser } from "@clerk/nextjs";
import {
  ChartBarIcon,
  Cog6ToothIcon,
  StarIcon,
  CalendarIcon,
  HeartIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";
import useCompany from "~/hooks/company/useCompany";

import { useTranslation } from "next-i18next";
import StatisticDashboardTab from "~/Organisms/CompanySpecific/StatisticDashboardTab";
import MyPlans from "~/Organisms/UserSpecific/MyPlans";
import CalendarComponent from "~/Atoms/Calendar/Calendar";

function useMenu() {
  const { t } = useTranslation("common");
  const company = useTranslation("dashboard");
  const user = useTranslation("dashboard-user");
  const clerkUser = useUser();
  const { userCompany } = useCompany({
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
              title: "Venues",
              url: "/discover/wedding/venues",
            },
            {
              title: "Music",
              url: "/discover/wedding/music",
            },
            {
              title: "Catering",
              url: "/discover/wedding/catering",
            },
            {
              title: "Transport",
              url: "/discover/wedding/transport",
            },
            {
              title: "Flowers",
              url: "/discover/wedding/flowers",
            },
            {
              title: "Cakes",
              url: "/discover/wedding/cakes",
            },
          ],
        },
        {
          title: t("Category2"),
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
      children: <MyPlans />,
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
      children: <StatisticDashboardTab business={userCompany} />,
    },
    {
      title: company.t("menu-reviews"),
      icon: <StarIcon className="h-5 w-5" />,
      children: <></>,
    },
    {
      title: company.t("menu-calendar"),
      icon: <CalendarIcon className="h-5 w-5" />,
      children: <CalendarComponent />,
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
  return { menus, companyDashboardMenu, userDashboardMenu, userCompany };
}

export default useMenu;
