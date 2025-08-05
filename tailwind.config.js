/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3E2800", // Dark brown from login button
          hover: "#2E1E00",
        },
        background: {
          card: "#FFFFFF", // White card background
          page: "#FDF9F3", // Light cream background
        },
        text: {
          primary: "#1A1A1A", // Dark text
          secondary: "#666666", // Secondary text
          link: "#8B6F47", // Brown link color
        },
        border: {
          DEFAULT: "#E5E5E5", // Light gray border
          focus: "#3E2800", // Brown focus border
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Modern clean font
      },
      fontSize: {
        "heading-1": ["24px", "32px"],
        body: ["14px", "20px"],
        small: ["12px", "16px"],
      },
      boxShadow: {
        card: "0px 4px 20px rgba(0, 0, 0, 0.05)",
      },
      borderRadius: {
        card: "16px",
        button: "8px",
        input: "8px",
      },
    },
  },
  plugins: [],
};
