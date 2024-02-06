import { ClerkProvider } from "@clerk/nextjs";
import { DefaultSeo } from "next-seo";
import { type AppType } from "next/app";
import { ParallaxProvider } from "react-scroll-parallax";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "~/styles/globals.css";
import { useReportWebVitals } from "next/web-vitals";

import { api } from "~/utils/api";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "../pages/discover/Discover.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  useReportWebVitals((metric) => {
    console.log(metric);
  });
  return (
    <ClerkProvider {...pageProps}>
      <DefaultSeo
        openGraph={{
          type: "website",
          locale: "hr_HR",
          url: "https://www.zaplaniraj.hr/",
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
      {/* <ProgressBar
        height="4px"
        color="#fffd00"
        delay={500}
        style="left:0px;"
        options={{ showSpinner: true }}
        shallowRouting
      /> */}
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
