import React from "react";

import type { GetStaticPaths, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import PortalTabs from "~/Organisms/PortalTabs/PortalTabs";
import useMenu from "~/hooks/useMenu/useMenu";
import RootLayout from "~/Templates/PortalLayout/layout";

function Dashboard() {
  const { t } = useTranslation("common");
  const { menus, companyDashboardMenu, userCompany } = useMenu();

  return (
    <RootLayout
      business={userCompany}
      menus={menus}
      isCompany={true}
      type={userCompany?.hasPost ? t("edit-post") : t("new-post")}
    >
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
