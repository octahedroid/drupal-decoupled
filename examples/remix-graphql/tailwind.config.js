// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./app/**/*.{tsx,ts,jsx,js}'],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     require('@tailwindcss/typography'),
//   ],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{tsx,ts,jsx,js}'],
  theme: {
    extend: {
      container: {
        // padding: {
        //   DEFAULT: "1rem",
        //   sm: "1.5rem",
        //   lg: "2.5rem",
        //   xl: "5rem",
        //   "2xl": "7rem",
        // },
      },
      fontFamily: {
        ztgatha: ["var(--font-ztgatha)"],
      },
      colors: {
        primary: "#064771",
        secondary: "#12285F",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
