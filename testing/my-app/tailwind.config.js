/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blush: "#FDE8EC",
        charcoal: "#26312F",
        forest: "#1d3d2e",
        ink: "#101827",
        lavender: "#EDE5F6",
        mint: "#E8F5F0",
        "mint-strong": "#D9EEE7",
        page: "#F3F3F1",
        slate: "#34445B",
        sage: "#5a9070",
        teal: "#0F907B",
        "teal-dark": "#096F61",
        "warm-white": "#FAFAF8",
      },
      borderRadius: {
        card: "24px",
      },
      boxShadow: {
        soft: "0 12px 35px rgba(16, 24, 39, 0.08)",
        lift: "0 18px 45px rgba(16, 24, 39, 0.13)",
      },
      fontFamily: {
        sans: ['"Outfit"', "system-ui", "sans-serif"],
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
