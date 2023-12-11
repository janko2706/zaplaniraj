import React from "react";
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
