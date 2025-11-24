import type { NextConfig } from "next";

const alllendpoints =
  `${process.env.NEXT_PUBLIC_API_URL}` || "http://localhost:3000";
const cspHeader = `
    default-src 'self';
   connect-src 'self' ${alllendpoints};
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    ${
      process.env.NODE_ENV === "production" ? "upgrade-insecure-requests" : ""
    }`;

const nextConfig: NextConfig = {
  output: "standalone",
  crossOrigin: "anonymous",
  reactCompiler: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
