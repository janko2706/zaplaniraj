import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { DefaultSeo } from "next-seo";
import Footer from "~/Atoms/Footer/Footer";

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
      <Component {...pageProps} />
      <Footer />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
