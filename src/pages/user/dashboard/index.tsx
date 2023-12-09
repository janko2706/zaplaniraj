import React from "react";
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PortalTabs from "~/Organisms/PortalTabs/PortalTabs";
import RootLayout from "~/Templates/PortalLayout/layout";
import useMenu from "~/hooks/useMenu/useMenu";
import { useRouter } from "next/router";

function Dashboard() {
  const { menus, userDashboardMenu } = useMenu();
  const { query } = useRouter();
  return (
    <RootLayout isCompany={false} menus={menus}>
      <PortalTabs
        tabs={userDashboardMenu}
        defaultIndex={query.index ? Number(query.index) : 0}
      />
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
