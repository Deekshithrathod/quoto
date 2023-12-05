/** @type {import('tailwindcss').Config} */
module.exports = {
	...require("@quoto/configs/tailwind/tailwind.config"),
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",

		// for UI from componentss
		"../../packages/ui/src/**/*{.js,.ts,.jsx,.tsx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
