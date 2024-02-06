/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */

await import("./src/env.mjs");

/** @type {import("next").NextConfig} */

const config = {
  reactStrictMode: false,
  webpack: (config) => {
    let modularizeImports = null;
    if (config) {
      config.module.rules.some((/** @type {{ oneOf: any[]; }} */ rule) =>
        rule.oneOf?.some((oneOf) => {
          modularizeImports =
            oneOf?.use?.options?.nextConfig?.modularizeImports;
          return modularizeImports;
        })
      );
      if (modularizeImports?.["@headlessui/react"])
        delete modularizeImports["@headlessui/react"];
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/**",
      },

      {
        protocol: "https",
        hostname: "tailwindui.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
    ],
  },
  swcMinify: true,
};

// export default bundleAnalyzer(config);
export default config;
