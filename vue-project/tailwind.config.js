/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mitt-green-100': "#000706",
        'mitt-green-200': "#112317",
        'mitt-green-300': "#1B3C27",
        'mitt-green-400': "#225034",
        'mitt-green-500': "#236E43",
        'mitt-green-600': "#77CA84",
      }
    },
  },
  plugins: [],
}

