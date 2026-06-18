const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
	register: true,
	scope: "/",
	sw: "service-worker.js",
	disableDevLogs: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  transpilePackages: ["@repo/ui"],
};

module.exports = withPWA(nextConfig);
