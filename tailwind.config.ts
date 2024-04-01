import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "dark": "#1a1a1a",
        "light": "#f8f8f8",
        'light-grey': "#d9d9d9",
        "primary": "#E60023",
      },
      gap: {
        '6': "6px",
      },
      fontSize: {
        '13': "13px",
      }
    },
  },
  plugins: [],
};
export default config;
