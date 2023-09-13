import React from "react";

import type { GetStaticPaths, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import PortalTabs from "~/Organisms/PortalTabs/PortalTabs";
import RootLayout from "~/Templates/PortalLayout/layout";
import useMenu from "~/hooks/useMenu/useMenu";

function Dashboard() {
  const { t } = useTranslation("common");

  const { menus, companyDashboardMenu } = useMenu();
  return (
    <RootLayout menus={menus} type={t("edit-post")}>
      <PortalTabs tabs={companyDashboardMenu} />
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
