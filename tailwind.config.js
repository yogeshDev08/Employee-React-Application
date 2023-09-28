/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  corePlugins:{
    preflight:false,
  },
  content: [
    "./src/**/**/*.{html,js,tsx}",
    "./component/**/*.{js, ts, jsx, tsx,mdx}",
    "./pages/**/*.{js, ts, jsx, tsx,mdx}"
  ],
  theme: {
    extend: {
      width:{
        75: "308px"
      }
    },
  },
  plugins: [],
}

