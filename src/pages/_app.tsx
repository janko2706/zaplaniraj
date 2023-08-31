import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { DefaultSeo } from "next-seo";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { appWithTranslation } from "next-i18next";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <DefaultSeo
        openGraph={{
          type: "website",
          locale: "hr_HR",
          url: "https://www.za-planiraj.hr/",
          siteName: "ZAplaniraj",
          description:
            "Platforma za organiziranje dogadaja poput vjenjcanja, prvih pricesti, krizma, rodendana, itd.",
        }}
        themeColor="#203C6E"
        description="Platforma za organiziranje dogadaja poput vjenjcanja, prvih pricesti, krizma, rodendana, itd."
      />
      <ToastContainer position="top-right" />

      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default api.withTRPC(appWithTranslation(MyApp));
