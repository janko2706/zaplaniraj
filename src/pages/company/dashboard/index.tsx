import { useRouter } from "next/router";
import PortalTabs from "~/Organisms/PortalTabs/PortalTabs";
import RootLayout from "~/Templates/PortalLayout/layout";
import useMenu from "~/hooks/useMenu/useMenu";

function Dashboard() {
  const { menus, companyDashboardMenu, userCompany, companyPost } = useMenu();
  const { query } = useRouter();

  return (
    <RootLayout
      post={companyPost}
      hasPost={userCompany?.companyPostId ? true : false}
      business={userCompany}
      menus={menus}
      isCompany={userCompany ? true : false}
    >
      <PortalTabs
        tabs={companyDashboardMenu}
        defaultIndex={query.index ? Number(query.index) : 0}
      />
    </RootLayout>
  );
}

export default Dashboard;
