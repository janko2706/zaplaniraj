import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";
import MainTemplate from "~/Templates/MainTemplate";

function Index() {
  const router = useRouter();
  const { t } = useTranslation();
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
    <MainTemplate menus={menus}>
      <div>{router.query.id}</div>
    </MainTemplate>
  );
}

export default Index;
