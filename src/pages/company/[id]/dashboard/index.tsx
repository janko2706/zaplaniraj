import React from "react";

import type { GetStaticPaths, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import PortalTabs from "~/Organisms/PortalTabs/PortalTabs";
import {
  CalendarIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import StatisticDashboardTab from "~/Organisms/CompanySpecific/StatisticDashboardTab";
import RootLayout from "~/Templates/CompanyLayout/layout";

function Dashboard() {
  const { t } = useTranslation("common");
  const i18n = useTranslation("dashboard");

  const menuOptions = [
    {
      title: i18n.t("menu-stats"),
      icon: <ChartBarIcon className="h-5 w-5" />,
      children: <StatisticDashboardTab />,
    },
    {
      title: i18n.t("menu-settings"),
      icon: <Cog6ToothIcon className="h-5 w-5" />,
    },
    { title: i18n.t("menu-reviews"), icon: <StarIcon className="h-5 w-5" /> },
    {
      title: i18n.t("menu-calendar"),
      icon: <CalendarIcon className="h-5 w-5" />,
    },
  ];
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
      url: "/company/id/dashboard",
    },
  ];
  return (
    <RootLayout menus={menus}>
      <PortalTabs tabs={menuOptions} />
    </RootLayout>
  );
}

export default Dashboard;
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "hr", ["common", "dashboard"])),
  },
});

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      {
        params: {
          id: "id",
        },
        locale: "en-US",
      },
      {
        params: {
          id: "id",
        },
        locale: "hr",
      },
      {
        params: {
          id: "id",
        },
        locale: "de-DE",
      },
    ],
    fallback: true,
  };
};
