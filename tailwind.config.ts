import type { Config } from "tailwindcss";
import { breakpoints } from "./lib/utils";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    theme: {
      screens: {
        sm: breakpoints.sm,
        md: breakpoints.md,
        lg: breakpoints.lg,
      },
    },
  },
  plugins: [],
};
export default config;
