import React from "react";

import type { GetStaticPaths, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import PortalTabs from "~/Organisms/PortalTabs/PortalTabs";
import {
  CalendarDaysIcon,
  Cog6ToothIcon,
  HeartIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";
import StatisticDashboardTab from "~/Organisms/CompanySpecific/StatisticDashboardTab";
import RootLayout from "~/Templates/PortalLayout/layout";

function Index() {
  const i18n = useTranslation("dashboard-user");

  const menuOptions = [
    {
      title: i18n.t("menu-plans"),
      icon: <PencilSquareIcon className="h-5 w-5" />,
      children: <StatisticDashboardTab />,
    },
    {
      title: i18n.t("menu-settings"),
      icon: <Cog6ToothIcon className="h-5 w-5" />,
    },
    {
      title: i18n.t("menu-schedule"),
      icon: <CalendarDaysIcon className="h-5 w-5 text-red-600" />,
    },
    {
      title: i18n.t("menu-favorites"),
      icon: <HeartIcon className="h-5 w-5" />,
    },
  ];

  return (
    <RootLayout >
      <PortalTabs tabs={menuOptions} />
    </RootLayout>
  );
}

export default Index;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "hr", [
      "common",
      "dashboard-user",
    ])),
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
