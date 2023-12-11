import { ClerkProvider } from "@clerk/nextjs";
import { DefaultSeo } from "next-seo";
import { type AppType } from "next/app";
import { ParallaxProvider } from "react-scroll-parallax";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "~/styles/globals.css";
import { api } from "~/utils/api";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "../pages/discover/Discover.css";

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
      <ParallaxProvider scrollAxis="vertical">
        <Component {...pageProps} />
      </ParallaxProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
