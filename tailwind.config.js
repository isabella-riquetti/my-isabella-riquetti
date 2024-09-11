/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      black: "#000",
      white: "#fff",

      'purple': {
        '50': '#f7f6fc',
        '100': '#f0eef9',
        '200': '#e3dff5',
        '300': '#cdc5ed',
        '400': '#b3a3e2',
        '500': '#987ed4',
        '600': '#7e57c2',
        '700': '#764fb2',
        '800': '#624295',
        '900': '#52377b',
        '950': '#332352',
      },
    },
    fontFamily: {
      base: '"Montserrat", sans-serif'
    },
  },
  plugins: [],
}
