import React from "react";
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import PortalTabs from "~/Organisms/PortalTabs/PortalTabs";
import RootLayout from "~/Templates/PortalLayout/layout";
import useMenu from "~/hooks/useMenu/useMenu";

function Dashboard() {
  const { t } = useTranslation("common");

  const { menus, userDashboardMenu } = useMenu();
  return (
    <RootLayout isCompany={false} menus={menus} type={t("new-plan")}>
      <PortalTabs tabs={userDashboardMenu} />
    </RootLayout>
  );
}

export default Dashboard;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "hr", [
        "common",
        "dashboard-user",
      ])),
    },
  };
};
