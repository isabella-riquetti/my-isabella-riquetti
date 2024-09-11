/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
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

      'black': {
        '50': '#f6f6f6',
        '100': '#e7e7e7',
        '200': '#d1d1d1',
        '300': '#b0b0b0',
        '400': '#888888',
        '500': '#6d6d6d',
        '600': '#5d5d5d',
        '700': '#4f4f4f',
        '800': '#454545',
        '900': '#1F1F1F',
        '950': '#000000',
      },

    },
    fontFamily: {
      base: '"Montserrat", sans-serif'
    },
  },
  plugins: [],
}
