const { fontFamily } = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-fira-sans)', ...fontFamily.sans],
        marvel: ['var(--font-marvel)', 'sans-serif'],
      }, // Added missing closing brace here
    }, // Added missing closing brace here
  },
  plugins: [],
}
