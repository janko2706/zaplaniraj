import React from "react";

import type { GetStaticPaths, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import PortalTabs from "~/Organisms/PortalTabs/PortalTabs";
import {
  Cog6ToothIcon,
  HeartIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";
import RootLayout from "~/Templates/PortalLayout/layout";
import MyPlans from "~/Organisms/UserSpecific/MyPlans";

function Dashboard() {
  const { t } = useTranslation("common");
  const i18n = useTranslation("dashboard-user");

  const menuOptions = [
    {
      title: i18n.t("menu-plans"),
      icon: <PencilSquareIcon className="h-5 w-5" />,
      children: <MyPlans />,
    },
    {
      title: i18n.t("menu-favorites"),
      icon: <HeartIcon className="h-5 w-5 text-red-500" />,
    },
    {
      title: i18n.t("menu-settings"),
      icon: <Cog6ToothIcon className="h-5 w-5" />,
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
    <RootLayout menus={menus} type={t("new-plan")}>
      <PortalTabs tabs={menuOptions} />
    </RootLayout>
  );
}

export default Dashboard;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "hr", [
      "common",
      "dashboard-user",
    ])),
  },
});

export const getStaticPaths: GetStaticPaths = async () => {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: "blocking",
    };
  } // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const result: {
    result: {
      data: {
        json: { id: string }[];
      };
    };
  } = await fetch(
    "https://zaplaniraj.vercel.app/api/trpc/user.getAllForPages"
  ).then((res) => {
    return res.json();
  });

  const userData = result.result.data.json;
  const engPaths = userData.map((item) => {
    return {
      params: {
        id: item.id,
      },
      locale: "en-US",
    };
  });
  const hrPaths = userData.map((item) => {
    return {
      params: {
        id: item.id,
      },
      locale: "hr",
    };
  });
  const dePaths = userData.map((item) => {
    return {
      params: {
        id: item.id,
      },
      locale: "de-DE",
    };
  });
  if (userData) {
    return {
      paths: [...engPaths, ...dePaths, ...hrPaths],
      fallback: true,
    };
  }
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
