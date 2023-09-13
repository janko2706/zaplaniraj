import React from "react";

import type { GetStaticPaths, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import PortalTabs from "~/Organisms/PortalTabs/PortalTabs";
import RootLayout from "~/Templates/PortalLayout/layout";
import useMenu from "~/hooks/useMenu/useMenu";

function Dashboard() {
  const { t } = useTranslation("common");

  const { menus, userDashboardMenu } = useMenu();
  return (
    <RootLayout menus={menus} type={t("new-plan")}>
      <PortalTabs tabs={userDashboardMenu} />
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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const result: {
    result: {
      data?: {
        json: { id: string }[];
      };
    };
  } = await fetch(
    "https://zaplaniraj.vercel.app/api/trpc/user.getAllForPages"
  ).then((res) => {
    return res.json();
  });
  if (!result?.result?.data) {
    return {
      paths: [],
      fallback: true,
    };
  }

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
  return {
    paths: [...engPaths, ...dePaths, ...hrPaths],
    fallback: true,
  };
};
