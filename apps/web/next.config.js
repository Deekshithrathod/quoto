const withPWA = require("next-pwa");
module.exports = withPWA({
	pwa: {
		dest: "public",
		disable: process.env.NODE_ENV === "development",
		register: true,
		scope: "/app",
		sw: "service-worker.js",
		// cacheOnFrontEndNav: true,
		// aggressiveFrontEndNavCaching: true,
		// reloadOnOnline: true,
		// swcMinify: true,
		workboxOptions: {
			disableDevLogs: true,
			// runtimecaching: [],
		},
		// ... other options you like
	},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ["@repo/ui"],
};

module.exports = nextConfig;
